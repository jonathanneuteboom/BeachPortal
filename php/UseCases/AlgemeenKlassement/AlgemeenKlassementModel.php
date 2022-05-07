<?php

namespace BeachPortal\UseCases;

use BeachPortal\Entities\Team;
use BeachPortal\UseCases\TeamModel;

class AlgemeenKlassementItemModel
{
  public TeamModel $team;
  public array $puntenVerloop = [];
  public int $totaal = 0;

  function __construct(Team $team)
  {
    $this->team = new TeamModel($team);
  }

  public function addPunten($gewonnenWedstrijden, $poulePunten)
  {
    $this->puntenVerloop[] = [$gewonnenWedstrijden, $poulePunten];
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
