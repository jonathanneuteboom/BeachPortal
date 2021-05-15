<?php

namespace BeachPortal\UseCases;

use BeachPortal\Gateways\PouleGateway;
use BeachPortal\Gateways\SpeelrondeGateway;
use BeachPortal\Gateways\TeamGateway;
use UnexpectedValueException;

class DeleteTeam implements Interactor
{
    function __construct(
        TeamGateway $teamGateway,
        SpeelrondeGateway $speelrondeGateway,
        PouleGateway $pouleGateway
    ) {
        $this->teamGateway = $teamGateway;
        $this->speelrondeGateway = $speelrondeGateway;
        $this->pouleGateway = $pouleGateway;
    }

    public function Execute(object $data = null)
    {
        $id = $data->id;

        if (empty($id)) {
            throw new UnexpectedValueException("Teamnaam is leeg");
        }

        $teamToBeDeleted = $this->teamGateway->GetTeamById($id);
        if ($teamToBeDeleted === null) {
            throw new UnexpectedValueException("Team met id '$id' bestaat niet");
        }

        $speelrondes = $this->speelrondeGateway->GetAllSpeelrondes();
        foreach ($speelrondes as $speelronde) {
            $poules = $this->pouleGateway->GetPoulesInSpeelronde($speelronde);
            foreach ($poules as $poule) {
                $teams = $this->teamGateway->GetTeamsInPoule($poule);
                foreach ($teams as $team) {
                    if ($team->id === $teamToBeDeleted->id) {
                        throw new UnexpectedValueException("Kan team niet weggooien. Team zit nog in een speelronde");
                    }
                }
            }
        }

        $this->teamGateway->DeleteSpelersFromTeam($teamToBeDeleted);
        $this->teamGateway->DeleteTeam($teamToBeDeleted);
    }
}
