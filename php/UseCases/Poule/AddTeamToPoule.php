<?php

namespace BeachPortal\UseCases;

use BeachPortal\Entities\Wedstrijd;
use BeachPortal\Gateways\PouleGateway;
use BeachPortal\Gateways\TeamGateway;

class AddTeamToPoule implements Interactor
{
    function __construct(
        PouleGateway $pouleGateway,
        TeamGateway $teamGateway
    ) {
        $this->pouleGateway = $pouleGateway;
        $this->teamGateway = $teamGateway;
    }

    public function Execute(object $data = null)
    {
        $teamId = $data->teamId;
        $pouleId = $data->pouleId;

        $newTeam = $this->teamGateway->GetTeamById($teamId);
        if ($newTeam === null) return;

        $poule = $this->pouleGateway->GetPouleById($pouleId);
        $teams = $this->teamGateway->GetTeamsInPoule($poule);

        $this->pouleGateway->AddTeamToPoule($poule, $newTeam);

        foreach ($teams as $team) {
            $wedstrijdExists = $this->wedstrijdGateway->DoesWedstrijdExist($poule, $team, $newTeam);
            if ($wedstrijdExists) continue;

            $newWedstrijd = new Wedstrijd(null, $team, $newTeam);
            $this->wedstrijdGateway->AddWedstrijd($newWedstrijd);
        }
    }
}
