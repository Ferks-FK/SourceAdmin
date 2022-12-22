<?php

namespace App\Http\Livewire;

use LivewireUI\Modal\ModalComponent;

class Modal extends ModalComponent
{
    public $action;
    public $player_id;
    public $player_name;
    public $server_id;

    public function mount($action, $player_id, $player_name, $server_id)
    {
        $this->action = $action;
        $this->player_id = $player_id;
        $this->player_name = $player_name;
        $this->server_id = $server_id;
    }

    public function render()
    {
        return view('livewire.modal');
    }
}
