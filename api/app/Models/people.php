<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class people extends Model
{
    use HasFactory;

    protected $table = 'people';

    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',
        'profile_image'
    ];
}
