<?php

namespace BeachPortal\UseCases;

use BeachPortal\Entities\StandItem;

class StandItemModel
{
    public TeamModel $team;
    public int $gewonnenWedstrijden;
    public int $puntenVoor;
    public int $puntenTegen;
    public float $quotient;

    function __construct(StandItem $standItem)
    {
        $this->team = new TeamModel($standItem->team);
        $this->gewonnenWedstrijden = $standItem->gewonnenWedstrijden;
        $this->puntenVoor = $standItem->puntenVoor;
        $this->puntenTegen = $standItem->puntenTegen;
        $this->quotient = $standItem->quotient;
    }
}
