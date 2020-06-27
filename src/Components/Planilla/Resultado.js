import React, { Component } from 'react';
import Table from 'rc-table'

class Resultado extends Component {
  columns = [
    {
      title: 'ISSS',
      dataIndex: 'isss',
      key: 'isss',
      width: 100
    },
    {
      title: 'ISSS Empleador',
      dataIndex: 'isssEmpleador',
      key: 'isssEmpleador',
      width: 100
    },
    {
      title: 'AFP',
      dataIndex: 'afp',
      key: 'afp',
      width: 100
    },
    {
      title: 'AFP',
      dataIndex: 'afpEmpleador',
      key: 'afpEmpleador',
      width: 100
    },
    {
      title: 'Pago',
      dataIndex: 'pago',
      key: 'pago',
      width: 100
    }
  ]

  render() {
    return (
      <div className="resultados">
        <Table
          columns={this.columns}
          style={{ width: "100%", height: "100%", marginBottom: 0 }}
        />
      </div>
    );
  }
}

export default Resultado;