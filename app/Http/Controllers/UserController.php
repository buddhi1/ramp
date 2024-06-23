<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Gate;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('users.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        if(Gate::denies('create-user')){
            abort(401, 'Unauthotized');
        };
        
        $request->validate(['name'=>'required', 
            'email'=>'required',
            'password'=>'required']);        
        $user = new User([
            'name' => $request->get('name'),
            'password' => $request->get('last_name'),
            'email' => $request->get('email')]);
        // asign default role user when user is created
        $user->assignRole(Role::where('name', 'User')->first());

        $user->save();
        return redirect('/users')->with('success', 'User saved!');  
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
