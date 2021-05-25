<?php

namespace BeachPortal\Gateways;

use BeachPortal\Entities\Categorie;
use BeachPortal\Entities\Dames;
use BeachPortal\Entities\Heren;
use BeachPortal\Entities\Mix;
use UnexpectedValueException;

class CategorieDb
{
    static function MapToDomainModel(int $categorie): Categorie
    {
        switch ($categorie) {
            case 0:
                return new Heren();
            case 1:
                return new Dames();
            case 2:
                return new Mix();
        }

        throw new UnexpectedValueException("Categorie '$categorie' bestaat niet");
    }

    static function MapFromDomainModel(Categorie $categorie): int
    {
        switch ($categorie->GetNaam()) {
            case "Heren":
                return 0;
            case "Dames":
                return 1;
            case "Mix":
                return 2;
        }

        throw new UnexpectedValueException("Categorie '$categorie' bestaat niet");
    }
}
