<?php

namespace BeachPortal\UseCases;

use BeachPortal\Gateways\PouleGateway;
use BeachPortal\Gateways\SpeelrondeGateway;
use BeachPortal\Gateways\TeamGateway;
use BeachPortal\Gateways\UserGateway;
use BeachPortal\Gateways\WedstrijdGateway;

class GetMyPoules implements Interactor
{
    function __construct(
        PouleGateway $pouleGateway,
        TeamGateway $teamGateway,
        UserGateway $userGateway,
        SpeelrondeGateway $speelrondeGateway,
        WedstrijdGateway $wedstrijdGateway
    ) {
        $this->pouleGateway = $pouleGateway;
        $this->teamGateway = $teamGateway;
        $this->userGateway = $userGateway;
        $this->speelrondeGateway = $speelrondeGateway;
        $this->wedstrijdGateway = $wedstrijdGateway;
    }

    public function Execute(object $data = null)
    {
        $speler = $this->userGateway->GetUser();
        if ($speler === null) return;

        $speelronde = $this->speelrondeGateway->GetCurrentSpeelronde();
        if ($speelronde === null) {
            return;
        }

        $teams = $this->teamGateway->GetTeamsOfSpeler($speler);

        $myPoules = [];
        $poules = $this->pouleGateway->GetPoulesInSpeelronde($speelronde);
        foreach ($poules as $poule) {
            $poule->teams = $this->teamGateway->GetTeamsInPoule($poule);
            foreach ($teams as $team) {
                if (array_search($team->id, array_column($poule->teams, 'id'))) {
                    $poule->wedstrijden = $this->wedstrijdGateway->GetWedstrijdenInPoule($poule);
                    $poule->stand = $this->wedstrijdGateway->GetStandOfPoule($poule);

                    $myPoules[] = $poule;
                }
            }
        }

        return $myPoules;
    }
}
