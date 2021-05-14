<?php

namespace BeachPortal\Gateways;

use BeachPortal\Configuration;
use BeachPortal\Common\Database;
use BeachPortal\Entities\Poule;
use BeachPortal\Entities\Speler;
use BeachPortal\Entities\Team;
use UnexpectedValueException;

class TeamGateway
{
    public function __construct(
        Configuration $configuration,
        Database $database
    ) {
        $this->configuration = $configuration;
        $this->database = $database;
    }

    public function GetAllTeams(): array
    {
        $query = "
            SELECT 
                T.id as teamId,
                T.naam as teamnaam,
                T.categorie,
                U.id as spelerId,
                U.name as spelersnaam
            FROM beach_team T
            LEFT JOIN beach_team_speler_map M ON T.id = M.team_id
            LEFT JOIN J3_users U ON U.id = M.speler_id
            ORDER BY T.naam";
        $rows = $this->database->Execute($query);
        return $this->MapToTeams($rows);
    }

    public function GetTeamById(int $id): Team
    {
        $query = "
            SELECT
                T.id as teamId,
                T.naam as teamnaam,
                T.categorie,
                U.id as spelerId,
                U.name as spelersnaam
            FROM beach_team T
            LEFT JOIN beach_team_speler_map M ON T.id = M.team_id
            LEFT JOIN J3_users U ON U.id = M.speler_id
            WHERE T.id = ?";
        $params = [$id];
        $rows = $this->database->Execute($query, $params);
        $teams = $this->MapToTeams($rows);
        if (count($teams) == 0) {
            throw new UnexpectedValueException("Team met id '$id' bestaat niet");
        }

        return $teams[0];
    }

    public function GetTeamsInPoule(Poule $poule): array
    {
        $query = "
            SELECT 
                T.id AS teamId,
                T.naam AS teamnaam,
                T.categorie,
                U.id AS spelerId,
                U.name AS spelersnaam
            FROM beach_poule_team_map TM
            INNER JOIN beach_team T ON TM.team_id = T.id
            LEFT JOIN beach_team_speler_map SM ON T.id = SM.team_id
            LEFT JOIN J3_users U ON U.id = SM.speler_id
            WHERE TM.poule_id = ?
            ORDER BY teamnaam";
        $params = [$poule->id];
        $rows = $this->database->Execute($query, $params);
        return $this->MapToTeams($rows);
    }

    public function AddTeam(Team $team): int
    {
        $query = "
            INSERT INTO 
            beach_team (categorie, naam)
            VALUES (?, ?);";
        $params = [$team->categorie, $team->naam];
        $this->database->Execute($query, $params);
        return $this->database->GetLastInsertedId();
    }

    public function UpdateTeam(Team $team): void
    {
        $query = "
            UPDATE 
            beach_team
            SET
                categorie = ?,
                naam = ?
            WHERE id = ?";
        $params = [$team->categorie, $team->naam, $team->id];
        $this->database->Execute($query, $params);
    }

    public function DeleteTeam(Team $team): void
    {
        $query = "
            DELETE FROM 
            beach_team
            WHERE id = ?";
        $params = [$team->id];
        $this->database->Execute($query, $params);
    }

    public function DeleteSpelers(Team $team)
    {
        $query = "
            DELETE FROM beach_team_speler_map
            WHERE team_id = ?";
        $params = [$team->id];
        $this->database->Execute($query, $params);
    }

    public function AddSpeler(Team $team, Speler $speler): int
    {
        $query = "
            INSERT INTO 
            beach_team_speler_map(team_id, speler_id)
            VALUES (?, ?)";
        $params = [$team->id, $speler->id];
        $this->database->Execute($query, $params);
        return $this->database->GetLastInsertedId();
    }

    private function MapToTeams(array $rows): array
    {
        $teams = [];
        $currentTeamId = null;
        foreach ($rows as $row) {
            if ($currentTeamId != $row->teamId) {
                $newTeam = new Team($row->teamId, $row->teamnaam, $row->categorie);
                $currentTeamId = $newTeam->id;
                $teams[] = $newTeam;
            }
            $i = count($teams) - 1;
            if ($row->spelerId === null) continue;

            $speler = new Speler($row->spelerId, $row->spelersnaam);
            $teams[$i]->spelers[] = $speler;
        }
        return $teams;
    }
}
