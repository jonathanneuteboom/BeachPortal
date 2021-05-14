<?php

namespace BeachPortal\UseCases;

use BeachPortal\Gateways\TeamGateway;
use UnexpectedValueException;

class DeleteTeam implements Interactor
{
    function __construct(TeamGateway $teamGateway)
    {
        $this->teamGateway = $teamGateway;
    }

    public function Execute(object $data = null)
    {
        $id = $data->id;

        if (empty($id)) {
            throw new UnexpectedValueException("Teamnaam is leeg");
        }

        $team = $this->teamGateway->GetTeamById($id);
        if ($team === null) {
            throw new UnexpectedValueException("Team met id '$id' bestaat niet");
        }

        $this->teamGateway->DeleteSpelers($team);
        $this->teamGateway->DeleteTeam($team);
    }
}
