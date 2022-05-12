<?php

namespace BeachPortal\UseCases;

use BeachPortal\Entities\Poule;

class OverlapModel
{
  public array $spelers = [];
  public PouleModel $poule1;
  public PouleModel $poule2;
  public string $type;

  function __construct(Poule $poule1, Poule $poule2, array $spelers)
  {
    $this->poule1 = new PouleModel($poule1);
    $this->poule2 = new PouleModel($poule2);

    foreach ($spelers as $speler) {
      $this->spelers[] = new SpelerModel($speler);
    }
  }
}
