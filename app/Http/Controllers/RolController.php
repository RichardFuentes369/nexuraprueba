<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\rol;

class RolController extends Controller
{
    public function lista()
    {
        $lista_empleados = rol::get();
        return $lista_empleados;
    }
}
