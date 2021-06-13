<?php

namespace BeachPortal\Entities;

use BeachPortal\Common\Utilities;

class Email
{
    public ?Speler $sender;
    public Speler $receiver;
    public string $titel;
    public string $body;
    public int $id;
    public string $signature;

    public function __construct(string $titel, string $body, Speler $receiver, ?Speler $sender, $id)
    {
        $this->titel = $titel;
        $this->body = $body;
        $this->receiver = $receiver;
        $this->sender = $sender;
        $this->id = $id;
    }

    function SetSender(Speler $speler)
    {
        $this->sender = $speler;
    }

    function IsValid(): bool
    {
        $isInvalid =
            Utilities::IsNullOrEmpty($this->receiver->naam) ||
            Utilities::IsNullOrEmpty($this->receiver->email) ||
            Utilities::IsNullOrEmpty($this->titel) ||
            Utilities::IsNullOrEmpty($this->body) ||
            preg_match("{{[A-Z]*}}", $this->titel, $matches) === 1 ||
            preg_match("{{[A-Z]*}}", $this->body, $matches) === 1;
        return !$isInvalid;
    }

    function Build()
    {
        $this->sender = $this->sender ?? new Speler(-1, "SKC Studentenvolleybal", "info@skcvolleybal.nl");
        $this->CalculateSignature();
    }

    static function FillTemplate($entity, string $template): string
    {
        if (preg_match_all('/{{[A-Z]*}}/', $template, $matches)) {
            foreach ($matches[0] as $placeholder) {
                $value = $entity->GetPlaceholderValue($placeholder);
                if ($value === null) continue;

                $template = str_replace($placeholder, $value, $template);
            }
        }

        return $template;
    }

    private function CalculateSignature(): void
    {
        $concatenatedEmail = $this->sender->email . $this->receiver->email . $this->titel . $this->body;
        $this->signature = hash("sha1", $concatenatedEmail);
    }
}
