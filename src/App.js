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
import ComisionComponent from './Components/Comision/Comision';
import ComisionDetalleComponent from './Components/Comision/ComisionDetalle';
import EmpleadoDetalleComponent from './Components/Empleado/EmpleadoDetalle';


function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <MenuComponent></MenuComponent>
          <Route exact path="/" component={HomeComponent}></Route>
          <Route exact path="/empresa" component={EmpresaComponent}></Route>
          <Route path="/empresa/:id" component={EmpresaDetalleComponent} ></Route>

          <Route exact path="/profesion" component={ProfesionComponent} />
          <Route path="/profesion/:id" component={ProfesionF} ></Route>

          <Route exact path="/puestotrabajo" component={PuestoTrabajoComponent} />
          <Route path="/puestotrabajo/crear" component={PuestoTrabajoForm} />
          <Route path="/puestotrabajo/editar/:id"
          render={ (props) =><PuestoTrabajoForm {...props} editar={true}
          />
          }/>

          <Route exact path="/empleado" component={EmpleadoComponent} ></Route>
          <Route path="/empleado/:id" component={EmpleadoDetalleComponent} ></Route>

          <Route exact path="/comision" component={ComisionComponent} ></Route>

          <Route path="/comision/:id" component={ComisionDetalleComponent} ></Route>

        </div>
      </Router>
    </div>
  );
}

export default App;
