<?php

namespace BeachPortal\Gateways;

use BeachPortal\Configuration;
use BeachPortal\Common\Database;
use BeachPortal\Entities\Poule;
use BeachPortal\Entities\Speelronde;

class SpeelrondeGateway
{
    public function __construct(
        Configuration $configuration,
        Database $database
    ) {
        $this->configuration = $configuration;
        $this->database = $database;
    }

    function GetCurrentSpeelronde(): ?Speelronde
    {
        $query = "
            SELECT * 
            FROM beach_speelronde 
            ORDER BY nummer DESC
            limit 1";
        $rows = $this->database->Execute($query);
        if (count($rows) === 0) {
            return null;
        }
        return new Speelronde($rows[0]->id, $rows[0]->nummer);
    }

    function AddSpeelronde(Speelronde $speelronde): int
    {
        $query = "
            INSERT INTO beach_speelronde (nummer)
            VALUES (?)";
        $params = [$speelronde->nummer];
        $this->database->Execute($query, $params);
        return $this->database->GetLastInsertedId();
    }

    function AddPouleToSpeelronde(Speelronde $speelronde, Poule $poule): int
    {
        $query = "
            INSERT INTO beach_poule (speelronde_id, categorie, naam, speeltijd)
            VALUES (?, ?, ?, ?)";
        $params = [
            $speelronde->id,
            $poule->categorie,
            $poule->naam,
            $poule->speeltijd
        ];
        $this->database->Execute($query, $params);
        return $this->database->GetLastInsertedId();
    }

    function DeleteSpeelronde(Speelronde $speelronde): void
    {
        $query = "
            DELETE FROM beach_speelronde
            WHERE id = ?";
        $params = [$speelronde->id];
        $this->database->Execute($query, $params);
    }
}
