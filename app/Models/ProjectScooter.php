<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectScooter extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id', // Add project_id to the fillable array
        'scooter_id',
    ];
}
