<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmpleadosController;
use App\Http\Controllers\AreaController;
use App\Http\Controllers\RolController;

Route::group(['prefix' => 'empleados'], function () {
    Route::get("lista-emapleados", [EmpleadosController::class, 'lista']);
    Route::post("guardar-emapleados", [EmpleadosController::class, 'guardar']);
    Route::post("editar-emapleados", [EmpleadosController::class, 'editar']);
    Route::post("eliminar-emapleados", [EmpleadosController::class, 'eliminar']);
});


Route::group(['prefix' => 'areas'], function () {
    Route::get("lista-areas", [AreaController::class, 'lista']);
});



Route::group(['prefix' => 'roles'], function () {
    Route::get("lista-roles", [RolController::class, 'lista']);
});
