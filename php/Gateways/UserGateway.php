<?php

namespace BeachPortal\Gateways;

use BeachPortal\Configuration;
use BeachPortal\Common\Database;
use BeachPortal\Entities\Speler;
use BeachPortal\Entities\Credentials;
use BeachPortal\UseCases\IUserGateway;
use UnexpectedValueException;

class UserGateway implements IUserGateway
{
    public function __construct(
        Configuration $configuration,
        Database $database
    ) {
        $this->configuration = $configuration;
        $this->database = $database;
    }

    public function GetUser(?int $userId = null): ?Speler
    {
        $user = empty($userId) ? $this->GetLoggedInUser() : $this->GetUserById($userId);
        if (!$user) {
            return null;
        }

        return $user;
    }

    public function IsWebcie(?Speler $user): bool
    {
        return $this->IsUserInUsergroup($user, 'Super Users');
    }

    public function IsBeachcie(?Speler $user): bool
    {
        return $this->IsUserInUsergroup($user, 'Beachcie');
    }

    private function IsUserInUsergroup(?Speler $user, string $usergroup): bool
    {
        if ($user === null) {
            return false;
        }
        $query =
            "SELECT *
            FROM J3_user_usergroup_map M
            INNER JOIN J3_usergroups G ON M.group_id = G.id
            WHERE M.user_id = ? and G.title = ?";
        $params = [$user->id, $usergroup];
        $result = $this->database->Execute($query, $params);
        return count($result) > 0;
    }

    public function InitJoomla(): void
    {
        if (defined('_JEXEC')) {
            return;
        }

        define('JPATH_BASE', $this->configuration->JpathBase);
        define('_JEXEC', 1);

        require_once JPATH_BASE . '/includes/defines.php';
        require_once JPATH_BASE . '/includes/framework.php';

        $mainframe = \JFactory::getApplication('site');
        $mainframe->initialise();
    }

    public function Login(string $username, string $password): bool
    {
        $this->InitJoomla();

        $credentials = new Credentials($username, $password);

        $joomlaApp = \JFactory::getApplication('site');

        $db = \JFactory::getDbo();
        $query = $db->getQuery(true)
            ->select('id, password')
            ->from('#__users')
            ->where('username=' . $db->quote($credentials->username));

        $db->setQuery($query);
        $result = $db->loadObject();
        if ($result) {
            $match = \JUserHelper::verifyPassword($credentials->password, $result->password, $result->id);
            if ($match === true) {
                $joomlaApp->login((array) $credentials);
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public function GetLoggedInUser(): ?Speler
    {
        $this->InitJoomla();

        $joomlaUser = \JFactory::getUser();
        if ($joomlaUser->guest) {
            return null;
        }

        $user = $this->GetUserById($joomlaUser->id);

        if ($this->IsWebcie($user) && isset($_GET['impersonationId'])) {
            $impersonationId = $_GET['impersonationId'];
            return $this->GetUserById($impersonationId);
        }

        return $user;
    }

    public function GetUsersWithName(string $name): array
    {
        $query =
            "SELECT 
                U.id,
                U.name as naam,
                U.email,
                C.cb_rugnummer as rugnummer,
                C.cb_positie as positie,
                C.cb_nevobocode as relatiecode
            FROM J3_users U
            LEFT JOIN J3_comprofiler C ON U.id = C.user_id
            WHERE name like '%$name%'
            ORDER BY 
            CASE WHEN name LIKE '$name%' THEN 0 ELSE 1 end,
            name  
            LIMIT 0, 5";
        $rows = $this->database->Execute($query);
        return $this->MapToSpelers($rows);
    }

    private function MapToSpelers(array $rows): array
    {
        $result = [];
        foreach ($rows as $row) {
            $result[] = new Speler($row->id, $row->naam, $row->email);
        }
        return $result;
    }

    private function GetUserById(int $userId): Speler
    {
        $query =
            "SELECT 
                U.id, 
                U.name AS naam,
                U.email
            FROM J3_users U
            LEFT JOIN J3_comprofiler C ON U.id = C.user_id
            WHERE U.id = ?";
        $params = [$userId];
        $users = $this->database->Execute($query, $params);
        if (count($users) != 1) {
            throw new UnexpectedValueException("Gebruiker met id '$userId' bestaat niet");
        }

        return new Speler($users[0]->id, $users[0]->naam, $users[0]->email);
    }
}
