<?php

namespace BeachPortal\UseCases;

class KlassementCategorieModel
{
  public string $categorie;
  public array $ranking = [];

  public function __construct(string $categorie)
  {
    $this->categorie = $categorie;
  }
}
