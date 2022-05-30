<?php

namespace App\EventSubscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Controller\Auth\RegistrationConfirmation;
use App\Entity\User;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;

final class UserCreateEventSubscriber implements EventSubscriberInterface
{
    private RegistrationConfirmation $registerVerify;

    public function __construct(
        RegistrationConfirmation $registerVerify
    ) {
        $this->registerVerify = $registerVerify;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['execute', EventPriorities::POST_WRITE],
        ];
    }
    
    public function execute(ViewEvent $event): void
    {
        $user = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!$user instanceof User || Request::METHOD_POST !== $method) {
            return;
        }

        $this->registerVerify->sendVerificationEmail($user);
    }
}
