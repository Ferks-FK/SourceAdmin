<?php

namespace App\View\Components;

use Illuminate\View\Component;

class Servers extends Component
{

    public $servers;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($servers)
    {
        $this->servers = $servers;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.servers');
    }
}
