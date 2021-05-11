<?php

use BeachPortal\Gateways\UserManager;
use BeachPortal\UseCases\IUserManager;
use BeachPortal\Configuration;
use DI\Container;
use BeachPortal\Common\Database;

return [
    IUserManager::class => DI\factory(function (Container $container) {
        $configuration = $container->get(Configuration::class);
        $database = $container->get(Database::class);
        return new UserManager($configuration, $database);
    })
];
