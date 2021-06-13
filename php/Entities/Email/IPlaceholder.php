<?php

namespace BeachPortal\Entities;

interface IPlaceholder
{
    function GetPlaceholderValue(string $placeholder): ?string;
}
