<?php

namespace BeachPortal\UseCases;

use BeachPortal\Entities\Document;
use BeachPortal\Gateways\DocumentGateway;

class UpdateAlgemeneInformatie implements Interactor
{
    function __construct(DocumentGateway $documentGateway)
    {
        $this->documentGateway = $documentGateway;
    }

    public function Execute(object $data = null)
    {
        $content = $data->content;

        $document = $this->documentGateway->GetDocumentById(1);
        if (!$document) {
            $document = new Document(1, $content);
            $this->documentGateway->AddDocument($document);
        } else {
            $document->content = $content;
            $this->documentGateway->UpdateDocument($document);
        }
    }
}
