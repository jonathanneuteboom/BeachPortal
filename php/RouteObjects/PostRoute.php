<?php

namespace BeachPortal\RouteObjects;

use BeachPortal\Gateways\JoomlaGateway;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Routing\RouteCollectorProxy;
use BeachPortal\RouteObjects\CrudRoute;

class PostRoute extends CrudRoute
{
    public function __construct($route, $interactor, int $role = null)
    {
        $this->role = $role;
        $this->route = $route;
        $this->interactor = $interactor;
    }

    public function RegisterAction(RouteCollectorProxy $group)
    {
        $interactor = $this->interactor;
        $route = $this;

        $group->post($this->route, function (Request $request, Response $response, array $args) use ($interactor, $route) {
            $joomlaGateway = $this->get(JoomlaGateway::class);
            $route->Authorize($joomlaGateway, $route->role);

            $interactor = $this->get($interactor);
            $body = $request->getParsedBody();
            $input = $route->MergeInputObjects($body, $args);
            $data = $interactor->Execute($input);
            return $route->FillBody($response, $data);
        });
    }
}
