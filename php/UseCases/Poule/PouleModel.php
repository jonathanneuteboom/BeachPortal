<?php

namespace BeachPortal\UseCases;

use BeachPortal\Entities\Poule;

class PouleModel
{
    public int $id;
    public string $categorie;
    public string $naam;
    public string $speeltijd;
    public array $teams = [];
    public array $wedstrijden = [];
    public array $stand = [];
    public SpeellocatieModel $speellocatie;

    function __construct(Poule $poule)
    {
        $this->id = $poule->id;
        $this->categorie = $poule->categorie->GetNaam();
        $this->naam = $poule->naam;
        $this->speeltijd = $poule->speeltijd->format('c');
        $this->speellocatie = new SpeellocatieModel($poule->speellocatie);

        foreach ($poule->teams as $team) {
            $this->teams[] = new TeamModel($team);
        }

        foreach ($poule->wedstrijden as $wedstrijd) {
            $this->wedstrijden[] = new WedstrijdModel($wedstrijd);
        }

        foreach ($poule->stand as $standItem) {
            $this->stand[] = new StandItemModel($standItem);
        }
    }
}
