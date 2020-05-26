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


import UnidadOrganizacionalComponent from './Components/UnidadOrganizacional/UnidadOrganizacional';
import UnidadOrganizacionalDetalle from './Components/UnidadOrganizacional/UnidadOrganizacionalDetalle';
import CalendarioTrabajo from './Components/CalendarioTrabajo/CalendarioTrabajo';
import CalendarioTrabajoDetalle from './Components/CalendarioTrabajo/CalendarioTrabajoDetalle';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <MenuComponent></MenuComponent>
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
          <Route path="/puestotrabajo/crear" component={PuestoTrabajoForm} />
          <Route path="/puestotrabajo/editar/:id" 
          render={ (props) =><PuestoTrabajoForm {...props} editar={true}
          />
          }/>

          <Route exact path="/periocidad" component={CalendarioTrabajo} />
          <Route path="/periocidad/crear" component={CalendarioTrabajoDetalle} />
          <Route path="/periocidad/editar/:id" 
          render={ (props) =><CalendarioTrabajoDetalle {...props} editar={true}
          />
          }/>

        </div>
      </Router>
    </div>
  );
}

export default App;
