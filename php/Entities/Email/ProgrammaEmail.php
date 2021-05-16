<?php

namespace BeachPortal\Entities;

use BeachPortal\Common\DateFunctions;
use BeachPortal\Common\Utilities;
use DateTime;

class ProgrammaEmail extends Email
{
    function __construct(Speler $speler, Poule $poule)
    {
        $date = DateTime::createFromFormat("Y-m-d H:i:s", $poule->speeltijd);
        $datum = DateFunctions::GetDutchDateLong($date);
        $naam = $speler->naam;
        $tijd = DateFunctions::GetTime($date);
        $poulenaam = Categorie::GetCategorieText($poule->categorie) . " " . $poule->naam;
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
