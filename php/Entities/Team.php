<?php

namespace BeachPortal\Entities;

use BeachPortal\Common\Linq;
use Placeholders;

class Team implements IPlaceholder
{
    public ?int $id;
    public Categorie $categorie;
    public string $naam;
    public array $spelers = [];

    function __construct(?int $id, string $naam, Categorie $categorie)
    {
        $this->id = $id;
        $this->naam = $naam;
        $this->categorie = $categorie;
    }

    function GenerateEmails(string $titel, string $body): array
    {
        $emails = [];
        foreach ($this->spelers as $speler) {

            $newEmail = new CustomEmail($speler, $titel, $body, [$this, $speler]);
            if ($newEmail->IsValid()) {
                $emails[] = $newEmail;
            }
        }

        return $emails;
    }

    function GetPlaceholderValue(string $placeholder): ?string
    {
        switch ($placeholder) {
            case Placeholders::$Teams: {
                    $spelersnamen = Linq::From($this->spelers)->Select(function ($speler) {
                        return $speler->naam;
                    })->ToList();
                    return $this->naam . " (" . join(", ", $spelersnamen) . ")";
                }
            default:
                return null;
        }
    }
}
