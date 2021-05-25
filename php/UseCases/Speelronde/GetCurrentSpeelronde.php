<?php

namespace BeachPortal\UseCases;

use BeachPortal\Gateways\PouleGateway;
use BeachPortal\Gateways\SpeelrondeGateway;
use BeachPortal\Gateways\TeamGateway;

class GetCurrentSpeelronde implements Interactor
{
    function __construct(
        SpeelrondeGateway $speelrondeGateway,
        PouleGateway $pouleGateway,
        TeamGateway $teamGateway
    ) {
        $this->speelrondeGateway = $speelrondeGateway;
        $this->pouleGateway = $pouleGateway;
        $this->teamGateway = $teamGateway;
    }

    public function Execute(object $data = null)
    {
        $speelronde = $this->speelrondeGateway->GetCurrentSpeelronde();
        if ($speelronde === null) {
            return null;
        }

        $speelronde->poules = $this->pouleGateway->GetPoulesInSpeelronde($speelronde);
        foreach ($speelronde->poules as &$poule) {
            $poule->teams = $this->teamGateway->GetTeamsInPoule($poule);
        }

        return new SpeelrondeModel($speelronde);
    }
}
