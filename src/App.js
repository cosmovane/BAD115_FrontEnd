import React from 'react';
import './App.css';
import {Route, BrowserRouter as Router } from 'react-router-dom'
import { GuardProvider, GuardedRoute } from 'react-router-guards';
import { withRouter } from "react-router";

import MenuComponent from './Components/Menu/Menu';
import EmpresaComponent from './Components/Empresa/Empresa';
import EmpresaDetalleComponent from './Components/Empresa/EmpresaDetalle';
import HomeComponent from './Components/Home/Home';
import ProfesionComponent from './Components/Profesion/Profesion';
import ProfesionF from './Components/Profesion/ProfesionF';
import PuestoTrabajoComponent from './Components/PuestoTrabajo/PuestoTrabajo'
import PuestoTrabajoDetalle from './Components/PuestoTrabajo/PuestoTrabajoDetalle'

import EmpleadoComponent from './Components/Empleado/Empleado';
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

const requireLogin=(to,from,next)=>{
	if(to.meta.auth){
		if(LoginService.isAuthenticated()){
      if (LoginService.isTokenExpirado()) {
        LoginService.logout();
        next.redirect('/login');
      }
			else if (LoginService.hasPermiso(to.meta.permiso)){ 
				next();
			}
			next.redirect('/home');
		}
		next.redirect('/login');
	}else{
		next();
	}
};


function App() {
  return (
    <div className="App">
      <Router>
       <GuardProvider guards={[requireLogin]} >
        <div>
    
          <MenuComponent></MenuComponent>
    
          <Route exact path="/periocidad" component={CalendarioTrabajo} />
          <Route path="/periocidad/crear" component={CalendarioTrabajoDetalle} />
          <Route path="/periocidad/editar/:id" 
          render={ (props) =><CalendarioTrabajoDetalle {...props} editar={true}
          />
          }/>
          
          <Route exact path="/descuento" component={DescuentoComponent} />
          <Route path="/descuento/crear" component={DescuentoDetalle} />
          <Route path="/descuento/editar/:id"
          render={ (props) => <DescuentoDetalle {...props} editar={true}/>}
          />
          <Route path="/planilla" component={Planilla}/>


          <GuardedRoute exact path="/" component={Login} />
          <GuardedRoute exact path="/login" component={Login} />
          <GuardedRoute exact path="/home" component={HomeComponent} meta={{ auth: true }} />
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

          {/*FALTA QUE ME DIGAN SUS PERMISOS PARA UNIDAD ORGANIZACIONAL
              FALTA PERMISOS PARA PROFESION
              FALTAN PERMISOS PARA PUESTO DE TRABAJO
              FALTAN PERMISOS PARA EMPLEADO
          */}
          <GuardedRoute exact path="/departamentos" component={UnidadOrganizacionalComponent} meta={{ auth: true,permiso:'USER_READ'}}/>
          <GuardedRoute path="/departamentos/crear" component={UnidadOrganizacionalDetalle} meta={{ auth: true,permiso:'USER_READ'}}/>
          <GuardedRoute path="/departamentos/editar/:id" render={ (props) =><UnidadOrganizacionalDetalle {...props} editar={true}/>} meta={{ auth: true,permiso:'USER_READ'}}/>

          <GuardedRoute path="/profesion" component={ProfesionComponent}/>
          <GuardedRoute path="profesion/crear" component={ProfesionF}/>
          
          <GuardedRoute exact path="/puestotrabajo" component={PuestoTrabajoComponent}/>
          <GuardedRoute path="/puestotrabajo/crear" component={PuestoTrabajoForm}/>
          <GuardedRoute path="/puestotrabajo/editar/:id" render={ (props) =><PuestoTrabajoForm {...props} editar={true}/>}/>
          
          <GuardedRoute exact path="/empleado" component={EmpleadoComponent}/>
          <GuardedRoute path="/empleado/:id" component={EmpleadoDetalleComponent}/>

          <GuardedRoute exact path="/ingresos" component={Ingresos} meta={{ auth: true,permiso:'INGRESO_READ'}}/>
          <GuardedRoute path="/ingreso/crear" component={IngresoForm} meta={{ auth: true,permiso:'INGRESO_CREATE'}}/>
          <GuardedRoute path="/ingreso/editar/:id" render={(props) =><IngresoForm {...props} editar={true}/>} meta={{ auth: true,permiso:'INGRESO_UPDATE'}}/>

        </div>
       </GuardProvider>
      </Router>
    </div>
  );
}

export default App;
