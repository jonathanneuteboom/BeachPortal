<?php

namespace BeachPortal\Gateways;

use BeachPortal\Common\Database;
use PHPMailer\PHPMailer\PHPMailer;
use BeachPortal\Entities\Email;
use BeachPortal\Entities\Speler;
use UnexpectedValueException;

class EmailGateway
{
    function __construct(Database $database)
    {
        $this->database = $database;
    }

    public function QueueEmails(array $emails): void
    {
        foreach ($emails as $email) {
            $email->Build();

            if (!$email->IsValid()) {
                continue;
            }

            if ($this->DoesEmailExist($email)) {
                continue;
            }

            $query = "INSERT INTO TeamPortal_email (
                        sender_naam,
                        sender_email,
                        receiver_naam,
                        receiver_email,
                        titel,
                        body,
                        signature
                      ) VALUES (?, ?, ?, ?, ?, ?, ?)";
            $params = [
                $email->sender->naam,
                $email->sender->email,
                $email->receiver->naam,
                $email->receiver->email,
                $email->titel,
                $email->body,
                $email->signature
            ];
            $this->database->Execute($query, $params);
        }
    }

    public function SendQueuedEmails(): int
    {
        $query = "SELECT 
                    id,
                    sender_email as senderEmail,
                    sender_naam as sender,
                    receiver_email as receiverEmail,
                    receiver_naam as receiver,
                    titel,
                    body
                  FROM TeamPortal_email WHERE send_date is null";
        $rows = $this->database->Execute($query);

        if (count($rows) == 0) {
            return 0;
        }

        foreach ($rows as $i => $row) {

            $newEmail = new Email(
                $row->titel,
                $row->body,
                new Speler(-1, $row->receiver, $row->receiverEmail),
                new Speler(-1, $row->sender, $row->senderEmail),
                $row->id
            );

            $this->SendMail($newEmail);
            $this->MarkEmailAsSent($newEmail);
        }

        return count($rows);
    }

    private function DoesEmailExist(Email $email): bool
    {
        $query = "SELECT id FROM TeamPortal_email WHERE signature = '$email->signature'";
        $emails = $this->database->Execute($query);

        return count($emails) > 0;
    }

    private function MarkEmailAsSent(Email $email): void
    {
        $query = "UPDATE TeamPortal_email set send_date = NOW() where id = ?";
        $params = [$email->id];
        $this->database->Execute($query, $params);
    }

    private function SendMail(Email $email): void
    {
        if (
            !filter_var($email->sender->email, FILTER_VALIDATE_EMAIL) ||
            !filter_var($email->receiver->email, FILTER_VALIDATE_EMAIL)
        ) {
            throw new UnexpectedValueException("Foute email: '" . $email->sender->email . "' of '" . $email->receiver->email);
        }

        $PHPMailer = new PHPMailer();
        $PHPMailer->CharSet = 'UTF-8';
        $PHPMailer->setFrom($email->sender->email, $email->sender->naam);
        $PHPMailer->addAddress($email->receiver->email, $email->receiver->naam);
        $PHPMailer->Subject = $email->titel;
        $PHPMailer->msgHTML($email->body);
        $PHPMailer->addCustomHeader("List-Unsubscribe", '<unsubscribe@skcvolleybal.nl>');

        if (!$PHPMailer->send()) {
            throw new UnexpectedValueException('Mailer Error: ' . $PHPMailer->ErrorInfo);
        }
    }
}
