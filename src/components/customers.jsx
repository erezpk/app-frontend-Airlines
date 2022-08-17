import React, {Component} from 'react'
import { getAllCustomers ,deletecustomer} from './services/customerServices';
import TableBody from './common/tableBody';
import TableHeader from './common/tableHeader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ButtonRout from './common/buttonRout';
import { paginate } from '../ustils';
import Pagination from './common/pagination';
import NavbarSide from './common/navbarside';
import _ from "lodash"
import jwt_decode  from 'jwt-decode'    


class Customers extends Component {
    state = { 
        pageSize:5,
        currentPage: 1,
        sortColumn : {path: 'id', order: 'asc'}
     }
    
    
    async componentDidMount(){
        const {data} = await getAllCustomers()
        this.setState({Data:data.all})  
      }

    handleDelete = async(item) =>{
        await deletecustomer(item.id)
        const {data} = await getAllCustomers()
        this.setState({Data:data.all})
        toast.success('Deleted successfule')
      }
    handleSort = colunmn =>{      
        this.setState({sortColumn: colunmn})
      }  
    handleUpdate =async(item)=>{
        this.props.setupdate(item,'updatecustomer')
    }  
   columns = [
            { path: "id", label: "id" },
            { path: "first_name", label: "First name" },
            { path: "last_name", label: "Last name" },
            { path: "address", label: "Address" },
            { path: "phone_no", label: "Phone number" },
            { path: "credit_card_no", label: "Credit card number" },
            { path: "user_id", label: "User id" },
            {key: "Update",content: (item)=><button 
                                            onClick={() => this.handleUpdate(item)} 
                                            className="btn btn-warning btn-sm">
                                            Update
                                            </button>},
            {key: "Delete",  content: (item)=><button 
                                                onClick={() => this.handleDelete(item)} 
                                                className="btn btn-danger btn-sm">
                                                delete
                                                </button>}
        ]

    handlePageChange = (page) => {
        this.setState({ currentPage: page }); 
    }
    links=()=>{
        const token = JSON.parse(localStorage.getItem('token'))
        const user = jwt_decode(token)
        const link_admin=[
            {'link':'airline' ,'pach':'Airline Company' },
            {'link':'users' ,'pach':'Users' },
            {'link':'fligths' ,'pach':'Flights' },
            {'link':'customers' ,'pach':'Customers' },
            {'link':'admin' ,'pach':'Admin Dashbord' },
            {'link':'dashbord' ,'pach':'Dashbord' },
        ] 
        const link_airline=[
            {'link':'fligths' ,'pach':'Flights' },
            {'link':'ticket' ,'pach':'Ticket' },
            {'link':'customers' ,'pach':'Customer' },
        ] 
        
        if(user.isAdmin === true)return link_admin
        else return link_airline
        
    }
    render() { 

    const {Data,pageSize,currentPage,sortColumn} = this.state 
    const sorted =_.orderBy(this.state.Data, sortColumn.path, sortColumn.order)
    const data = paginate(
        sorted,
                      currentPage,
                      pageSize
                    );
        return (
        <div >
            <NavbarSide 
                data = {this.links()}
            />
            <div className="container-table">
                <br/>
            {this.state.Data ?
            <div>
                <div>   
                    <ToastContainer />
                </div>  
                <h3 className='h3'>Customers Table</h3>
                <ButtonRout
                  rout = {'addcustomer'}
                  value = '+add'
                  className = 'btn btn-primary'
                />
                <table className="table">
                

                <TableHeader 
                    columns={this.columns}
                    onSort={this.handleSort}
                    sortColumn={sortColumn}
                    />

                <TableBody 
                    Data ={data}
                    columns={this.columns} 
                    />

                </table>
                <Pagination
                 itemCount={Data.length}
                 pageSize={pageSize}
                 currentPage={currentPage}
                 onPageChange={this.handlePageChange}
                />
            </div>
               :<div>
               <h3 className='h3'>Customers NOT FOUND </h3>
               <ButtonRout
               rout = {'addcustomer'}
               value = '+add'
               className = 'btn btn-primary'
                />
                </div>   
                }
            </div>
            </div>
        );
    }
}
 
export default Customers;