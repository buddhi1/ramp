<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Project;

class ProjectPolicy
{
    /**
     * Create a new policy instance.
     */
    public function update(User $user, Project $project)
    {
        return $user->id === $project->owner_id;
    }
}
