<?php

declare(strict_types=1);

use BeachPortal\Entities\CustomEmail;
use BeachPortal\Entities\Dames;
use BeachPortal\Entities\Mix;
use BeachPortal\Entities\Poule;
use BeachPortal\Entities\Speler;
use BeachPortal\Entities\Team;
use PHPUnit\Framework\TestCase;

final class EmailTest extends TestCase
{
    public function testCanBeCreatedFromValidEmailAddress(): void
    {
        $titel = "Beachprogramma {{DATUM}}";
        $body = file_get_contents("./../angular-app/src/assets/mail-templates/programma.txt");

        $finalTitel = 'Beachprogramma Sunday 13 December 2020';
        $finalBody = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<body>
Beste Firstname Lastname,<br>
<br>
Aanstaande Sunday 13 December 2020 ben je ingedeeld om te spelen in de beachcompetitie.<br>
Jouw poule Dames X speelt om 12:34.<br>
<br>
Je zit in de poule met:<br>
De tegenstanders (Eerste Speler, Tweede Speler)<br>
<br>
Om uitslagen in te vullen en voor meer informatie: <a target="_blank" href="http://www.leidsebeachcompetitie.nl/">http://www.leidsebeachcompetitie.nl/</a><br>
<br>
Met vriendelijke groet,<br>
<br>
De Beachcie
</body>
</html>';
        $speler = new Speler(42, "Firstname Lastname", "firstname.lastname@example.com");
        $sender = new Speler(43, "Mr. Sender", "sender@example.com");
        $speeltijd = new DateTime("2020-12-13 12:34:56");
        $poule = new Poule(null, "X", new Dames(),  $speeltijd);
        $team = new Team(1, "De tegenstanders", new Mix());
        $team->spelers[] = new Speler(1, "Eerste Speler", "speler1@example.com");
        $team->spelers[] = new Speler(2, "Tweede Speler", "speler2@example.com");
        $poule->teams[] = $team;

        $email = new CustomEmail($speler, $titel, $body, [$poule, $speler]);
        $email->Build();
        $email->SetSender($sender);

        $this->assertEquals($email->sender->email, $sender->email);
        $this->assertEquals($email->receiver->email, $speler->email);
        $this->assertTrue($email->isValid());
        $this->assertEquals($email->titel, $finalTitel);
        $this->assertEquals($email->body, $finalBody);
        $this->assertNotNull($email->signature);
    }
}
