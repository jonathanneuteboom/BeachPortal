<?php

namespace BeachPortal\UseCases;

use BeachPortal\Entities\Team;
use BeachPortal\UseCases\SpelerModel;

class TeamModel
{
    public int $id;
    public string $categorie;
    public string $naam;
    public array $spelers = [];

    function __construct(Team $team)
    {
        $this->id = $team->id;
        $this->naam = $team->naam;
        $this->categorie = $team->categorie->GetNaam();

        foreach ($team->spelers as $speler) {
            $this->spelers[] = new SpelerModel($speler);
        }
    }
}
