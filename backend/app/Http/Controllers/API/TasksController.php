<?php
namespace App\Http\Controllers\API;

use Gate;
use Datatables;
use Validator;
use Carbon\Carbon;
use App\Task;
use App\Vote;
use App\Http\Requests;
use App\Models\Integration;
use Illuminate\Http\Request;
use App\Http\Controllers\API\APIBaseController as APIBaseController;

/**
 * Class ClientsController
 * @package App\Http\Controllers\API
 *
 *
 *
 *  * @SWG\Get(
 *      path="/tasks",
 *      tags={"Tasks"},
 *      summary="Get list of tasks",
 *      description="Returns list of tasks",
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
 *      path="/tasks/{id}",
 *      operationId="getIndexById",
 *      tags={"Tasks"},
 *      summary="Get tasks information",
 *      description="Returns tasks data",
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
 *          }
 *     },
 * )
 *
 * * @SWG\Post(
 *   path="/tasks",
 *   tags={"Tasks"},
 *   summary="Create new task",
 *    @SWG\Parameter(
 *          name="task",
 *  description="Task object that needs to be added to the store",@SWG\Schema(
 *     @SWG\Property(property="id", type="integer"),
 *     @SWG\Property(property="title", type="string"),
 *     @SWG\Property(property="description", type="text"),
 *     @SWG\Property(property="status", type="available"),
 *     @SWG\Property(property="user_assigned_id", type="integer"),
 *     @SWG\Property(property="sprint_assigned_id", type="integer"),
 *     @SWG\Property(property="user_created_id", type="integer"),
 *     @SWG\Property(property="client_id", type="integer"),
 *     @SWG\Property(property="deadline", type="date"),
 *     ),
 *          in="body"
 *      ),
 *   @SWG\Response(response=200, description="successful operation"),
 *       security={
 *           {
 *              "Bearer":{}
 *          }
 *       }
 * )
 *)
 *
 * * @SWG\Put(
 *   path="/tasks/{id}",
 *   tags={"Tasks"},
 *   summary="Update new task",
 *    @SWG\Parameter(
 *          name="client",
 *  description="Task object that needs to be added to the store",@SWG\Schema(
 *     @SWG\Property(property="id", type="integer"),
 *     @SWG\Property(property="title", type="string"),
 *     @SWG\Property(property="description", type="text"),
 *     @SWG\Property(property="status", type="available"),
 *     @SWG\Property(property="user_assigned_id", type="integer"),
 *     @SWG\Property(property="sprint_assigned_id", type="integer"),
 *     @SWG\Property(property="user_created_id", type="integer"),
 *     @SWG\Property(property="client_id", type="integer"),
 *     @SWG\Property(property="deadline", type="date"),
 *     ),
 *          in="body",
 *     default={{"name":"Taras","email":"taras2andry@mail.ru","primary_number":"507212852","secondary_number":"507212852","address":"Kalush","zipcode":"77300","city":"Kalush","company_name":"IFNTUOG","vat":23,"company_type":"IT","user_id":1,"industry_id":1,}}
 *      ),
 *   @SWG\Response(response=200, description="successful operation"),
 *       security={
 *           {
 *              "Bearer":{}
 *          }
 *       }
 * )
 *)
 *
 *  * @SWG\Get(
 *      path="/voter/{id}",
 *      operationId="getIndexById",
 *      tags={"Tasks"},
 *      summary="Get votes information",
 *      description="Returns tasks data",
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
 *      @SWG\Response(response=404, description="Resource Not Found")
 * )
 *
 * *   @SWG\Delete(
 *      path="/tasks/{id}",
 *      tags={"Tasks"},
 *      operationId="ApiV1DeleteTask",
 *      summary="Delete Task",
 *      @SWG\Parameter(
 *          name="id",
 *          description="Delete Task",
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
 *     definition="Task",
 *     type="object",
 *     description="Task",
 *     properties={
 *     @SWG\Property(property="id", type="integer",format="int64"),
 *     @SWG\Property(property="title", type="string"),
 *     @SWG\Property(property="description", type="text"),
 *     @SWG\Property(property="status", type="string",enum={"Виконано", "Виконується", "Не виконується"}),
 *     @SWG\Property(property="user_assigned_id", type="integer",format="int64"),
 *     @SWG\Property(property="sprint_assigned_id", type="integer",format="int64"),
 *     @SWG\Property(property="user_created_id", type="integer",format="int64"),
 *     @SWG\Property(property="client_id", type="integer",format="int64"),
 *     @SWG\Property(property="deadline", type="date",format="date-time"),
 *     }
 * )
 */

class TasksController extends APIBaseController
{
    public function index()
    {
        $tasks = Task::all();
        return $this->sendResponse($tasks->toArray(), 'Tasks retrieved successfully.');
    }

    public function story_points()
    {
        $tasks = Task::all();
        $encoded_tasks = json_decode($tasks, true);
        foreach ($encoded_tasks as $key => $value) {
            if($value['status'] == 2) {
                $time_first = strtotime($value['deadline']);
                $time_second = strtotime($value['created_at']);
                $secs = $time_first - $time_second;
                $res[$key] = $secs / 86400;
                $marks['date'][$key] = $time_first;
                $min = null;
                foreach ($res as $key1 => $value1) {
                   /* if ($value1 < $min) {
                        $min = $value1;
                    }
                    if ($key1 == 0) {
                        $marks['list'][$key1] = 1;
                    } else {
                        $marks['list'][$key1] = $marks['list'][$key1 - 1] + 1;
                    }
                    // echo '<hr />'.$min. '<hr />';
                    if ($value1 == $min) {
                        unset($res[$key1]);
                    }*/
                   if($value1 < 3) {
                       $marks['list'][$key1] = 1;
                   }
                   elseif($value1 > 3 && $value1 < 8) {
                       $marks['list'][$key1] = 2;
                   }
                   elseif($value1 > 8 && $value1 < 14) {
                       $marks['list'][$key1] = 3;
                   }
                   elseif($value1 > 14 && $value1 < 30) {
                       $marks['list'][$key1] = 5;
                   }
                   elseif($value1 > 30 && $value1 < 60) {
                       $marks['list'][$key1] = 8;
                   }
                   elseif($value1 > 60 && $value1 < 90) {
                       $marks['list'][$key1] = 13;
                   }
                   else {
                       $marks['list'][$key1] = 21;
                   }
                }
            }
        }
       // $marks['dt'] = array('','1485768552');
      // print_r($marks);
       // $marks = json_encode($marks);
       // $marks['date'] = [1485717216, 1485745061, 1485768552];
        return $this->sendResponse(json_encode($marks), 'Tasks retrieved successfully.');
    }

    public function add_votes(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'user_added_id' => 'integer',
            'task_assigned_id' => 'integer',
            'mark' => 'integer',
        ]);


        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }


        $task = Vote::create($input[0]);


        return $this->sendResponse($task->toArray(), 'Vote created successfully.');
    }

    public function vote_update(Request $request, $id)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'user_added_id' => 'integer',
            'task_assigned_id' => 'integer',
            'mark' => 'integer'
        ]);


        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }


        $vote = Vote::find($id);
        if (is_null($vote)) {
            return $this->sendError('Post not found.');
        }


        $vote->user_added_id = $input[0]['user_added_id'];
        $vote->task_assigned_id = $input[0]['task_assigned_id'];
        $vote->mark = $input[0]['mark'];
        $vote->save();


        return $this->sendResponse($vote->toArray(), 'Vote updated successfully.');
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
            'sprint_assigned_id' => 'integer',
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

    public function votes($id)
    {
        $votes = Vote::where('task_assigned_id', $id)->get();

        if(isset($votes[0])) {
            foreach ($votes as $key => $value) {
                $users[$key] = $value['user_added_id'];
            }
        }
        else {
            $users[0] = 0;
        }

       // print_r($votes);

        return $this->sendResponse(json_encode($users), 'Users retrieved successfully.');
    }

    public function voter($id)
    {
         $str_ids = explode('_', $id);

         $vote = Vote::where('task_assigned_id', $str_ids[1])->where('user_added_id', $str_ids[0])->get();

        // print_r($id);

          if (is_null($vote)) {
            return $this->sendError('Task not found.');
         }

         //print_r($vote);

        return $this->sendResponse(json_encode($vote[0]), 'Users retrieved successfully.');
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
            'sprint_assigned_id' => 'integer',
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
        $task->sprint_assigned_id = $input[0]['sprint_assigned_id'];
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
