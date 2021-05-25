<?php

namespace BeachPortal\UseCases;

use BeachPortal\Entities\Wedstrijd;

class WedstrijdModel
{
    public int $id;
    public TeamModel $team1;
    public TeamModel $team2;
    public int $puntenTeam1;
    public int $puntenTeam2;

    public function __construct(Wedstrijd $wedstrijd)
    {
        $this->id = $wedstrijd->id;
        $this->team1 = new TeamModel($wedstrijd->team1);
        $this->team2 = new TeamModel($wedstrijd->team2);
        $this->puntenTeam1 = $wedstrijd->puntenTeam1;
        $this->puntenTeam2 = $wedstrijd->puntenTeam2;
    }
}
