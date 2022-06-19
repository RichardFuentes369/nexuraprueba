<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\empleado;

class EmpleadosController extends Controller
{
    public function lista()
    {
        $lista_empleados = empleado::get();
        return $lista_empleados;
    }

    public function guardar()
    {
        return 'guardando';
    }

    public function editar()
    {
        return 'editando';
    }

    public function eliminar()
    {
        return 'eliminando';
    }
}
