<?php

namespace BeachPortal\UseCases;

use BeachPortal\Gateways\UserGateway;
use InvalidArgumentException;
use UnexpectedValueException;

class Login implements Interactor
{
    public function __construct(UserGateway $userGateway)
    {
        $this->userGateway = $userGateway;
    }

    public function Execute(object $data = null)
    {
        if (empty($data->username) || empty($data->password)) {
            throw new InvalidArgumentException("Vul alle gegevens in");
        }

        if (!$this->userGateway->Login($data->username, $data->password)) {
            throw new UnexpectedValueException("Gebruikersnaam/wachtwoord combinatie klopt niet");
        }
    }
}
