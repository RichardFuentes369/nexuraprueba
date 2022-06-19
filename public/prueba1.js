let model = {
  fullName: '',
  inpEmail: '',
  inpSexo: '',
  inpArea: '',
  inpRoles: '',
  inpDescription: ''
}

let areas = []
let roles = []
let cantidadRoles = 0
let rolesSeleccionados = []

/*Expresiones regulares*/
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

/*Limpiar Modal*/
const limpiar = () => {
  console.log('limpiando ....')
  // limpio el modelo
  model = {
    fullName: '',
    inpEmail: '',
    inpSexo: '',
    inpArea: '',
    inpRoles: '',
    inpDescription: ''
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
  console.log('falta limpiar el select')
  document.getElementsByClassName('inpDescription')[0].value = '';

  // limpio los errores
  document.getElementsByClassName('inpErrorfullName')[0].style.visibility = 'hidden';
  document.getElementsByClassName('inpErrorEmail')[0].style.visibility = 'hidden';
  document.getElementsByClassName('inpErrorDescription')[0].style.visibility = 'hidden';
  document.getElementsByClassName('inpErrorArea')[0].style.visibility = 'hidden';
}

/*Listo Areas para llenar el modal*/
const listarAreas = async () => {
  await axios.get(`/api/areas/lista-areas`).then(res => {
    areas = res.data
  })

  for (const area of areas) {
    $('.listaAreas').append(`
      <option value="${area.id}">${area.nombre}</option>
    `)
  }
}

/*Listo Roles para llenar el modal*/
const listarRoles = async () => {
  await axios.get(`/api/roles/lista-roles`).then(res => {
    roles = res.data
  })

  cantidadRoles = roles.length

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
const openModal = async () => {
  await listarAreas()
  await listarRoles()
  await $(`#exampleModal`).modal('show')
}

/*Cierro modal*/
const cerrarModal = (nombreModal) => {
  $(`#${nombreModal}`).modal('hide')
}

/*Guardar empleado, validado con expresion regular*/
const guardarEmpleado = () => {
  // guardo en un arreglo los roles seleccionados
  for (let i = 1; i <= roles.length; i++) {
    (document.getElementById(`rol${i}`).checked) ? rolesSeleccionados.push(i) : ''
  }

  // 1 valida texto, 2 valida correo, 3 valido descripcion, 4 valido area
  (!validarDato(1, document.getElementsByClassName('inpfullName')[0].value)) ?
    document.getElementsByClassName('inpErrorfullName')[0].style.visibility = 'visible' /*aqui debe haber un return, ya que si no es valido paila*/ :
    document.getElementsByClassName('inpErrorfullName')[0].style.visibility = 'hidden';

  (!validarDato(2, document.getElementsByClassName('inpEmail')[0].value)) ?
    document.getElementsByClassName('inpErrorEmail')[0].style.visibility = 'visible' /*aqui debe haber un return, ya que si no es valido paila*/ :
    document.getElementsByClassName('inpErrorEmail')[0].style.visibility = 'hidden';

  (!validarDato(3, document.getElementsByClassName('inpDescription')[0].value)) ?
    document.getElementsByClassName('inpErrorDescription')[0].style.visibility = 'visible' /*aqui debe haber un return, ya que si no es valido paila*/ :
    document.getElementsByClassName('inpErrorDescription')[0].style.visibility = 'hidden';

  (!validarDato(4, document.getElementsByClassName('inpArea')[0].value)) ?
    document.getElementsByClassName('inpErrorArea')[0].style.visibility = 'visible' /*aqui debe haber un return, ya que si no es valido paila*/ :
    document.getElementsByClassName('inpErrorArea')[0].style.visibility = 'hidden';

  // valido que vayan roles
  (rolesSeleccionados.length == 0) ?
    document.getElementsByClassName('inpErrorRol')[0].style.visibility = 'visible'/*aqui debe haber un return, ya que si no es valido paila*/ :
    document.getElementsByClassName('inpErrorRol')[0].style.visibility = 'hidden';


  /*
   this.model.fullName = document.getElementsByClassName('inpfullName')[0].value
   this.model.inpEmail = document.getElementsByClassName('inpEmail')[0].value
   this.model.inpSelect = document.getElementsByClassName('inpSelect')[0].value
   this.model.inpDescription = document.getElementsByClassName('inpDescription')[0].value
   */


  /*
    *guardo
    *cerrarModal('exampleModal')
  */

}

/*Listar Empleado*/
const listarEmpleados = () => {
  axios.get(`/api/empleados/lista-emapleados`).then(res => {
    console.log(res)
  })
}

listarEmpleados()
