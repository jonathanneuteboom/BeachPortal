<?php

namespace BeachPortal\Entities;

use DateTime;

class Dames extends Categorie
{
    public function GetNaam(): string
    {
        return "Dames";
    }

    public function GetStarttijd(): DateTime
    {
        $timestamp = strtotime("next saturday 10:30");
        $datetime = new DateTime();
        $datetime->setTimestamp($timestamp);
        return $datetime;
    }
}
