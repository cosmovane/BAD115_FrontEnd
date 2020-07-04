import React, { Component } from 'react';
import { Row, Col, Card, Container } from 'react-bootstrap'
import { Field } from 'formik'

const inputStyle = {
  'width': '25em',
  'display': 'inline-block'
}
import LoginService from '../../Service/Login/LoginService';
class DescuentoEmpleadoPorcentajeCero extends Component {
  // state = {
  //   descuentosEmplePorcentajeCero: []
  // }

  render() {
    return (
      <div>
        <br />
        <Row>
          <Col>
            <h5>Cantidad a descontar en dólares del descuento {this.props.descuento.nombre}</h5>
            <fieldset className="form-group">
              <Field 
                className="form-control" 
                type="number" 
                style={inputStyle} 
                placeholder="Cantidad en dólares"
                name={this.props.descuento.idDescuento} 
                onChange={this.props.onChange}
              />
            </fieldset>
          </Col>
        </Row>
      </div>
    );
  }
}

export default DescuentoEmpleadoPorcentajeCero;