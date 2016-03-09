<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    // Each role has many users.
    public function users()
    {
        return $this->hasMany('App\Models\User');
    }
}
