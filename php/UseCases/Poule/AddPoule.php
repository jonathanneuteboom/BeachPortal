<?php

namespace BeachPortal\UseCases;

use BeachPortal\Entities\Categorie;
use BeachPortal\Entities\Poule;
use BeachPortal\Gateways\PouleGateway;
use BeachPortal\Gateways\SpeelrondeGateway;
use BeachPortal\Gateways\TeamGateway;
use DateTime;
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
        $categorie = $data->categorie;

        $speelronde = $this->speelrondeGateway->GetCurrentSpeelronde();
        if ($speelronde === null) {
            return;
        }

        $poules = $this->pouleGateway->GetPoulesInSpeelronde($speelronde);
        if (count($poules) === 0) {
            $speeltijd = $this->GetSpeeltijd($categorie, "A");
            $newPoule = new Poule(null, "A", $categorie, $speeltijd);
            $this->speelrondeGateway->AddPouleToSpeelronde($speelronde, $newPoule);
            return;
        }

        $hoogstePoulenaam = "A";
        foreach ($poules as $poule) {
            if ($poule->categorie === $categorie && $hoogstePoulenaam == $poule->naam) {
                $hoogstePoulenaam = chr(ord($poule->naam) + 1);
            }
        }

        $speeltijd = $this->GetSpeeltijd($categorie, $hoogstePoulenaam);
        $newPoule = new Poule(null, $hoogstePoulenaam, $categorie, $speeltijd);
        $this->speelrondeGateway->AddPouleToSpeelronde($speelronde, $newPoule);
    }

    private function GetSpeeltijd(int $categorie, string $poulenaam): string
    {
        switch ($categorie) {
            case Categorie::Heren:
                $time = $this->substract($poulenaam, "A") * 2 + 17;
                $timestamp = strtotime("next friday $time:00");
                break;

            case Categorie::Mix:
                $time = $this->substract($poulenaam, "A") * 2 + 18;
                $timestamp = strtotime("next friday $time:00");
                break;

            case Categorie::Dames:
                $minutes = $this->substract($poulenaam, "A") * 10 + 30;
                $hours = $this->substract($poulenaam, "A") + 10;
                $hours += intdiv($minutes, 60);
                $minutes = $minutes % 60;
                $timestamp = strtotime("next saturday $hours:$minutes");
                break;

            default:
                throw new UnexpectedValueException();
        }

        $datetime = new DateTime();
        $datetime->setTimestamp($timestamp);
        return $datetime->format(DateTime::ISO8601);
    }

    private function substract(string $a, string $b): int
    {
        return ord($a) - ord($b);
    }
}
