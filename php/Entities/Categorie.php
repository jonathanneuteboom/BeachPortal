<?php

namespace BeachPortal\Entities;

use UnexpectedValueException;

class Categorie
{
    const Heren = 0;
    const Dames = 1;
    const Mix = 2;

    static function GetCategorieText(int $categorie): string
    {
        switch ($categorie) {
            case Categorie::Heren:
                return "Heren";
            case Categorie::Dames:
                return "Dames";
            case Categorie::Mix:
                return "Mix";
        }

        throw new UnexpectedValueException("Categorie $categorie bestaat niet");
    }
}
