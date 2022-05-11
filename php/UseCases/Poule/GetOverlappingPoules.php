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
        $diff = $tijdstipPoule1->diff($tijdstipPoule2);
        if ($diff->h >= 12 || $diff->d >= 1) continue;

        $overlappendeSpelers = $this->getOverlappendeSpelers($poules[$i], $poules[$j]);
        if (count($overlappendeSpelers) === 0) continue;

        $isSameLocation = $poules[$i]->speellocatie->id === $poules[$j]->speellocatie->id;
        if (!$isSameLocation && $diff->h <= 2) {
          $result[] = new OverlapModel("danger", $poules[$i]->GetFullName(), $poules[$j]->GetFullName(), $overlappendeSpelers);
        }

        if ($diff->h <= 4) {
          $result[] = new OverlapModel("warning", $poules[$i]->GetFullName(), $poules[$j]->GetFullName(),  $overlappendeSpelers);
        }
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
