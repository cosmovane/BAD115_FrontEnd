import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import  { Redirect,withRouter } from 'react-router-dom'
import Swal from 'sweetalert2';
import LoginService from '../../Service/Login/LoginService';

class MenuComponent extends Component {
  constructor(props){
    super(props)
    this.logout = this.logout.bind(this);
  }


  logout(){
    LoginService.logout();
   // this.props.history.push('/login');
   Swal.fire({icon: 'info',title: 'Sesión cerrada',text: `Has cerrado sesión con éxito!`})
   window.location.reload(false);
  }

    render(){
      let username = LoginService.obtenerUsuario();
      console.log(username)
      console.log(LoginService.isAuthenticated())
      if(LoginService.isAuthenticated()){
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
          <NavDropdown title={`${username.username}`} id="basic-nav-dropdown">
           <Link to={`/usuario/general/${username.id}`} className="dropdown-item"></Link>
            <button onClick={()=>this.logout()} className="dropdown-item" type="submit">Sign Out</button>

              </NavDropdown>
        </Navbar>
        </Card>
      );
      } else {
        return <Redirect to='/' />
      }
    }
  }
  export default MenuComponent;