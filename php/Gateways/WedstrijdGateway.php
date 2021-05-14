<?php

namespace BeachPortal\Gateways;

use BeachPortal\Configuration;
use BeachPortal\Common\Database;
use BeachPortal\Entities\Poule;
use BeachPortal\Entities\Team;
use BeachPortal\Entities\Wedstrijd;

class WedstrijdGateway
{
    public function __construct(
        Configuration $configuration,
        Database $database
    ) {
        $this->configuration = $configuration;
        $this->database = $database;
    }

    public function GetWedstrijdenInPoule(Poule $poule): array
    {
        return [];
        $query = "";
        $rows = $this->database->Execute($query);
        return $this->MapToWedstrijden($rows);
    }

    public function GetStandOfPoule(Poule $poule)
    {
    }

    public function AddWedstrijd(Poule $poule, Wedstrijd $wedstrijd)
    {
        $query = "
            INSERT INTO 
            beach_wedstrijd(poule_id, team1_id, team2_id)
            VALUES (?, ?, ?)";
        $params = [
            $poule->id,
            $wedstrijd->team1->id,
            $wedstrijd->team2->id
        ];
        $this->database->Execute($query, $params);
    }

    public function DoesWedstrijdExist(Poule $poule, Team $team1, Team $team2): bool
    {
        $query = "
            SELECT * 
            FROM beach_wedstrijd 
            WHERE poule_id = ? AND 
                (
                    (team1_id = ? AND team2_id = ?) OR 
                    (team2_id = ? AND team1_id = ?)
                )";
        $params = [
            $poule->id,
            $team1->id,
            $team2->id,
            $team1->id,
            $team2->id,
        ];
        $rows = $this->database->Execute($query, $params);
        return count($rows) > 0;
    }

    private function MapToWedstrijden(array $rows): array
    {
        $poules = [];
        foreach ($rows as $row) {
        }
        return $poules;
    }
}
