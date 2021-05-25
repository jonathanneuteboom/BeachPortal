<?php

namespace BeachPortal\UseCases;

use BeachPortal\Common\Linq;
use BeachPortal\Entities\Poule;
use BeachPortal\Gateways\PouleGateway;
use BeachPortal\Gateways\SpeelrondeGateway;
use DateTime;
use UnexpectedValueException;

class UpdateSpeeltijd implements Interactor
{
    function __construct(
        SpeelrondeGateway $speelrondeGateway,
        PouleGateway $pouleGateway
    ) {
        $this->speelrondeGateway = $speelrondeGateway;
        $this->pouleGateway = $pouleGateway;
    }

    public function Execute(object $data = null)
    {
        $pouleId = $data->id;
        $speeltijd = $data->speeltijd;

        $timestamp = strtotime($speeltijd);
        $newSpeeltijd = new DateTime();
        $newSpeeltijd->setTimestamp($timestamp);

        $speelronde = $this->speelrondeGateway->GetCurrentSpeelronde();
        $poules = $this->pouleGateway->GetPoulesInSpeelronde($speelronde);
        $poule = Linq::From($poules)->FirstOrDefault(function (Poule $poule) use ($newSpeeltijd, $pouleId) {
            return $poule->speeltijd == $newSpeeltijd && $poule->id !== $pouleId;
        });
        if ($poule !== null) {
            $categorie = $poule->categorie->GetNaam();
            throw new UnexpectedValueException("Poule $categorie $poule->naam speelt al op dit tijdstip");
        }

        $poule = $this->pouleGateway->GetPouleById($pouleId);
        if ($poule === null) {
            throw new UnexpectedValueException("Poule bestaat niet");
        }
        $poule->speeltijd = $newSpeeltijd;
        $this->pouleGateway->UpdatePoule($poule);
    }
}
