<?php

namespace BeachPortal\Entities;

class Speellocatie
{
  public int $id;
  public string $naam;

  function __construct(int $id, string $naam)
  {
    $this->id = $id;
    $this->naam = $naam;
  }
}
