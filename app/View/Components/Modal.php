<?php

namespace App\View\Components;

use Illuminate\View\Component;

class Modal extends Component
{
    public $action;
    public $player;
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($action, $player)
    {
        $this->action = $action;
        $this->player = $player;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.modal');
    }
}
