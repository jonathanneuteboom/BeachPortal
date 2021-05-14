<?php

namespace BeachPortal\Entities;

use DateTime;

class Poule
{
    public ?int $id;
    public int $categorie;
    public string $naam;
    public string $speeltijd;
    public array $teams = [];
    public array $wedstrijden = [];
    public array $stand = [];

    function __construct(?int $id, string $naam, int $categorie, string $speeltijd)
    {
        $this->id = $id;
        $this->naam = $naam;
        $this->categorie = $categorie;
        $this->speeltijd = $speeltijd;
    }
}
