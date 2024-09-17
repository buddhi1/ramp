<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Exports\JsontoExcelExport;

use App\Models\Project;

use Illuminate\Support\Facades\Redirect;
use Maatwebsite\Excel\Facades\Excel;

use Illuminate\Support\Facades\Storage;


class DownloadController extends Controller
{
    //data download function
    public function trips(Request $request, Project $project)
    {
        $type = $request->input('file_type');

        // echo $request;

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
            // default:
            //     return Redirect::route('projects.edit', ['project' => $project->id])->with('status', 'Something went wrong, try again.');
        }

        // return response()->download($filePath);
    }
}
