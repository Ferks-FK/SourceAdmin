<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bans', function (Blueprint $table) {
            $table->id();
            $table->ipAddress('ip')->nullable();
            $table->string('steam_id')->nullable();
            $table->string('player_name');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('end_at')->nullable();
            $table->foreignId('admin_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('reason_id')->constrained('reasons');
            $table->foreignId('time_ban_id')->constrained('time_bans');
            $table->foreignId('server_id')->default(0)->constrained('servers');
            $table->foreignId('removed_by')->nullable()->constrained('users');
            $table->timestamp('removed_on')->nullable();
            $table->string('unban_reason')->nullable();
            $table->string('flag_url')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bans');
    }
};
