<?php

namespace App\Http\Controllers\admin;

use App\Exports\JsontoExcelExport;
use App\Models\Attribute;
use App\Models\DataPolicy;
use App\Models\Project;
use App\Models\ProjectScooter;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;

// function debug_to_console($data)
// {
//     $output = $data;
//     if (is_array($output))
//         $output = implode(',', $output);

//     echo "<script>console.log('Debug Objects: " . $output . "' );</script>";
// }
class ProjectController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        if ($user->hasRole('ADMIN')) {
            $projects = Project::latest()->paginate(10);
        } else {
            $projects = Project::where('owner_id', $user->id)->latest()->paginate(10);
        }
        // Fetch projects belonging to the current user

        return view('projects.index', compact('projects'));
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
            'start_time' => 'required',
            'end_time' => 'required',
            'irb_data' => 'required',
            'status' => 'required',
            'fleet_number' => 'required',
            // 'scooters' => 'required|array', // Validate scooters as an array
        ]);

        $start_time_epoch = strtotime($request->start_time) * 1000;
        $end_time_epoch = strtotime($request->end_time) * 1000;

        if ($start_time_epoch > $end_time_epoch) {
            return redirect()->back()->withInput()->withErrors(['start_time' => 'Start time cannot be greater than end time']);
        }
        // this is to console and debug
        function debug_to_console($data)
        {

            echo "<script>console.log('Debug Objects: " . $data . "' );</script>";
        }
        $attrbs = json_encode($request->select_attrbs);
        debug_to_console(json_encode($request->select_attrbs));
        $project = Project::create([
            'type' => $request->type,
            'irb_data' => $request->irb_data,
            'name' => $request->name,
            'status' => $request->status,
            'start_time' => $start_time_epoch,
            'end_time' => $end_time_epoch,
            'owner_id' => $request->select_user,
            'fleet_number' => $request->fleet_number
        ]);

        for ($i = 0; $i < $request->fleet_number; $i++) {
            ProjectScooter::firstOrCreate([
                'project_id' => $project->id,
                'scooter_id' => $i,
            ]);
        }

        $attrbsArray = json_decode($attrbs, true);
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

    public function edit(Project $project)
    {
        $user = Auth::user();
        if ($user->hasRole('ADMIN')) {

        } else {
            $this->authorize('update', $project);
        }

        $project->attributes = DataPolicy::where('project_id', $project->id)
            ->join('attributes', 'data_policies.data_attr_id', '=', 'attributes.id')
            ->select('attributes.name', 'attributes.id')
            ->get();

        return view('projects.edit', compact('project'));
    }

    public function update(Request $request, Project $project)
    {
        $user = Auth::user();
        if ($user->hasRole('ADMIN')) {

        } else {
            $this->authorize('update', $project);
        }

        $start_time_epoch = strtotime($request->input('start_time')) * 1000;
        $end_time_epoch = strtotime($request->input('end_time')) * 1000;

        if ($start_time_epoch > $end_time_epoch) {
            return redirect()->back()->withInput()->withErrors(['start_time' => 'Start time cannot be greater than end time']);
        }


        $project->update([
            'name' => $request->input('name'),
            'type' => $request->input('type'),
            'status' => $request->input('status'),
            'start_time' => $start_time_epoch,
            'end_time' => $end_time_epoch,
            'irb_data' => $request->input('irb_data'),
            'fleet_number' => $request->input('fleet_number'),
        ]);

        if ($request->has('select_attrbs')) {
            $attrbs = json_encode($request->select_attrbs);
            $attrbsArray = json_decode($attrbs, true);

            DataPolicy::where('project_id', $project->id)->delete();

            $data = [];
            foreach ($attrbsArray as $attrb) {
                $data[] = [
                    'project_id' => $project->id,
                    'data_attr_id' => $attrb
                ];
            }

            // Insert updated data policies
            DataPolicy::insert($data);
        }

        return Redirect::route('projects.edit', ['project' => $project->id])->with('status', 'project-updated');
    }

    public function download(Request $request, Project $project)
    {
        $type = $request->input('file_type');

        switch ($type) {
            case 'JSON':
                //currently loading sample json
                $filePath = storage_path('app/trips.json');
               return response()->download($filePath);
            case 'CSV':
                $json = Storage::get('trips.json');
                $data = json_decode($json, true);
                return Excel::download(new JsontoExcelExport($data), 'trips.xlsx');
                // break;
            default:
                return Redirect::route('projects.edit', ['project' => $project->id])->with('status', 'Something went wrong, try again.');
        }

        // return response()->download($filePath);
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return redirect()->route('projects.index');
    }
}
