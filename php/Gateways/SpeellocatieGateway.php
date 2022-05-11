<?php

namespace BeachPortal\Gateways;

use BeachPortal\Configuration;
use BeachPortal\Common\Database;
use BeachPortal\Entities\Speellocatie;

class SpeellocatieGateway
{
  public function __construct(
    Configuration $configuration,
    Database $database
  ) {
    $this->configuration = $configuration;
    $this->database = $database;
  }

  public function GetById(int $id): Speellocatie
  {
    $query =
      "SELECT 
        id,
        naam
       FROM beach_speellocatie
       WHERE id = ?";
    $params = [$id];
    $rows = $this->database->Execute($query, $params);
    return $this->MapToSpeellocaties($rows)[0];
  }

  public function GetAll(): array
  {
    $query =
      "SELECT 
          id,
          naam
       FROM beach_speellocatie
       ORDER BY naam";
    $rows = $this->database->Execute($query);
    return $this->MapToSpeellocaties($rows);
  }

  private function MapToSpeellocaties(array $rows): array
  {
    $speellocaties = [];
    foreach ($rows as $row) {
      $speellocaties[] = new Speellocatie(
        $row->id,
        $row->naam
      );
    }
    return $speellocaties;
  }
}
