<?php

namespace BeachPortal\Entities;

class Speler
{
    public int $id;
    public string $naam;
    public string $email;

    function __construct(int $id, string $naam, string $email)
    {
        $this->id = $id;
        $this->naam = $naam;
        $this->email = $email;
    }
}
