<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('roles', function () {
            DB::statement("ALTER TABLE `roles` MODIFY COLUMN `description` VARCHAR(255) AFTER `name`");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('roles', function () {
            DB::statement("ALTER TABLE `roles` MODIFY COLUMN `description` VARCHAR(255) AFTER `updated_at`");
        });
    }
};
