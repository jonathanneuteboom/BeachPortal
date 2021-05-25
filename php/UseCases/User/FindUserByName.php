<?php

namespace BeachPortal\UseCases;

use BeachPortal\Common\Linq;
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

        $spelers = $this->userGateway->GetUsersWithName($naam);
        return Linq::From($spelers)->Select(function ($speler) {
            return new SpelerModel($speler);
        })->ToList();
    }
}
