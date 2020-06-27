import React, { Component } from 'react';
import Table from 'rc-table'
import EmpleadoService from '../../Service/Empleado/EmpleadoService'
import DescuentoService from '../../Service/Descuento/DescuentoService'
import _ from 'lodash'
import Resultado from './Resultado'
import BoletaPagoService from '../../Service/BoletaPago/BoletaPagoService'

const InputField = ({ placeholder, name }) => (
  <div>
    <input min="0" className="form-control" type="number" name={name} placeholder={placeholder} />
  </div>
)

class Planilla extends Component {
  state = {
    data: [],
    columns: [],
    pagos: []
  }

  async componentDidMount() {
    await this.asignarColumnas()
    await this.actualizarPlanilla()
    const anio = new Date().getFullYear()
    console.log("Planilla -> onSubmit -> anio", anio)
    
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
        render: () => <InputField placeholder={'Horas extra'} name={'horasExtra'} />
      },
      {
        title: 'Horas de nocturnidad',
        dataIndex: 'horasNocturnas',
        key: 'horasNocturnas',
        width: 100,
        render: () => <InputField placeholder={'Nocturnidad'} name={'horasNocturnas'} />
      },
      {
        title: 'Total de ventas',
        dataIndex: 'ventas',
        key: 'ventas',
        width: 100,
        render: () => <InputField placeholder={'Ventas'} name={'ventas'} />
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
        render: () => <InputField placeholder={'Vacaciones'} name={'vacaciones'} />
      },
      {
        title: 'Días festivos',
        dataIndex: 'diasFestivos',
        key: 'diasFestivos',
        width: 100,
        render: () => <InputField placeholder={'Días festivos'} name={'diasFestivos'} />
      },
      ...columnasDescuentos,
      ]
    })
  }

  actualizarPlanilla = async () => {
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
          empleado: `${empleado.primernombre} ${empleado.segundonombre} ${empleado.apellidopaterno} ${empleado.apellidomaterno} ${empleado.apellidocasada}`, salarioBase: empleado.salario
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
        diasFaltados: isNaN(diasFaltados[i].value) ? parseFloat(diasFaltados[i].value) : 0,
        horasFaltadas: isNaN(horasFaltadas[i].value) ? parseFloat(horasFaltadas[i].value) : 0,
        horasExtra: isNaN(horasExtra[i].value) ? parseFloat(horasExtra[i].value) : 0,
        horasNocturnas: isNaN(horasNocturnas[i].value) ? parseFloat(horasNocturnas[i].value) : 0,
        ventas: isNaN(ventas[i].value) ? parseFloat(ventas[i].value) : 0,
        bonos: isNaN(bonos[i].value) ? parseFloat(bonos[i].value) : 0,
        diasFestivos: isNaN(diasFestivos[i].value) ? parseFloat(diasFestivos[i].value) : 0,
        otrosDescuentos: isNaN(comida[i].value) ? parseFloat(comida[i].value) : 0,
        esServicioProfesional: false,
        aplicarVacaciones: false,
        periodicidad: 'quincenal'
      }
    })

    
    let pagos = datosEmpleados.map(async (datosEmpleado) => {
      return (await BoletaPagoService.obtenerBoleta(datosEmpleado)).data
    })

    Promise.all(pagos).then(pagos => {
      this.setState({
        pagos
      })
    })
  }


  render() {

    return (
      <div>
        <h3>Planilla</h3>
        <div className="planilla">
          <Resultado />
          <div className="tabla-planilla">
            <Table className="table"
              columns={this.state.columns}
              data={this.state.data}
              style={{ width: "100%", height: "100%", marginBottom: 0 }}
              scroll={{ x: 1500 }}
            />
          </div>
        </div>
        <br />
        <button className="btn btn-success" onClick={this.onSubmit}>
          Guardar planilla
        </button>
      </div>
    )
  }
}

export default Planilla;