<?php

namespace App\Http\Controllers\admin;

use App\Exports\JsontoExcelExport;
use App\Models\DataPolicy;
use App\Models\Project;
use App\Models\ProjectSchedule;
use App\Models\ProjectScooter;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\DB;

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
        if ($user->isAdmin()) {
            $projects = Project::latest()->paginate(10);
        } else {
            $projects = Project::where('owner_id', $user->id)->latest()->paginate(10);
        }
        // Fetch projects belonging to the current user

        return view('projects.index', compact('projects'));
    }

    public function create()
    {
        $daysOfWeek = [
            'monday' => 'Monday',
            'tuesday' => 'Tuesday',
            'wednesday' => 'Wednesday',
            'thursday' => 'Thursday',
            'friday' => 'Friday',
            'saturday' => 'Saturday',
            'sunday' => 'Sunday',
        ];
        
        return view('projects.create', compact('daysOfWeek'));
    }

    public function store(Request $request)
    {
        try {
            DB::beginTransaction();
            
            $request->validate([
                'name' => 'required',
                'type' => 'required',
                'start_time' => 'required',
                'end_time' => 'required',
                'irb_data' => 'required',
                'status' => 'required',
                'fleet_number' => 'required',
                'selected_days' => 'array',
                'selected_days.*' => 'string|in:monday,tuesday,wednesday,thursday,friday,saturday,sunday',
            ]);

            $start_time_epoch = strtotime($request->start_time) * 1000;
            $end_time_epoch = strtotime($request->end_time) * 1000;

            if ($start_time_epoch > $end_time_epoch) {
                return redirect()->back()->withInput()->withErrors(['start_time' => 'Start time cannot be greater than end time']);
            }

            // Create project
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

            // Process schedule data with default 24/7 if no days selected
            $scheduleData = [];
            $daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
            
            if (empty($request->selected_days)) {
                // Set 24/7 schedule for all days if none selected
                foreach ($daysOfWeek as $day) {
                    $scheduleData[$day] = [
                        'enabled' => true,
                        'start_time' => '00:00',
                        'end_time' => '23:59',
                    ];
                }
            } else {
                // Use selected schedule
                foreach ($request->selected_days as $day) {
                    $scheduleData[$day] = [
                        'enabled' => true,
                        'start_time' => $request->input("start_time_$day", "09:00"),
                        'end_time' => $request->input("end_time_$day", "17:00"),
                    ];
                }
            }

            // Create schedule record
            $project->schedule()->create([
                'schedule_data' => $scheduleData
            ]);

            // Create project scooters
            for ($i = 0; $i < $request->fleet_number; $i++) {
                ProjectScooter::firstOrCreate([
                    'project_id' => $project->id,
                    'scooter_id' => $i,
                ]);
            }

            // Process attributes
            if ($request->has('select_attrbs')) {
                $attrbs = $request->select_attrbs;
                $data = array_map(function($attrb) use ($project) {
                    return [
                        'project_id' => $project->id,
                        'data_attr_id' => $attrb
                    ];
                }, $attrbs);
                DataPolicy::insert($data);
            }

            DB::commit();
            return redirect()->route('projects.index')->with('status', 'project-created');

        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()
                ->withInput()
                ->withErrors(['error' => 'Failed to create project. ' . $e->getMessage()]);
        }
    }

    public function edit(Project $project)
    {
        $user = Auth::user();
        if (!$user->isAdmin()) {
            $this->authorize('update', $project);
        }

        $daysOfWeek = [
            'monday' => 'Monday',
            'tuesday' => 'Tuesday',
            'wednesday' => 'Wednesday',
            'thursday' => 'Thursday',
            'friday' => 'Friday',
            'saturday' => 'Saturday',
            'sunday' => 'Sunday',
        ];

        $project->attributes = DataPolicy::where('project_id', $project->id)
            ->join('attributes', 'data_policies.data_attr_id', '=', 'attributes.id')
            ->select('attributes.name', 'attributes.id')
            ->get();

        $project->schedule_data = $project->schedule ? $project->schedule->schedule_data : [];

        return view('projects.edit', compact('project', 'daysOfWeek'));
    }

    public function update(Request $request, Project $project)
    {
        try {
            DB::beginTransaction();

            $request->validate([
                'name' => 'required',
                'type' => 'required',
                'start_time' => 'required',
                'end_time' => 'required',
                'irb_data' => 'required',
                'status' => 'required',
                'fleet_number' => 'required|integer|min:0',
                'selected_days' => 'required|array',
                'selected_days.*' => 'string|in:monday,tuesday,wednesday,thursday,friday,saturday,sunday',
            ]);

            $start_time_epoch = strtotime($request->start_time) * 1000;
            $end_time_epoch = strtotime($request->end_time) * 1000;

            if ($start_time_epoch > $end_time_epoch) {
                return redirect()->back()->withInput()->withErrors(['start_time' => 'Start time cannot be greater than end time']);
            }

            // Update project
            $project->update([
                'name' => $request->name,
                'type' => $request->type,
                'status' => $request->status,
                'start_time' => $start_time_epoch,
                'end_time' => $end_time_epoch,
                'irb_data' => $request->irb_data,
                'fleet_number' => $request->fleet_number,
            ]);

            // Update schedule data
            $scheduleData = [];
            foreach ($request->selected_days as $day) {
                $scheduleData[$day] = [
                    'enabled' => true,
                    'start_time' => $request->input("start_time_$day", "09:00"),
                    'end_time' => $request->input("end_time_$day", "17:00"),
                ];
            }

            $project->schedule()->updateOrCreate(
                ['project_id' => $project->id],
                ['schedule_data' => $scheduleData]
            );

            // Update project scooters
            ProjectScooter::where('project_id', $project->id)->delete();
            for ($i = 0; $i < $request->fleet_number; $i++) {
                ProjectScooter::create([
                    'project_id' => $project->id,
                    'scooter_id' => $i,
                ]);
            }

            // Update attributes
            if ($request->has('select_attrbs')) {
                $attrbs = $request->select_attrbs;
                DataPolicy::where('project_id', $project->id)->delete();
                
                $data = array_map(function($attrb) use ($project) {
                    return [
                        'project_id' => $project->id,
                        'data_attr_id' => $attrb
                    ];
                }, $attrbs);
                DataPolicy::insert($data);
            }

            DB::commit();
            return redirect()->route('projects.edit', $project)->with('status', 'project-updated');

        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()
                ->withInput()
                ->withErrors(['error' => 'Failed to update project. ' . $e->getMessage()]);
        }
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

    // retrive project info for the dashboard
    public function projectSummary()
    {
        $user = Auth::user();

        // if ($user->isAdmin()) {
            $projects = Project::all();
        // } else {
        //     // only fetch the projects belong to the current user
        //     $projects = Project::where('owner_id', $user->id)->get();
        // }

        foreach ($projects as $project) {
            $project->attributes = DataPolicy::where('project_id', $project->id)
            ->join('attributes', 'data_policies.data_attr_id', '=', 'attributes.id')
            ->select('attributes.name', 'attributes.id')
            ->get();
        }

        return view('dashboard', compact('projects'));
    }
}
