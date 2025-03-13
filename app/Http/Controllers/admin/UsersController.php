<?php

namespace App\Http\Controllers\admin;

use App\Models\Attribute;
use App\Models\DataPolicy;
use App\Models\Project;
use App\Models\User;
use App\Models\Role;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;

class UsersController extends Controller
{
    public function index()
    {
        $userId = Auth::id();

        // Fetch projects belonging to the current user
        $users = User::with('roles')->get();
        $projects = Project::select('id', 'name')->get();

        return view('users.index', compact('users', 'projects'));
    }

    public function create()
    {
    }

    public function store(Request $request)
    {
       
    }

    public function edit(User $user)
    {
        return view('users.edit', compact('user'));
    }

    public function update(Request $request, User $user)
    {
        $user_to_update = User::find($user->id);
        
        $rules = [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', Rule::unique(User::class)->ignore($user->id)],
        ];

        // Validate the request
        $validated = $request->validate($rules);

        // Update user details
        $user_to_update->name = $validated['name'];
        $user_to_update->email = $validated['email'];

        // Reset email verification if email changed
        if ($user_to_update->isDirty('email')) {
            $user_to_update->email_verified_at = null;
        }

        $user_to_update->save();

        if($request->role){
            $user->roles()->detach();
            $user->assignRole(Role::where('name', $request->role)->first());
        }
        
        return Redirect::route('users.edit', ['user' => $user->id])->with('status', 'profile-updated');
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return redirect()->route('projects.index');
    }
}
