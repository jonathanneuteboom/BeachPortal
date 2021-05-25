<?php

namespace BeachPortal\Entities;

use DateTime;

class Mix extends Categorie
{
    public function GetNaam(): string
    {
        return "Mix";
    }

    public function GetStarttijd(): DateTime
    {
        $timestamp = strtotime("next friday 18:00");
        $datetime = new DateTime();
        $datetime->setTimestamp($timestamp);
        return $datetime;
    }
}
