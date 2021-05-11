<?php

namespace BeachPortal\UseCases;

use BeachPortal\Entities\Speler;

interface IUserManager
{
    function GetUser(?int $userId = null): ?Speler;
    function IsWebcie(?Speler $user): bool;
    function IsBeachcie(?Speler $user): bool;
    function Login(string $username, string $password): bool;
}
