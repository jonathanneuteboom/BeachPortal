<?php

namespace BeachPortal\Entities;

class StandItem
{
    public Team $team;
    public int $gewonnenWedstrijden;
    public int $puntenVoor;
    public int $puntenTegen;
    public float $quotient;

    function __construct(Team $team, int $gewonnenWedstrijden, int $puntenVoor, int $puntenTegen, float $quotient)
    {
        $this->team = $team;
        $this->gewonnenWedstrijden = $gewonnenWedstrijden;
        $this->puntenVoor = $puntenVoor;
        $this->puntenTegen = $puntenTegen;
        $this->quotient = $quotient;
    }
}
