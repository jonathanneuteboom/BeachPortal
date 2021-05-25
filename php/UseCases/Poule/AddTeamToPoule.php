<?php

namespace BeachPortal\UseCases;

use BeachPortal\Entities\Wedstrijd;
use BeachPortal\Gateways\PouleGateway;
use BeachPortal\Gateways\SpeelrondeGateway;
use BeachPortal\Gateways\TeamGateway;
use BeachPortal\Gateways\WedstrijdGateway;
use UnexpectedValueException;

class AddTeamToPoule implements Interactor
{
    function __construct(
        PouleGateway $pouleGateway,
        TeamGateway $teamGateway,
        WedstrijdGateway $wedstrijdGateway,
        SpeelrondeGateway $speelrondeGateway
    ) {
        $this->pouleGateway = $pouleGateway;
        $this->teamGateway = $teamGateway;
        $this->wedstrijdGateway = $wedstrijdGateway;
        $this->speelrondeGateway = $speelrondeGateway;
    }

    public function Execute(object $data = null)
    {
        $teamId = $data->teamId;
        $pouleId = $data->pouleId;

        $newTeam = $this->teamGateway->GetTeamById($teamId);
        if ($newTeam === null) return;

        $speelronde = $this->speelrondeGateway->GetCurrentSpeelronde();
        $poules = $this->pouleGateway->GetPoulesInSpeelronde($speelronde);
        foreach ($poules as $poule) {
            $teams = $this->teamGateway->GetTeamsInPoule($poule);
            if (array_search($newTeam->id, array_column($teams, 'id')) !== false) {
                $categorie = $poule->categorie->GetNaam();
                throw new UnexpectedValueException("Team zit al in poule $categorie $poule->naam");
            }
        }

        $poule = $this->pouleGateway->GetPouleById($pouleId);
        if (!$poule->categorie->Equals($newTeam->categorie)) {
            throw new UnexpectedValueException("Categorien zijn niet gelijk aan elkaar");
        }

        $teams = $this->teamGateway->GetTeamsInPoule($poule);
        foreach ($teams as $team) {
            $wedstrijdExists = $this->wedstrijdGateway->DoesWedstrijdExist($poule, $team, $newTeam);
            if ($wedstrijdExists) continue;

            $newWedstrijd = new Wedstrijd(null, $team, $newTeam);
            $this->wedstrijdGateway->AddWedstrijdToPoule($poule, $newWedstrijd);
        }

        $this->pouleGateway->AddTeamToPoule($poule, $newTeam);
    }
}
