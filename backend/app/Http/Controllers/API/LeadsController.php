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
use App\Http\Requests;
use Illuminate\Http\Request;
use App\Http\Controllers\API\APIBaseController as APIBaseController;

class LeadsController extends APIBaseController
{
    public function index()
    {
        $leads = Lead::all();
        return $this->sendResponse($leads->toArray(), 'Leads retrieved successfully.');
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
