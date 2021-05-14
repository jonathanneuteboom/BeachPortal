<?php

namespace BeachPortal\UseCases;

use BeachPortal\Gateways\PouleGateway;
use BeachPortal\Gateways\TeamGateway;

class GetAllPoules implements Interactor
{
    function __construct(
        PouleGateway $pouleGateway,
        TeamGateway $teamGateway
    ) {
        $this->pouleGateway = $pouleGateway;
        $this->teamGateway = $teamGateway;
    }

    public function Execute(object $data = null)
    {
        $poules = $this->pouleGateway->GetAllPoules();
        foreach ($poules as $poule) {
            $poule->teams = $this->teamGateway->GetTeamsInPoule($poule);
            $poule->wedstrijden = $this->wedstrijdGateway->GetWedstrijdenInPoule($poule);
            $poule->stand = $this->wedstrijdGateway->GetStandOfPoule($poule);
        }

        return $poules;
    }
}
