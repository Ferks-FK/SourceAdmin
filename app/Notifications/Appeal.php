<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Helpers\SteamHelper;
use App\Models\User;
use App\Models\Appeal as AppealModel;

class Appeal extends Notification implements ShouldQueue
{
    use Queueable;

    private User $user;
    private AppealModel $appeal;
    private SteamHelper $steamHelper;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(User $user, AppealModel $appeal)
    {
        $this->user = $user;
        $this->appeal = $appeal;
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
        $steamProfile = is_null($this->appeal->player_steam_id) ? null : $this->steamHelper->generateSteamProfileLink($this->appeal->player_steam_id);

        return (new MailMessage)
            ->subject('Appeal Received')
            ->markdown('mail.appeal', [
                'userName' => $this->user->name,
                'content' => $this->appeal,
                'steamIDUrl' => $steamProfile
            ]);
    }
}
