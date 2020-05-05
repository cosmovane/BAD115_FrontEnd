import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Redirect,Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Image from 'react-bootstrap/Image';
class MenuComponent extends Component {
    render(){
      return (
        <Card
          bg="secondary" key="secondary"
        >
          <Card.Header>
        <Navbar bg="dark" expand="lg" variant="dark">
          <Navbar.Brand href="#home"> <Image src="circle-logo-parrot.png" style={{ width:50 }}></Image> </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/empresa">Empresa</Nav.Link>
            <Nav.Link href="/empleados">Empleados</Nav.Link>
            <Nav.Link href="/profesion">Profesiones</Nav.Link>
            <Nav.Link href="/departamentos">Departamentos</Nav.Link>
            <Nav.Link href="/puestotrabajo">Puestos de Trabajo</Nav.Link>
              <NavDropdown title="Configuraciones" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Gestión tipos ingresos</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Gestión tipos descuentos</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Gestión tipos generos</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Gestión tipos generos</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
           
          </Navbar.Collapse>
        </Navbar>
        </Card.Header>
        </Card>
      );
    }
  }
  export default MenuComponent;