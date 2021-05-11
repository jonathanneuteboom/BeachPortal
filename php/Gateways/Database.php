<?php

namespace BeachPortal\Common;

use mysqli_sql_exception;
use PDO;
use BeachPortal\Configuration;
use UnexpectedValueException;

class Database
{
    private $dbc;

    public function __construct(Configuration $config)
    {
        $this->host = $config->Database->Hostname;
        $this->database = $config->Database->Name;
        $this->username = $config->Database->Username;
        $this->password = $config->Database->Password;
        $this->options = $config->Database->Options;
    }

    private function getDbConnection()
    {
        if ($this->dbc) {
            return $this->dbc;
        }
        
        $this->dbc = new PDO(
            "mysql:host=$this->host;dbname=$this->database",
            $this->username,
            $this->password,
            array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")
        );
        return $this->dbc;
    }

    public function Execute(string $query, array $params = [])
    {
        if (empty($query)) {
            throw new UnexpectedValueException('Query is empty');
        }

        $stmt = $this->getDbConnection()->prepare($query);

        if (!$stmt->execute($params)) {
            $message = 'Fout bij het uitvoeren van query ( query:\\n' .
                print_r($query, true) .
                '\\n\\nparams:\n' .
                print_r($params, true) .
                ') ' .
                print_r($stmt->errorInfo(), true) .
                ' om ' .
                date('H:i:s:(u) d-m-Y');

            throw new mysqli_sql_exception($message);
        }

        return $stmt->fetchAll(PDO::FETCH_OBJ);
    }
}
