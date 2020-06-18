import React from 'react';
import './App.css';
import {Route, BrowserRouter as Router } from 'react-router-dom'
import MenuComponent from './Components/Menu/Menu';
import EmpresaComponent from './Components/Empresa/Empresa';
import EmpresaDetalleComponent from './Components/Empresa/EmpresaDetalle';
import HomeComponent from './Components/Home/Home';
import ProfesionComponent from './Components/Profesion/Profesion';
import ProfesionF from './Components/Profesion/ProfesionF';
import PuestoTrabajoComponent from './Components/PuestoTrabajo/PuestoTrabajo'
import PuestoTrabajoForm from './Components/PuestoTrabajo/PuestoTrabajoForm'
import EmpleadoComponent from './Components/Empleado/Empleado';
import EmpleadoDetalleComponent from './Components/Empleado/EmpleadoDetalle';
import CentroCostoComponent from './Components/CentroCosto/CentroCostos';
import CentroCostoForm from './Components/CentroCosto/CentroCostoForm';



import UnidadOrganizacionalComponent from './Components/UnidadOrganizacional/UnidadOrganizacional';
import UnidadOrganizacionalDetalle from './Components/UnidadOrganizacional/UnidadOrganizacionalDetalle';


import Roles from './Components/Rol/Roles';
import RolForm from './Components/Rol/RolForm';
import RolVer from './Components/Rol/RolVer';
import Usuarios from './Components/Usuario/Usuarios';
import UsuarioForm from './Components/Usuario/UsuarioForm';
import UsuarioGeneral from './Components/Usuario/UsuarioGeneral';
import UsuarioVer from './Components/Usuario/UsuarioVer';
import UsuarioGeneral from './Components/Usuario/UsuarioGeneral';

import Login from './Components/Login/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <MenuComponent></MenuComponent>
          <Route exact path="/" component={Login}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/home" component={HomeComponent}></Route>
          <Route exact path="/empresa" component={EmpresaComponent}></Route>
          <Route path="/empresa/:id" component={EmpresaDetalleComponent} ></Route>
          {/*<Route exact path="/centro_costo" component={CentroCostoComponent}></Route>*/}

          <Route path="/centro_costo_list/:id" render={(props)=><CentroCostoComponent {...props}/>}/>

          {/*<Route path="/centro_costo/crear" component={CentroCostoForm}></Route>*/}
          <Route  path="/centro_costo/crear/:id" render={(props)=><CentroCostoForm {...props} crear={true}/>}/>
          <Route  path="/centro_costo/editar/:id" render={(props)=><CentroCostoForm {...props} editar={true}/>}/>
         
          <Route exact path="/roles" component={Roles}/>
          <Route path="/rol/crear" component={RolForm}/>
          <Route path="/rol/editar/:id" render={(props) =><RolForm {...props} editar={true}/>} />
          <Route path="/rol/ver/:id" render={(props) =><RolVer {...props} ver={true}/>} />

          <Route exact path="/usuarios" component={Usuarios}/>
          <Route path="/usuario/crear" component={UsuarioForm} />
          <Route path="/usuario/editar/:id" render={(props)=><UsuarioForm {...props} editar={true} />}/>
          <Route path="/usuario/ver/:id" render={(props)=><UsuarioVer {...props} ver={true} />}/>
          <Route path="/usuario/general/:id" render={(props)=><UsuarioGeneral {...props}/>}/>

          <Route exact path="/departamentos" component={UnidadOrganizacionalComponent} />
          <Route path="/departamentos/crear" component={UnidadOrganizacionalDetalle} />
          <Route path="/departamentos/editar/:id" render={ (props) =><UnidadOrganizacionalDetalle {...props} editar={true}/>
          }/>
          <Route path="/profesion" component={ProfesionComponent} />
          <Route path="profesion/crear" component={ProfesionF} />
          <Route exact path="/puestotrabajo" component={PuestoTrabajoComponent} />
          <Route path="/puestotrabajo/crear" component={PuestoTrabajoForm} />
          <Route path="/puestotrabajo/editar/:id"
          render={ (props) =><PuestoTrabajoForm {...props} editar={true}
          />
          }/>
          <Route exact path="/empleado" component={EmpleadoComponent} ></Route>
          <Route path="/empleado/:id" component={EmpleadoDetalleComponent} ></Route>
        </div>
      </Router>
    </div>
  );
}

export default App;
