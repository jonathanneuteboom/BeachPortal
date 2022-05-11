<?php

namespace BeachPortal\UseCases;

use BeachPortal\Common\Linq;
use BeachPortal\Entities\Poule;
use BeachPortal\Gateways\PouleGateway;
use BeachPortal\Gateways\SpeellocatieGateway;
use BeachPortal\Gateways\SpeelrondeGateway;
use DateTime;
use UnexpectedValueException;

class UpdatePoule implements Interactor
{
    function __construct(
        SpeelrondeGateway $speelrondeGateway,
        PouleGateway $pouleGateway,
        SpeellocatieGateway $speellocatieGateway
    ) {
        $this->speelrondeGateway = $speelrondeGateway;
        $this->pouleGateway = $pouleGateway;
        $this->speellocatieGateway = $speellocatieGateway;
    }

    public function Execute(object $data = null)
    {
        $pouleId = $data->id;
        $speeltijd = $data->speeltijd;
        $speellocatieId = $data->speellocatieId;

        $timestamp = strtotime($speeltijd);
        $newSpeeltijd = new DateTime();
        $newSpeeltijd->setTimestamp($timestamp);

        $speelronde = $this->speelrondeGateway->GetCurrentSpeelronde();
        $poules = $this->pouleGateway->GetPoulesInSpeelronde($speelronde);
        $poule = Linq::From($poules)->FirstOrDefault(function (Poule $poule) use ($newSpeeltijd, $speellocatieId, $pouleId) {
            return $poule->speeltijd == $newSpeeltijd &&
                $poule->speellocatie->id === $speellocatieId &&
                $poule->id !== $pouleId;
        });
        if ($poule !== null) {
            $categorie = $poule->categorie->GetNaam();
            throw new UnexpectedValueException("Poule $categorie $poule->naam speelt al op dit tijdstip (" . $poule->speellocatie->naam . ")");
        }

        $poule = $this->pouleGateway->GetPouleById($pouleId);
        if ($poule === null) {
            throw new UnexpectedValueException("Poule bestaat niet");
        }
        $poule->speeltijd = $newSpeeltijd;
        $poule->speellocatie = $this->speellocatieGateway->GetById($speellocatieId);
        $this->pouleGateway->UpdatePoule($poule);
    }
}
