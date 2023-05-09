<?php

namespace App\Http\Controllers\Api;

use App\Models\people;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

use App\Modules\User\StorePersonFormRequest;
use App\Modules\User\UpdatePersonFormRequest;

class PeopleController extends Controller
{
    public function index()
    {
        $people = people::all();

        if($people->count() > 0)
        {
            return response()->json([
                'status' => 200,
                'people' => $people
            ], 200);
        }
        else
        {
            return response()->json([
                'status' => 404,
                'message' => 'No Records Found'
            ], 404);
        }
    }
    public function store(StorePersonFormRequest $request)
    {
        // $validator = Validator::make($request->all(),[
        //     'first_name' => 'required|string|max:191',
        //     'middle_name' => 'string|max:191',
        //     'last_name' => 'required|string|max:191',
        // ]);
        // if($validator->fails())
        // {
        //     return response()->json([
        //         'status' => 422,
        //         'errors' => $validator->messages()
        //     ], 422);
        // }
        // else
        // {
            $people = people::create([
                'first_name' => $request->first_name,
                'middle_name' => $request->middle_name,
                'last_name' => $request->last_name
            ]);

            if($people)
            {
                return response()->json([
                    'status' => 200,
                    'message' => "Person created successfully"
                ], 200);
            }
            else
            {
                return response()->json([
                    'status' => 500,
                    'message' => "Something went wrong"
                ], 500);
            }
        // }
    }
    public function show($id)
    {
        $person = people::find($id);
        if($person)
        {
            return response()->json([
                'status' => 200,
                'person' => $person
            ], 200);
        }
        else
        {
            return response()->json([
                'status' => 404,
                'message' => 'No Such Person Found!'
            ], 404);
        }
    }
    public function edit($id)
    {
        $person = people::find($id);
        if($person)
        {
            return response()->json([
                'status' => 200,
                'person' => $person
            ], 200);
        }
        else
        {
            return response()->json([
                'status' => 404,
                'message' => 'No Such Person Found!'
            ], 404);
        }
    }
    public function update(UpdatePersonFormRequest $request, $id)
    {
        // echo($request['first_name']);
        // $validator = Validator::make($request->all(),[
        //     'first_name' => 'required|string|max:191',
        //     'middle_name' => 'string|max:191',
        //     'last_name' => 'required|string|max:191',
        // ]);
        // if($validator->fails())
        // {
        //     return response()->json([
        //         'status' => 422,
        //         'errors' => $validator->messages()
        //     ], 422);
        // }
        // else
        // {
            $people = people::find($id);

            if($people)
            {
                $people->update([
                    'first_name' => $request->first_name,
                    'middle_name' => $request->middle_name,
                    'last_name' => $request->last_name
                ]);

                return response()->json([
                    'status' => 200,
                    'message' => "Person updated successfully"
                ], 200);
            }
            else
            {
                return response()->json([
                    'status' => 404,
                    'message' => "No such person found"
                ], 404);
            }
        // }
    }
    public function destroy($id)
    {
        $person = people::find($id);
        if($person)
        {
            $person->delete();
            return response()->json([
                'status' => 200,
                'message' => "Person deleted successfully"
            ], 200);
        }
        else
        {
            return response()->json([
                'status' => 404,
                'message' => "No such person found"
            ], 404);
        }
    }
}
