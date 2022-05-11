<?php

namespace BeachPortal\UseCases;

use BeachPortal\Gateways\SpeellocatieGateway;

class GetAllSpeellocaties implements Interactor
{
  function __construct(SpeellocatieGateway $speelrondeGateway)
  {
    $this->speelrondeGateway = $speelrondeGateway;
  }

  public function Execute(object $data = null)
  {
    $result = [];

    $locaties = $this->speelrondeGateway->GetAll();
    foreach ($locaties as $locatie) {
      $result[] = new SpeellocatieModel($locatie);
    }

    return $result;
  }
}
