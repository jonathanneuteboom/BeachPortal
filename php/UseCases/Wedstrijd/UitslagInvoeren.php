<?php

namespace BeachPortal\UseCases;

use BeachPortal\Gateways\PouleGateway;
use BeachPortal\Gateways\SpeelrondeGateway;
use BeachPortal\Gateways\UserGateway;
use BeachPortal\Gateways\WedstrijdGateway;
use UnexpectedValueException;

class UitslagInvoeren implements Interactor
{
    function __construct(
        WedstrijdGateway $wedstrijdGateway,
        SpeelrondeGateway $speelrondeGateway,
        PouleGateway $pouleGateway,
        UserGateway $userGateway
    ) {
        $this->wedstrijdGateway = $wedstrijdGateway;
        $this->speelrondeGateway = $speelrondeGateway;
        $this->pouleGateway = $pouleGateway;
        $this->userGateway = $userGateway;
    }

    public function Execute(object $data = null)
    {
        $wedstrijdId = $data->id;
        $puntenTeam1 = $data->puntenTeam1;
        $puntenTeam2 = $data->puntenTeam2;

        $wedstrijdGevondenInHuidigeSpeelronde = false;
        $speelronde = $this->speelrondeGateway->GetCurrentSpeelronde();
        $poules = $this->pouleGateway->GetPoulesInSpeelronde($speelronde);
        foreach ($poules as $poule) {
            $wedstrijden = $this->wedstrijdGateway->GetWedstrijdenInPoule($poule);
            if (array_search($wedstrijdId, array_column($wedstrijden, 'id')) !== false) {
                $wedstrijdGevondenInHuidigeSpeelronde = true;
                break;
            }
        }
        if (!$wedstrijdGevondenInHuidigeSpeelronde) {
            throw new UnexpectedValueException("Kan uitslag van eerdere speelronden niet wijzigen");
        }

        $wedstrijd = $this->wedstrijdGateway->GetWedstrijdById($wedstrijdId);
        $speler = $this->userGateway->GetUser();

        $canEdit =
            $wedstrijd->CanSpelerEdit($speler) ||
            $this->userGateway->IsBeachcie($speler) ||
            $this->userGateway->IsWebcie($speler);
        if (!$canEdit) {
            throw new UnexpectedValueException("Je mag deze wedstrijd niet aanpassen");
        }

        $wedstrijd->puntenTeam1 = $puntenTeam1;
        $wedstrijd->puntenTeam2 = $puntenTeam2;

        $this->wedstrijdGateway->UpdateWedstrijd($wedstrijd);
    }
}
