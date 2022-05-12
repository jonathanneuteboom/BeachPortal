<?php

namespace BeachPortal\UseCases;

use BeachPortal\Entities\Poule;
use BeachPortal\Gateways\PouleGateway;
use BeachPortal\Gateways\SpeelrondeGateway;
use BeachPortal\Gateways\TeamGateway;
use BeachPortal\Gateways\UserGateway;
use BeachPortal\Gateways\WedstrijdGateway;

class GetOverlappingPoules implements Interactor
{
  function __construct(
    PouleGateway $pouleGateway,
    TeamGateway $teamGateway,
    UserGateway $userGateway,
    SpeelrondeGateway $speelrondeGateway,
    WedstrijdGateway $wedstrijdGateway
  ) {
    $this->pouleGateway = $pouleGateway;
    $this->teamGateway = $teamGateway;
    $this->userGateway = $userGateway;
    $this->speelrondeGateway = $speelrondeGateway;
    $this->wedstrijdGateway = $wedstrijdGateway;
  }

  public function Execute(object $data = null)
  {
    $speelronde = $this->speelrondeGateway->GetCurrentSpeelronde();
    if ($speelronde === null) return;


    $poules = $this->pouleGateway->GetPoulesInSpeelronde($speelronde);
    $numberOfPoules = count($poules);

    for ($i = 0; $i < $numberOfPoules; $i++) {
      $poules[$i]->teams = $this->teamGateway->GetTeamsInPoule($poules[$i]);
    }

    $result = [];
    for ($i = 0; $i < $numberOfPoules - 1; $i++) {
      for ($j = $i + 1; $j < $numberOfPoules; $j++) {
        $tijdstipPoule1 = $poules[$i]->speeltijd;
        $tijdstipPoule2 = $poules[$j]->speeltijd;

        if ($tijdstipPoule1->format("Y-m-d") !== $tijdstipPoule2->format("Y-m-d")) continue;

        $overlappendeSpelers = $this->getOverlappendeSpelers($poules[$i], $poules[$j]);
        if (count($overlappendeSpelers) === 0) continue;

        $result[] = new OverlapModel($poules[$i], $poules[$j], $overlappendeSpelers);
      }
    }

    return $result;
  }

  private function getOverlappendeSpelers(Poule $poule1, Poule $poule2): array
  {
    $overlappendeSpelers = [];
    $teamsPoule1 = $poule1->teams;
    $teamsPoule2 = $poule2->teams;

    foreach ($teamsPoule1 as  $teamPoule1) {
      $spelersTeam1 = $teamPoule1->spelers;

      foreach ($teamsPoule2 as  $teamPoule2) {
        $spelersTeam2 = $teamPoule2->spelers;

        foreach ($spelersTeam1 as $spelerTeam1) {
          foreach ($spelersTeam2 as  $spelerTeam2) {
            if ($spelerTeam1->Equals($spelerTeam2)) {
              $overlappendeSpelers[] = $spelerTeam1;
            }
          }
        }
      }
    }

    return $overlappendeSpelers;
  }
}
