<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class ItemRequest extends Request
{
    public function authorize()
    {
        if ($this->isSuperuser()) {
            return true;
        }

        if ($this->authenticate()) {
            switch (strtoupper($this->getMethod())) {
                case 'POST':
                    return $this->getUser()->hasAccess(['item.store']);
                    break;
                case 'GET':
                    return $this->getUser()->hasAccess(['item.show']);
                    break;
                case 'PUT':
                    return $this->getUser()->hasAccess(['item.update']);
                    break;
                case 'DELETE':
                    return $this->getUser()->hasAccess(['item.destroy']);
                    break;
                default:
                    break;
            }
        }

        return false;
    }

    public function createRules()
    {
        return [
            'name'     => ['required', 'string', 'max:255'],
            'quantity' => ['required', 'integer', 'min:0'],
        ];
    }

    public function updateRules()
    {
        return [
            'name'     => ['string', 'max:255'],
            'quantity' => ['integer', 'min:0'],
        ];
    }
}
