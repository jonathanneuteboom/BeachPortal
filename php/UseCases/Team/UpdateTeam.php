<?php

namespace BeachPortal\UseCases;

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
        $categorie = $data->categorie;
        $spelers = $data->spelers;

        if (empty($naam)) {
            throw new UnexpectedValueException("Teamnaam is leeg");
        }

        if ($categorie === null) {
            throw new UnexpectedValueException("Vul categorie in");
        }

        $newSpelers = [];
        foreach ($spelers as $speler) {
            if (!empty($speler['id'])) {
                $newSpelers[] = $this->userGateway->GetUser($speler['id']);
            }
        }

        if ($id === null) {
            $team = new Team($id, $naam, $categorie);
            $team->id = $this->teamGateway->AddTeam($team);
        } else {
            $team = $this->teamGateway->GetTeamById($id);
            $team->categorie = $categorie;
            $team->naam = $naam;
            $this->teamGateway->UpdateTeam($team);
            $this->teamGateway->DeleteSpelers($team);
        }

        foreach ($newSpelers as $newSpeler) {
            $this->teamGateway->AddSpeler($team, $newSpeler);
        }
    }
}
