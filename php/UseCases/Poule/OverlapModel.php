<?php

namespace BeachPortal\UseCases;

class OverlapModel
{
  public array $spelers = [];
  public string $poule1;
  public string $poule2;
  public string $type;

  function __construct(string $type, string $poule1, string $poule2, array $spelers)
  {
    $this->poule1 = $poule1;
    $this->poule2 = $poule2;
    $this->type = $type;

    foreach ($spelers as $speler) {
      $this->spelers[] = new SpelerModel($speler);
    }
  }
}
