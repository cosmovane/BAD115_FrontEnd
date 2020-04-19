import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
// import Form from 'react-bootstrap/Form';
// import FormControl from 'react-bootstrap/FormControl'
// import Button from 'react-bootstrap/Button'
// import {NavLink, withRouter}  from 'react-router-dom'
class MenuComponent extends Component {
    // getNavLinkClass = (path) => {
    //     return this.props.location.pathname === path ? 'active' : '';
    // }
    render(){
      return (
        <Navbar bg="dark" expand="lg" variant="dark">
          <Navbar.Brand href="#home">Planilla</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            {/* <NavLink className={this.getNavLinkClass("/")} to="/">Home</NavLink> */}
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/empresa">Empresa</Nav.Link>
            <Nav.Link href="/empleados">Empleados</Nav.Link>
            <Nav.Link href="/departamentos">Departamentos</Nav.Link>
            {/* <Nav.Link><NavLink className={this.getNavLinkClass("/empresa")} to="/empresa">Empresa</NavLink></Nav.Link>
            <Nav.Link><NavLink className={this.getNavLinkClass("/")} to="/empleado">Empleados</NavLink></Nav.Link>
            <Nav.Link><NavLink className={this.getNavLinkClass("/")} to="/departamento">Departamentos</NavLink></Nav.Link> */}
              <NavDropdown title="Configuraciones" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Gestión tipos ingresos</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Gestión tipos descuentos</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Gestión tipos generos</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Gestión tipos generos</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            {/* <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form> */}
          </Navbar.Collapse>
        </Navbar>
      );
    }
  }
//   MenuComponent = withRouter(MenuComponent);
  export default MenuComponent;