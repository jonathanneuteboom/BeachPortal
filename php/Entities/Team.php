<?php

namespace BeachPortal\Entities;

class Team
{
    public int $id;
    public Categorie $categorie;
    public string $naam;
    public array $spelers = [];
}
