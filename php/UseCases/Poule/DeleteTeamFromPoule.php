<?php

namespace BeachPortal\UseCases;

use BeachPortal\Gateways\PouleGateway;
use BeachPortal\Gateways\TeamGateway;

class DeleteTeamFromPoule implements Interactor
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

        $team = $this->teamGateway->GetTeamById($teamId);
        if ($team === null) return;

        $poule = $this->pouleGateway->GetPouleById($pouleId);

        $this->pouleGateway->DeleteTeamFromPoule($poule, $team);
    }
}
