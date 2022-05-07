<?php

declare(strict_types=1);

namespace BeachPortal;

setlocale(LC_ALL, 'nl_NL');
ini_set('session.cookie_samesite', 'None');
ini_set('session.cookie_secure', 'true');

use Slim\Factory\AppFactory;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface;
use BeachPortal\UseCases;
use BeachPortal\Configuration;
use BeachPortal\Entities\Role;
use BeachPortal\ErrorHandler;
use BeachPortal\RouteObjects\DeleteRoute;
use BeachPortal\RouteObjects\GetRoute;
use BeachPortal\RouteObjects\PostRoute;
use BeachPortal\RouteObjects\RouteGroup;
use DI\ContainerBuilder as ContainerBuilder;

require 'vendor/autoload.php';

$containerBuilder  = new ContainerBuilder();
$containerBuilder->addDefinitions('di-config.php');
$container = $containerBuilder->build();

AppFactory::setContainer($container);
$app = AppFactory::create();

$errorMiddleware = $app->addErrorMiddleware(true, true, true);
$errorHandler = new ErrorHandler($app);
$errorMiddleware->setDefaultErrorHandler($errorHandler);

$app->add(function (Request $request, RequestHandlerInterface $handler): Response {
    $methods = ['GET', 'POST', 'DELETE', 'OPTIONS'];
    $requestHeaders = $request->getHeaderLine('Access-Control-Request-Headers');

    $response = $handler->handle($request);

    $configuration = $this->get(Configuration::class);
    return $response
        ->withHeader('Access-Control-Allow-Origin', $configuration->AccessControlAllowOrigin)
        ->withHeader('Access-Control-Allow-Methods', implode(',', $methods))
        ->withHeader('Access-Control-Allow-Headers', $requestHeaders)
        ->withHeader('Access-Control-Allow-Credentials', 'true');
});

$app->options('[/{path:.*}]', function (Request $request, Response $response, array $args) {
    $configuration = $this->get(Configuration::class);
    return $response
        ->withHeader('Access-Control-Allow-Origin', $configuration->AccessControlAllowOrigin)
        ->withHeader('Access-Control-Allow-Methods', 'POST,PUT');
});

$app->addBodyParsingMiddleware();

$app->addRoutingMiddleware();

$entryPoint =
    new RouteGroup('/BeachPortal/api', [
        new RouteGroup('/team', [
            new GetRoute('/all', UseCases\GetAllTeams::class),
            new GetRoute('/get/{id}', UseCases\GetTeam::class),
            new PostRoute('/update', UseCases\UpdateTeam::class),
            new DeleteRoute('/{id}', UseCases\DeleteTeam::class)
        ], Role::MANAGEMENT),

        new RouteGroup('/poule', [
            new GetRoute('/my', UseCases\GetMyPoules::class, Role::USER),
            new PostRoute('/add', UseCases\AddPoule::class),
            new PostRoute('/team/add', UseCases\AddTeamToPoule::class),
            new PostRoute('/update-speeltijd', UseCases\UpdateSpeeltijd::class),
            new DeleteRoute('/{pouleId}/team/{teamId}', UseCases\DeleteTeamFromPoule::class),
            new DeleteRoute('/{id}', UseCases\DeletePoule::class)
        ], Role::MANAGEMENT),

        new RouteGroup('/speelronde', [
            new GetRoute('/current', UseCases\GetCurrentSpeelronde::class, Role::USER),
            new GetRoute('/all', UseCases\GetAllSpeelrondes::class, Role::USER),
            new PostRoute('/add', UseCases\AddSpeelronde::class),
            new DeleteRoute('/delete', UseCases\DeleteSpeelronde::class),
        ], Role::MANAGEMENT),

        new RouteGroup('/wedstrijd', [
            new PostRoute('/uitslag', UseCases\UitslagInvoeren::class)
        ], Role::USER),

        new GetRoute('/algemeen-klassement', UseCases\AlgemeenKlassement::class, Role::USER),

        new RouteGroup('/user', [
            new GetRoute('/current', UseCases\GetCurrentUser::class, Role::USER),
            new GetRoute('/find-by-name', UseCases\FindUserByName::class, Role::MANAGEMENT),
            new PostRoute('/login', UseCases\Login::class, Role::UNREGISTERED)
        ]),

        new RouteGroup('/email', [
            new PostRoute('/versturen', UseCases\EmailsVersturen::class),
        ], Role::MANAGEMENT),
    ]);

$entryPoint->RegisterRoutes($app);

$app->run();
