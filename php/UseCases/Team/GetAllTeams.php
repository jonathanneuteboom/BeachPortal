<?php

namespace BeachPortal\UseCases;

use BeachPortal\Gateways\TeamGateway;

class GetAllTeams implements Interactor
{
    public function __construct(TeamGateway $teamGateway)
    {
        $this->teamGateway = $teamGateway;
    }

    public function Execute(object $data = null)
    {
        return $this->teamGateway->GetAllTeams();
    }
}
