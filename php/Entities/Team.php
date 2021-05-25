<?php

namespace BeachPortal\Entities;

class Team
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
}
