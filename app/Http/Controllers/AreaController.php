<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\area;

class AreaController extends Controller
{
    public function lista()
    {
        $lista_empleados = area::get();
        return $lista_empleados;
    }
}
