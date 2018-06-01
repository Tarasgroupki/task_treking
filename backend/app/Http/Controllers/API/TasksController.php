<?php
namespace App\Http\Controllers\API;

use Gate;
use Datatables;
use Validator;
use Carbon\Carbon;
use App\Task;
use App\Http\Requests;
use App\Models\Integration;
use Illuminate\Http\Request;
use App\Http\Controllers\API\APIBaseController as APIBaseController;

class TasksController extends APIBaseController
{
    public function index()
    {
        $tasks = Task::all();
        return $this->sendResponse($tasks->toArray(), 'Tasks retrieved successfully.');
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
        $input[0]['deadline'] = date('Y-m-d',strtotime($input[0]['deadline']));

        $validator = Validator::make($input, [
            'title' => 'string',
            'description' => 'string',
            'status' => 'integer',
            'user_assigned_id' => 'integer',
            'user_created_id' => 'integer',
            'client_id' => 'integer',
           // 'invoice_id' => 'integer',
            'deadline' => 'date_format:Y-m-d'
        ]);


        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }


        $task = Task::create($input[0]);


        return $this->sendResponse($task->toArray(), 'Task created successfully.');
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $task = Task::find($id);


        if (is_null($task)) {
            return $this->sendError('Task not found.');
        }


        return $this->sendResponse($task->toArray(), 'Task retrieved successfully.');
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
        $input = $request->all();
        $input[0]['deadline'] = date('Y-m-d',strtotime($input[0]['deadline']));

        $validator = Validator::make($input, [
            'title' => 'string',
            'description' => 'string',
            'status' => 'integer',
            'user_assigned_id' => 'integer',
            'user_created_id' => 'integer',
            'client_id' => 'integer',
          //  'invoice_id' => 'integer',
            'deadline' => 'date_format:Y-m-d'
        ]);



        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }


        $task = Task::find($id);
        if (is_null($task)) {
            return $this->sendError('Post not found.');
        }


        $task->title = $input[0]['title'];
        $task->description = $input[0]['description'];
        $task->status = $input[0]['status'];
        $task->user_assigned_id = $input[0]['user_assigned_id'];
        $task->user_created_id = $input[0]['user_created_id'];
        $task->client_id = $input[0]['client_id'];
      //  $task->invoice_id = $input[0]['invoice_id'];
        $task->deadline = $input[0]['deadline'];
        $task->save();


        return $this->sendResponse($task->toArray(), 'Task updated successfully.');
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $task = Task::find($id);


        if (is_null($task)) {
            return $this->sendError('Task not found.');
        }


        $task->delete();


        return $this->sendResponse($id, 'Task deleted successfully.');
    }
}
