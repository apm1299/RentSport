<?php

namespace App\Event;

use App\Event\AbstractEvent;

class AuthEvent extends AbstractEvent
{
    # AUTHENTICATION #
    const AUTHENTICATION_SUCCESS = 'authentication_success';
    const AUTHENTICATION_FAILURE = 'authentication_failure';
    # LOGOUT #
    const LOGOUT_SUCCESS = 'logout_success';
    const LOGOUT_FAILURE = 'logout_failure';
    # REGISTERED #
    const REGISTERED_SUCCESS = 'registered_success';
    const REGISTERED_FAILURE = 'registered_failure';
    # EMAIL_VERIFY #
    const EMAIL_VERIFY_EMAIL_SENDED_SUCCESS = 'email_verify_email_sended_success';
    const EMAIL_VERIFY_EMAIL_SENDED_FAILURE = 'email_verify_email_sended_failure';
    const EMAIL_VERIFY_SUCCESS = 'email_verify_success';
    const EMAIL_VERIFY_FAILURE = 'email_verify_failure';

}