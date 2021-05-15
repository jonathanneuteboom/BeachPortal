<?php

namespace BeachPortal\Gateways;

use BeachPortal\Configuration;
use BeachPortal\Common\Database;
use BeachPortal\Entities\Poule;
use BeachPortal\Entities\Speelronde;
use BeachPortal\Entities\Team;
use BeachPortal\Entities\Wedstrijd;
use DateTime;

class PouleGateway
{
    public function __construct(
        Configuration $configuration,
        Database $database
    ) {
        $this->configuration = $configuration;
        $this->database = $database;
    }

    public function GetPoulesInSpeelronde(Speelronde $speelronde): array
    {
        $query = 
            "SELECT 
                id,
                naam,
                categorie,
                speeltijd
            FROM beach_poule
            WHERE speelronde_id = ?
            ORDER BY categorie, naam, speeltijd";
        $params = [$speelronde->id];
        $rows = $this->database->Execute($query, $params);
        return $this->MapToPoules($rows);
    }

    public function GetPouleById(int $id)
    {
        $query = 
            "SELECT 
                id,
                naam,
                categorie,
                speeltijd
            FROM beach_poule
            WHERE id = ?";
        $params = [$id];
        $rows = $this->database->Execute($query, $params);
        $poules = $this->MapToPoules($rows);
        if (count($poules) == 0) {
            return null;
        }
        return $poules[0];
    }

    public function AddPoule(Poule $poule): int
    {
        $query = 
            "INSERT INTO 
            beach_poule (naam, categorie, speeltijd)
            VALUES (?, ?, ?);";
        $params = [$poule->naam, $poule->categorie, $poule->speeltijd];
        $this->database->Execute($query, $params);
        return $this->database->GetLastInsertedId();
    }

    public function AddTeamToPoule(Poule $poule, Team $team)
    {
        $query = 
            "INSERT INTO 
            beach_poule_team_map (poule_id, team_id)
            VALUES (?, ?);";
        $params = [$poule->id, $team->id];
        $this->database->Execute($query, $params);
        return $this->database->GetLastInsertedId();
    }

    public function AddWedstrijdToPoule(Poule $poule, Wedstrijd $wedstrijd): int
    {
        $query = 
            "INSERT INTO 
            beach_wedstrijd (poule_id, team1_id, team2_id)
            VALUES (?, ?, ?);";
        $params = [$poule->id, $wedstrijd->team1->id, $wedstrijd->team2->id];
        $this->database->Execute($query, $params);
        return $this->database->GetLastInsertedId();
    }

    public function DeleteTeamFromPoule(Poule $poule, Team $team): void
    {
        $query = 
            "DELETE FROM 
            beach_poule_team_map
            WHERE poule_id = ? and team_id = ?";
        $params = [$poule->id, $team->id];
        $this->database->Execute($query, $params);
    }

    public function DeletePoule(Poule $poule): void
    {
        $query = 
            "DELETE FROM 
            beach_poule
            WHERE id = ?";
        $params = [$poule->id];
        $this->database->Execute($query, $params);
    }

    private function MapToPoules(array $rows): array
    {
        $poules = [];
        foreach ($rows as $row) {
            $poules[] = new Poule(
                $row->id,
                $row->naam,
                $row->categorie,
                $row->speeltijd
            );
        }
        return $poules;
    }
}
