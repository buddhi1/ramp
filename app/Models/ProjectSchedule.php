<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectSchedule extends Model
{
    protected $fillable = ['project_id', 'schedule_data'];

    protected $casts = [
        'schedule_data' => 'array'
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
} 