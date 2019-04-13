<?php

namespace App\Providers;

use Laravel\Passport\Passport;
use Carbon\Carbon;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Passport::routes();
        Passport::tokensExpireIn(Carbon::now()->addDays(15));

        Passport::refreshTokensExpireIn(Carbon::now()->addDays(30));
        Passport::tokensCan([
            'place-orders' => 'Размещать заказы',
            'create-clients' => 'Створювати клієнтів',
            'edit-clients' => 'Редагувати клієнтів',
            'delete-clients' => 'Видаляти клієнтів',
            'create-tasks' => 'Створювати завдання',
            'edit-tasks' => 'Редагувати завдання',
            'delete-tasks' => 'Видаляти завдання',
            'create-users' => 'Створювати користувачів',
            'edit-users' => 'Редагувати користувачів',
            'delete-users' => 'Видаляти користувачів',
            'create-leads' => 'Створювати терміни',
            'edit-leads' => 'Редагувати терміни',
            'delete-leads' => 'Видаляти терміни',
            'create-roles' => 'Створювати ролі',
            'edit-roles' => 'Редагувати ролі',
            'delete-roles' => 'Видаляти ролі',
            'create-sprints' => 'Створювати блоки',
            'edit-sprints' => 'Редагувати блоки',
            'delete-sprints' => 'Видаляти блоки'
        ]);
    }
}
