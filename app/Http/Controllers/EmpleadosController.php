<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\{
    empleado,
    empleado_rol
};

class EmpleadosController extends Controller
{
    public function lista(Request $request)
    {
        $lista_empleados = empleado::with('areaTrabajo')->orderBy('id', $request->orderBy)->offset($request->page)->paginate($request->perPage);
        return $lista_empleados;
    }

    public function guardar(Request $request)
    {
        $nuevo_empleado = new empleado();
        $nuevo_empleado->nombre = $request->fullName;
        $nuevo_empleado->email = $request->inpEmail;
        $nuevo_empleado->sexo = $request->inpSexo;
        $nuevo_empleado->area_id = $request->inpArea;
        $nuevo_empleado->boletin = 0; // falta
        $nuevo_empleado->descripcion = $request->inpDescription;
        $nuevo_empleado->save();

        foreach ($request->inpRoles as $clave) {
            $nuevo_empleado_rol = new empleado_rol();
            $nuevo_empleado_rol->empleado_id = $nuevo_empleado->id;
            $nuevo_empleado_rol->rol_id = $clave; // esto es un arreglo hay que tratarlo
            $nuevo_empleado_rol->save();
        }

        return $nuevo_empleado;
    }

    public function editar()
    {
        return 'editando';
    }

    public function eliminar($idEmpleado)
    {
        $eliminar_empleado = empleado::find($idEmpleado);
        $eliminar_empleado->delete();
        return 'empleado eliminado';
    }
}
