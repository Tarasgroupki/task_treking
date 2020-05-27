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

/**
 * Class ClientsController
 * @package App\Http\Controllers\API
 *
 *
 *
 *  * @SWG\Get(
 *      path="/index",
 *      tags={"Clients"},
 *      summary="Get list of clients",
 *      description="Returns list of clients",
 *      security={
 *           {
 *              "Bearer":{}
 *          }},
 *      @SWG\Response(
 *          response=200,
 *          description="successful operation"
 *       ),
 *       @SWG\Response(response=400, description="Bad request"),
 *
 *
 *     )
 *
 * Returns list of index
 *
 *  * @SWG\Get(
 *      path="/index/{id}",
 *      operationId="getIndexById",
 *      tags={"Clients"},
 *      summary="Get clients information",
 *      description="Returns clients data",
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
 *          {
 *              "Bearer":{}
 *          }
 *     },
 * )
 *
 * * @SWG\Post(
 *   path="/index",
 *   tags={"Clients"},
 *   summary="Create new client",
 *    @SWG\Parameter(
 *          name="client",
 *  description="Client object that needs to be added to the store",@SWG\Schema(
 *     @SWG\Property(property="id", type="integer"),
 *     @SWG\Property(property="name", type="string"),
 *     @SWG\Property(property="email", type="string"),
 *     @SWG\Property(property="primary_number", type="string"),
 *     @SWG\Property(property="secondary_number", type="string"),
 *     @SWG\Property(property="address", type="string"),
 *     @SWG\Property(property="zipcode", type="string"),
 *     @SWG\Property(property="city", type="string"),
 *     @SWG\Property(property="company_name", type="string"),
 *     @SWG\Property(property="vat", type="string"),
 *     @SWG\Property(property="company_type", type="string"),
 *     @SWG\Property(property="user_id", type="integer"),
 *     @SWG\Property(property="industry_id", type="integer"),
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
 * * * @SWG\Put(
 *   path="/index/{id}",
 *   tags={"Clients"},
 *   summary="Update new client",
 *    @SWG\Parameter(
 *          name="client",
 *  description="Client object that needs to be added to the store",@SWG\Schema(
 *     @SWG\Property(property="id", type="integer"),
 *     @SWG\Property(property="name", type="string"),
 *     @SWG\Property(property="email", type="string"),
 *     @SWG\Property(property="primary_number", type="string"),
 *     @SWG\Property(property="secondary_number", type="string"),
 *     @SWG\Property(property="address", type="string"),
 *     @SWG\Property(property="zipcode", type="string"),
 *     @SWG\Property(property="city", type="string"),
 *     @SWG\Property(property="company_name", type="string"),
 *     @SWG\Property(property="vat", type="string"),
 *     @SWG\Property(property="company_type", type="string"),
 *     @SWG\Property(property="user_id", type="integer"),
 *     @SWG\Property(property="industry_id", type="integer"),
 *     ),
 *          in="body",
 *     default={{"name":"Taras","email":"taras2andry@mail.ru","primary_number":"507212852","secondary_number":"507212852","address":"Kalush","zipcode":"77300","city":"Kalush","company_name":"IFNTUOG","vat":23,"company_type":"IT","user_id":1,"industry_id":1,}}
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
 *  * @SWG\Delete(
 *      path="/index/{id}",
 *      tags={"Clients"},
 *      operationId="ApiV1DeleteClient",
 *      summary="Delete Client",
 *      @SWG\Parameter(
 *          name="id",
 *          description="Delete Client",
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
 *  * @SWG\Definition(
 *     definition="Client",
 *     type="object",
 *     description="Client",
 *     properties={
 *     @SWG\Property(property="id", type="integer",format="int64"),
 *     @SWG\Property(property="name", type="string"),
 *     @SWG\Property(property="email", type="string"),
 *     @SWG\Property(property="primary_number", type="string"),
 *     @SWG\Property(property="secondary_number", type="string"),
 *     @SWG\Property(property="address", type="string"),
 *     @SWG\Property(property="zipcode", type="string"),
 *     @SWG\Property(property="city", type="string"),
 *     @SWG\Property(property="company_name", type="string"),
 *     @SWG\Property(property="vat", type="string"),
 *     @SWG\Property(property="company_type", type="string"),
 *     @SWG\Property(property="user_id", type="integer",format="int64"),
 *     @SWG\Property(property="industry_id", type="integer",format="int64"),
 *     }
 * )
 */

class ClientsController extends APIBaseController
{

    public function __construct(
    )
    {

    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {//$clients = Client::select(['id', 'name', 'company_name', 'email', 'primary_number']);
       $clients = Client::all();
        return $this->sendResponse($clients->toArray(), 'Posts retrieved successfully.');
    }
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
           // 'industry' => '',
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
       // $client->industry = null;
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
