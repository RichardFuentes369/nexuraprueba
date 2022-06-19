<!--
    * Prueba nexura - Boostrap 4 - Javascript Puro
-->
<!doctype html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css"
        integrity="sha384-zCbKRCUGaJDkqS1kPbPd7TveP5iyJE0EjAuZQTgFLD2ylzuqKfdKlfG/eSrtxUkn" crossorigin="anonymous">
    <title>Prueba 1</title>
</head>

<body>

    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal"
        onclick="limpiar(), openModal()">
        Crear
    </button>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Crear empleado</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row mt-2 mb-2">
                        <div class="col-sm-4">
                            <span><strong>Nombre completo*</strong></span>
                        </div>
                        <div class="col-sm">
                            <input type="text" class="form-control inpfullName">
                            <span class="inpErrorfullName text-danger" style="visibility: hidden">Error, debe ingresar
                                un nombre sin simbolos o numeros</span>
                        </div>
                    </div>
                    <div class="row mt-2 mb-2">
                        <div class="col-sm-4">
                            <span><strong>Correo electrónico*</strong></span>
                        </div>
                        <div class="col-sm">
                            <input type="text" class="form-control inpEmail">
                            <span class="inpErrorEmail text-danger" style="visibility: hidden">Error, debe ingresar un
                                correo valido</span>
                        </div>
                    </div>
                    <div class="row mt-2 mb-2">
                        <div class="col-sm-4">
                            <span><strong>Sexo*</strong></span>
                        </div>
                        <div class="col-sm">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault"
                                    id="inpSexoMasculino">
                                <label class="form-check-label" for="flexRadioDefault1">
                                    Masculino
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault"
                                    id="inpSexoFemenino" checked>
                                <label class="form-check-label" for="flexRadioDefault2">
                                    Femenino
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-2 mb-2">
                        <div class="col-sm-4">
                            <span><strong>Área*</strong></span>
                        </div>
                        <div class="col-sm">
                            <select name="" id="" class="inpArea form-control listaAreas">
                            </select>
                            <span class="inpErrorArea text-danger" style="visibility: hidden">Error: Debe seleccionar un
                                elemento de la lista</span>
                        </div>
                    </div>
                    <div class="row mt-2 mb-2">
                        <div class="col-sm-4">
                            <span><strong>Descripción*</strong></span>
                        </div>
                        <div class="col-sm">
                            <input type="text" name="" id="" class="form-control inpDescription">
                            <span class="inpErrorDescription text-danger" style="visibility: hidden">Error, debe
                                ingresar una desripción</span>
                        </div>
                    </div>
                    <div class="row mt-2 mb-2">
                        <div class="col-sm-4">
                            <span><strong>Roles*</strong></span>
                        </div>
                        <div class="col-sm listaRoles">
                        </div>
                        <span class="inpErrorRol text-danger" style="visibility: hidden">Error: Debe seleccionar almenos
                            un rol de la lista</span>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onclick="guardarEmpleado()">Guardar</button>
                </div>
            </div>
        </div>
    </div>

    <select name="" id="" class="order" onchange="cambiarOrdenListar()">
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
    </select>

    <select name="" id="" class="perPage" onchange="cambiarCantidadListar()">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="25">25</option>
        <option value="30">30</option>
    </select>

    <table class="table mt-4">
        <thead>
            <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Email</th>
                <th scope="col">Sexo</th>
                <th scope="col">Área</th>
                <th scope="col">Boletin</th>
                <th scope="col">Modificar</th>
                <th scope="col">Eliminar</th>
            </tr>
        </thead>
        <tbody class="tbody">
        </tbody>
    </table>

    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item previous"><a class="page-link" style="cursor: pointer">Anterior</a></li>
            <li class="page-item next"><a class="page-link" style="cursor: pointer">Siguiente</a></li>
        </ul>
    </nav>

    <!-- Option 1: jQuery and Bootstrap Bundle (includes Popper) -->
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous">
    </script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-fQybjgWLrvvRgtW6bFlB7jaZrFsaBXjsOMm/tB9LTS58ONXgqbR9W8oWht/amnpF" crossorigin="anonymous">
    </script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="prueba1.js"></script>
</body>

</html>
