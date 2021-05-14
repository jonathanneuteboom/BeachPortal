<?php

namespace BeachPortal\UseCases;

use BeachPortal\Gateways\PouleGateway;
use BeachPortal\Gateways\SpeelrondeGateway;

class DeleteSpeelronde implements Interactor
{
    function __construct(
        SpeelrondeGateway $speelrondeGateway,
        PouleGateway $pouleGateway
    ) {
        $this->speelrondeGateway = $speelrondeGateway;
        $this->pouleGateway = $pouleGateway;
    }

    public function Execute(object $data = null)
    {
        
    }
}
