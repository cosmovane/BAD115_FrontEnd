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
//import EventCalendar from './Components/EventCalendar/EventCalendar';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import Modal from 'react-modal';


function App() {
  var subtitle;
  const [modalIsOpen,setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
 
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }
 
  function closeModal(){
    setIsOpen(false);
  }
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
          plugins={[ dayGridPlugin ]}
          initialView="dayGridMonth"
          //weekends={false}
          events={[
          { title: 'A?o nuevo', date: '2020-01-01' },
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
