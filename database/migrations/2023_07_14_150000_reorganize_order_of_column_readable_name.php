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
        Schema::table('permissions', function () {
            DB::statement("ALTER TABLE `permissions` MODIFY COLUMN `readable_name` VARCHAR(255) AFTER `name`");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('permissions', function () {
            DB::statement("ALTER TABLE `permissions` MODIFY COLUMN `readable_name` VARCHAR(255) AFTER `updated_at`");
        });
    }
};
