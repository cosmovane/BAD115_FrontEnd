import React, { useEffect, useState } from 'react';
import Table from 'rc-table'
import BoletaPagoService from '../../Service/BoletaPago/BoletaPagoService'

const columns = [
  {
    title: 'ISSS',
    dataIndex: 'isss',
    key: 'isss',
    width: 100,
    render: (value) => <div style={{ height: '48px', maxHeight: '48px', color: 'black' }}>{value}</div>
  },
  {
    title: 'ISSS Empleador',
    dataIndex: 'isssEmpleador',
    key: 'isss_empleador',
    width: 100
  },
  {
    title: 'AFP',
    dataIndex: 'afp',
    key: 'afp',
    width: 100
  },
  {
    title: 'AFP Empleador',
    dataIndex: 'afpEmpleador',
    key: 'afpEmpleador',
    width: 100
  },
  {
    title: 'Renta',
    dataIndex: 'renta',
    key: 'renta',
    width: 100
  },
  {
    title: 'Otros descuentos',
    dataIndex: 'totalDescuentos',
    key: 'totalDescuentos',
    width: 100
  },
  {
    title: 'Pago de vacaciones',
    dataIndex: 'vacaciones',
    key: 'vacaciones',
    width: 100
  },
  {
    title: 'Salario nominal',
    dataIndex: 'salarioNominal',
    key: 'salarioNominal',
    width: 100
  },
  {
    title: 'Pago',
    dataIndex: 'salarioACobrar',
    key: 'pago',
    width: 100
  }
]

function Resultado({ datosEmpleados }) {
  const [pagos, setPagos] = useState(null)

  useEffect(() => {
    async function obtenerPagos() {
      const pagos = datosEmpleados.map(async (datosEmpleado) => {
        const test = (await BoletaPagoService.obtenerPago(datosEmpleado)).data
        return test
      })

      Promise.all(pagos).then(pagos =>
        setPagos(pagos)
      )
    }

    obtenerPagos()

  }, [datosEmpleados])


  return (
    <div className="resultados">
      <Table className="table tablaPlanilla"
        columns={columns}
        data={pagos}
        style={{ width: "100%", height: "100%", marginBottom: 0, backgroundColor: "whitesmoke" }}
        scroll={{ x: 1000 }}
      />
    </div>
  );
}

export default Resultado;