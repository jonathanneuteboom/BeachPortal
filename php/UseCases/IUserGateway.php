<?php

namespace BeachPortal\UseCases;

use BeachPortal\Entities\Speler;

interface IUserGateway
{
    function GetUser(?int $userId = null): ?Speler;
    function IsWebcie(?Speler $user): bool;
    function IsBeachcie(?Speler $user): bool;
    function Login(string $username, string $password): bool;
    function GetUsersWithName(string $username): array;
}
