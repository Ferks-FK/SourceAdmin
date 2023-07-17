<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Reset cached roles and permissions.
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        $this->createPermissions();
        $this->createRoles();
    }

    protected function createPermissions()
    {
        foreach(config('permissions_web') as $permission_name => $permission_value) {
            Permission::create(['name' => $permission_value, 'readable_name' => $permission_name]);
        }
    }

    protected function createRoles()
    {
        // Initial Admin Role.
        Role::create(['name' => 'Root admin'])->givePermissionTo(Permission::findByName('*'));
    }
}
