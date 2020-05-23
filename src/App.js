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


function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <MenuComponent></MenuComponent>
          <Route exact path="/" component={HomeComponent}></Route>
          <Route exact path="/empresa" component={EmpresaComponent}></Route>
          <Route path="/empresa/:id" component={EmpresaDetalleComponent} ></Route>

          <Route path="/profesion" component={ProfesionComponent} />
          <Route path="profesion/crear" component={ProfesionF} />

          <Route exact path="/puestotrabajo" component={PuestoTrabajoComponent} />
          <Route path="/puestotrabajo/crear" component={PuestoTrabajoDetalle} />
          <Route path="/puestotrabajo/editar/:id"
          render={ (props) =><PuestoTrabajoDetalle {...props} editar={true}
          />
          }/>
          <Route exact path="/empleado" component={EmpleadoComponent} ></Route>
          <Route path="/empleado/:id" component={EmpleadoDetalleComponent} ></Route>
          <Route exact path="/descuento" component={DescuentoComponent} />
          <Route path="/descuento/crear" component={DescuentoDetalle} />
          <Route path="/descuento/editar/:id"
          render={ (props) => <DescuentoDetalle {...props} editar={true}/>}
          />
        </div>
      </Router>
    </div>
  );
}

export default App;
