<?php

namespace App\Http\Controllers;

use App\Http\Requests\PollValidationRequest;
use App\Models\Option;
use App\Models\Poll;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PollController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Polls/Index', [
            'polls' => Poll::latest()->paginate(6),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Polls/AddEditPolls');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PollValidationRequest $request)
    {
        DB::beginTransaction();

        try {
            $validated = $request->validated();

            $poll = Poll::updateOrCreate([
                'id' => $request->id ?? null,
            ], [
                'admin_id' => auth()->user()->id,
                'title' => $validated['title'],
                'description' => $validated['description'],
                'expires_at' => $validated['expires_at'],
            ]);

            Option::where('poll_id', $poll->id)->delete();

            foreach ($validated['options'] as $option) {
                Option::create([
                    'poll_id' => $poll->id,
                    'option_text' => $option,
                ]);
            }

            DB::commit();

            return redirect('/polls')->with('success', 'Poll Created Successfully');

        } catch (\Throwable $e) {
            DB::rollBack();
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Poll $poll)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Poll $poll)
    {
        return inertia('Polls/AddEditPolls', ['poll' => $poll]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Poll $poll)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Poll $poll)
    {
        $poll->delete();
        return redirect('/polls')->with('success', 'Poll Deleted Successfully');
    }
}
