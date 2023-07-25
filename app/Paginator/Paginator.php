<?php

namespace App\Paginator;

use Illuminate\Pagination\LengthAwarePaginator;

class Paginator extends LengthAwarePaginator
{
    /**
     * Get the instance as an array.
     *
     * @return array
     */
    public function toArray()
    {
        return [
            'pagination_data' => $this->items->toArray(),
            'pagination_props' => [
                'total'       => $this->total(),
                'count'       => $this->count(),
                'perPage'     => $this->perPage(),
                'currentPage' => $this->currentPage(),
                'lastPage'    => $this->lastPage(),
                'links'       => $this->linkCollection()
            ],
        ];
    }
}
