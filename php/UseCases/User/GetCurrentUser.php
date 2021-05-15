<?php

namespace BeachPortal\UseCases;

use BeachPortal\Gateways\UserGateway;

class GetCurrentUser implements Interactor
{
    public function __construct(UserGateway $userGateway)
    {
        $this->userGateway = $userGateway;
    }

    public function Execute(object $data = null)
    {
        $user = $this->userGateway->GetUser();
        $isAdmin = $this->userGateway->IsBeachcie($user) || $this->userGateway->IsWebcie($user);
        $user->role = $isAdmin ? 'Admin' : 'User';
        return $user;
    }
}
