<?php

namespace BeachPortal\Entities;

use BeachPortal\Common\DateFunctions;
use BeachPortal\Common\Utilities;

class ProgrammaEmail extends Email
{
    function __construct(Speler $speler, Poule $poule)
    {
        $datum = DateFunctions::GetDutchDateLong($poule->speeltijd);
        $naam = $speler->naam;
        $tijd = DateFunctions::GetTime($poule->speeltijd);
        $poulenaam = $poule->categorie->GetNaam() . " " . $poule->naam;
        $teams = "";

        foreach ($poule->teams as $team) {
            $teams .= "$team->naam (";
            $teams .= implode(", ", array_column($team->spelers, "naam"));
            $teams .= ")<br>";
        }
        $afzender = "De Beachcie";

        $template = file_get_contents("./Entities/Email/templates/programmaTemplate.txt");
        $placeholders = [
            "{{NAAM}}" => $naam,
            "{{DATUM}}" => $datum,
            "{{POULE}}" => $poulenaam,
            "{{TIJD}}" => $tijd,
            "{{TEAMS}}" => $teams,
            "{{AFZENDER}}" => $afzender
        ];

        $this->titel = "Beachprogramma " . $datum;
        $this->body = Utilities::FillTemplate($template, $placeholders);
        $this->receiver = $speler;
    }
}
