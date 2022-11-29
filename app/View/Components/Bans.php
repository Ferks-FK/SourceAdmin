<?php

namespace App\View\Components;

use Illuminate\View\Component;

class Bans extends Component
{
    public $bans;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($bans)
    {
        $this->bans = $bans;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.bans');
    }
}
