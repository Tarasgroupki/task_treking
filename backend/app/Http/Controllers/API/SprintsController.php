<?php

namespace App\Http\Controllers\API;

use DB;
use Auth;
use Validator;
use Session;
use Datatables;
use App\Task;
use App\Sprint;
use App\Vote;
use Illuminate\Http\Request;
use App\Http\Controllers\API\APIBaseController as APIBaseController;

class SprintsController extends APIBaseController
{

    public function story_points($id)
    {
        $sprints = Sprint::find($id);
        $encoded_sprints = json_decode($sprints, true);
       // foreach ($encoded_sprints as $key => $value) {
          //  print_r($value);
           $tasks = Task::where('sprint_assigned_id', $encoded_sprints['id'])->get();
     //  }
        $marks['mark'] = array();
        $marks['mark'][0] = 250;
        $i = 0;
       // $marks['date'][0] = strtotime($tasks[0]['created_at']);
        foreach ($tasks as $key => $value) {
            if($value['status'] == 2) {
                $date_reason = strtotime($tasks[$key]['deadline']) - strtotime($tasks[0]['created_at']);
                $dates[$key] = round((strtotime($tasks[$key]['deadline']) - strtotime($tasks[$key]['created_at']))/86400);
                $time_first = strtotime($value['deadline']);
                $time_second = strtotime($value['created_at']);
                $secs = $time_first - $time_second;
                $res[$key] = $secs / 86400;
                $marks['date'][$key + 1] = $time_first;
                $min = null;
            }
            $cent_mark[$key] = 0;
            $votes[$key] = Vote::where('task_assigned_id', $value['id'])->get();
            foreach ($votes[$key] as $key1 => $value1) {
                $cent_mark[$key] += $value1['mark'];
               // echo $votes[$key][$key1]['id'];
            }
            if(isset($cent_mark[$key]) && $cent_mark[$key] != 0):
            $i += 1;
            $cent_mark[$key] = $cent_mark[$key] / count($votes[$key]);
            $marks['mark'][$i] = $marks['mark'][$i - 1] - $cent_mark[$key];
            endif;
        }
        $count_days = round($date_reason / 86400);
        for($i = 0; $i<$count_days; $i++) {
            $days[$i] = $i + 1;
            $days[$i] = 'Day'.$days[$i];
        }
        // print_r($dates);
        foreach($dates as $key => $value) {
            if($dates[$key] > 1):
            for($i = 0; $i < $dates[$key]; $i++){
                $mark[$key][$i] = round($marks['mark'][$key]);
            }
            $mr[$key] = implode(',', $mark[$key]);
            endif;
        }
        $str = implode(',', $mr);
        $arr = explode(',', $str);
        foreach ($arr as $key => $value){
            $arr[$key] = intval($value);
          // echo gettype($arr[$key]);
        }
        // print_r($arr);
        if($encoded_sprints['status'] == 2):
            Task::where('sprint_assigned_id', $id)->update(array('status' => 2));
            $arr[count($days)] = 0;
        $counter = count($days) + 1;
            $days[count($days)] = 'Day'.$counter;
        endif;
        $higher_counter = 0;
        $ideal_line[0] = 250;
        $reasons = 250 / count($days);
        for($i = 0; $i<count($days); $i++):
            $higher_counter += round($reasons);
            $ideal_line[$i + 1] = 250 - $higher_counter;
            if($ideal_line[$i + 1] <= 0){
                $ideal_line[$i + 1] = 0;
                break;
            }
        endfor;
      //  print_r(gettype($arr));
        $marks['mark'] = $arr;//echo gettype($marks['mark'][0]);
        $marks['ideal_line'] = $ideal_line;
        $marks['date'] = $days;
        return $this->sendResponse(json_encode($marks), 'Tasks retrieved successfully.');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $leads = Sprint::all();
        return $this->sendResponse($leads->toArray(), 'Sprints retrieved successfully.');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

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
            'lead_assigned_id' => 'integer',
            'user_created_id' => 'integer',
            'deadline' => 'date_format:Y-m-d'
        ]);


        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }


        $sprint = Sprint::create($input[0]);


        return $this->sendResponse($sprint->toArray(), 'Sprint created successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Sprint  $sprint
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $sprint = Sprint::find($id);

        if (is_null($sprint)) {
            return $this->sendError('Sprint not found.');
        }


        return $this->sendResponse($sprint->toArray(), 'Sprint retrieved successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Sprint  $sprint
     * @return \Illuminate\Http\Response
     */
    public function edit(Sprint $sprint)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Sprint  $sprint
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $input = $request->all()[0];
        $input['deadline'] = date('Y-m-d',strtotime($input['deadline']));


        $validator = Validator::make($input, [
            'title' => 'string',
            'description' => 'string',
            'status' => 'integer',
            'lead_assigned_id' => 'integer',
            'user_created_id' => 'integer',
            'deadline' => 'date_format:Y-m-d'
        ]);



        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }


        $sprint = Sprint::find($id);
        if (is_null($sprint)) {
            return $this->sendError('Sprint not found.');
        }


        $sprint->title = $input['title'];
        $sprint->description = $input['description'];
        $sprint->status = $input['status'];
        $sprint->lead_assigned_id = $input['lead_assigned_id'];
        $sprint->user_created_id = $input['user_created_id'];
        $sprint->deadline = $input['deadline'];
        $sprint->save();


        return $this->sendResponse($sprint->toArray(), 'Sprint updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Sprint  $sprint
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $sprint = Sprint::find($id);


        if (is_null($sprint)) {
            return $this->sendError('Sprint not found.');
        }


        $sprint->delete();


        return $this->sendResponse($id, 'Tag deleted successfully.');
    }
}
