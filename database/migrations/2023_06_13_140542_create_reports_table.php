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
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->ipAddress('player_ip')->nullable();
            $table->string('player_steam_id')->nullable();
            $table->string('player_name');
            $table->longText('comments');
            $table->string('reporter_name')->nullable();
            $table->string('reporter_email');
            $table->foreignId('server_id')->nullable()->constrained('servers')->nullOnDelete();
            $table->string('upload_demo')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reports');
    }
};
