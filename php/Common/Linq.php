<?php

namespace BeachPortal\Common;

use UnexpectedValueException;

class Linq
{
    static function From(array $items): IterableLinq
    {
        return new IterableLinq($items);
    }
}

class IterableLinq
{
    private array $items = [];

    public function __construct(array $items)
    {
        foreach ($items as $item) {
            $this->items[] = $item;
        }
    }

    public function Any(callable $function): bool
    {
        foreach ($this->items as $item) {
            if ($function($item)) {
                return true;
            }
        }

        return false;
    }

    public function FirstOrDefault(callable $function = NULL): ?object
    {
        $function = $function ?? $this->GetTrueFunction();

        foreach ($this->items as $item) {
            if ($function($item)) {
                return $item;
            }
        }

        return null;
    }

    public function Select(callable $function): IterableLinq
    {
        $result = [];
        foreach ($this->items as $item) {
            $result[] = $function($item);
        }

        $this->items = $result;

        return $this;
    }

    public function ToList(): array
    {
        return $this->items;
    }

    public function Distinct(): IterableLinq
    {
        $result = [];
        foreach ($this->items as $item) {
            if (array_search($item, $result) === false) {
                $result[] = $item;
            }
        }

        $this->items = $result;

        return $this;
    }

    public function Where(callable $function): IterableLinq
    {
        $result = [];
        foreach ($this->items as $item) {
            if ($function($item)) {
                $result[] = $item;
            }
        }

        $this->items = $result;

        return $this;
    }

    public function OrderBy(callable $function): IterableLinq
    {
        $sortFunction = function ($a, $b) use ($function) {
            return $function($a) > $function($b);
        };
        usort($this->items, $sortFunction);

        return $this;
    }

    public function OrderByDescending(callable $function): IterableLinq
    {
        $sortFunction = function ($a, $b) use ($function) {
            return $function($a) < $function($b);
        };
        usort($this->items, $sortFunction);

        return $this;
    }

    public function First(callable $function = NULL)
    {
        $function = $function ?? $this->GetTrueFunction();

        foreach ($this->items as $item) {
            if ($function($item)) {
                return $item;
            }
        }

        throw new UnexpectedValueException("Geen items die voldoen");
    }

    private function GetTrueFunction()
    {
        return function () {
            return true;
        };
    }
}
