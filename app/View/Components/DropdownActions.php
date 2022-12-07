<?php

namespace App\View\Components;

use Illuminate\View\Component;

class DropdownActions extends Component
{
    public $id;
    public $server;
    public $player;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($id, $server, $player)
    {
        $this->id = $id;
        $this->server = $server;
        $this->player = $player;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.dropdown-actions');
    }
}
