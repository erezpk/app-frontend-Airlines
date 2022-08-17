import React, { Component } from 'react';
import ButtonRout from './common/buttonRout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getcustomer_by_userId } from './services/customerServices';
import { deleteTicket, getTicket } from './services/ticketServices';
import jwt_decode  from 'jwt-decode' 

class Tickets extends Component {
    state = {  } 
    async componentDidMount(){
        const token = JSON.parse(localStorage.getItem('token'))
        const user_id = jwt_decode(token).user_id
        const {data} = await getcustomer_by_userId(user_id)
        const customer_id = data.customer.id 
        const tickets = await getTicket(customer_id)
        this.setState({ 
                    tickets : tickets.data.ticket,
                })
}

handeldelete = async(item)=>{
    const ticket = await deleteTicket(item.id)
    toast.success(ticket.data.message)
    const token = JSON.parse(localStorage.getItem('token'))
    const user_id = jwt_decode(token).user_id
    const {data} = await getcustomer_by_userId(user_id)
    const customer_id = data.customer.id 
    const tickets = await getTicket(customer_id)
    this.setState({ tickets : tickets.data.ticket})
}


columns = [{ path: "id", label: "id" },
{ path: "airline_company", label: "Airline Company" },
{ path: "origin_country", label: "Origin Country" },
{ path: "deistination_country", label: "Deistination Country" },
{ path: "departure_time", label: "Departure Time" },
{ path: "lending_time", label: "Lending Time" },
{ path: "remaining_tickets", label: "Remaining Tickets" }
]
    render() { 
        const {tickets}= this.state
        return (
            <div className='tickets'>
            <h1 className='text-white'>Tickets</h1> 
            <div>   
                <ToastContainer />
            </div>   
            <br/>
            <div className="row row-cols-1 row-cols-md-2 g-4 d-flex p-2" >   
            {tickets ? tickets.map(item=>
                (<div className="col text-black " key={item.id}>
                        <br/>
                        <div className="card-header bg-dark text-white">
                        <button className="btn btn-danger btn-sm pull-left"
                        onClick={()=>this.handeldelete(item)}
                        >
                            &times;
                        </button>
                            <h5 className="card-title">{item.flight_id.origin_country} &nbsp;
                            <i className="fa fa-arrow-right" aria-hidden="true"></i>  &nbsp;
                            {item.flight_id.deistination_country} 
                            </h5>

                        </div>
                        <div className="card bg-white ">
                        <div className="card-body "> 
                        
                        <p className="card-text fw-bolder ">
                           <span className='bottom-line'> Airline Company</span> : {item.flight_id.airline_company}<br/>
                          <span className='bottom-line'>Departur</span> :  {item.flight_id.departure_time} <br/>
                           <span className='bottom-line'>Lending</span> : {item.flight_id.lending_time}
                        </p>
                        </div>
                        </div>
                    </div>  
                    
          ))
          :
          <div  className='h3' >
          <h1 className='text-white'>NOT FOUND TICKECT FOR YOU</h1>
          <br/>

          </div>
            }          

            </div>
        <ButtonRout
          className = {"btn btn-primary"}
          rout  ="dashbord"
          value = "Back"
          />
             </div>
            
        );
    }
}
 
export default Tickets;