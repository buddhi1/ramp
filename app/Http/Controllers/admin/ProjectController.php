<?php

namespace App\Http\Controllers\admin;

use App\Models\Project;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class ProjectController extends Controller
{
    public function index(){
        $userId = Auth::id();

        // Fetch projects belonging to the current user
        $projects = Project::where('owner_id', $userId)->get();
        return view('projects.index', compact('projects'));
    }

    public function create(){
        return view('projects.create');
    }

    public function store(Request $request){
        $request->validate([
            // Validation rules for project creation
            'name'=>'required', 
            'type'=>'required',
            'irb_data'=>'required',
            'status'=>'required'
        ]);

        $ownerId = Auth::id();
        
        Project::create([
            'type' => $request->type,
            'irb_data' => $request->irb_data,
            'name' => $request->name,
            'status' => $request->status,
            'owner_id' => $ownerId
        ]);

        return Redirect::route('projects.index');
    }

    public function edit(Project $project){
        $this->authorize('update', $project);
        return view('projects.edit', compact('project'));
    }

    public function update(Request $request, Project $project){
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
    
    public function destroy(Project $project){
        $project->delete();
        return redirect()->route('projects.index');
    }
}
