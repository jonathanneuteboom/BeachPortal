<?php

namespace BeachPortal;

class Configuration
{
    public DatabaseConnection $Database;
    public $DisplayErrors = true;
    public $JpathBase = "C:\Users\jonat\joomla-website";
    public $AccessControlAllowOrigin = "http://localhost:4200";
    public $DwfUsername = "dwf@skcvolleybal.nl";
    public $DwfPassword = "skcvolleybal";

    function __construct()
    {
        $this->Database = new DatabaseConnection();
    }
}

class DatabaseConnection
{
    public string $Hostname = "localhost";
    public string $Name = "deb105013n2_SKC";
    public string $Username = "root";
    public string $Password = "root";
    public array $Options = [
        "PDO::MYSQL_ATTR_INIT_COMMAND" => "SET NAMES utf8"
    ];
}
