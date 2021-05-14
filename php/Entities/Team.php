<?php

namespace BeachPortal\Entities;

class Team
{
    public ?int $id;
    public int $categorie;
    public string $naam;
    public array $spelers = [];

    function __construct(?int $id, string $naam, int $categorie)
    {
        $this->id = $id;
        $this->naam = $naam;
        $this->categorie = $categorie;
    }
}
