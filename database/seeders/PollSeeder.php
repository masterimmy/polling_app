<?php

namespace Database\Seeders;

use App\Models\Option;
use App\Models\Poll;
use App\Models\User;
use Illuminate\Database\Seeder;

class PollSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admins = User::where('role', 'admin')->get();

        $polls = [
            [
                'title' => 'Preferred Party for Lok Sabha Election',
                'description' => 'This poll aims to capture the political preferences of voters for the upcoming Lok Sabha elections.',
                'options' => [
                    'Indian National Congress (INC)',
                    'Bharatiya Janata Party (BJP)',
                    'Aam Aadmi Party (AAP)',
                    'Nationalist Congress Party (NCP)',
                    'Trinamool Congress (TMC)',
                    'Other',
                ],
            ],
            [
                'title' => 'Preferred Payment Method for Online Shopping',
                'description' => 'This poll seeks to identify the most common payment methods used for online shopping and preferences when it comes to digital transactions.',
                'options' => [
                    'Credit/Debit Card',
                    'UPI (Unified Payments Interface)',
                    'PayPal',
                    'Cash on Delivery',
                    'Other',
                ],
            ],
            [
                'title' => 'Favorite Social Media Platform',
                'description' => 'This poll explores which social media platforms users prefer for communication, entertainment, and information sharing.',
                'options' => [
                    'Facebook',
                    'Instagram',
                    'Twitter',
                    'LinkedIn',
                    'Snapchat',
                    'Other',
                ],
            ],
        ];

        foreach ($polls as $pollData) {

            $admin = $admins->random();

            $expiresAt = now()->addDays(rand(1, 7));

            $poll = Poll::create([
                'title' => $pollData['title'],
                'description' => $pollData['description'],
                'admin_id' => $admin->id,
                'expires_at' => $expiresAt,
            ]);

            foreach ($pollData['options'] as $optionText) {
                Option::create([
                    'poll_id' => $poll->id,
                    'option_text' => $optionText,
                    'vote_count' => 0,
                ]);
            }
        }
    }
}
