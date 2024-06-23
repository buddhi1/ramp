<?php

namespace App\Http\Controllers\admin;

use App\Models\Attribute;
use App\Models\DataPolicy;
use App\Models\Project;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class UsersController extends Controller
{
    public function index()
    {
        $userId = Auth::id();

        // Fetch projects belonging to the current user
        $users = User::with('roles')->get();
        return view('users.index', compact('users'));
    }

    public function create()
    {
        return view('projects.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            // Validation rules for project creation
            'name' => 'required',
            'type' => 'required',
            'irb_data' => 'required',
            'status' => 'required'
        ]);
        function debug_to_console($data)
        {
            $output = $data;
            if (is_array($output))
                $output = implode(',', $output);

            echo "<script>console.log('Debug Objects: " . $output . "' );</script>";
        }
        $ownerId = Auth::id();
        $attrbs = json_encode($request->select_attrbs);
        debug_to_console(json_encode($request->select_attrbs));
        $project = Project::create([
            'type' => $request->type,
            'irb_data' => $request->irb_data,
            'name' => $request->name,
            'status' => $request->status,
            'owner_id' => $request->select_user
        ]);

        $attrbsArray = json_decode($attrbs, true);

        // Prepare an array of data for each record
        $data = [];
        foreach ($attrbsArray as $attrb) {
            $data[] = [
                'project_id' => $project->id,
                'data_attr_id' => $attrb
            ];
        }

        DataPolicy::insert($data);

        return Redirect::route('projects.index');
    }

    public function edit(User $user)
    {
    
        return view('users.edit', compact('user'));
    }

    public function update(Request $request, Project $project)
    {
        $this->authorize('update', $project);

        $project->update([
            'name' => $request->input('name'),
            'type' => $request->input('type'),
            'status' => $request->input('status'),
            'irb_data' => $request->input('irb_data'),
            // Add other fields as needed
        ]);

        return Redirect::route('projects.edit', ['project' => $project->id])->with('status', 'project-updated');
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return redirect()->route('projects.index');
    }
}
