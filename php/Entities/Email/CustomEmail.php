<?php

namespace BeachPortal\Entities;

class CustomEmail extends Email
{
    function __construct(Speler $receiver, string $titel, string $body, $entities)
    {
        $this->receiver = $receiver;
        foreach ($entities as $entity) {
            $titel = Email::FillTemplate($entity, $titel);
            $body = Email::FillTemplate($entity, $body);
        }

        $this->titel = $titel;
        $this->body = $body;
    }
}
