<?php

namespace BeachPortal\UseCases;

use InvalidArgumentException;
use BeachPortal\Gateways\UserManager;
use UnexpectedValueException;

class Login implements Interactor
{
    public function __construct(UserManager $userManager)
    {
        $this->userManager = $userManager;
    }

    public function Execute(object $data = null)
    {
        if (empty($data->username) || empty($data->password)) {
            throw new InvalidArgumentException("Vul alle gegevens in");
        }

        if (!$this->joomlaGateway->Login($data->username, $data->password)) {
            throw new UnexpectedValueException("Gebruikersnaam/wachtwoord combinatie klopt niet");
        }
    }
}
