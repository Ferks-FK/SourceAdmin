<?php

namespace App\Observers;

use App\Models\Mute;
use App\Models\TimeBan;
use Carbon\Carbon;

class MuteObserver
{
    /**
     * Handle the Mute "created" event.
     *
     * @param  \App\Models\Mute  $mute
     * @return void
     */
    public function created(Mute $mute)
    {
        //
    }

    /**
     * Handle the Mute "creating" event.
     *
     * @param  \App\Models\Mute  $mute
     * @return void
     */
    public function creating(Mute $mute)
    {
        $this->updatedMuteLength($mute);
    }

    /**
     * Handle the Mute "updated" event.
     *
     * @param  \App\Models\Mute  $mute
     * @return void
     */
    public function updated(Mute $mute)
    {
        //
    }

    /**
     * Handle the Mute "updating" event.
     *
     * @param  \App\Models\Mute  $mute
     * @return void
     */
    public function updating(Mute $mute)
    {
        $this->updatedMuteLength($mute);
    }

    /**
     * Handle the Mute "deleted" event.
     *
     * @param  \App\Models\Mute  $mute
     * @return void
     */
    public function deleted(Mute $mute)
    {
        //
    }

    /**
     * Handle the Mute "restored" event.
     *
     * @param  \App\Models\Mute  $mute
     * @return void
     */
    public function restored(Mute $mute)
    {
        //
    }

    /**
     * Handle the Mute "force deleted" event.
     *
     * @param  \App\Models\Mute  $mute
     * @return void
     */
    public function forceDeleted(Mute $mute)
    {
        //
    }

    protected function updatedMuteLength(Mute $mute): void
    {
        $time_ban = TimeBan::where('id', $mute->time_ban_id)->get('value')->first();

        // Set to null if the mute is permanent.
        if ($time_ban->value == 0) {
            $mute->end_at = null;

            return;
        }

        // Set a new end date for the mute if it is not permanent.
        if ($time_ban->value != 0) {
            $end_at = Carbon::now(config('app.timezone'))->addMinutes($time_ban->value)->toDateTimeString();

            $mute->end_at = $end_at;

            return;
        }
    }
}
