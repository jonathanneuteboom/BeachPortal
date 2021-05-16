<?php

namespace BeachPortal\UseCases;

use BeachPortal\Gateways\PouleGateway;
use BeachPortal\Gateways\SpeelrondeGateway;
use BeachPortal\Gateways\TeamGateway;
use BeachPortal\Gateways\WedstrijdGateway;
use UnexpectedValueException;

class DeleteSpeelronde implements Interactor
{
    function __construct(
        SpeelrondeGateway $speelrondeGateway,
        PouleGateway $pouleGateway,
        WedstrijdGateway $wedstrijdGateway,
        TeamGateway $teamGateway
    ) {
        $this->speelrondeGateway = $speelrondeGateway;
        $this->pouleGateway = $pouleGateway;
        $this->wedstrijdGateway = $wedstrijdGateway;
        $this->teamGateway = $teamGateway;
    }

    public function Execute(object $data = null)
    {
        $speelronde = $this->speelrondeGateway->GetCurrentSpeelronde();
        if ($speelronde === null) {
            return;
        }

        $speelronde->poules = $this->pouleGateway->GetPoulesInSpeelronde($speelronde);
        foreach ($speelronde->poules as $poule) {
            $wedstrijden = $this->wedstrijdGateway->GetWedstrijdenInPoule($poule);
            foreach ($wedstrijden as $wedstrijd) {
                if ($wedstrijd->IsStandIngevuld()) {
                    throw new UnexpectedValueException("Kan niet verwijderen. Er zijn gespeelde wedstrijden in deze speelronde");
                }
            }
        }

        foreach ($speelronde->poules as $poule) {
            $wedstrijden = $this->wedstrijdGateway->GetWedstrijdenInPoule($poule);
            foreach ($wedstrijden as $wedstrijd) {
                $this->wedstrijdGateway->DeleteWedstrijd($wedstrijd);
            }

            $teams = $this->teamGateway->GetTeamsInPoule($poule);
            foreach ($teams as $team) {
                $this->pouleGateway->DeleteTeamFromPoule($poule, $team);
            }

            $this->pouleGateway->DeletePoule($poule);
        }

        $this->speelrondeGateway->DeleteSpeelronde($speelronde);
    }
}
