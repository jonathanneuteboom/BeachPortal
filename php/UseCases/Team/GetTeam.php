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

    public function Execute(object $data = null)
    {
        $id = $data->id;
        if ($id === null || !is_numeric($id)) {
            throw new UnexpectedValueException("'$id' is geen integer");
        }

        return $this->teamGateway->GetTeamById($id);
    }
}
