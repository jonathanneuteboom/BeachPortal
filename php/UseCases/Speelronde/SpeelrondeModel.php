<?php

namespace BeachPortal\UseCases;

use BeachPortal\Entities\Speelronde;

class SpeelrondeModel
{
    public int $id;
    public int $nummer;
    public array $poules = [];

    function __construct(Speelronde $speelronde)
    {
        $this->id = $speelronde->id;
        $this->nummer = $speelronde->nummer;

        foreach ($speelronde->poules as $poule) {
            $this->poules[] = new PouleModel($poule);
        }
    }
}
