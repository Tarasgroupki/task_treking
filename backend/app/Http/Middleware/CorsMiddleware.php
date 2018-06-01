<?php

namespace App\Http\Middleware;

use Closure;
//use Illuminate\Support\Facades\Auth;

class CorsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $origin = $request->server()['HTTP_ORIGIN'];
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Access-Control-Allow-Headers: '. $origin);
    }
}
