<?php

namespace App\Observers;

use App\Models\Ban;
use App\Models\TimeBan;
use Carbon\Carbon;

class BanObserver
{
    /**
     * Handle the Ban "created" event.
     *
     * @param  \App\Models\Ban  $ban
     * @return void
     */
    public function created(Ban $ban)
    {
        // Search the servers for the banned player, and if found, kick him.
    }

    /**
     * Handle the Ban "creating" event.
     *
     * @param  \App\Models\Ban  $ban
     * @return void
     */
    public function creating(Ban $ban)
    {
        $this->updatedBanLength($ban);
    }

    /**
     * Handle the Ban "updated" event.
     *
     * @param  \App\Models\Ban  $ban
     * @return void
     */
    public function updated(Ban $ban)
    {
        // Search the servers for the banned player, and if found, kick him.
    }

    /**
     * Handle the Ban "updating" event.
     *
     * @param  \App\Models\Ban  $ban
     * @return void
     */
    public function updating(Ban $ban)
    {
        $this->updatedBanLength($ban);
    }

    protected function updatedBanLength(Ban $ban): void
    {
        $time_ban = TimeBan::where('id', $ban->time_ban_id)->get('value')->first();

        // Set to null if the ban is permanent.
        if ($time_ban->value == 0) {
            $ban->end_at = null;

            return;
        }

        // Set a new end date for the ban if it is not permanent.
        if ($time_ban->value != 0) {
            $end_at = Carbon::now(config('app.timezone'))->addMinutes($time_ban->value)->toDateTimeString();

            $ban->end_at = $end_at;

            return;
        }
    }
}
