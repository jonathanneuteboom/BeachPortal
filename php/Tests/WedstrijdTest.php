<?php

declare(strict_types=1);

use BeachPortal\Entities\Heren;
use BeachPortal\Entities\Speler;
use BeachPortal\Entities\Team;
use BeachPortal\Entities\Wedstrijd;
use PHPUnit\Framework\TestCase;

final class WedstrijdTest extends TestCase
{
    public function testNegatieveScore1(): void
    {
        $this->expectException(UnexpectedValueException::class);

        $this->expectErrorMessage("Negatieve punten kan niet");

        new Wedstrijd(
            1,
            new Team(1, "", new Heren()),
            new Team(1, "", new Heren()),
            -1,
            0
        );
    }

    public function testNegatieveScore2(): void
    {
        $this->expectException(UnexpectedValueException::class);

        $this->expectErrorMessage("Negatieve punten kan niet");

        new Wedstrijd(
            1,
            new Team(1, "", new Heren()),
            new Team(1, "", new Heren()),
            0,
            -1
        );
    }

    public function testEqaulity(): void
    {
        $team1 = new Team(1, "", new Heren());
        $team2 = new Team(2, "", new Heren());
        $w1 = new Wedstrijd(1, $team1, $team2, 0, 21);
        $this->assertTrue($w1->IsStandIngevuld());

        $w2 = new Wedstrijd(2, $team1, $team2, 21, 0);
        $this->assertTrue($w2->IsStandIngevuld());

        $w3 = new Wedstrijd(3, $team1, $team2, 21, 19);
        $this->assertTrue($w3->IsStandIngevuld());
    }

    public function testTeamKanNietTegenZichzelfSpelen(): void
    {
        $this->expectException(UnexpectedValueException::class);
        $this->expectErrorMessage("Team kan niet tegen zichzelf spelen");

        $team1 = new Team(1, "", new Heren());
        $team2 = new Team(1, "", new Heren());
        $w1 = new Wedstrijd(1, $team1, $team2);
    }

    public function testSpelerCannotEdit(): void
    {
        $speler = new Speler(1, "", "");
        $team1 = new Team(1, "", new Heren());
        $team1->spelers[] = $speler;

        $speler = new Speler(2, "", "");
        $team2 = new Team(2, "", new Heren());
        $team2->spelers[] = $speler;

        $w1 = new Wedstrijd(1, $team1, $team2, 0, 21);

        $newSpeler = new Speler(3, "", "");

        $this->assertFalse($w1->CanSpelerEdit($newSpeler));
    }

    public function testSpelerCanEdit2(): void
    {
        $speler1 = new Speler(1, "", "");
        $speler2 = new Speler(2, "", "");
        $team1 = new Team(1, "", new Heren());
        $team1->spelers[] = $speler1;
        $team1->spelers[] = $speler2;

        $speler3 = new Speler(3, "", "");
        $speler4 = new Speler(4, "", "");
        $team2 = new Team(2, "", new Heren());
        $team2->spelers[] = $speler3;
        $team2->spelers[] = $speler4;

        $w1 = new Wedstrijd(1, $team1, $team2, 0, 21);

        $speler5 = new Speler(5, "", "");

        $this->assertTrue($w1->CanSpelerEdit($speler1));
        $this->assertTrue($w1->CanSpelerEdit($speler2));
        $this->assertTrue($w1->CanSpelerEdit($speler3));
        $this->assertTrue($w1->CanSpelerEdit($speler4));

        $this->assertFalse($w1->CanSpelerEdit($speler5));
    }
}
