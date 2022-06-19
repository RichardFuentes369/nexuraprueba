<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class empleado extends Model
{
    use HasFactory;

    protected $table = "empleado";
    public $timestamps = false;

    public function areaTrabajo()
    {
        return $this->belongsTo(area::class, 'area_id');
    }

    public function misRoles()
    {
        return $this->hasMany(empleado_rol::class);;
    }
}
