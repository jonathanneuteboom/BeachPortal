<?php

namespace BeachPortal\Entities;

use DateTime;

class Poule
{
    public ?int $id;
    public Categorie $categorie;
    public string $naam;
    public DateTime $speeltijd;
    public array $teams = [];
    public array $wedstrijden = [];
    public array $stand = [];

    function __construct(?int $id, string $naam, Categorie $categorie, DateTime $speeltijd)
    {
        $this->id = $id;
        $this->naam = $naam;
        $this->categorie = $categorie;
        $this->speeltijd = $speeltijd;
    }
}
