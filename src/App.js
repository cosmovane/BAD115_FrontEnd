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
import PuestoTrabajoDetalle from './Components/PuestoTrabajo/PuestoTrabajoDetalle'
import EmpleadoComponent from './Components/Empleado/Empleado';
import EmpleadoDetalleComponent from './Components/Empleado/EmpleadoDetalle';
import DescuentoComponent from './Components/Descuento/Descuento'
import DescuentoDetalle from './Components/Descuento/DescuentoDetalle'
import Planilla from './Components/Planilla/Planilla'


import UnidadOrganizacionalComponent from './Components/UnidadOrganizacional/UnidadOrganizacional';
import UnidadOrganizacionalDetalle from './Components/UnidadOrganizacional/UnidadOrganizacionalDetalle';
import CalendarioTrabajo from './Components/CalendarioTrabajo/CalendarioTrabajo';
import CalendarioTrabajoDetalle from './Components/CalendarioTrabajo/CalendarioTrabajoDetalle';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <MenuComponent />
          <Route exact path="/" component={HomeComponent}></Route>
          <Route exact path="/empresa" component={EmpresaComponent}></Route>
          <Route path="/empresa/:id" component={EmpresaDetalleComponent} ></Route>
          <Route exact path="/departamentos" component={UnidadOrganizacionalComponent} />
          <Route path="/departamentos/crear" component={UnidadOrganizacionalDetalle} />
          <Route path="/departamentos/editar/:id"
          render={ (props) =><UnidadOrganizacionalDetalle {...props} editar={true} />
          }/>
          <Route path="/profesion" component={ProfesionComponent} />
          <Route path="profesion/crear" component={ProfesionF} />
          <Route exact path="/puestotrabajo" component={PuestoTrabajoComponent} />
          <Route path="/puestotrabajo/crear" component={PuestoTrabajoDetalle} />
          <Route path="/puestotrabajo/editar/:id"
          render={ (props) =><PuestoTrabajoDetalle {...props} editar={true}
          />
          }/>
          <Route exact path="/periocidad" component={CalendarioTrabajo} />
          <Route path="/periocidad/crear" component={CalendarioTrabajoDetalle} />
          <Route path="/periocidad/editar/:id" 
          render={ (props) =><CalendarioTrabajoDetalle {...props} editar={true}
          />
          }/>
          <Route exact path="/empleado" component={EmpleadoComponent} ></Route>
          <Route path="/empleado/:id" component={EmpleadoDetalleComponent} ></Route>
          <Route exact path="/descuento" component={DescuentoComponent} />
          <Route path="/descuento/crear" component={DescuentoDetalle} />
          <Route path="/descuento/editar/:id"
          render={ (props) => <DescuentoDetalle {...props} editar={true}/>}
          />
          <Route path="/planilla" component={Planilla}/>
        </div>
      </Router>
    </div>
  );
}

export default App;
