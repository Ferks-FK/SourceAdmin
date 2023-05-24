<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Helpers\SteamHelper;
use App\Models\User;
use App\Models\Report;

class ReportPlayer extends Notification implements ShouldQueue
{
    use Queueable;

    private User $user;
    private Report $report;
    private SteamHelper $steamHelper;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(User $user, Report $report)
    {
        $this->user = $user;
        $this->report = $report;
        $this->steamHelper = new SteamHelper;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via()
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail()
    {
        $steamProfile = is_null($this->report->player_steam_id) ? null : $this->steamHelper->generateSteamProfileLink($this->report->player_steam_id);

        return (new MailMessage)
            ->subject('Player Report')
            ->markdown('mail.playerReported', [
                'userName' => $this->user->name,
                'content' => $this->report,
                'steamIDUrl' => $steamProfile
            ]);
    }
}
