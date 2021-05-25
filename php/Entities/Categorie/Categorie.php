<?php

namespace BeachPortal\Entities;

use DateTime;
use UnexpectedValueException;

abstract class Categorie
{
    abstract public function GetNaam(): string;
    abstract public function GetStarttijd(): DateTime;

    static function GetCategorie(string $categorie): Categorie
    {
        switch ($categorie) {
            case "Heren":
                return new Heren();
            case "Dames":
                return new Dames();
            case "Mix":
                return new Mix();
        }

        throw new UnexpectedValueException("Categorie '$categorie' bestaat niet");
    }

    public function Equals(Categorie $categorie)
    {
        return $this->GetNaam() === $categorie->GetNaam();
    }
}
