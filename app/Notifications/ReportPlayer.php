<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Models\User;
use App\Models\Report;

class ReportPlayer extends Notification implements ShouldQueue
{
    use Queueable;

    private User $user;
    private Report $report;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(User $user, Report $report)
    {
        $this->user = $user;
        $this->report = $report;
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
        return (new MailMessage)
            ->subject('Player Report')
            ->greeting('Hello ' . $this->user->name . '!')
            ->line('A player was reported on one of your servers!')
            ->line('Reported User: ' . $this->report->player_name)
            ->lineIf(!is_null($this->report->player_steam_id), 'Steam-ID User: ' . $this->report->player_steam_id)
            ->lineIf(!is_null($this->report->player_ip), 'IP User: ' . $this->report->player_ip)
            ->line('Reporter Name: ' . $this->report->reporter_name)
            ->line('Reporter Email: ' . $this->report->reporter_email);
    }
}
