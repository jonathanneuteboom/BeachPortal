<?php

declare(strict_types=1);

use BeachPortal\Entities\Categorie;
use BeachPortal\Entities\Dames;
use BeachPortal\Entities\Heren;
use BeachPortal\Entities\Mix;
use PHPUnit\Framework\TestCase;

final class CategorieTest extends TestCase
{
    public function testCategorien(): void
    {
        $this->expectException(UnexpectedValueException::class);

        $this->expectErrorMessage("Categorie 'heren' bestaat niet");

        Categorie::GetCategorie("heren");
    }

    public function testEqaulity(): void
    {
        $heren = new Heren();
        $dames = new Dames();
        $mix = new Mix();

        $new = new Dames();

        $this->assertTrue($heren->Equals($heren));
        $this->assertTrue($dames->Equals($dames));
        $this->assertTrue($mix->Equals($mix));

        $this->assertTrue($dames->Equals($new));
        $this->assertFalse($heren->Equals($new));
        $this->assertFalse($dames->Equals($mix));
    }
}
