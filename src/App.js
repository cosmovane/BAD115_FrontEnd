import React from 'react';
import './App.css';

import {Route, BrowserRouter as Router } from 'react-router-dom'
import { GuardProvider, GuardedRoute } from 'react-router-guards';
import { withRouter } from "react-router";
import Swal from 'sweetalert2';

import MenuComponent from './Components/Menu/Menu';
import EmpresaComponent from './Components/Empresa/Empresa';
import EmpresaDetalleComponent from './Components/Empresa/EmpresaDetalle';
import HomeComponent from './Components/Home/Home';
import ProfesionComponent from './Components/Profesion/Profesion';
import ProfesionF from './Components/Profesion/ProfesionF';
import PuestoTrabajoComponent from './Components/PuestoTrabajo/PuestoTrabajo'
import PuestoTrabajoDetalle from './Components/PuestoTrabajo/PuestoTrabajoDetalle'

import EmpleadoComponent from './Components/Empleado/Empleado';
import ComisionComponent from './Components/Comision/Comision';
import ComisionDetalleComponent from './Components/Comision/ComisionDetalle';
import EmpleadoDetalleComponent from './Components/Empleado/EmpleadoDetalle';
import DescuentoComponent from './Components/Descuento/Descuento'
import DescuentoDetalle from './Components/Descuento/DescuentoDetalle'
import Planilla from './Components/Planilla/Planilla'
import CentroCostoComponent from './Components/CentroCosto/CentroCostos';
import CentroCostoForm from './Components/CentroCosto/CentroCostoForm';


import UnidadOrganizacionalComponent from './Components/UnidadOrganizacional/UnidadOrganizacional';
import UnidadOrganizacionalDetalle from './Components/UnidadOrganizacional/UnidadOrganizacionalDetalle';
import CalendarioTrabajo from './Components/CalendarioTrabajo/CalendarioTrabajo';
import CalendarioTrabajoDetalle from './Components/CalendarioTrabajo/CalendarioTrabajoDetalle';
//import EventCalendar from './Components/EventCalendar/EventCalendar';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import Modal from 'react-modal';

import Ingresos from './Components/CatalogoIngreso/Ingresos';
import IngresoForm from './Components/CatalogoIngreso/IngresoForm';

import Roles from './Components/Rol/Roles';
import RolForm from './Components/Rol/RolForm';
import RolVer from './Components/Rol/RolVer';
import Usuarios from './Components/Usuario/Usuarios';
import UsuarioForm from './Components/Usuario/UsuarioForm';
import UsuarioGeneral from './Components/Usuario/UsuarioGeneral';
import UsuarioVer from './Components/Usuario/UsuarioVer';

import Login from './Components/Login/Login';

import LoginService from '../src/Service/Login/LoginService';
import NotFound from './Components/Login/NotFound';

const requireLogin=(to,from,next)=>{
	if(to.meta.auth){
		if(LoginService.isAuthenticated()){
      if (LoginService.isTokenExpirado()) {
        LoginService.logout();
        Swal.fire(
                    'Estado de cuenta',
                    'Susesión ha expirado' ,
                    'info'
        )
        next.redirect('/login');
      }
			else if (LoginService.hasPermiso(to.meta.permiso)){ 
				next();
			}else{
        Swal.fire(
                    'Estado de cuenta',
                    'No tiene permiso a este recurso!!' ,
                    'info'
        )
        next.redirect('/home');
      }

		}
		next.redirect('/login');
	}else{
		next();
	}
};



function App() {
  var subtitle;
  const [modalIsOpen,setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#ff0000';
  }

  function closeModal(){
    setIsOpen(false);
  }
  return (
    <div className="App">
      <Router>
       <GuardProvider guards={[requireLogin]} >
        <div>

          <MenuComponent></MenuComponent>





          <GuardedRoute exact path="/" component={Login} />
          <GuardedRoute exact path="/login" component={Login} />
          <GuardedRoute exact path="/home" component={HomeComponent} meta={{ auth: true,permiso:'GENERAL_HOME' }} />
          <GuardedRoute exact path="/empresa" component={EmpresaComponent}  meta={{ auth: true,permiso:'EMPRESA_READ' }}/>
          <GuardedRoute path="/empresa/:id" component={EmpresaDetalleComponent} meta={{auth:true,permiso:'EMPRESA_READ'}} />

          <GuardedRoute path="/centro_costo_list/:id" render={(props)=><CentroCostoComponent {...props}/>} meta={{ auth: true,permiso:'CENTRO_COSTO_READ'}}/>
          <GuardedRoute path="/centro_costo/crear/:id" render={(props)=><CentroCostoForm {...props} crear={true}/>} meta={{ auth: true,permiso:'CENTRO_COSTO_CREATE'}}/>
          <GuardedRoute path="/centro_costo/editar/:id" render={(props)=><CentroCostoForm {...props} editar={true}/>} meta={{ auth: true,permiso:'CENTRO_COSTO_UPDATE'}}/>

          <GuardedRoute exact path="/roles" component={Roles} meta={{ auth: true,permiso:'ROL_READ'}}/>
          <GuardedRoute path="/rol/crear" component={RolForm} meta={{ auth: true,permiso:'ROL_CREATE'}}/>
          <GuardedRoute path="/rol/editar/:id" render={(props) =><RolForm {...props} editar={true}/>} meta={{ auth: true,permiso:'ROL_UPDATE'}}/>
          <GuardedRoute path="/rol/ver/:id" render={(props) =><RolVer {...props} ver={true}/>} meta={{ auth: true,permiso:'ROL_READ'}}/>
          
          <GuardedRoute exact path="/usuarios" component={Usuarios} meta={{ auth: true,permiso:'USER_READ'}}/>
          <GuardedRoute path="/usuario/crear" component={UsuarioForm} meta={{ auth: true,permiso:'USER_CREATE' }}/>
          <GuardedRoute path="/usuario/editar/:id" render={(props)=><UsuarioForm {...props} editar={true} />} meta={{ auth: true,permiso:'USER_UPDATE' }}/>
          <GuardedRoute path="/usuario/ver/:id" render={(props)=><UsuarioVer {...props} ver={true} />} meta={{ auth: true,permiso:'USER_GENERAL_READ' }}/>
          <GuardedRoute path="/usuario/general/:id" render={(props)=><UsuarioGeneral {...props}/>} meta={{ auth: true,permiso:'USER_GENERAL_UPDATE' }}/>

          <GuardedRoute path="/planilla" component={Planilla}  meta={{ auth: true,permiso:'BOLETA_PAGO_READ' }}/>

          <GuardedRoute exact path="/descuento" component={DescuentoComponent}  meta={{ auth: true,permiso:'DESCUENTO_READ' }}/>
          <GuardedRoute path="/descuento/crear" component={DescuentoDetalle}  meta={{ auth: true,permiso:'DESCUENTO_CREATE' }}/>
          <GuardedRoute path="/descuento/editar/:id" render={(props) =><DescuentoDetalle {...props} editar={true}/>} meta={{ auth: true,permiso:'DESCUENTO_UPDATE'}}/>
          
           <GuardedRoute exact path="/periocidad" component={CalendarioTrabajo}  meta={{ auth: true,permiso:'CALENDARIO_TRABAJO_READ' }}/>
           <GuardedRoute path="/periocidad/crear" component={CalendarioTrabajoDetalle}  meta={{ auth: true,permiso:'CALENDARIO_TRABAJO_CREATE' }}/>

           <GuardedRoute path="/periocidad/editar/:id" render={(props) =><CalendarioTrabajoDetalle {...props} editar={true}/>} meta={{ auth: true,permiso:'CALENDARIO_TRABAJO_UPDATE'}}/>
          
           <GuardedRoute exact path="/comision" component={ComisionComponent}  meta={{ auth: true,permiso:'COMISION_READ' }}/>
           <GuardedRoute path="/comision/:id" component={ComisionDetalleComponent}  meta={{ auth: true,permiso:'COMISION_READ' }}/>


          <GuardedRoute exact path="/departamentos" component={UnidadOrganizacionalComponent} meta={{ auth: true,permiso:'UNIDAD_ORGANIZACIONAL_READ'}}/>
          <GuardedRoute path="/departamentos/crear" component={UnidadOrganizacionalDetalle} meta={{ auth: true,permiso:'UNIDAD_ORGANIZACIONAL_CREATE'}}/>
          <GuardedRoute path="/departamentos/editar/:id" render={ (props) =><UnidadOrganizacionalDetalle {...props} editar={true}/>} meta={{ auth: true,permiso:'UNIDAD_ORGANIZACIONAL_UPDATE'}}/>

          <GuardedRoute exact path="/profesion" component={ProfesionComponent} meta={{ auth: true,permiso:'PROFESION_READ'}}/>
          <GuardedRoute path="profesion/crear" component={ProfesionF} meta={{ auth: true,permiso:'PROFESION_CREATE'}}/>
          <GuardedRoute path="/profesion/:id" component={ProfesionF} meta={{ auth: true,permiso:'PROFESION_READ'}}/>
          
          <GuardedRoute exact path="/puestotrabajo" component={PuestoTrabajoComponent} meta={{ auth: true,permiso:'PUESTO_TRABAJO_READ'}}/>
          <GuardedRoute path="/puestotrabajo/crear" component={PuestoTrabajoDetalle} meta={{ auth: true,permiso:'PUESTO_TRABAJO_CREATE'}}/>
          <GuardedRoute path="/puestotrabajo/editar/:id" render={ (props) =><PuestoTrabajoDetalle {...props} editar={true}/>} meta={{ auth: true,permiso:'PUESTO_TRABAJO_UPDATE'}}/>
          
          <GuardedRoute exact path="/empleado" component={EmpleadoComponent} meta={{ auth: true,permiso:'EMPLEADO_READ'}}/>
          <GuardedRoute path="/empleado/:id" component={EmpleadoDetalleComponent} meta={{ auth: true,permiso:'EMPLEADO_READ'}}/>

          <GuardedRoute exact path="/ingresos" component={Ingresos} meta={{ auth: true,permiso:'INGRESO_READ'}}/>
          <GuardedRoute path="/ingreso/crear" component={IngresoForm} meta={{ auth: true,permiso:'INGRESO_CREATE'}}/>
          <GuardedRoute path="/ingreso/editar/:id" render={(props) =><IngresoForm {...props} editar={true}/>} meta={{ auth: true,permiso:'INGRESO_UPDATE'}}/>


        </div>
       </GuardProvider>

      </Router>


      <div id="calendario">
        <button className="btn btn-success" onClick={openModal}>Calendario</button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
        >

          <h2 ref={_subtitle => (subtitle = _subtitle)}></h2>
          <button onClick={closeModal} className="btn btn-danger">Cerrar</button>
          <form>
            <FullCalendar
              locale="es"
              plugins={[ dayGridPlugin ]}
              initialView="dayGridMonth"
              //weekends={false}
              events={[
              { title: 'Año nuevo', date: '2020-01-01' },
              { title: 'San Valentin', date: '2020-02-14'},
              { title: 'Dia del trabajo', date: '2020-05-01'},
              { title: 'Dia de la madre', date: '2020-05-10'},
              { title: 'Dia del padre', date: '2020-06-17'},
              { title: 'Fiestas de San Salvador', date: '2020-08-06'},
              { title: 'Dia de la independencia', date: '2020-09-15'},
              { title: 'Dia de los muertos', date: '2020-11-02'},
              { title: 'Navidad', date: '2020-12-25'}
              ]}
            />
          </form>
        </Modal>
      </div>


    </div>
  );
}

export default App;
