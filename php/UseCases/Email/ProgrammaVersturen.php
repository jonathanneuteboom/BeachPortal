<?php

namespace BeachPortal\UseCases;

use BeachPortal\Entities\ProgrammaEmail;
use BeachPortal\Gateways\EmailGateway;
use BeachPortal\Gateways\PouleGateway;
use BeachPortal\Gateways\SpeelrondeGateway;
use BeachPortal\Gateways\TeamGateway;

class ProgrammaVersturen implements Interactor
{
    function __construct(
        SpeelrondeGateway $speelrondeGateway,
        PouleGateway $pouleGateway,
        TeamGateway $teamGateway,
        EmailGateway $emailGateway
    ) {
        $this->speelrondeGateway = $speelrondeGateway;
        $this->pouleGateway = $pouleGateway;
        $this->teamGateway = $teamGateway;
        $this->emailGateway = $emailGateway;
    }

    public function Execute(object $data = null)
    {
        $speelronde = $this->speelrondeGateway->GetCurrentSpeelronde();
        if ($speelronde === null) {
            return;
        }

        $emails = [];
        $poules = $this->pouleGateway->GetPoulesInSpeelronde($speelronde);
        foreach ($poules as $poule) {
            $poule->teams = $this->teamGateway->GetTeamsInPoule($poule);
            foreach ($poule->teams as $team) {
                foreach ($team->spelers as $speler) {
                    $emails[] = new ProgrammaEmail($speler, $poule);
                }
            }
        }

        $this->emailGateway->QueueEmails($emails);
        // $this->emailGateway->SendQueuedEmails();
    }
}
