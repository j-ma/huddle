<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Http\Requests;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     * Update the user's permissions and Role with the request state of their permissions and Roles.
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        /* Example JSON of request
        *
        $request =json_encode(array(
             'api_token' => 1,
             'user_id' =>  7,
             'permissions' => array(
                 'model.update' => true,
                 'model.view' => true,
             ),
             'role_id' => 1,
         ));
         $response = json_decode($request);
         */
         try {
             //Check if Role Id exists
             if(!\Sentinel::findRoleById($response->role_id))
             {
                 return response()->error("Unta" , "Unable to find Role with role_id ".$response->role_id);
             }

             //Check if User Id Exists
             if(!\Sentinel::findUserById($response->user_id))
             {
                 return response()->error("Umesh" ,"Unable to find User with user_id ".$response->user_id);
             }

             //Update Role first
             $user = Sentinel::findById($response->user_id);
             $role = Sentinel::findRoleById($response->role_id);

             $user->roles()->sync([$role->id]);

             //Update Permissions next
             $user = \Sentinel::findById($response->user_id);
             $user->permissions = json_decode(json_encode($response->permissions), True);
             $user->save();

             return response()->success();
         } catch (Exception $e) {
             return response()->error("Ulysses" , $e);
         }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
    }
}
