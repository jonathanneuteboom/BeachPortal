<?php

namespace BeachPortal\UseCases;

use BeachPortal\Entities\Team;
use BeachPortal\UseCases\TeamModel;

class AlgemeenKlassementItemModel
{
  public TeamModel $team;
  public array $puntenVerloop;
  public int $totaal = 0;

  function __construct(Team $team, int $aantalSpeelrondes)
  {
    $this->team = new TeamModel($team);
    $this->puntenVerloop = array_fill(0, $aantalSpeelrondes, [0, 0]);
  }

  public function addPunten(int $speelronde, float $gewonnenWedstrijden, float $poulePunten)
  {
    $this->puntenVerloop[$speelronde] = [$gewonnenWedstrijden, $poulePunten];
    $this->totaal = $this->getTotaal();
  }

  public function getTotaal()
  {
    $sum = 0;
    foreach ($this->puntenVerloop as $punten) {
      $sum += $punten[0] + $punten[1];
    }
    return $sum;
  }
}
