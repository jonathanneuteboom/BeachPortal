<?php

namespace BeachPortal\Entities;

use DateTime;

class Poule
{
    public int $id;
    public Categorie $categorie;
    public string $naam;
    public DateTime $speeltijd;
    public array $teams = [];
    public array $wedstrijden = [];
    public array $stand = [];
}
