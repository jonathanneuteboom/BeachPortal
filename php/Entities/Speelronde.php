<?php

namespace BeachPortal\Entities;

class Speelronde
{
    public ?int $id;
    public int $nummer;
    public array $poules = [];

    function __construct(?int $id, int $nummer)
    {
        $this->id = $id;
        $this->nummer = $nummer;
    }
}
