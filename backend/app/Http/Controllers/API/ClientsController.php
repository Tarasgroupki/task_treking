<?php
namespace App\Http\Controllers\API;

use Config;
use Dinero;
use Datatables;
use App\Http\Controllers\API\APIBaseController as APIBaseController;
use Validator;
use App\Client;
use App\Http\Requests;
use Illuminate\Http\Request;
use App\Http\Requests\Client\StoreClientRequest;
use App\Http\Requests\Client\UpdateClientRequest;
use App\Repositories\User\UserRepositoryContract;
use App\Repositories\Client\ClientRepositoryContract;
use App\Repositories\Setting\SettingRepositoryContract;

class ClientsController extends APIBaseController
{

   // protected $users;
//    protected $clients;
 //   protected $settings;

    public function __construct(
    //    UserRepositoryContract $users,
  //      ClientRepositoryContract $clients,
  //      SettingRepositoryContract $settings
    )
    {
     //   $this->users = $users;
     //   $this->clients = $clients;
     //   $this->settings = $settings;
       // $this->middleware('client.create', ['only' => ['create']]);
       // $this->middleware('client.update', ['only' => ['edit']]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {//$clients = Client::select(['id', 'name', 'company_name', 'email', 'primary_number']);
       $clients = Client::all();
     //  print_r($clients);die;
        return $this->sendResponse($clients->toArray(), 'Posts retrieved successfully.');
       // return view('clients.index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return mixed
     */
   /* public function create(Request $request)
    {//print_r($request);die;
        return $this->sendResponse(null, 'Posts retrieved successfully.');
        /*return view('clients.create')
            ->withUsers($this->users->getAllUsersWithDepartments())
            ->withIndustries($this->clients->listAllIndustries());
    }
*/
    /**
     * @param StoreClientRequest $request
     * @return mixed
     */
    public function store(Request $request)
    {//echo 'store';die;
        $input = $request->all();
        $validator = Validator::make($input, [
            'name' => 'string',
            'email' => 'string',
            'primary_number' => 'string',
            'second_number' => 'string',
            'address' => 'string',
            'zipcode' => 'string',
            'city' => 'string',
            'company_name' => 'string',
            'vat' => 'string',
            'industry' => 'string|null',
            'company_type' => 'string',
            'user_id' => 'integer',
            'industry_id' => 'integer'
        ]);
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $client = Client::create($input[0]);
        return $this->sendResponse($client->toArray(), 'Posts retrieved successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return mixed
     */
    public function show($id)
    {
        $client = Client::find($id);
        return $this->sendResponse($client->toArray(), 'Post retrieved successfully.');
    }

    /**
     * @param $id
     * @param UpdateClientRequest $request
     * @return mixed
     */
    public function update($id,Request $request)
    {
        $input = $request->all()[0];
        $validator = Validator::make($input, [
            'name' => 'string',
            'email' => 'string',
            'primary_number' => 'string',
            'second_number' => 'string',
            'address' => 'string',
            'zipcode' => 'string',
            'city' => 'string',
            'company_name' => 'string',
            'vat' => 'string',
            'industry' => '',
            'company_type' => 'string',
            'user_id' => 'integer',
            'industry_id' => 'integer'
        ]);
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $client = Client::find($id);
        $client->name = $input['name'];
        $client->email = $input['email'];
        $client->primary_number = $input['primary_number'];
        $client->secondary_number = $input['secondary_number'];
        $client->address = $input['address'];
        $client->zipcode = $input['zipcode'];
        $client->city = $input['city'];
        $client->company_name = $input['company_name'];
        $client->vat = $input['vat'];
        $client->industry = null;
        $client->company_type = $input['company_type'];
        $client->user_id = $input['user_id'];
        $client->industry_id = $input['industry_id'];
        $client->save();

        return $this->sendResponse($client->toArray(), 'Post updated successfully.');
    }

    /**
     * @param $id
     * @return mixed
     */
    public function destroy($id)
    {
        $client = Client::find($id);

        if (is_null($client)) {
            return $this->sendError('Post not found.');
        }

        $client->delete();

        return $this->sendResponse($id, 'Tag deleted successfully.');
    }

}
