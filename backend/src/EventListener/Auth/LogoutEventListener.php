<?php

namespace App\EventListener\Auth;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Http\Event\LogoutEvent;

class LogoutEventListener
{
    public function onSymfonyComponentSecurityHttpEventLogoutEvent(LogoutEvent $event)
    {
        $response = new JsonResponse(
            [
                'code' => 200,
                'message' => 'The supplied tokens has been invalidated.',
            ],
            JsonResponse::HTTP_OK
        );
        $response->headers->clearCookie('jwt_hp', '/', null);
        $response->headers->clearCookie('jwt_s', '/', null);
        $response->headers->clearCookie('refreshToken', '/', null);

        $event->setResponse($response);
    }
}