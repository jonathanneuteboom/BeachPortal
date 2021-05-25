<?php

namespace BeachPortal\UseCases;

use BeachPortal\Entities\Speler;

class SpelerModel
{
    public int $id;
    public string $naam;

    function __construct(Speler $speler)
    {
        $this->id = $speler->id;
        $this->naam = $speler->naam;
    }
}
