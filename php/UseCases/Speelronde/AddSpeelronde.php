<?php

namespace BeachPortal\UseCases;

use BeachPortal\Entities\Speelronde;
use BeachPortal\Gateways\PouleGateway;
use BeachPortal\Gateways\SpeelrondeGateway;

class AddSpeelronde implements Interactor
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
        $speelronde = $this->speelrondeGateway->GetCurrentSpeelronde();
        if ($speelronde === null) {
            $newSpeelronde = new Speelronde(null, 1);
            $this->speelrondeGateway->AddSpeelronde($newSpeelronde);
            return;
        }
    }
}
