<?php

namespace App\Http\Controllers;

use App\Models\Option;
use App\Models\Poll;
use App\Models\Vote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class VoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($poll_id)
    {
        return Inertia::render('Votes/Index', [
            'poll' => Poll::with('options:id,poll_id,option_text')->find($poll_id),
        ]);
    }

    public function store(Request $request)
    {
        $poll = Poll::find($request->poll_id);

        if ($poll->isExpired()) {
            return back()->with('error', 'This poll has expired.');
        }

        if ($poll->hasUserVoted(auth()->user()->id)) {
            return back()->with('error', 'You have already voted on this poll.');
        }

        $validated = $request->validate([
            'option_id' => 'required|exists:options,id',
        ]);

        DB::transaction(function () use ($poll, $validated) {
            Vote::create([
                'user_id' => auth()->id(),
                'poll_id' => $poll->id,
                'option_id' => $validated['option_id'],
            ]);

            Option::where('id', $validated['option_id'])
                ->increment('vote_count');
        });

        return redirect('/dashboard')->with('success', 'Vote recorded successfully.');

    }

    public function history()
    {
        $votes = auth()->user()->votes()
            ->with(['poll:id,title', 'option:id,option_text'])
            ->latest()
            ->paginate(15);

        return Inertia::render('Votes/History', [
            'votes' => $votes,
        ]);
    }

    public function result()
    {
        $polls = Poll::expired()->withCount('votes')
            ->with('options:id,poll_id,option_text,vote_count')
            ->latest()
            ->paginate(10);

        return Inertia::render('Votes/Result', [
            'polls' => $polls,
        ]);
    }

}
