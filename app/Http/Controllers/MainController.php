<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;

abstract class MainController extends Controller
{
    protected Request $request;
    public $includes;

    public function __construct(Request $request)
    {
        $this->request = $request;

        $input = $this->request->input('include', []);
        $input = is_array($input) ? $input : explode(',', $input);

        $this->includes = (new Collection($input))->map(function ($value) {
            return trim($value);
        })->filter()->toArray();
    }

    /**
     * Returns an array with only valid includes.
     *
     * @param array $includes
     */
    public function validateIncludes(array $includes): array
    {
        $data_includes = [];

        foreach($this->includes as $include){
            if (in_array($include, $includes)) {
                array_push($data_includes, $include);
            }
        }

        return $data_includes;
    }
}
