<?php

namespace BeachPortal\Entities;

class Speler
{
    public int $id;
    public string $naam;

    function __construct(int $id, string $naam)
    {
        $this->id = $id;
        $this->naam = $naam;
    }
}
