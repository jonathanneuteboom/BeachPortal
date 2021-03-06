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
        $result = [];

        $poules = $this->pouleGateway->GetAllPoules();
        foreach ($poules as $poule) {
            $poule->teams = $this->teamGateway->GetTeamsInPoule($poule);
            $poule->wedstrijden = $this->wedstrijdGateway->GetWedstrijdenInPoule($poule);
            $poule->stand = $this->wedstrijdGateway->GetStandOfPoule($poule);
            foreach ($poule->stand as $stand) {
                $stand->team = $this->teamGateway->GetTeamById($stand->team->id);
            }

            $result[] = new PouleModel($poule);
        }

        return $result;
    }
}
