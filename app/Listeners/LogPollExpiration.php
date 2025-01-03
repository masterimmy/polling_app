<?php

namespace App\Listeners;

use App\Events\PollExpired;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class LogPollExpiration
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(PollExpired $event): void
    {
        Log::info('Poll expired', [
            'poll_id' => $event->poll->id,
            'title' => $event->poll->title,
            'expired_at' => now(),
        ]);
    }
}
