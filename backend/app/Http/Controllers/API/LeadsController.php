<?php
namespace App\Http\Controllers\API;

use DB;
use Auth;
use Carbon;
use Validator;
use Session;
use Datatables;
use App\Lead;
use App\Sprint;
use App\Task;
use App\User;
use App\Client;
use App\Http\Requests;
use Illuminate\Http\Request;
use App\Http\Controllers\API\APIBaseController as APIBaseController;

/**
 * Class LeadsController
 * @package App\Http\Controllers\API
 *
 *
 *
 *  * @SWG\Get(
 *      path="/leads",
 *      tags={"Leads"},
 *      summary="Get list of leads",
 *      description="Returns list of projects",
 *      @SWG\Response(
 *          response=200,
 *          description="successful operation"
 *       ),
 *       @SWG\Response(response=400, description="Bad request"),
 *       security={
 *           {
 *              "Bearer":{}
 *          }
 *       }
 *     )
 *
 * Returns list of index
 *
 *  * @SWG\Get(
 *      path="/leads/{id}",
 *      operationId="getIndexById",
 *      tags={"Leads"},
 *      summary="Get leads information",
 *      description="Returns leads data",
 *      @SWG\Parameter(
 *          name="id",
 *          description="Project id",
 *          required=true,
 *          type="integer",
 *          in="path"
 *      ),
 *      @SWG\Response(
 *          response=200,
 *          description="successful operation"
 *       ),
 *      @SWG\Response(response=400, description="Bad request"),
 *      @SWG\Response(response=404, description="Resource Not Found"),
 *      security={
 *         {
 *              "Bearer":{}
 *         }
 *     },
 * )
 *
 * * @SWG\Post(
 *   path="/leads",
 *   tags={"Leads"},
 *   summary="Create new lead",
 *    @SWG\Parameter(
 *          name="lead",
 *  description="Lead object that needs to be added to the store",@SWG\Schema(
 *     @SWG\Property(property="id", type="integer"),
 *     @SWG\Property(property="title", type="string"),
 *     @SWG\Property(property="description", type="text"),
 *     @SWG\Property(property="status", type="available"),
 *     @SWG\Property(property="user_assigned_id", type="integer"),
 *     @SWG\Property(property="user_created_id", type="integer"),
 *     @SWG\Property(property="client_id", type="integer"),
 *     @SWG\Property(property="contact_date", type="date"),
 *     ),
 *          in="body"
 *      ),
 *   @SWG\Response(response=200, description="successful operation"),
 *       security={
 *          {
 *              "Bearer":{}
 *          }
 *       }
 * )
 *)
 *
 *  * * * @SWG\Put(
 *   path="/leads/{id}",
 *   tags={"Leads"},
 *   summary="Update new lead",
 *    @SWG\Parameter(
 *          name="lead",
 *  description="Lead object that needs to be added to the store",@SWG\Schema(
 *     @SWG\Property(property="id", type="integer"),
 *     @SWG\Property(property="title", type="string"),
 *     @SWG\Property(property="description", type="text"),
 *     @SWG\Property(property="status", type="available"),
 *     @SWG\Property(property="user_assigned_id", type="integer"),
 *     @SWG\Property(property="user_created_id", type="integer"),
 *     @SWG\Property(property="client_id", type="integer"),
 *     @SWG\Property(property="contact_date", type="date"),
 *     ),
 *          in="body",
 *      ),
 *   @SWG\Response(response=200, description="successful operation"),
 *       security={
 *          {
 *              "Bearer":{}
 *          }
 *       }
 * )
 *)
 *
 * *   @SWG\Delete(
 *      path="/leads/{id}",
 *      tags={"Leads"},
 *      operationId="ApiV1DeleteLead",
 *      summary="Delete Lead",
 *      @SWG\Parameter(
 *          name="id",
 *          description="Delete Lead",
 *          in="path",
 *          required=true,
 *          type="string"
 *      ),
 *      @SWG\Response(
 *          response=200,
 *          description="Success"
 *      ),
 *     )
 *
 * *   @SWG\Definition(
 *     definition="Lead",
 *     type="object",
 *     description="Lead",
 *     properties={
 *     @SWG\Property(property="id", type="integer",format="int64"),
 *     @SWG\Property(property="title", type="string"),
 *     @SWG\Property(property="description", type="text"),
 *     @SWG\Property(property="status", type="available"),
 *     @SWG\Property(property="user_assigned_id", type="integer",format="int64"),
 *     @SWG\Property(property="user_created_id", type="integer",format="int64"),
 *     @SWG\Property(property="client_id", type="integer",format="int64"),
 *     @SWG\Property(property="contact_date", type="date",format="date-time"),
 *     }
 * )
 */

class LeadsController extends APIBaseController
{
    public function index()
    {
        $leads = Lead::all()->toArray();

        foreach ($leads as $key => $value) {
            $user_assigned = User::find($value["user_assigned_id"]);
            $user_created = User::find($value["user_created_id"]);
            $client = Client::find($value["client_id"]);
            $leads[$key]["user_assigned_id"] = $user_assigned["name"];
            $leads[$key]["user_created_id"] = $user_created["name"];
            $leads[$key]["client_id"] = $client["name"];
        }

        return $this->sendResponse($leads, 'Leads retrieved successfully.');
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->all();
        $input[0]['contact_date'] = date('Y-m-d',strtotime($input[0]['contact_date']));


        $validator = Validator::make($input, [
            'title' => 'string',
            'description' => 'string',
            'status' => 'integer',
            'user_assigned_id' => 'integer',
            'client_id' => 'integer',
            'user_created_id' => 'integer',
            'contact_date' => 'date_format:Y-m-d'
        ]);


        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }


        $lead = Lead::create($input[0]);


        return $this->sendResponse($lead->toArray(), 'Lead created successfully.');
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $lead = Lead::find($id);


        if (is_null($lead)) {
            return $this->sendError('Lead not found.');
        }


        return $this->sendResponse($lead->toArray(), 'Lead retrieved successfully.');
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $input = $request->all()[0];
        $input['contact_date'] = date('Y-m-d',strtotime($input['contact_date']));


        $validator = Validator::make($input, [
            'title' => 'string',
            'description' => 'string',
            'status' => 'integer',
            'user_assigned_id' => 'integer',
            'client_id' => 'integer',
            'user_created_id' => 'integer',
            'contact_date' => 'date'
        ]);



        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }


        $lead = Lead::find($id);
        if (is_null($lead)) {
            return $this->sendError('Lead not found.');
        }


        $lead->title = $input['title'];
        $lead->description = $input['description'];
        $lead->status = $input['status'];
        $lead->user_assigned_id = $input['user_assigned_id'];
        $lead->client_id = $input['client_id'];
        $lead->user_created_id = $input['user_created_id'];
        $lead->contact_date = $input['contact_date'];
        $lead->save();

        if($lead->status == 2):
            Sprint::where('lead_assigned_id', $id)->update(array('status' => 2));
            $sprints = Sprint::where('lead_assigned_id', $id)->get();
            foreach($sprints as $key => $sprint):
                Task::where('sprint_assigned_id', $sprint['id'])->update(array('status' => 2));
            endforeach;
        endif;

        return $this->sendResponse($lead->toArray(), 'Lead updated successfully.');
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $lead = Lead::find($id);


        if (is_null($lead)) {
            return $this->sendError('Lead not found.');
        }


        $lead->delete();


        return $this->sendResponse($id, 'Tag deleted successfully.');
    }
}
