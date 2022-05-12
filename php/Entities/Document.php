<?php

namespace BeachPortal\Entities;

class Document
{
  public int $id;
  public string $content;

  function __construct(int $id, string $content)
  {
    $this->id = $id;
    $this->content = $content;
  }
}
