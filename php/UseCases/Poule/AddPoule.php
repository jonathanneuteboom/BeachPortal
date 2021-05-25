<?php

namespace BeachPortal\UseCases;

use BeachPortal\Common\Linq;
use BeachPortal\Entities\Categorie;
use BeachPortal\Entities\Poule;
use BeachPortal\Gateways\PouleGateway;
use BeachPortal\Gateways\SpeelrondeGateway;
use UnexpectedValueException;

class AddPoule implements Interactor
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
        $categorie = Categorie::GetCategorie($data->categorie);

        $speelronde = $this->speelrondeGateway->GetCurrentSpeelronde();
        if ($speelronde === null) {
            return;
        }

        $poules = $this->pouleGateway->GetPoulesInSpeelronde($speelronde);
        if (count($poules) === 0) {
            $speeltijd = $categorie->GetStarttijd();
            $newPoule = new Poule(null, "A", $categorie, $speeltijd);
            $this->speelrondeGateway->AddPouleToSpeelronde($speelronde, $newPoule);
            return;
        }

        $hoogstePoule = Linq::From($poules)
            ->Where(function (Poule $poule) use ($categorie) {
                return $poule->categorie->Equals($categorie);
            })
            ->OrderByDescending(function (Poule $poule) {
                return $poule->naam;
            })
            ->First();

        $newSpeeltijd = clone $hoogstePoule->speeltijd;
        $newSpeeltijd->modify("+60 minutes");
        $pouleMetZelfdeSpeeltijd = Linq::From($poules)->FirstOrDefault(function (Poule $poule) use ($newSpeeltijd) {
            return $poule->speeltijd == $newSpeeltijd;
        });
        if ($pouleMetZelfdeSpeeltijd) {
            $tijd = $newSpeeltijd->format("H:i");
            $categorie = $pouleMetZelfdeSpeeltijd->categorie->GetNaam();
            $message = "De nieuwe speeltijd '$tijd' is hetzelfde als die van poule $categorie $pouleMetZelfdeSpeeltijd->naam";
            throw new UnexpectedValueException($message);
        }

        $naam = $this->GetNextLetter($hoogstePoule->naam);
        $newPoule = new Poule(null, $naam, $categorie, $newSpeeltijd);
        $this->speelrondeGateway->AddPouleToSpeelronde($speelronde, $newPoule);
    }

    private function GetNextLetter(string $letter)
    {
        return chr(ord($letter) + 1);
    }
}
