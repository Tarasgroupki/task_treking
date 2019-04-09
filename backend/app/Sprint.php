<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon;

class Sprint extends Model
{
    protected $fillable = [
        'title',
        'description',
        'status',
        'lead_assigned_id',
        'user_created_id',
        'deadline',

    ];
    protected $dates = ['deadline'];

    public function lead()
    {
        return $this->belongsTo(Lead::class, 'lead_assigned_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'user_created_id');
    }

    public function getDaysUntilDeadlineAttribute()
    {
        return Carbon\Carbon::now()
            ->startOfDay()
            ->diffInDays($this->deadline, false); // if you are past your deadline, the value returned will be negative.
    }
}
