<?php

namespace BeachPortal\UseCases;

use BeachPortal\Entities\Speellocatie;

class SpeellocatieModel
{
  public int $id;
  public string $naam;

  function __construct(Speellocatie $locatie)
  {
    $this->id = $locatie->id;
    $this->naam = $locatie->naam;
  }
}
