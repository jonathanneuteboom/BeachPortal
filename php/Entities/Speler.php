<?php

namespace BeachPortal\Entities;

use Placeholders;

class Speler implements IPlaceholder
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

    function GetPlaceholderValue(string $placeholder): ?string
    {
        switch ($placeholder) {
            case Placeholders::$Naam:
                return $this->naam;
            default:
                return null;
        }
    }

    function Equals(Speler $speler)
    {
        return $this->id === $speler->id;
    }
}
