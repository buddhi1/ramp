<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('project_scooters', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('project_id');
            $table->unsignedBigInteger('scooter_id');
            // $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade'); // do this later
            $table->timestamps();
            $table->unique(['project_id', 'scooter_id']); // unique constraint to the combination of project_id and scooter_id
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_scooters');
    }
};
