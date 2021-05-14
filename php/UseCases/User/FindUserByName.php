<?php

namespace BeachPortal\UseCases;

use BeachPortal\Gateways\UserGateway;

class FindUserByName implements Interactor
{
    function __construct(UserGateway $userGateway)
    {
        $this->userGateway = $userGateway;
    }

    public function Execute(object $data = null)
    {
        $naam = $data->naam;
        if (strlen($naam) < 3) {
            return [];
        }

        return $this->userGateway->GetUsersWithName($naam);
    }
}
