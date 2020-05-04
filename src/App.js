import React from 'react';
import './App.css';
import {Route, BrowserRouter as Router } from 'react-router-dom'
import MenuComponent from './Components/Menu/Menu';
import EmpresaComponent from './Components/Empresa/Empresa';
import EmpresaDetalleComponent from './Components/Empresa/EmpresaDetalle';
import HomeComponent from './Components/Home/Home';
import PuestoTrabajoComponent from './Components/PuestoTrabajo/PuestoTrabajo'
import PuestoTrabajoForm from './Components/PuestoTrabajo/PuestoTrabajoForm'
import EmpleadoComponent from './Components/Empleado/Empleado';
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
          <Route exact path="/puestotrabajo" component={PuestoTrabajoComponent} />
          <Route path="/puestotrabajo/crear" component={PuestoTrabajoForm} />
          <Route path="/puestotrabajo/editar/:id"
          render={ (props) =><PuestoTrabajoForm {...props} editar={true}
          />
          }/>
          <Route path="/empleado" component={EmpleadoComponent} ></Route>
          <Route path="/empleado/:id" component={EmpleadoDetalleComponent} ></Route>
        </div>
      </Router>
    </div>
  );
}

export default App;
