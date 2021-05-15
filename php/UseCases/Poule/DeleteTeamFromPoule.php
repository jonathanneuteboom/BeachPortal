<?php

namespace BeachPortal\UseCases;

use BeachPortal\Gateways\PouleGateway;
use BeachPortal\Gateways\TeamGateway;
use BeachPortal\Gateways\WedstrijdGateway;
use UnexpectedValueException;

class DeleteTeamFromPoule implements Interactor
{
    function __construct(
        PouleGateway $pouleGateway,
        TeamGateway $teamGateway,
        WedstrijdGateway $wedstrijdGateway
    ) {
        $this->pouleGateway = $pouleGateway;
        $this->teamGateway = $teamGateway;
        $this->wedstrijdGateway = $wedstrijdGateway;
    }

    public function Execute(object $data = null)
    {
        $teamId = $data->teamId;
        $pouleId = $data->pouleId;

        $team = $this->teamGateway->GetTeamById($teamId);
        if ($team === null) return;

        $poule = $this->pouleGateway->GetPouleById($pouleId);

        $wedstrijden = $this->wedstrijdGateway->GetWedstrijdenInPoule($poule);
        $wedstrijdenToBeDeleted = [];
        foreach ($wedstrijden as $wedstrijd) {
            if (
                $wedstrijd->team1->id === $team->id ||
                $wedstrijd->team2->id === $team->id
            ) {
                if ($wedstrijd->puntenTeam1 != 0 || $wedstrijd->puntenTeam2 != 0) {
                    throw new UnexpectedValueException("Kan team met gespeelde wedstrijden niet verwijderen");
                }
                $wedstrijdenToBeDeleted[] = $wedstrijd;
            }
        }

        foreach ($wedstrijdenToBeDeleted as $wedstrijd) {
            $this->wedstrijdGateway->DeleteWedstrijd($wedstrijd);
        }
        $this->pouleGateway->DeleteTeamFromPoule($poule, $team);
    }
}
