<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\{
    empleado,
    empleado_rol
};
use Illuminate\Support\Facades\DB;

class EmpleadosController extends Controller
{
    public function lista(Request $request)
    {
        $lista_empleados = empleado::with('areaTrabajo', 'misRoles')->orderBy('id', $request->orderBy)->offset($request->page)->paginate($request->perPage);
        return $lista_empleados;
    }

    public function guardar(Request $request)
    {
        $nuevo_empleado = new empleado();

        $rules = [
            'fullName' => 'required|regex:/^[A-Za-z\s]+$/i',
            'inpEmail' => 'required|regex:/(.+)@(.+)\.(.+)/i',
            'inpDescription' => 'required',
            'inpArea' => 'required|exists:App\Models\area,id',
            'inpRoles' => 'required|exists:App\Models\rol,id',
            'inpSexo' => 'required',
        ];

        $messages = [
            'fullName.required' => 'El nombre es requerido',
            'fullName.regex' => 'El nombre completo no debe tener caracteres especiales o numeros (solo puede tener espacios)',
            'inpEmail.required' => 'Este campo de ir lleno',
            'inpEmail.regex' => 'Debe escribir un correo valido',
            'inpDescription.required' => 'Debe escribir una descripcion',
            'inpArea.required' => 'Debe seleccionar un area',
            'inpArea.exists' => 'Esta area no existe en nuestros registros',
            'inpRoles.required' => 'Debe seleccionar un rol',

            'inpSexo.required' => 'Debe seleccionar un sexo',
        ];

        $this->validate($request, $rules, $messages);


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

    public function editar(Request $request)
    {
        $editar_empleado = empleado::find($request->inpId);

        $rules = [
            'fullName' => 'required|regex:/^[A-Za-z\s]+$/i',
            'inpEmail' => 'required|regex:/(.+)@(.+)\.(.+)/i',
            'inpDescription' => 'required',
            'inpArea' => 'required|exists:App\Models\area,id',
            'inpRoles' => 'required|exists:App\Models\rol,id',
            'inpSexo' => 'required',
        ];

        $messages = [
            'fullName.required' => 'El nombre es requerido',
            'fullName.regex' => 'El nombre completo no debe tener caracteres especiales o numeros (solo puede tener espacios)',
            'inpEmail.required' => 'Este campo de ir lleno',
            'inpEmail.regex' => 'Debe escribir un correo valido',
            'inpDescription.required' => 'Debe escribir una descripcion',
            'inpArea.required' => 'Debe seleccionar un area',
            'inpArea.exists' => 'Esta area no existe en nuestros registros',
            'inpRoles.required' => 'Debe seleccionar un rol',

            'inpSexo.required' => 'Debe seleccionar un sexo',
        ];

        $this->validate($request, $rules, $messages);

        $editar_empleado->nombre = $request->fullName;
        $editar_empleado->email = $request->inpEmail;
        $editar_empleado->sexo = $request->inpSexo;
        $editar_empleado->area_id = $request->inpArea;
        $editar_empleado->boletin = 0; // falta
        $editar_empleado->descripcion = $request->inpDescription;
        $editar_empleado->save();

        $eliminando_roles_viejos = DB::delete('delete from empleado_rol where empleado_id = :var_idEmpleado', ['var_idEmpleado' => $request->inpId]);

        foreach ($request->inpRoles as $clave) {
            $editar_empleado = new empleado_rol();
            $editar_empleado->empleado_id = $request->inpId;
            $editar_empleado->rol_id = $clave; // esto es un arreglo hay que tratarlo
            $editar_empleado->save();
        }

        return $editar_empleado;
    }

    public function eliminar($idEmpleado)
    {
        $eliminar_empleado = empleado::find($idEmpleado);
        $eliminar_empleado->delete();
        return 'empleado eliminado';
    }
}
