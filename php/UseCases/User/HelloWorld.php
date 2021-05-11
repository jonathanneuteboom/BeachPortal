<?php

namespace BeachPortal\UseCases;

class HelloWorld implements Interactor
{
    public function Execute(object $data = null)
    {
        return "Hello World!";
    }
}
