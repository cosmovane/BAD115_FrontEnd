import React, { Component } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faBan, faPlus } from '@fortawesome/free-solid-svg-icons'
import DescuentoService from '../../Service/Descuento/DescuentoService'
import Swal from 'sweetalert2';

class DescuentoComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      descuentos: []
    }

    this.refreshDescuentos = this.refreshDescuentos.bind(this)
    this.desactivar = this.desactivar.bind(this)
  }

  async componentDidMount() {
    await this.refreshDescuentos()
  }

  async desactivar(id) {
    try {
      const mensaje = await DescuentoService.desactivarDescuento(id)
      await this.refreshDescuentos()
      Swal.fire({
        icon: 'success',
        title: 'Buen trabajo!',
        html: mensaje,
        timer: 5000,
        timerProgressBar: true,
      })
    } catch (error) {
      const mensaje = 'Parece que algo salió mal'
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        html: mensaje,
        timer: 5000,
        timerProgressBar: true,
      })
    }
  }

  async refreshDescuentos() {
    const response = await DescuentoService.allDescuentos()
    const descuentosActivos = response.data.filter(
      descuento => {
        if(descuento.estado){
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
    this.setState({ descuentos: descuentosActivos })
  }

  render() {
    return (
      <div>
        <Container>
          <h3>Descuentos</h3>
          <div className="row">
            <Link to="/descuento/crear"> <button className="btn btn-success"> <FontAwesomeIcon icon={faPlus} />Agregar </button> </Link>
          </div>
          <br />
          <Table>
            <thead>
              <tr>
                <th style={{ width: '15%' }}>Acrónimo</th>
                <th style={{ width: '20%' }}>Nombre</th>
                <th style={{ width: '45%' }}>Descripción</th>
                <th style={{ width: '10%' }}>Porcentaje</th>
                <th style={{ width: '10%' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.descuentos.map(
                  descuento => {
                    if (descuento.estado)
                      return <tr key={descuento.idDescuento}>
                        <td>{descuento.acronimo}</td>
                        <td>{descuento.nombre}</td>
                        <td>{descuento.descripcion}</td>
                        {(() => {
                          if (descuento.porcentaje != 0 && descuento.porcentaje != null)
                            return <td>{descuento.porcentaje}</td>
                          else return <td></td>
                        })()
                        }
                        <td>
                          <Link to={`/descuento/editar/${descuento.idDescuento}`}><button className="btn btn-warning btn-sm"><FontAwesomeIcon icon={faEdit} /></button></Link>
                          <button className="btn btn-secondary btn-sm"><FontAwesomeIcon icon={faBan} onDoubleClick={() => this.desactivar(descuento.idDescuento)}  /></button>
                        </td>
                      </tr>
                    else return <div></div>
                  }
                )
              }
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default DescuentoComponent;