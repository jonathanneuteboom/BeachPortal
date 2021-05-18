<?php

namespace BeachPortal\UseCases;

use BeachPortal\Common\DateFunctions;
use BeachPortal\Entities\Categorie;
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

        $datums = [];

        $speelronde = $this->speelrondeGateway->GetCurrentSpeelronde();
        $poules = $this->pouleGateway->GetPoulesInSpeelronde($speelronde);
        foreach ($poules as $poule) {
            $date = new DateTime();
            $date->setTimestamp(strtotime($poule->speeltijd));

            if ($date == $newSpeeltijd) {
                $categorie = Categorie::GetCategorieText($poule->categorie);
                throw new UnexpectedValueException("Poule $categorie $poule->naam speelt al op dit tijdstip");
            }

            $datum = DateFunctions::GetYmdNotation($date);
            if (array_search($datum, $datums) === false) {
                $datums[] = $datum;
            }
        }

        $datum = DateFunctions::GetYmdNotation($newSpeeltijd);
        if (array_search($datum, $datums) === false) {
            throw new UnexpectedValueException("Deze speelronde speelt niet op " . DateFunctions::GetDutchDate($newSpeeltijd));
        }

        $poule = $this->pouleGateway->GetPouleById($pouleId);
        if ($poule === null) {
            throw new UnexpectedValueException("Poule bestaat niet");
        }

        $poule->speeltijd = DateFunctions::GetMySqlTimestamp($newSpeeltijd);
        $this->pouleGateway->UpdatePoule($poule);
    }
}
