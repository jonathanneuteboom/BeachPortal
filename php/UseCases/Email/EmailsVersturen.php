<?php

namespace BeachPortal\UseCases;

use BeachPortal\Gateways\EmailGateway;
use BeachPortal\Gateways\PouleGateway;
use BeachPortal\Gateways\TeamGateway;
use BeachPortal\Gateways\UserGateway;
use UnexpectedValueException;

class EmailsVersturen implements Interactor
{
    function __construct(
        TeamGateway $teamGateway,
        PouleGateway $pouleGateway,
        UserGateway $userGateway,
        EmailGateway $emailGateway
    ) {
        $this->teamGateway = $teamGateway;
        $this->pouleGateway = $pouleGateway;
        $this->userGateway = $userGateway;
        $this->emailGateway = $emailGateway;
    }

    public function Execute(object $data = null)
    {
        $titel = $data->titel;
        $body = $data->body;
        $teamIds = $data->teams ?? [];
        $pouleIds = $data->poules ?? [];
        $isTestMail = $data->isTestMail ?? false;

        if (empty($titel)) {
            throw new UnexpectedValueException("Titel is leeg");
        }
        if (empty($body)) {
            throw new UnexpectedValueException("Mail body is leeg");
        }
        if (count($teamIds) === 0 && count($pouleIds) === 0) {
            throw new UnexpectedValueException("Geen ontvangers geselecteerd");
        }

        $isTeamEmail = false;
        $isPouleEmail = false;

        $emails = [];
        foreach ($teamIds as $teamId) {
            $team = $this->teamGateway->GetTeamById($teamId);
            $generatedEmails = $team->GenerateEmails($titel, $body);
            foreach ($generatedEmails as $email) {
                if ($email->IsValid()) {
                    $emails[] = $email;

                    $isTeamEmail = true;
                }
            }
        }

        foreach ($pouleIds as $pouleId) {
            $poule = $this->pouleGateway->GetPouleById($pouleId);
            $poule->teams = $this->teamGateway->GetTeamsInPoule($poule);
            $generatedEmails = $poule->GenerateEmails($titel, $body);
            foreach ($generatedEmails as $email) {
                if ($email->IsValid()) {
                    $emails[] = $email;

                    $isPouleEmail = true;
                }
            }
        }

        if (count($emails) === 0) {
            throw new UnexpectedValueException("Email bevat fouten");
        }

        if ($isPouleEmail && $isTeamEmail) {
            throw new UnexpectedValueException("Er worden mails naar zowel teams als poules gestuurd, dit mag niet");
        }

        if ($isTestMail) {
            $firstEmail = $emails[0];
            $firstEmail->receiver = $this->userGateway->GetUser();
            $firstEmail->body .= "<br><br>(Unix timestamp: " . time() . ")";
            $emails = [$firstEmail];
        }

        $this->emailGateway->QueueEmails($emails);
        $sentEmails = $this->emailGateway->SendQueuedEmails();

        return $sentEmails . " e-mail(s) verstuurd";
    }
}
