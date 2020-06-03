import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
class MenuComponent extends Component {
    render(){
      return (
        <Card
          bg="secondary" key="secondary"
        >
        <Navbar bg="dark" expand="lg" variant="dark">
          <Navbar.Brand href=""> <Image src="circle-logo-parrot.png" style={{ width:50 }}></Image> </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/empresa">Empresa</Nav.Link>
            <Nav.Link href="/empleado">Empleados</Nav.Link>
            <Nav.Link href="/profesion">Profesiones</Nav.Link>
            <Nav.Link href="/departamentos">Departamentos</Nav.Link>

            <Nav.Link href="/puestotrabajo">Puestos de Trabajo</Nav.Link>
              <NavDropdown title="Configuraciones" id="basic-nav-dropdown">
              <NavDropdown.Item href="/centro_costo_list/-1">Gestión de costos</NavDropdown.Item>
                <NavDropdown.Item href="">Gestión tipos ingresos</NavDropdown.Item>
                <NavDropdown.Item href="">Gestión tipos descuentos</NavDropdown.Item>
                <NavDropdown.Item href="/usuarios">Gestión usuario</NavDropdown.Item>
                 <NavDropdown.Item href="/roles">Gestión roles</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        </Card>
      );
    }
  }
  export default MenuComponent;