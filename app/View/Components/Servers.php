<?php

namespace App\View\Components;

use Illuminate\View\Component;

class Servers extends Component
{
    public $serverCount;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($serverCount)
    {
        $this->serverCount = $serverCount;
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
