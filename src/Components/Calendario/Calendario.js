import React, { Component, useState } from "react";


//import React from 'react';
//import '../../App.css';
//import Calendario from '../Calendario/Calendario';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import Modal from 'react-modal';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
 
class Calendario extends Component {
    constructor(props) {
        super(props);
        this.state={
            showCalendar:false
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(checked) {
        this.setState({ checked });
      }
    operation(){
        this.setState({
            showCalendar:!this.state.showCalendar
        })
    }
    
    render(){
        return (            
            <div id="calendario">
                <button onClick={()=>this.operation()} id="btncalendar">Calendario</button>
                {
                    this.state.showCalendar ? <FullCalendar
                    locale="es"
                    plugins={[ dayGridPlugin ]}
                    initialView="dayGridMonth"
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
                  /> : ""
                }
            
            
            
   
            </div>
        );
    }
}
export default Calendario;