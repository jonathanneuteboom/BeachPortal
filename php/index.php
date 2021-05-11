<?php

declare(strict_types=1);

namespace BeachPortal;

setlocale(LC_ALL, 'nl_NL');

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
        new GetRoute('/my-beach', UseCases\HelloWorld::class, Role::UNREGISTERED),

        new RouteGroup('/team', [
            new GetRoute('/get', UseCases\HelloWorld::class),
            new PostRoute('/edit', UseCases\HelloWorld::class, Role::MANAGEMENT),
            new DeleteRoute('/delete', UseCases\HelloWorld::class, Role::MANAGEMENT)
        ], Role::USER),

        new GetRoute('/speelrondes', UseCases\HelloWorld::class, Role::USER),

        new GetRoute('/deze-week', UseCases\HelloWorld::class, Role::USER),

        new RouteGroup('/management', [
            new GetRoute('/nieuwe-ronde', UseCases\HelloWorld::class),
        ], Role::MANAGEMENT),

        new RouteGroup('/user', [
            new GetRoute('/current', UseCases\HelloWorld::class, Role::MANAGEMENT),
            new PostRoute('/get', UseCases\HelloWorld::class, Role::MANAGEMENT),
            new PostRoute('/inloggen', UseCases\Login::class, Role::UNREGISTERED)
        ])
    ]);

$entryPoint->RegisterRoutes($app);

$app->run();
