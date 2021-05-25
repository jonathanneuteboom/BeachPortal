<?php

namespace BeachPortal\UseCases;

use BeachPortal\Gateways\PouleGateway;
use BeachPortal\Gateways\SpeelrondeGateway;
use BeachPortal\Gateways\TeamGateway;
use BeachPortal\Gateways\WedstrijdGateway;

class GetAllSpeelrondes implements Interactor
{
    function __construct(
        SpeelrondeGateway $speelrondeGateway,
        PouleGateway $pouleGateway,
        TeamGateway $teamGateway,
        WedstrijdGateway $wedstrijdGateway
    ) {
        $this->speelrondeGateway = $speelrondeGateway;
        $this->pouleGateway = $pouleGateway;
        $this->teamGateway = $teamGateway;
        $this->wedstrijdGateway = $wedstrijdGateway;
    }

    public function Execute(object $data = null)
    {
        $result = [];
        $speelrondes = $this->speelrondeGateway->GetAllSpeelrondes();
        foreach ($speelrondes as $speelronde) {
            $speelronde->poules = $this->pouleGateway->GetPoulesInSpeelronde($speelronde);
            foreach ($speelronde->poules as &$poule) {
                $poule->wedstrijden = $this->wedstrijdGateway->GetWedstrijdenInPoule($poule);
                $poule->stand = $this->wedstrijdGateway->GetStandOfPoule($poule);
                foreach ($poule->stand as $stand) {
                    $stand->team = $this->teamGateway->GetTeamById($stand->team->id);
                }
            }

            $result[] = new SpeelrondeModel($speelronde);
        }

        return $result;
    }
}
