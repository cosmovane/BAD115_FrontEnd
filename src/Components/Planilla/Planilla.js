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

const InputField = ({ placeholder, name, esServicioProfesional }) => (
  <div>
    <input min="0" className="form-control" type="number" name={name} placeholder={placeholder} disabled={esServicioProfesional} />
  </div>
)

const CheckField = ({ esServicioProfesional }) => (
  <div>
    <FormCheck name="vacaciones" disabled={esServicioProfesional} />
  </div>
)

const AlertaDiaPago = () => (
  <Alert className="alerta-dia-pago" variant="danger">
    <b>Atención:</b> Hoy no es día de pago
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
  author: {
    margin: 15,
    fontSize: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    margin: 12,
    textAlign: 'center'
  },
  text: {
    margin: 15,
    fontSize: 10,
    textAlign: 'center',
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  }
})

const Boletas = ({ planilla, periodo }) => (
  <Document>
    {planilla.map((boleta) => {
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
    today: new Date()
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
    const columnasDescuentos = _.flatMap(_.remove(descuentos,
      (descuento) => {
        return descuento.acronimo != 'AFP' && descuento.acronimo != 'ISSS'
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
      {
        title: 'Horas extras',
        dataIndex: 'horasExtra',
        key: 'horasExtra',
        width: 100,
        render: (v, row) => <InputField placeholder={'Horas extra'} name={'horasExtra'} esServicioProfesional={row.esServicioProfesional} />
      },
      {
        title: 'Horas de nocturnidad',
        dataIndex: 'horasNocturnas',
        key: 'horasNocturnas',
        width: 100,
        render: (v, row) => <InputField placeholder={'Nocturnidad'} name={'horasNocturnas'} esServicioProfesional={row.esServicioProfesional} />
      },
      {
        title: 'Total de ventas',
        dataIndex: 'ventas',
        key: 'ventas',
        width: 100,
        render: (v, row) => <InputField placeholder={'Ventas'} name={'ventas'} esServicioProfesional={row.noEsDeVentas} />
      },
      {
        title: 'Bonos',
        dataIndex: 'bonos',
        key: 'bonos',
        width: 100,
        render: () => <InputField placeholder={'Bonos'} name={'bonos'} />
      },
      {
        title: 'Vacaciones',
        dataIndex: 'vacaciones',
        key: 'vacaciones',
        width: 100,
        render: (v, row) => <CheckField esServicioProfesional={row.noPuedeTomarVacaciones} />
      },
      {
        title: 'Días festivos',
        dataIndex: 'diasFestivos',
        key: 'diasFestivos',
        width: 100,
        render: (v, row) => <InputField placeholder={'Días festivos'} name={'diasFestivos'} esServicioProfesional={row.esServicioProfesional} />
      },
      ...columnasDescuentos,
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
          noEsDeVentas: _.isNull(empleado.id_unidadorganizacional) ? true : empleado.id_unidadorganizacional.idUnidadorganizacional === 8,
          noPuedeTomarVacaciones: !empleado.tomarVacaciones
        }
      })
    })
  }

  onSubmit = async () => {
    const horasExtra = Array.from(document.getElementsByName('horasExtra'))
    const horasNocturnas = Array.from(document.getElementsByName('horasNocturnas'))
    const ventas = Array.from(document.getElementsByName('ventas'))
    const bonos = Array.from(document.getElementsByName('bonos'))
    const vacaciones = Array.from(document.getElementsByName('vacaciones'))
    const diasFestivos = Array.from(document.getElementsByName('diasFestivos'))
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
    const planilla = this.state.planilla.map(async (boleta) => {
      const dia = new Date().getMonth()
      const fecha = `${new Date().getFullYear()}-${dia < 10 ? `0${dia}` : dia}-${new Date().getDate()}`
      const { salarioBase, salarioNominal, renta, isss, isssEmpleador, afp, afpEmpleador, key, salarioACobrar, esServicioProfesional, totalDescuentos } = boleta

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
          'otrosDescuentos': totalDescuentos
        }],
        'estado': true,
        'idEmpleado': key
      }
      return await BoletaPagoService.guardarBoleta(boletaPago)
    })

    Promise.all(planilla).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Buen trabajo!',
        html: 'Se ha guardado la planilla',
        timer: 5000,
        timerProgressBar: true,
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

  render() {

    return (
      <div>
        {this.state.today.getDay() === 6 || this.state.today.getDay() === 7
          ? <AlertaDiaPago />
          : this.state.periodicidad === 'quincenal'
            ? (this.state.today.toDateString() === new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toDateString()
              || this.state.today.getDate() === 15
              ? ''
              : <AlertaDiaPago />)
            : (this.state.today.toDateString() === new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toDateString()
              ? ''
              : <AlertaDiaPago />)
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
            periodo = {`${this.state.periodicidad !== 'quincenal' ? 'Mes'
            : new Date().getDate() < 15 ? 'Quincena 1' : 'Quincena 2'} de ${this.state.meses[new Date().getMonth()]} ${new Date().getFullYear()}`}
          />}
          fileName={`boletas ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}.pdf`}
        >
          {({ loading }) => (loading ? 'Creando boletas...' : 'Obtener boletas')}
        </PDFDownloadLink>
      </div>
    )
  }
}

export default Planilla;