<?php

namespace App\Jobs;

use App\Models\User;
use App\Models\Appeal as AppealModel;
use App\Notifications\Appeal as AppealNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Notification;

class Appeal implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private AppealModel $appeal;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(AppealModel $appeal)
    {
        $this->appeal = $appeal;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $users = User::all();
        foreach ($users as $user) {
            Notification::send($user, new AppealNotification($user, $this->appeal));
        }
    }
}
