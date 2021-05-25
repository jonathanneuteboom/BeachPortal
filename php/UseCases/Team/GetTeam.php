<?php

namespace BeachPortal\UseCases;

use BeachPortal\Gateways\TeamGateway;
use UnexpectedValueException;

class GetTeam implements Interactor
{
    public function __construct(TeamGateway $teamGateway)
    {
        $this->teamGateway = $teamGateway;
    }

    public function Execute(object $data = null): object
    {
        $id = $data->id;
        if ($id === null || !is_numeric($id)) {
            throw new UnexpectedValueException("'$id' is geen integer");
        }

        $team = $this->teamGateway->GetTeamById($id);
        return new TeamModel($team);
    }
}
