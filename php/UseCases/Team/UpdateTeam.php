<?php

namespace BeachPortal\UseCases;

use BeachPortal\Entities\Categorie;
use BeachPortal\Entities\Team;
use BeachPortal\Gateways\TeamGateway;
use BeachPortal\Gateways\UserGateway;
use UnexpectedValueException;

class UpdateTeam implements Interactor
{
    function __construct(UserGateway $userGateway, TeamGateway $teamGateway)
    {
        $this->userGateway = $userGateway;
        $this->teamGateway = $teamGateway;
    }

    public function Execute(object $data = null)
    {
        $id = $data->id;
        $naam = $data->naam;

        if ($data->categorie === null) {
            throw new UnexpectedValueException("Vul categorie in");
        }

        $categorie = Categorie::GetCategorie($data->categorie);
        $spelers = $data->spelers;

        if (empty($naam)) {
            throw new UnexpectedValueException("Teamnaam is leeg");
        }

        $newSpelers = [];
        foreach ($spelers as $speler) {
            if (!empty($speler['id'])) {
                $newSpelers[] = $this->userGateway->GetUser($speler['id']);
            }
        }

        if (count($newSpelers) === 0) {
            throw new UnexpectedValueException("Team moet minstens 1 speler hebben");
        }

        if ($id === null) {
            $team = new Team($id, $naam, $categorie);
            $team->id = $this->teamGateway->AddTeam($team);
        } else {
            $team = $this->teamGateway->GetTeamById($id);
            $team->categorie = $categorie;
            $team->naam = $naam;
            $this->teamGateway->UpdateTeam($team);
            $this->teamGateway->DeleteSpelersFromTeam($team);
        }

        foreach ($newSpelers as $newSpeler) {
            $this->teamGateway->AddSpelerToTeam($team, $newSpeler);
        }
    }
}
