<?php

namespace BeachPortal\Gateways;

use BeachPortal\Configuration;
use BeachPortal\Common\Database;
use BeachPortal\Common\DateFunctions;
use BeachPortal\Entities\Poule;
use BeachPortal\Entities\Speellocatie;
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
                P.id,
                P.naam,
                P.categorie,
                P.speeltijd,
                S.id as speellocatie_id,
                S.naam as speellocatie_naam
            FROM beach_poule P
            INNER JOIN beach_speellocatie S ON P.speellocatie_id = S.id
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
                P.id,
                P.naam,
                P.categorie,
                P.speeltijd,
                S.id as speellocatie_id,
                S.naam as speellocatie_naam
            FROM beach_poule P
            INNER JOIN beach_speellocatie S ON P.speellocatie_id = S.id
            WHERE P.id = ?";
        $params = [$id];
        $rows = $this->database->Execute($query, $params);
        $poules = $this->MapToPoules($rows);
        if (count($poules) == 0) {
            return null;
        }
        return $this->MapToPoules($rows)[0];
    }

    public function AddTeamToPoule(Poule $poule, Team $team): void
    {
        $query =
            "INSERT INTO 
            beach_poule_team_map (poule_id, team_id)
            VALUES (?, ?);";
        $params = [$poule->id, $team->id];
        $this->database->Execute($query, $params);
    }

    public function AddWedstrijdToPoule(Poule $poule, Wedstrijd $wedstrijd): void
    {
        $query =
            "INSERT INTO 
            beach_wedstrijd (poule_id, team1_id, team2_id)
            VALUES (?, ?, ?);";
        $params = [$poule->id, $wedstrijd->team1->id, $wedstrijd->team2->id];
        $this->database->Execute($query, $params);
    }

    public function UpdatePoule(Poule $poule): void
    {
        $query =
            "UPDATE beach_poule
            SET speeltijd = ?, 
                speellocatie_id = ?
            WHERE id = ?";
        $params = [
            DateFunctions::GetMySqlTimestamp($poule->speeltijd),
            $poule->speellocatie->id,
            $poule->id
        ];
        $this->database->Execute($query, $params);
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
                CategorieDb::MapToDomainModel($row->categorie),
                DateTime::createFromFormat('Y-m-d H:i:s', $row->speeltijd),
                new Speellocatie($row->speellocatie_id, $row->speellocatie_naam)
            );
        }
        return $poules;
    }
}
