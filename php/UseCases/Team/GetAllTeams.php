<?php

namespace BeachPortal\UseCases;

use BeachPortal\Common\Linq;
use BeachPortal\Gateways\TeamGateway;

class GetAllTeams implements Interactor
{
    public function __construct(TeamGateway $teamGateway)
    {
        $this->teamGateway = $teamGateway;
    }

    public function Execute(object $data = null): array
    {
        $teams = $this->teamGateway->GetAllTeams();
        return Linq::From($teams)->Select(function ($team) {
            return new TeamModel($team);
        })->ToList();
    }
}
