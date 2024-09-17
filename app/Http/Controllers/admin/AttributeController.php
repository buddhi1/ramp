<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Attribute;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class AttributeController extends Controller
{
    public function index(){
        $attributes = Attribute::get();
        return view('attributes.index', compact('attributes'));
    }

    public function create(){
        return view('attributes.create');
    }

    public function store(Request $request){
        $request->validate([
            // Validation rules for attribute creation
            'name'=>'required', 
            'description'=>'required',
            'data'=>'required',
        ]);

        $ownerId = Auth::id();
            
        Attribute::create([
            'name' => $request->name,
            'description' => $request->description,
            'data' => json_encode($request->data)
        ]);
        return Redirect::route('attributes.index');
    }

    public function edit(Attribute $attribute){
        // $this->authorize('update', $attribute);
        return view('attributes.edit', compact('attribute'));
    }

    public function update(Request $request, Attribute $attribute){
        // $this->authorize('update', $attribute);

        $attribute->update([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'data' => $request->json_encode(input('data'))
            // Add other fields as needed
        ]);

        return Redirect::route('attributes.edit', ['attribute' => $attribute->id])->with('status', 'attribute-updated');
    }
    
    public function destroy(Attribute $attribute){
        $attribute->delete();
        return redirect()->route('attributes.index');
    }
}
