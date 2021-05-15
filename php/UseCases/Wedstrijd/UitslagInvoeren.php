<?php

namespace BeachPortal\UseCases;

use BeachPortal\Gateways\WedstrijdGateway;

class UitslagInvoeren implements Interactor
{
    function __construct(WedstrijdGateway $wedstrijdGateway)
    {
        $this->wedstrijdGateway = $wedstrijdGateway;
    }

    public function Execute(object $data = null)
    {
        $wedstrijdId = $data->id;
        $puntenTeam1 = $data->puntenTeam1;
        $puntenTeam2 = $data->puntenTeam2;

        $wedstrijd = $this->wedstrijdGateway->GetWedstrijdById($wedstrijdId);
        $wedstrijd->puntenTeam1 = $puntenTeam1;
        $wedstrijd->puntenTeam2 = $puntenTeam2;

        $this->wedstrijdGateway->UpdateWedstrijd($wedstrijd);
    }
}
