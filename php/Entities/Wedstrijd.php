<?php

namespace BeachPortal\Entities;

class Wedstrijd
{
    public int $id;
    public Team $team1;
    public Team $team2;
    public ?int $puntenTeam1;
    public ?int $puntenTeam2;
}
