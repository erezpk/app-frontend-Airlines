
import TableBody from './common/tableBody';
import TableHeader from './common/tableHeader';
import Like from "./common/like";
import React,{Component} from 'react'
import { getAllFlight ,deleteFlight} from './services/fligthsServices';
import { ToastContainer, toast } from 'react-toastify';
import ButtonRout from './common/buttonRout';
import 'react-toastify/dist/ReactToastify.css';
import { getcustomer_by_userId } from './services/customerServices';
import { postTicket } from './services/ticketServices';
import jwt_decode  from 'jwt-decode' 
import { paginate } from '../ustils';
import Pagination from './common/pagination';
import _ from "lodash"

class Fligths extends Component {
    state = { 
      Data:[],
      pageSize:5,
      currentPage: 1,
      sortColumn : {path: 'id', order: 'asc'}
     }
    async componentDidMount(){
      const {data} = await getAllFlight()
      this.setState({Data:data.all})
    }  
    handleSort = colunmn =>{      
      this.setState({sortColumn: colunmn})
    }
    filterd=()=>{
      const flights = JSON.parse(localStorage.getItem('data_fligths'))
      const filterData =  this.state.Data.filter(data => 
                              data.origin_country === flights.origin_country & 
                              data.deistination_country === flights.deistination_country )
      this.setState({Data:filterData})
    }

    sort_data=()=> {
      const sort = this.state.Data.sort((a,b)=> a.obj  > b.obj? 1 : -1)
      return sort
    }
    filter_all_flights=async()=>{
      localStorage.removeItem('data_fligths')      
      const {data} = await getAllFlight()
      this.setState({Data:data.all})
    }

    handleLike = (item,e) => {
        console.log("like",item);
        if (e.target.className === 'fa fa-heart')
          {e.target.className ='fa fa-heart-o'}
        else {e.target.className ='fa fa-heart'}
      }
    handleAdd = async(item)=>{
      const token = JSON.parse(localStorage.getItem('token'))
      const id = jwt_decode(token).user_id
      const {data} = await getcustomer_by_userId(id)
      const fligth_id = item.id
      const customer_id = data.customer.id
      try {
            const ticket= await postTicket(fligth_id,customer_id)
            ticket.status === 201 && toast.success(ticket.data.message)
      } catch (error) {
        toast.error('error')
      }
    }
    handleDelete = async(item) =>{
      const token = JSON.parse(localStorage.getItem('token'))
      if(jwt_decode(token).Airline_name === item.airline_company ){
        await deleteFlight(item.id)
        const {data} = await getAllFlight()
        this.setState({Data:data.all})
        toast.success('Deleted successfule')}
      else{
        toast.error('invalid command')

      }
    }
    handleUpdate = async(item,e)=>{
      const token = JSON.parse(localStorage.getItem('token'))
      if( item.airline_company === jwt_decode(token).Airline_name){
        this.props.setupdate(item,'updatefligths')
      }
      if(jwt_decode(token).isAdmin === true){
        this.props.setupdate(item,'updatefligths')
      }
    else{
      toast.error('invalid command')
      }
  
    }
    handleColumns = ()=>{
      const token = JSON.parse(localStorage.getItem('token'))
      if(token){
        if(jwt_decode(token).isAdmin === true ) {
              return this.columns_admin_airline
          }    
        if(jwt_decode(token).isAirline === true ){
            return this.columns_admin_airline
          }
        if(jwt_decode(token).isUser === true){
            return this.columns_user
          }
        }else{
             return this.columns
            }
      }    

  columns = [{ path: "id", label: "id" ,order: 'asc'},
            { path: "airline_company", label: "Airline Company" ,order: 'asc'},
            { path: "origin_country", label: "Origin Country" ,order: 'asc'},
            { path: "deistination_country", label: "Deistination Country",order: 'asc' },
            { path: "departure_time", label: "Departure Time" ,order: 'asc'},
            { path: "lending_time", label: "Lending Time",order: 'asc' },
            { path: "remaining_tickets", label: "Remaining Tickets",order: 'asc' }
          ]
  columns_user = [
        { path: "id", label: "id" ,order: 'asc'},
        { path: "airline_company", label: "Airline Company",order: 'asc' },
        { path: "origin_country", label: "Origin Country",order: 'asc' },
        { path: "deistination_country", label: "Deistination Country",order: 'asc' },
        { path: "departure_time", label: "Departure Time",order: 'asc' },
        { path: "lending_time", label: "Lending Time",order: 'asc' },
        { path: "remaining_tickets", label: "Remaining Tickets",order: 'asc' },
        {path: "like",content: (item)=><Like onClick = {(e)=>this.handleLike(e)} />},
        {key: "add",content: (item)=><button className='btn btn-primary' onClick = {()=>this.handleAdd(item)}>
                                      +Add
                                  </button>}
                                    ]
  columns_admin_airline = [
        { path: "id", label: "id",order: 'asc' },
        { path: "airline_company", label: "Airline Company",order: 'asc' },
        { path: "origin_country", label: "Origin Country",order: 'asc' },
        { path: "deistination_country", label: "Deistination Country",order: 'asc' },
        { path: "departure_time", label: "Departure Time",order: 'asc' },
        { path: "lending_time", label: "Lending Time",order: 'asc' },
        { path: "remaining_tickets", label: "Remaining Tickets",order: 'asc' },
        {key: "update",content: (item)=><button 
                                  onClick={(e) => this.handleUpdate(item,e)} 
                                  className="btn btn-warning btn-sm" 
                                  >
                                  Update
                                  </button>},
        {key: "delete",  content: (item)=><button 
                                    onClick={() => this.handleDelete(item)} 
                                    className="btn btn-danger btn-sm">
                                    delete
                                    </button>}
    ]
    handlePageChange = (page) => {
      this.setState({ currentPage: page });
      
    };
    render() { 
      const {pageSize,currentPage,sortColumn} = this.state;
      const token = JSON.parse(localStorage.getItem('token'))
      const flights = JSON.parse(localStorage.getItem('data_fligths'))

      const sorted =_.orderBy(this.state.Data, sortColumn.path, sortColumn.order)
      const Data = paginate(
        sorted,
      this.state.currentPage,
      this.state.pageSize
      );
    return (
      <div>
      {this.state.Data <= 0 ?
      <div className='container-table h3'>
       <h3 >NOT FOUND FLIGHTS </h3>
       {token &&jwt_decode(token).isAdmin === true &&
        <ButtonRout
              rout = {'addfligths'}
              value = '+add'
              className = 'btn btn-lg btn-primary'
            />
          }
       <br/>
       <ButtonRout
       className = {"btn btn-lg btn-primary"}
       rout  ="home"
       value = "Back Home"
       />
       </div>
      :<div>
      <div className='container-table'>
      <ToastContainer />
        <h3 className='h3'>Flights </h3>

      {flights && this.filterd()}
      {token &&jwt_decode(token).isAdmin === true &&
        <ButtonRout
              rout = {'addfligths'}
              value = '+add'
              className = 'btn btn-primary'
            />
          }
    {flights &&
          <button className = 'btn btn-primary ' onClick={()=>this.filter_all_flights()}>
            &times; filter
          </button>
        }
        <table className="table">
        <TableHeader
        columns={this.handleColumns()}
        onSort={this.handleSort}
        sortColumn={sortColumn}
        />
        <TableBody 
          Data ={Data}
          columns={this.handleColumns()}
        />
        </table>
        <Pagination
            itemCount={this.state.Data.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
        />
        </div>
        </div>
        }
     </div>
    );
    }   

  }
export default Fligths;

