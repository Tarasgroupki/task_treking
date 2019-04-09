<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
     protected $fillable = [
        'user_added_id',
        'task_assigned_id',
        'mark'
    ];

    public function task()
        {
            return $this->belongsTo(Task::class, 'task_assigned_id');
        }

    public function getEditorUserAttribute()
        {
            return User::findOrFail($this->user_added_id);
        }
}
