<?php

use BeachPortal\Configuration;
use DI\Container;
use BeachPortal\Common\Database;
use BeachPortal\Gateways\UserGateway;
use BeachPortal\UseCases\IUserGateway;

return [
    IUserGateway::class => DI\factory(function (Container $container) {
        $configuration = $container->get(Configuration::class);
        $database = $container->get(Database::class);
        return new UserGateway($configuration, $database);
    })
];
