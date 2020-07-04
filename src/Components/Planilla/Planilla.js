import React, { Component } from 'react';
import Table from 'rc-table'
import EmpleadoService from '../../Service/Empleado/EmpleadoService'
import DescuentoService from '../../Service/Descuento/DescuentoService'
import _ from 'lodash'
import Resultado from './Resultado'
import CalendarioTrabajoServices from '../../Service/CalendarioTrabajo/CalendarioTrabajoService'
import FormCheck from 'react-bootstrap/FormCheck'
import Alert from 'react-bootstrap/Alert'
import BoletaPagoService from '../../Service/BoletaPago/BoletaPagoService'
import { Page, Text, Document, PDFDownloadLink, StyleSheet } from '@react-pdf/renderer'
import Swal from 'sweetalert2';
import IngresoService from '../../Service/CatalogoIngresoService/IngresoService'
import CentroCostoService from '../../Service/CentroCosto/CentroCostoService';
import LoginService from '../../Service/Login/LoginService';
const InputField = ({ placeholder, name, deshabilitado }) => (
  <div>
    <input min="0" className="form-control" type="number" name={name} placeholder={placeholder} disabled={deshabilitado} />
  </div>
)

const CheckField = ({ deshabilitado }) => (
  <div>
    <FormCheck name="vacaciones" disabled={deshabilitado} />
  </div>
)

const AlertaNoDiaPago = () => (
  <Alert className="alerta-pago" variant="danger">
    <b>Atención:</b> Hoy no es día de pago
  </Alert>
)

const AlertaDiaPago = () => (
  <Alert className="alerta-pago" variant="success">
    Día de pago
  </Alert>
)

const estilosPdf = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  empleado: {
    marginTop: 15,
    fontSize: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 12,
    textAlign: 'center'
  },
  text: {
    fontSize: 10,
    textAlign: 'center',
  },
  section: {
    marginTop: 15,
    fontSize: 11,
    textAlign: 'center',
    fontWeight: 'ultrabold'
  },
  datosEmpleado: {
    fontSize: 9,
    textAlign: 'center',
    color: 'grey',
  },
  firma: {
    fontSize: 11,
    marginTop: 40,
    textAlign: 'center'
  }
})

const Boletas = ({ planilla, periodo, empleados }) => (
  <Document>
    {planilla.map((boleta, i) => {
      const { departamento } = empleados[i]
      return (<Page style={estilosPdf.body} key={boleta.key}>
        <Text style={estilosPdf.title}>
          Boleta de pago
        </Text>
        <Text style={estilosPdf.subtitle}>
          {periodo}
        </Text>
        <Text style={estilosPdf.empleado}>
          Empleado: {boleta.empleado}
        </Text>
        <Text style={estilosPdf.datosEmpleado}>
          {boleta.esServicioProfesional
            ? 'Empleado por servicios profesionales'
            : 'Empleado cotizante'}
        </Text>
        <Text style={estilosPdf.datosEmpleado}>
          Departamento: {departamento}
        </Text>
        <Text style={estilosPdf.section}>
          Detalle
        </Text>
        <Text style={estilosPdf.text}>
          Salario base: {boleta.salarioBase}
        </Text>
        <Text style={estilosPdf.text}>
          Salario nominal: {boleta.salarioNominal}
        </Text>
        <Text style={estilosPdf.section}>
          Descuentos
        </Text>
        <Text style={estilosPdf.text}>
          AFP: {boleta.afp}
        </Text>
        <Text style={estilosPdf.text}>
          ISSS: {boleta.isss}
        </Text>
        <Text style={estilosPdf.text}>
          Renta: {boleta.renta}
        </Text>
        <Text style={estilosPdf.text}>
          Otros: {boleta.totalDescuentos}
        </Text>
        <Text style={estilosPdf.section}>
          Pago
        </Text>
        <Text style={estilosPdf.text}>
          Total pago: {boleta.salarioACobrar}
        </Text>
        <Text style={estilosPdf.firma}>
          Firma del empleado: ________________
        </Text>
      </Page>)
    })
    }
  </Document>
)

class Planilla extends Component {
  state = {
    data: [],
    columns: [],
    pagos: [],
    datosEmpleados: [],
    periodicidad: '',
    planilla: [],
    dias: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
    meses: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    today: new Date(),
    planillaGuardada: false
  }

  async componentDidMount() {
    await this.asignarColumnas()
    await this.asignarDatosFilas()
    const periodicidad = (await CalendarioTrabajoServices.obtenerCalendarioDelAnio(new Date().getFullYear())).data.periocidad.toLowerCase()
    this.setState({ periodicidad })
  }

  asignarColumnas = async () => {
    const descuentos = (await DescuentoService.allDescuentos()).data.filter(
      descuento => {
        if (descuento.estado) {
          return {
            idDescuento: descuento.idDescuento,
            acronimo: descuento.acronimo,
            nombre: descuento.nombre,
            descripcion: descuento.descripcion,
            porcentaje: descuento.porcentaje,
          } 
        }
      }
    )

    const ingresos = (await IngresoService.allIngresosActivos()).data
    const columnasIngresos = _.remove(ingresos, (ingreso) => _.isNull(ingreso.porcentaje_ingreso)).map((ingreso) => {
      const inputColumn = {
        title: ingreso.nombre,
        dataIndex: ingreso.acronimoIngresos,
        key: ingreso.acronimoIngresos,
        width: 100,
        render: (v, row) => <InputField placeholder={ingreso.nombre} name={ingreso.acronimoIngresos.toLowerCase()} deshabilitado={
          ingreso.acronimoIngresos === 'TV'
            ? row.noEsDeVentas
            : ingreso.nombre !== 'Bonos'
              ? row.esServicioProfesional
              : false
        } />
      }
      return inputColumn
    })

    const columnasDescuentos = _.flatMap(_.remove(descuentos,
      (descuento) => {
        return descuento.acronimo != 'AFP' && descuento.acronimo != 'ISSS' && descuento.acronimo != 'PRESTAMO'
      }), descuento => {
        const column = {
          title: descuento.nombre,
          dataIndex: descuento.acronimo,
          key: descuento.acronimo,
          width: 100
        }

        const inputColumn = {
          title: descuento.nombre,
          dataIndex: descuento.acronimo,
          key: descuento.acronimo,
          width: 100,
          render: () => <InputField placeholder={descuento.nombre} name={descuento.acronimo.toLowerCase()} />
        }

        return descuento.acronimo === 'PRESTAMO'
          ? column
          : descuento.porcentaje !== 0
            ? column
            : inputColumn
      })

    this.setState({
      columns: [{
        title: 'Empleado',
        dataIndex: 'empleado',
        key: 'empleado',
        width: 200,
        fixed: 'left',
        render: (value) => <div style={{ height: '46.5px', maxHeight: '46.5px', color: 'black' }}>{value}</div>
      },
      {
        title: 'Salario base',
        dataIndex: 'salarioBase',
        key: 'salarioBase',
        width: 100,
      },
      ...columnasIngresos,
      {
        title: 'Vacaciones',
        dataIndex: 'vacaciones',
        key: 'vacaciones',
        width: 100,
        render: (v, row) => <CheckField deshabilitado={row.noPuedeTomarVacaciones} />
      },
      ...columnasDescuentos,
      {
        title: 'Préstamo',
        dataIndex: 'prestamo',
        key: 'prestamo',
        width: 100,
      }
      ]
    })
  }

  asignarDatosFilas = async () => {
    const empleados = _.orderBy(
      (await EmpleadoService.allEmpleados()).data.filter(
        empleado => {
          if (empleado.estado) return empleado
        }
      ), ['primernombre', 'segundonombre', 'apellidopaterno', 'apellidomaterno'], ['asc', 'asc', 'asc', 'asc'])

    this.setState({
      data: empleados.map(empleado => {
        return {
          key: empleado.idEmpleado,
          empleado: `${empleado.primernombre} ${empleado.segundonombre} ${empleado.apellidopaterno} ${empleado.apellidomaterno} ${empleado.apellidocasada}`,
          salarioBase: empleado.salario,
          esServicioProfesional: empleado.esServicioProfesional,
          noEsDeVentas: _.isNull(empleado.id_unidadorganizacional) ? true : !empleado.id_unidadorganizacional.idUnidadorganizacional === 8,
          noPuedeTomarVacaciones: !empleado.tomarVacaciones,
          departamento: _.isNull(empleado.id_unidadorganizacional) ? ''
            : empleado.id_unidadorganizacional.nombre,
          prestamo: empleado.prestamo
        }
      })
    })
  }

  onSubmit = async () => {
    const horasExtra = Array.from(document.getElementsByName('he'))
    const horasNocturnas = Array.from(document.getElementsByName('hn'))
    const ventas = Array.from(document.getElementsByName('tv'))
    const bonos = Array.from(document.getElementsByName('bn'))
    const vacaciones = Array.from(document.getElementsByName('vacaciones'))
    const diasFestivos = Array.from(document.getElementsByName('df'))
    const comida = Array.from(document.getElementsByName('cmda'))
    const diasFaltados = Array.from(document.getElementsByName('dias'))
    const horasFaltadas = Array.from(document.getElementsByName('horas'))

    const datosEmpleados = this.state.data.map((empleado, i) => {
      return {
        id: empleado.key,
        diasFaltados: isNaN(parseFloat(diasFaltados[i].value)) ? 0 : parseFloat(diasFaltados[i].value),
        horasFaltadas: isNaN(parseFloat(horasFaltadas[i].value)) ? 0 : parseFloat(horasFaltadas[i].value),
        horasExtra: isNaN(parseFloat(horasExtra[i].value)) ? 0 : parseFloat(horasExtra[i].value),
        horasNocturnas: isNaN(parseFloat(horasNocturnas[i].value)) ? 0 : parseFloat(horasNocturnas[i].value),
        ventas: isNaN(parseFloat(ventas[i].value)) ? 0 : parseFloat(ventas[i].value),
        bonos: isNaN(parseFloat(bonos[i].value)) ? 0 : parseFloat(bonos[i].value),
        diasFestivos: isNaN(parseFloat(diasFestivos[i].value)) ? 0 : parseFloat(diasFestivos[i].value),
        otrosDescuentos: isNaN(parseFloat(comida[i].value)) ? 0 : parseFloat(comida[i].value),
        esServicioProfesional: empleado.esServicioProfesional,
        aplicarVacaciones: vacaciones[i].checked,
        periodicidad: this.state.periodicidad
      }
    })

    this.setState({
      datosEmpleados
    })


    let pagos = datosEmpleados.map(async (datosEmpleado) => {
      return (await BoletaPagoService.obtenerPago(datosEmpleado)).data
    })

    Promise.all(pagos).then(pagos => {
      this.setState({
        pagos,
      }, () => {
        this.setState({
          planilla: _.merge(this.state.data, this.state.pagos)
        })
      })
    })
  } 

  guardarPlanilla = () => {
    const planilla = this.state.planilla.map(async (boleta, i) => {
      const mes = new Date().getMonth()
      const dia = new Date().getDate()
      const fecha = `${new Date().getFullYear()}-${mes < 10 ? `0${mes + 1}` : mes + 1}-${dia < 10 ? `0${dia}` : dia}`
      const { salarioBase, salarioNominal, renta, isss, isssEmpleador, afp, afpEmpleador, key, salarioACobrar, esServicioProfesional, totalDescuentos } = boleta
      const { aplicarVacaciones, bonos, diasFaltados, diasFestivos, horasExtra, horasFaltadas, horasNocturnas, ventas, otrosDescuentos } = this.state.datosEmpleados[i]

      const boletaPago = {
        fecha,
        salarioBase,
        'salarioNeto': salarioNominal,
        'idCalendario': (await CalendarioTrabajoServices.obtenerCalendarioDelAnio(new Date().getFullYear())).data.calendariotrabajo,
        'detalleBoletaPago': [{
          'estado': true,
          'serviciosProfesionales': esServicioProfesional,
          renta,
          isss,
          'isssEmpleador': _.isNull(isssEmpleador) ? 0 : isssEmpleador,
          afp,
          'afpEmpleador': _.isNull(afpEmpleador) ? 0 : afpEmpleador,
          'pago': salarioACobrar,
          'otrosDescuentos': totalDescuentos,
          horasExtra,
          'horasNocturnidad': horasNocturnas,
          'totalVentas': ventas,
          bonos,
          diasFestivos,
          'vacaciones': aplicarVacaciones,
          'comida': otrosDescuentos,
          'diasPerdidos': diasFaltados,
          'horasADescontar': horasFaltadas
        }],
        'estado': true,
        'idEmpleado': key,
        'pagado': false
      }
      return await BoletaPagoService.guardarBoleta(boletaPago)
    })

    Promise.all(planilla).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Buen trabajo!',
        html: 'Se ha guardado la planilla <br/> <b>Dar click en el botón Pagar planilla</b>',
      })
      this.setState({
        planillaGuardada: true
      })
    }).catch(() => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        html: 'Parece que algo salió mal',
        timer: 5000,
        timerProgressBar: true,
      })
    })

  }

  pagarPlanilla = async () =>{
    await CentroCostoService.payCosto();
  }

  render() {

    return (
      <div>
        {this.state.today.getDay() === 6 || this.state.today.getDay() === 7
          ? <AlertaNoDiaPago />
          : this.state.periodicidad === 'quincenal'
            ? (this.state.today.toDateString() === new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toDateString()
              || this.state.today.getDate() === 15
              ? <AlertaDiaPago />
              : <AlertaNoDiaPago />)
            : (this.state.today.toDateString() === new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toDateString()
              ? <AlertaDiaPago />
              : <AlertaNoDiaPago />)
        }

        <h3>Planilla {this.state.periodicidad} {this.state.periodicidad !== 'quincenal' ? ''
          : new Date().getDate() < 15 ? 1 : 2} de {this.state.meses[new Date().getMonth()]} {new Date().getFullYear()}</h3>
        <label> <b>Fecha:</b> {`${this.state.dias[new Date().getDay()]} ${new Date().getDate()} de ${this.state.meses[new Date().getMonth()]} de ${new Date().getFullYear()}`}</label>
        <div className="planilla">
          <Resultado datosEmpleados={this.state.datosEmpleados} />
          <div className="tabla-planilla">
            <Table className="table tablaPlanilla"
              columns={this.state.columns}
              data={this.state.data}
              style={{ width: "100%", height: "100%", marginBottom: 0 }}
              scroll={{ x: 1500 }}
            />
          </div>
        </div>
        <button className="btn btn-secondary btn-planilla" disabled={this.state.data.length <= 0} onClick={this.onSubmit}>
          Calcular pagos
        </button>
        <button className="btn btn-success btn-planilla" disabled={this.state.pagos.length <= 0} onClick={this.guardarPlanilla}>
          Guardar
        </button>
        <PDFDownloadLink
          className={`btn btn-info btn-planilla ${this.state.pagos.length > 0 ? '' : 'disabled'}`}
          id="obtenerBoletasBtn"
          document={<Boletas planilla={this.state.planilla}
            periodo={`${this.state.periodicidad !== 'quincenal' ? 'Mes'
              : new Date().getDate() < 15 ? 'Quincena 1' : 'Quincena 2'} de ${this.state.meses[new Date().getMonth()]} ${new Date().getFullYear()}`}
            empleados={this.state.data}
          />}
          fileName={`boletas ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}.pdf`}
        >
          {({ loading }) => (loading ? 'Creando boletas...' : 'Obtener boletas')}
        </PDFDownloadLink>

        <button className="btn btn-secondary btn-planilla" onDoubleClick={ () => this.pagarPlanilla()} disabled={!this.state.planillaGuardada}>
          Pagar planilla
        </button>
      </div>
    )
  }
}

export default Planilla;