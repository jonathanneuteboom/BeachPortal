<?php

namespace BeachPortal\Entities;

use DateTime;

class Heren extends Categorie
{
    public function GetNaam(): string
    {
        return "Heren";
    }

    public function GetStarttijd(): DateTime
    {
        $timestamp = strtotime("next friday 17:00");
        $datetime = new DateTime();
        $datetime->setTimestamp($timestamp);
        return $datetime;
    }
}
