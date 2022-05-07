<?php

namespace BeachPortal\UseCases;

use BeachPortal\Entities\Poule;
use BeachPortal\Entities\Team;
use BeachPortal\Gateways\PouleGateway;
use BeachPortal\Gateways\SpeelrondeGateway;
use BeachPortal\Gateways\TeamGateway;
use BeachPortal\Gateways\WedstrijdGateway;
use Error;

class AlgemeenKlassement implements Interactor
{
  function __construct(
    TeamGateway $teamGateway,
    PouleGateway $pouleGateway,
    SpeelrondeGateway $speelrondeGateway,
    WedstrijdGateway $wedstrijdGateway
  ) {
    $this->teamGateway = $teamGateway;
    $this->pouleGateway = $pouleGateway;
    $this->speelrondeGateway = $speelrondeGateway;
    $this->wedstrijdGateway = $wedstrijdGateway;
  }

  public function Execute(object $data = null)
  {
    $klassement = [];

    $teams = $this->teamGateway->getAllTeams();
    foreach ($teams as $team) {
      $klassement[] = new AlgemeenKlassementItemModel($team);
    }

    $speelrondes = $this->speelrondeGateway->GetAllSpeelrondes();
    foreach ($speelrondes as $speelronde) {
      $poules = $this->pouleGateway->GetPoulesInSpeelronde($speelronde);
      foreach ($poules as $poule) {
        $stand = $this->wedstrijdGateway->GetStandOfPoule($poule);
        $aantalTeams = count($stand);
        foreach ($stand as $i => $standItem) {
          $poulePunten = $this->getPoulePunten($poule);
          $standPunten = $aantalTeams - $i - 1;

          $i = $this->getAlgemeenKlassementItemIndex($klassement, $standItem->team);
          $klassement[$i]->addPunten($poulePunten, $standPunten);
        }
      }
    }

    $sortFunction = function (AlgemeenKlassementItemModel $a, AlgemeenKlassementItemModel $b) {
      return $a->getTotaal() < $b->getTotaal();
    };

    usort($klassement, $sortFunction);

    $result = [new KlassementCategorieModel("Dames"), new KlassementCategorieModel("Heren"), new KlassementCategorieModel("Mix")];
    foreach ($klassement as $klassementItem) {
      $i = $this->getCategorieIndex($klassementItem->team->categorie);
      $result[$i]->ranking[] = $klassementItem;
    }

    return $result;
  }

  private function getPoulePunten(Poule $poule)
  {
    $pouleLetter = substr($poule->naam, -1);

    $startScore = $this->getDefaultPouleScore($poule);
    $diff = 0.5;
    foreach (range('A', 'Z') as $letter) {
      if ($letter === $pouleLetter) {
        return max($startScore, 0);
      }

      $startScore -= $diff;
    }

    return 0;
  }

  private function getDefaultPouleScore(Poule $poule)
  {
    switch ($poule->categorie->GetNaam()) {
      case "Heren":
        return 3;
      case "Dames":
        return 3;
      case "Mix":
        return 3;
      default:
        throw new Error("Categorie" . $poule->categorie->GetNaam() . " bestaat niet");
    }
  }

  private function getCategorieIndex(string $categorie)
  {
    switch ($categorie) {
      case "Dames":
        return 0;
      case "Heren":
        return 1;
      case "Mix":
        return 2;
      default:
        throw new Error("Categorie " . $categorie . " bestaat niet");
    }
  }

  private function getAlgemeenKlassementItemIndex(array $klassement, Team $team)
  {
    foreach ($klassement as $i => $klassementItem) {
      if ($klassementItem->team->id === $team->id) {
        return $i;
      }
    }

    throw new Error("Team met id " . $team->id . "bestaat niet");
  }
}
