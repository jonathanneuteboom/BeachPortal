<?php

namespace BeachPortal\Entities;

use BeachPortal\Common\Linq;
use UnexpectedValueException;

class Wedstrijd
{
    public ?int $id;
    public Team $team1;
    public Team $team2;
    public int $puntenTeam1;
    public int $puntenTeam2;

    public function __construct(?int $id, Team $team1, Team $team2, int $puntenTeam1 = 0, int $puntenTeam2 = 0)
    {
        $this->id = $id;
        $this->team1 = $team1;
        $this->team2 = $team2;
        $this->puntenTeam1 = $puntenTeam1;
        $this->puntenTeam2 = $puntenTeam2;

        $this->validate();
    }

    public function IsStandIngevuld()
    {
        return $this->puntenTeam1 !== 0 || $this->puntenTeam2 !== 0;
    }

    public function CanSpelerEdit(Speler $speler)
    {
        return
            Linq::From($this->team1->spelers)->Any(function (Speler $s) use ($speler) {
                return $s->id === $speler->id;
            }) ||
            Linq::From($this->team1->spelers)->Any(function (Speler $s) use ($speler) {
                return $s->id === $speler->id;
            });
    }

    private function validate()
    {
        if ($this->puntenTeam1 < 0 || $this->puntenTeam2 < 0) {
            throw new UnexpectedValueException("Negatieve punten kan niet");
        }

        if ($this->team1->id === $this->team2->id) {
            throw new UnexpectedValueException("Team kan niet tegen zichzelf spelen");
        }
    }
}
