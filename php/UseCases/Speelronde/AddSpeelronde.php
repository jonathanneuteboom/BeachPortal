<?php

namespace BeachPortal\UseCases;

use BeachPortal\Entities\Poule;
use BeachPortal\Entities\Speelronde;
use BeachPortal\Entities\Wedstrijd;
use BeachPortal\Gateways\PouleGateway;
use BeachPortal\Gateways\SpeelrondeGateway;
use BeachPortal\Gateways\TeamGateway;
use BeachPortal\Gateways\WedstrijdGateway;
use UnexpectedValueException;

class AddSpeelronde implements Interactor
{
    function __construct(
        SpeelrondeGateway $speelrondeGateway,
        TeamGateway $teamGateway,
        WedstrijdGateway $wedstrijdGateway,
        PouleGateway $pouleGateway
    ) {
        $this->speelrondeGateway = $speelrondeGateway;
        $this->teamGateway = $teamGateway;
        $this->wedstrijdGateway = $wedstrijdGateway;
        $this->pouleGateway = $pouleGateway;
    }

    public function Execute(object $data = null)
    {
        $speelronde = $this->speelrondeGateway->GetCurrentSpeelronde();
        if ($speelronde === null) {
            $newSpeelronde = new Speelronde(null, 1);
            $this->speelrondeGateway->AddSpeelronde($newSpeelronde);
            return;
        }

        $speelronde->poules = $this->pouleGateway->GetPoulesInSpeelronde($speelronde);
        foreach ($speelronde->poules as $poule) {
            $poule->stand = $this->wedstrijdGateway->GetStandOfPoule($poule);
            $poule->teams = $this->teamGateway->GetTeamsInPoule($poule);
            $poule->wedstrijden = $this->wedstrijdGateway->GetWedstrijdenInPoule($poule);
        }

        $this->ValidateSpeelronde($speelronde);

        $newSpeelronde = new Speelronde(null, $speelronde->nummer + 1);
        $newSpeelronde->id = $this->speelrondeGateway->AddSpeelronde($newSpeelronde);

        foreach ($speelronde->poules as $poule) {
            $newSpeeltijd = clone $poule->speeltijd;
            $newSpeeltijd->modify("+1 week");
            $newPoule = new Poule(null, $poule->naam, $poule->categorie, $newSpeeltijd);
            $newPoule->id = $this->speelrondeGateway->AddPouleToSpeelronde($newSpeelronde, $newPoule);
            $newSpeelronde->poules[] = $newPoule;
        }

        foreach ($speelronde->poules as $poule) {
            foreach ($poule->stand as $key => $standItem) {
                if ($key === array_key_first($poule->stand)) {
                    $newPoule = $this->getHigherPoule($poule, $newSpeelronde->poules);
                } else if ($key === array_key_last($poule->stand)) {
                    $newPoule = $this->getLowerPoule($poule, $newSpeelronde->poules);
                } else {
                    $newPoule = $this->getSamePoule($poule, $newSpeelronde->poules);
                }

                $newTeam = $standItem->team;
                foreach ($newPoule->teams as $team) {
                    $wedstrijdExists = $this->wedstrijdGateway->DoesWedstrijdExist($newPoule, $team, $newTeam);
                    if ($wedstrijdExists) continue;

                    $newWedstrijd = new Wedstrijd(null, $team, $newTeam);
                    $this->wedstrijdGateway->AddWedstrijdToPoule($newPoule, $newWedstrijd);
                }

                $this->pouleGateway->AddTeamToPoule($newPoule, $newTeam);
                $newPoule->teams[] = $newTeam;
            }
        }
    }

    private function ValidateSpeelronde(Speelronde $speelronde)
    {
        $aantalIngevuldeWedstrijden = 0;
        foreach ($speelronde->poules as $poule) {
            $aantalteams = count($poule->teams);

            if ($aantalteams < 3) {
                $categorie = $poule->categorie->GetNaam();
                throw new UnexpectedValueException("Poule $categorie $poule->naam heeft minder dan 3 teams");
            }

            if (count($poule->stand) !== count($poule->teams)) {
                $categorie = $poule->categorie->GetNaam();
                throw new UnexpectedValueException("Poule $categorie $poule->naam: aantal teams komt niet overeen met aantal teams in stand");
            }

            foreach ($poule->wedstrijden as $wedstrijd) {
                if ($wedstrijd->IsStandIngevuld()) {
                    $aantalIngevuldeWedstrijden++;
                }
            }
        }

        if ($aantalIngevuldeWedstrijden === 0) {
            throw new UnexpectedValueException("Er zijn nog geen wedstrijden gespeeld in de huidige speelronde");
        }
    }

    private function getHigherPoule(Poule $poule, array $newpoules): Poule
    {
        return $this->getPoule($poule, $newpoules, -1);
    }

    private function getLowerPoule(Poule $poule, array $newpoules): Poule
    {
        return $this->getPoule($poule, $newpoules, 1);
    }

    private function getSamePoule(Poule $poule, array $newpoules): Poule
    {
        return $this->getPoule($poule, $newpoules, 0);
    }

    private function getPoule(Poule $poule, array $newPoules, int $delta): Poule
    {
        $newLetter = chr(ord($poule->naam) + $delta);
        foreach ($newPoules as $newPoule) {
            if ($newPoule->naam === $newLetter && $newPoule->categorie->Equals($poule->categorie)) {
                return $newPoule;
            }
        }

        return $this->getPoule($poule, $newPoules, 0);
    }
}
