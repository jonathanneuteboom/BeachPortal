<?php

namespace BeachPortal\Gateways;

use BeachPortal\Common\Database;
use BeachPortal\Entities\Document;

class DocumentGateway
{
    function __construct(Database $database)
    {
        $this->database = $database;
    }

    public function GetDocumentById($id): ?Document
    {
        $query = "SELECT id, content FROM beach_document where id = ?";
        $params = [$id];
        $rows = $this->database->Execute($query, $params);
        return count($rows) > 0 ? $this->MapToDocument($rows[0]) : null;
    }


    public function UpdateDocument(Document $document): void
    {
        $query = "UPDATE beach_document SET content = ? where id = ?";
        $params = [$document->content, $document->id];
        $this->database->Execute($query, $params);
    }

    public function AddDocument(Document $document): void
    {
        $query = "INSERT INTO beach_document (id, content) VALUES (?, ?)";
        $params = [$document->id, $document->content];
        $this->database->Execute($query, $params);
    }

    private function MapToDocument($row): Document
    {
        return new Document($row->id, $row->content);
    }
}
