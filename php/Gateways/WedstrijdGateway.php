<?php

namespace BeachPortal\Gateways;

use BeachPortal\Configuration;
use BeachPortal\Common\Database;
use BeachPortal\Entities\Poule;
use BeachPortal\Entities\Speler;
use BeachPortal\Entities\StandItem;
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

    public function GetWedstrijdById(int $id): Wedstrijd
    {
        $query =
            "SELECT 
                W.id AS idWedstrijd,
                W.punten_team1 as puntenTeam1,
                W.punten_team2 as puntenTeam2,

                T1.id AS idTeam1,
                T1.naam AS naamTeam1,
                T1.categorie AS categorieTeam1,
                U1.id AS idSpelerTeam1, 
                U1.name AS naamSpelerTeam1,
                
                T2.id AS idTeam2,
                T2.naam AS naamTeam2,
                T2.categorie AS categorieTeam2,
                U2.id AS idSpelerTeam2,
                U2.name AS naamSpelerTeam2
            FROM beach_wedstrijd W
            INNER JOIN beach_team T1 ON W.team1_id = T1.id
            LEFT JOIN beach_team_speler_map M1 ON W.team1_id = M1.team_id
            LEFT JOIN J3_users U1 ON M1.speler_id = U1.id
            
            INNER JOIN beach_team T2 ON W.team2_id = T2.id
            LEFT JOIN beach_team_speler_map M2 ON W.team2_id = M2.team_id
            LEFT JOIN J3_users U2 ON M2.speler_id = U2.id
            WHERE W.id = ?
            ORDER BY T1.naam, T2.naam";
        $params = [$id];
        $rows = $this->database->Execute($query, $params);
        $wedstrijden = $this->MapToWedstrijden($rows);
        return $wedstrijden[0];
    }

    public function GetWedstrijdenInPoule(Poule $poule): array
    {
        $query =
            "SELECT 
                W.id AS idWedstrijd,
                W.punten_team1 as puntenTeam1,
                W.punten_team2 as puntenTeam2,

                T1.id AS idTeam1,
                T1.naam AS naamTeam1,
                T1.categorie AS categorieTeam1,
                U1.id AS idSpelerTeam1, 
                U1.name AS naamSpelerTeam1,
                
                T2.id AS idTeam2,
                T2.naam AS naamTeam2,
                T2.categorie AS categorieTeam2,
                U2.id AS idSpelerTeam2,
                U2.name AS naamSpelerTeam2
            FROM beach_wedstrijd W
            INNER JOIN beach_team T1 ON W.team1_id = T1.id
            LEFT JOIN beach_team_speler_map M1 ON W.team1_id = M1.team_id
            LEFT JOIN J3_users U1 ON M1.speler_id = U1.id
            
            INNER JOIN beach_team T2 ON W.team2_id = T2.id
            LEFT JOIN beach_team_speler_map M2 ON W.team2_id = M2.team_id
            LEFT JOIN J3_users U2 ON M2.speler_id = U2.id
            WHERE W.poule_id = ?
            ORDER BY T1.naam, T2.naam";
        $params = [$poule->id];
        $rows = $this->database->Execute($query, $params);
        return $this->MapToWedstrijden($rows);
    }

    public function GetStandOfPoule(Poule $poule): array
    {
        $query =
            "SELECT 
                id,
                naam,
                categorie,
                SUM(puntenVoor) AS puntenVoor,
                SUM(puntenTegen) AS puntenTegen,
                SUM(isWedstrijdGewonnen) AS gewonnenWedstrijden,
                SUM(puntenVoor) / SUM(puntenTegen) AS quotient
            FROM (
                SELECT 
                    T.id,
                    T.naam, 
                    T.categorie,
                    punten_team1 AS puntenVoor,
                    punten_team2 AS puntenTegen,
                    case when punten_team1 > punten_team2 then 1 ELSE 0 END AS isWedstrijdGewonnen
                FROM beach_wedstrijd W
                INNER JOIN beach_team T ON W.team1_id = T.id
                WHERE W.poule_id = ?
                
                UNION 
                
                SELECT 
                    T.id,
                    T.naam, 
                    T.categorie,
                    punten_team2 AS puntenVoor,
                    punten_team1 AS puntenTegen,
                    case when punten_team2 > punten_team1 then 1 ELSE 0 END AS gewonnenWedstrijden
                FROM beach_wedstrijd W
                INNER JOIN beach_team T ON W.team2_id = T.id
                WHERE W.poule_id = ?
            ) AS stand
            GROUP BY id
            ORDER BY 
                gewonnenWedstrijden DESC,
                quotient DESC,
                naam";
        $params = [$poule->id, $poule->id];
        $rows = $this->database->Execute($query, $params);
        $stand = [];
        foreach ($rows as $row) {
            $team = new Team($row->id, $row->naam, $row->categorie);
            $stand[] = new StandItem(
                $team,
                $row->gewonnenWedstrijden,
                $row->puntenVoor,
                $row->puntenTegen,
                $row->quotient ?? 0
            );
        }
        return $stand;
    }

    public function AddWedstrijdToPoule(Poule $poule, Wedstrijd $wedstrijd)
    {
        $query =
            "INSERT INTO 
            beach_wedstrijd(poule_id, team1_id, team2_id)
            VALUES (?, ?, ?)";
        $params = [
            $poule->id,
            $wedstrijd->team1->id,
            $wedstrijd->team2->id
        ];
        $this->database->Execute($query, $params);
    }

    public function UpdateWedstrijd(Wedstrijd $wedstrijd): void
    {
        $query =
            "UPDATE beach_wedstrijd
            SET
                punten_team1 = ?, 
                punten_team2 = ?
            WHERE id = ?";
        $params = [$wedstrijd->puntenTeam1, $wedstrijd->puntenTeam2, $wedstrijd->id];
        $this->database->Execute($query, $params);
    }

    public function DeleteWedstrijd(Wedstrijd $wedstrijd): void
    {
        $query =
            "DELETE FROM
            beach_wedstrijd
            WHERE id = ?";
        $params = [$wedstrijd->id];
        $this->database->Execute($query, $params);
    }

    public function DoesWedstrijdExist(Poule $poule, Team $team1, Team $team2): bool
    {
        $query =
            "SELECT * 
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
        $wedstrijden = [];
        foreach ($rows as $row) {
            $wedstrijd = $this->Find($wedstrijden, intval($row->idWedstrijd));
            if ($wedstrijd === null) {
                $team1 = new Team($row->idTeam1, $row->naamTeam1, $row->categorieTeam1);
                $team1->spelers[] = new Speler($row->idSpelerTeam1, $row->naamSpelerTeam1);

                $team2 = new Team($row->idTeam2, $row->naamTeam2, $row->categorieTeam2);
                $team2->spelers[] = new Speler($row->idSpelerTeam2, $row->naamSpelerTeam2);

                $wedstrijden[] =  new Wedstrijd($row->idWedstrijd, $team1, $team2, $row->puntenTeam1, $row->puntenTeam2);

                continue;
            }

            $speler = $this->Find($wedstrijd->team1->spelers, $row->idSpelerTeam1);
            if ($speler === null) {
                $wedstrijd->team1->spelers[] = new Speler($row->idSpelerTeam1, $row->naamSpelerTeam1);
            }

            $speler = $this->Find($wedstrijd->team2->spelers, $row->idSpelerTeam2);
            if ($speler === null) {
                $wedstrijd->team2->spelers[] = new Speler($row->idSpelerTeam2, $row->naamSpelerTeam2);
            }
        }
        return $wedstrijden;
    }

    private function Find(array $list, int $id): ?object
    {
        foreach ($list as $item) {
            if ($item->id === $id) {
                return $item;
            }
        }
        return null;
    }
}
