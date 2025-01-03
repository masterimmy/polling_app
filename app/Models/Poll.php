<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Poll extends Model
{
    protected $fillable = ['title', 'description', 'admin_id', 'expires_at'];

    protected $casts = [
        'expires_at' => 'datetime',
    ];
}
