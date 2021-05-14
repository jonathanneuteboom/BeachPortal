<?php

namespace BeachPortal\UseCases;

use BeachPortal\Gateways\PouleGateway;
use BeachPortal\Gateways\TeamGateway;

class DeletePoule implements Interactor
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
        $id = $data->id;

        $poule = $this->pouleGateway->GetPouleById($id);
        if ($poule === null) {
            return;
        }

        $this->pouleGateway->DeletePoule($poule);
    }
}
