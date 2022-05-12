<?php

namespace BeachPortal\UseCases;

use BeachPortal\Gateways\DocumentGateway;

class GetAlgemeneInformatie implements Interactor
{
    function __construct(DocumentGateway $documentGateway)
    {
        $this->documentGateway = $documentGateway;
    }

    public function Execute(object $data = null)
    {
        $document = $this->documentGateway->GetDocumentById(1);

        return $document->content;
    }
}
