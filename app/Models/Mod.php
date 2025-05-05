<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Mod extends Model
{
    use HasFactory;

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'mod',
        'name',
        'enabled'
    ];

    /**
     * Get the servers associated with the mod.
     */
    public function servers(): HasMany
    {
        return $this->hasMany(Server::class);
    }
}
