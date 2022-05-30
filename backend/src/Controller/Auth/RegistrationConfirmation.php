<?php

namespace App\Controller\Auth;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Psr\EventDispatcher\EventDispatcherInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\Annotation\Route;
use SymfonyCasts\Bundle\VerifyEmail\Exception\VerifyEmailExceptionInterface;
use SymfonyCasts\Bundle\VerifyEmail\VerifyEmailHelperInterface;
use Twig\Environment;

/**
 * @method User|null getUser()
 */
class RegistrationConfirmation extends AbstractController
{
    /**
     * TODO: Cambiar salt por algo más seguro
     */
    const SALT = '8h9fdjvdfko2km32nibidafvbadfvbdva';
    private $verifyEmailHelper;
    private $entityManager;
    private $twig;
    private $mailer;
    private EventDispatcherInterface $eventDispatcher;

    public function __construct(
        VerifyEmailHelperInterface $helper,
        EntityManagerInterface $entityManager,
        MailerInterface $mailer,
        Environment $twig
    ) {
        $this->verifyEmailHelper = $helper;
        $this->entityManager = $entityManager;
        $this->twig = $twig;
        $this->mailer = $mailer;
    }

    #[Route(
        name: 'api_auth_verify_email',
        path: '/api/auth/verification_email/verify'
    )]
    public function verifyUserEmail(Request $request, UserRepository $userRepository): Response
    {
        $decryptedIdRaw = base64_decode($request->get('extra'));
        $id = preg_replace(sprintf('/%s/', $this::SALT), '', $decryptedIdRaw);

        if (!$id) {
            $response = new JsonResponse('User ID not found.', JsonResponse::HTTP_UNAUTHORIZED);

            return $response;
        }

        $user = null;

        if (is_string($id)) {

            $user = $userRepository->find($id);
        }

        if (!$user) {

            $response = new JsonResponse('User not found.', JsonResponse::HTTP_UNAUTHORIZED);

            return $response;
        }

        if ($user->getEmailVerify()) {

            $response = new JsonResponse('User is verified yet.', JsonResponse::HTTP_UNAUTHORIZED);

            return $response;
        }

        try {
            $uri = $request->getUri();
            $userID = $user->getId();
            $userEmail = $user->getEmail();
            $this->verifyEmailHelper->validateEmailConfirmation($uri, $userID, $userEmail);
        } catch (VerifyEmailExceptionInterface $e) {

            $response = new JsonResponse($e->getReason(), JsonResponse::HTTP_UNAUTHORIZED);

            return $response;
        }

        $user->setEmailVerify(true);
        $this->entityManager->persist($user);
        $this->entityManager->flush();

        $response = new JsonResponse(['message' => 'Tu email ya ha sido verificado.'], Response::HTTP_OK);

        return $response;
    }

    #[Route(
        path: '/api/auth/verification_email/resend'
    )]
    public function resendEmail()
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

        $user = $this->getUser();

        if ($user->getEmailVerify() === true) {

            return new JsonResponse(['message' => 'El usuario ya esta verificado.'], Response::HTTP_OK);
        }

        $this->sendVerificationEmail($user);

        return new JsonResponse(['message' => 'The verification email is in your mail.'], Response::HTTP_OK);
    }

    public function sendVerificationEmail(User $data)
    {

        $encryptedId = base64_encode($data->getId() . $this::SALT);

        $signatureComponents = $this->verifyEmailHelper->generateSignature(
            'api_auth_verify_email',
            $data->getId(),
            $data->getEmail(),
            ['extra' => $encryptedId]
        );

        $message = (new Email())
            ->from('rentSport@outlook.com')
            ->to($data->getEmail())
            ->subject('Email confirmation')
            ->html($this->twig->render(
                'confirmation_email/email.html.twig',
                [
                    'signedUrl' => $signatureComponents->getSignedUrl(),
                    'expiresAt' => $signatureComponents->getexpiresAt(),
                ]
            ));

        if (0 === $this->mailer->send($message)) {
            throw new NotFoundHttpException('Unable to send email');
        }
    }
}
