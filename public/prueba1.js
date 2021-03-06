let model = {
  fullName: '',
  inpEmail: '',
  inpSexo: '',
  inpArea: '',
  inpRoles: '',
  inpDescription: '',
  inpId: ''
}

let paginador = {
  page: 1,
  perPage: document.getElementsByClassName('perPage')[0].value,
  lastPage: null,
  orderBy: document.getElementsByClassName('order')[0].value
}

// guardo las areas
let areas = []
// guardo los roles
let roles = []
// contador de roles traidos del servidor
let cantidadRoles = 0
// roles que selecciono para guardar en bd
let rolesSeleccionados = []
// lista de empleados
let empleadosList = []

/*
  * Funcion que me permite validar las expresiones regulares del formulario
*/
const validarDato = (opcion, dato) => {
  let validarTexto = /^[A-Za-z\s]+$/;
  let validarNumeros = /^[0-9]+$/;
  let validarCorreo = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  switch (opcion) {
    // 1 valida texto, 2 valida correo
    case 1:
      if (dato && validarTexto.test(dato)) {
        return true;
      } else {
        return false;
      }
      break;
    case 2:
      if (dato && validarCorreo.test(dato)) {
        return true;
      } else {
        return false;
      }
      break;
    case 3:
      if (dato) {
        return true;
      } else {
        return false;
      }
      break;
    case 4:
      if (dato) {
        (dato == '0') ? comodin = false : comodin = true;
        return comodin
      } else {
        return false;
      }
      break;
  }
}

/*
  * Funcion que me permite limpiar
  * los errores y inputs
  * lo que envio al servidor
  * los roles seleccionados
  * los roles y areas que recibo del servidor
*/
const limpiar = async () => {
  console.log('limpiando ....')
  // limpio el modelo
  model = {
    fullName: '',
    inpEmail: '',
    inpSexo: '',
    inpArea: '',
    inpRoles: '',
    inpDescription: '',
    inpId: ''
  }
  // limpio areas
  areas = []
  // limpio roles
  roles = []
  // limpio roles seleccionados
  rolesSeleccionados = []

  // limpio los inputs
  document.getElementsByClassName('inpfullName')[0].value = '';
  document.getElementsByClassName('inpEmail')[0].value = '';
  document.getElementsByClassName('inpDescription')[0].value = '';

  // limpio los errores
  document.getElementsByClassName('inpErrorfullName')[0].style.visibility = 'hidden';
  document.getElementsByClassName('inpErrorEmail')[0].style.visibility = 'hidden';
  document.getElementsByClassName('inpErrorDescription')[0].style.visibility = 'hidden';
  document.getElementsByClassName('inpErrorArea')[0].style.visibility = 'hidden';
  document.getElementsByClassName('inpErrorRol')[0].style.visibility = 'hidden';

}

/*
  * Limpio el append
  * Listo Areas para llenar el modal
  * Funcion que me permite listar las areas del servidor
  * se invoca cunado el modal se abre
*/
const listarAreas = async () => {
  await axios.get(`/api/areas/lista-areas`).then(res => {
    areas = res.data
  })
  $('.listaAreas').empty();
  $('.listaAreas').append(`
    <option value="0">Seleccione</option>
  `)
  for (const area of areas) {
    $('.listaAreas').append(`
      <option value="${area.id}">${area.nombre}</option>
    `)
  }
}

/*
  * Limpio el append
  * Listo Areas para llenar el modal
  * Funcion que me permite listar los roles del servidor
  * se invoca cunado el modal se abre
*/
const listarRoles = async () => {
  await axios.get(`/api/roles/lista-roles`).then(res => {
    roles = res.data
  })

  cantidadRoles = roles.length

  $('.listaRoles').empty();
  for (const rol of roles) {
    $('.listaRoles').append(`
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="rol${rol.id}" id="rol${rol.id}">
        <label class="form-check-label" for="rol${rol.id}">
          ${rol.nombre}
        </label>
      </div>
    `)
  }
}

/*Abro modal*/
const openModal = async (opc, empleadoId) => {
  await limpiar()
  await listarAreas()
  await listarRoles()
  await $(`#exampleModal`).modal('show')

  if (opc == 1) {
    $(".modal-title").text('Crear Empleado');
    $('.btnGuardar').css('display', 'block')
    $('.btnEditar').css('display', 'none')
  } else {
    /*Cargo data en el modal de editar*/
    let empleadoActualizar = ''
    $(".modal-title").text('Actualizar Empleado');
    $('.btnGuardar').css('display', 'none')
    $('.btnEditar').css('display', 'block')

    empleadoActualizar = empleadosList.find(emp => emp.id == empleadoId)

    model.inpId = empleadoId
    model.fullName = empleadoActualizar.nombre
    model.inpEmail = empleadoActualizar.email
    model.inpSexo = empleadoActualizar.sexo
    model.inpArea = empleadoActualizar.area_id

    // lleno los roles que ya habia seleccionado
    for (const roles of empleadoActualizar.mis_roles) {
      rolesSeleccionados.push(roles.rol_id)
    }

    model.inpDescription = empleadoActualizar.descripcion

    document.getElementsByClassName('inpfullName')[0].value = model.fullName
    document.getElementsByClassName('inpEmail')[0].value = model.inpEmail

    if (model.inpSexo == 'M') {
      document.getElementsByClassName('inpSexoMasculino')[0].checked = true;
    } else {
      document.getElementsByClassName('inpSexoFemenino')[0].checked = true;
    }

    for (const rol of rolesSeleccionados) {
      document.getElementById(`rol${rol}`).checked = true
    }

    model.inpRoles = rolesSeleccionados

    document.getElementsByClassName('inpArea')[0].value = model.inpArea
    document.getElementsByClassName('inpDescription')[0].value = model.inpDescription
  }
}

/*Cierro modal*/
const cerrarModal = (nombreModal) => {
  $(`#${nombreModal}`).modal('hide')
}

/*Guardar empleado, validado con expresion regular*/
const guardarEmpleado = async () => {
  let hayError = false
  // guardo en un arreglo los roles seleccionados
  for (let i = 1; i <= roles.length; i++) {
    (document.getElementById(`rol${i}`).checked) ? rolesSeleccionados.push(i) : ''
  }

  // 1 valida texto, 2 valida correo, 3 valido descripcion, 4 valido area
  if (!validarDato(1, document.getElementsByClassName('inpfullName')[0].value)) {
    document.getElementsByClassName('inpErrorfullName')[0].style.visibility = 'visible';
    hayError = true
  } else {
    document.getElementsByClassName('inpErrorfullName')[0].style.visibility = 'hidden';
    hayError = false
  }
  if (!validarDato(2, document.getElementsByClassName('inpEmail')[0].value)) {
    document.getElementsByClassName('inpErrorEmail')[0].style.visibility = 'visible';
    hayError = true
  } else {
    document.getElementsByClassName('inpErrorEmail')[0].style.visibility = 'hidden';
    hayError = false
  }

  if (!validarDato(3, document.getElementsByClassName('inpDescription')[0].value)) {
    document.getElementsByClassName('inpErrorDescription')[0].style.visibility = 'visible';
    hayError = true
  } else {
    document.getElementsByClassName('inpErrorDescription')[0].style.visibility = 'hidden';
    hayError = false
  }

  if (!validarDato(4, document.getElementsByClassName('inpArea')[0].value)) {
    document.getElementsByClassName('inpErrorArea')[0].style.visibility = 'visible';
    hayError = true
  } else {
    document.getElementsByClassName('inpErrorArea')[0].style.visibility = 'hidden';
    hayError = false
  }

  // valido que vayan roles
  if (rolesSeleccionados.length == 0) {
    document.getElementsByClassName('inpErrorRol')[0].style.visibility = 'visible';
    hayError = true
  } else {
    document.getElementsByClassName('inpErrorRol')[0].style.visibility = 'hidden';
    hayError = false
  }

  if (hayError == false) {
    model.fullName = document.getElementsByClassName('inpfullName')[0].value;
    model.inpEmail = document.getElementsByClassName('inpEmail')[0].value;
    model.inpSexo = (document.getElementsByClassName('inpSexoMasculino')[0].checked) ? 'M' : 'F';
    model.inpArea = document.getElementsByClassName('inpArea')[0].value;
    model.inpDescription = document.getElementsByClassName('inpDescription')[0].value;
    model.inpRoles = rolesSeleccionados;
    await axios.post(`/api/empleados/guardar-emapleados`, model)
    limpiar()
    cerrarModal('exampleModal')

    console.log('borrar datos de tabla y listar el famoso empty')
    listarEmpleados()
  }
}

/*Editar empleado, validado con expresion regular*/
const editarEmpleado = async () => {
  let hayError = false
  // guardo en un arreglo los roles seleccionados
  for (let i = 1; i <= roles.length; i++) {
    (document.getElementById(`rol${i}`).checked) ? rolesSeleccionados.push(i) : ''
  }

  // 1 valida texto, 2 valida correo, 3 valido descripcion, 4 valido area
  if (!validarDato(1, document.getElementsByClassName('inpfullName')[0].value)) {
    document.getElementsByClassName('inpErrorfullName')[0].style.visibility = 'visible';
    hayError = true
  } else {
    document.getElementsByClassName('inpErrorfullName')[0].style.visibility = 'hidden';
    hayError = false
  }
  if (!validarDato(2, document.getElementsByClassName('inpEmail')[0].value)) {
    document.getElementsByClassName('inpErrorEmail')[0].style.visibility = 'visible';
    hayError = true
  } else {
    document.getElementsByClassName('inpErrorEmail')[0].style.visibility = 'hidden';
    hayError = false
  }

  if (!validarDato(3, document.getElementsByClassName('inpDescription')[0].value)) {
    document.getElementsByClassName('inpErrorDescription')[0].style.visibility = 'visible';
    hayError = true
  } else {
    document.getElementsByClassName('inpErrorDescription')[0].style.visibility = 'hidden';
    hayError = false
  }

  if (!validarDato(4, document.getElementsByClassName('inpArea')[0].value)) {
    document.getElementsByClassName('inpErrorArea')[0].style.visibility = 'visible';
    hayError = true
  } else {
    document.getElementsByClassName('inpErrorArea')[0].style.visibility = 'hidden';
    hayError = false
  }

  // valido que vayan roles
  if (rolesSeleccionados.length == 0) {
    document.getElementsByClassName('inpErrorRol')[0].style.visibility = 'visible';
    hayError = true
  } else {
    document.getElementsByClassName('inpErrorRol')[0].style.visibility = 'hidden';
    hayError = false
  }

  if (hayError == false) {
    model.fullName = document.getElementsByClassName('inpfullName')[0].value;
    model.inpEmail = document.getElementsByClassName('inpEmail')[0].value;
    model.inpSexo = (document.getElementsByClassName('inpSexoMasculino')[0].checked) ? 'M' : 'F';
    model.inpArea = document.getElementsByClassName('inpArea')[0].value;
    model.inpDescription = document.getElementsByClassName('inpDescription')[0].value;
    // vacio los roles que ya precargue anteriormente
    rolesSeleccionados = []
    // vuelvo a llenar con los roles nuevos
    for (let i = 1; i <= roles.length; i++) {
      (document.getElementById(`rol${i}`).checked) ? rolesSeleccionados.push(i) : ''
    }
    model.inpRoles = rolesSeleccionados;
    await axios.put(`/api/empleados/editar-emapleados`, model)
    limpiar()
    cerrarModal('exampleModal')

    console.log('borrar datos de tabla y listar el famoso empty')
    listarEmpleados()
  }
}

$('.previous').click(function () {
  if (paginador.page > 1) {
    paginador.page = paginador.page - 1
    listarEmpleados()
  }
})

$('.next').click(function () {
  if (paginador.page < paginador.lastPage) {
    paginador.page = paginador.page + 1
    listarEmpleados()
  }
})

/*Ordenar Lista*/
const cambiarOrdenListar = async () => {
  paginador.orderBy = document.getElementsByClassName('order')[0].value
  listarEmpleados()
}
/*Cantidad a mostrar*/
const cambiarCantidadListar = async () => {
  paginador.perPage = document.getElementsByClassName('perPage')[0].value
  listarEmpleados()
}

/*Listar Empleado*/
const listarEmpleados = async () => {
  await axios.get(`/api/empleados/lista-emapleados?page=${paginador.page}&perPage=${paginador.perPage}&orderBy=${paginador.orderBy}`).then(res => {
    empleadosList = res.data.data
    paginador.page = res.data.current_page
    paginador.perPage = res.data.per_page
    paginador.lastPage = res.data.last_page
  })

  $('.tbody').empty();
  for (const empleado of empleadosList) {
    $('.tbody').append(`
      <tr>
        <td>${empleado.nombre}</td>
        <td>${empleado.email}</td>
        <td>${empleado.sexo}</td>
        <td>${empleado.area_trabajo.nombre}</td>
        <td>${empleado.boletin}</td>
        <td class="text-center">
          <button onclick="limpiar(), openModal(2, ${empleado.id})" class="btn btn-small">
            <i class="fa fa-pencil-square-o"></i>
          </button>
        </td>
        <td class="text-center">
          <button onclick="eliminarEmpleado(${empleado.id})" class="btn btn-small">
            <i class="fa fa-trash"></i>
          </button>
        </td>
      </tr>
    `)
  }
}

/*Eliminar Empleado*/
const eliminarEmpleado = async (idEmpleado) => {
  await axios.delete(`/api/empleados/eliminar-emapleado/${idEmpleado}`)
  listarEmpleados()
}

listarEmpleados()
