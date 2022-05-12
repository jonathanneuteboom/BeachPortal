<?php

namespace BeachPortal\Entities;

use BeachPortal\Common\DateFunctions;
use BeachPortal\Common\Linq;
use DateTime;
use Placeholders;

class Poule implements IPlaceholder
{
    public ?int $id;
    public Categorie $categorie;
    public string $naam;
    public DateTime $speeltijd;
    public array $teams = [];
    public array $wedstrijden = [];
    public array $stand = [];

    function __construct(?int $id, string $naam, Categorie $categorie, DateTime $speeltijd, Speellocatie $speellocatie)
    {
        $this->id = $id;
        $this->naam = $naam;
        $this->categorie = $categorie;
        $this->speeltijd = $speeltijd;
        $this->speellocatie = $speellocatie;
    }

    function GenerateEmails(string $titel, string $body): array
    {
        $emails = [];
        foreach ($this->teams as $team) {
            foreach ($team->spelers as $speler) {
                $emails[] = new CustomEmail($speler, $titel, $body, [$this, $speler]);
            }
        }

        return $emails;
    }

    function GetPlaceholderValue(string $placeholder): ?string
    {
        switch ($placeholder) {
            case Placeholders::$Datum:
                return DateFunctions::GetDutchDateLong($this->speeltijd);
            case Placeholders::$Tijd:
                return DateFunctions::GetTime($this->speeltijd);
            case Placeholders::$Poule:
                return $this->categorie->GetNaam() . " " . $this->naam;
            case Placeholders::$Teams: {
                    $teams = Linq::From($this->teams)->Select(function ($team) {
                        return $team->GetPlaceholderValue(Placeholders::$Teams);
                    })->ToList();
                    return join("\r\n", $teams);
                }
            case Placeholders::$Locatie:
                return $this->speellocatie->naam;
            default:
                return null;
        }
    }

    function GetFullName()
    {
        return $this->categorie->GetNaam() . " " . $this->naam;
    }
}
