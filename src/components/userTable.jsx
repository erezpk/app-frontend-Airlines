import React, {Component} from 'react'
import TableBody from './common/tableBody';
import TableHeader from './common/tableHeader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ButtonRout from './common/buttonRout';
import { deleteUser, getAllUsers, getUser } from './services/usersServices';
import Pagination from './common/pagination';
import { paginate } from '../ustils';
import NavbarSide from './common/navbarside';
import _ from "lodash"
import jwt_decode  from 'jwt-decode'    
import { deleteAirline, getAirline, getAirline_by_user_id } from './services/airlineServices';
import { deleteAdmin } from './services/adminServicse';
import { deletecustomer, getcustomer_by_userId } from './services/customerServices';


class UsersTable extends Component {
    state = { 
        pageSize:5,
        currentPage: 1,
        sortColumn : {path: 'id', order: 'asc'}
     }
    
    async componentDidMount(){
        const {data} = await getAllUsers()      
        this.setState({Data:data.all}) 
      }
    handleSort = colunmn =>{      
      this.setState({sortColumn: colunmn})
    }
    handleDelete = async(item) =>{
         await deleteUser(item.username)
        const {data} = await getAllUsers()        
        const customer = await getcustomer_by_userId(item.id)
        customer && deletecustomer(customer.data.customer.id)
        this.setState({Data:data.all})
        toast.success('Deleted successfule')      

    }
      
    handleUpdate =async(item)=>{
        this.props.setupdate(item,'updateusers')
    } 
   columns = [
            { path: "id", label: "id" },
            { path: "username", label: "Username" },
            { path: "email", label: "Email" },
            { path: "user_roles_id.roles", label: "Roles" },
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
      };
    

    render() { 
    
    const {pageSize,currentPage,sortColumn} = this.state

    const links=[
        {'link':'airline' ,'pach':'Airline Company' },
        {'link':'users' ,'pach':'Users' },
        {'link':'fligths' ,'pach':'Flights' },
        {'link':'customers' ,'pach':'Customers' },
        {'link':'admin' ,'pach':'Admin Dashbord' },
        {'link':'dashbord' ,'pach':'Dashbord' },


    ] 
    const sorted =_.orderBy(this.state.Data, sortColumn.path, sortColumn.order)
    const data = paginate(
      sorted,
    this.state.currentPage,
    this.state.pageSize
    );
        return (
        <div >
            <NavbarSide 
                data = {links}
            />
            <div className="container-table">
            {this.state.Data ?
            <div >   
                <div>   
                 <ToastContainer />
                </div>
                <h3 className='h3'>Users Table</h3>

                <ButtonRout
                  rout = {'addusers'}
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
                itemCount={this.state.Data.length}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
            />
            </div>
            :<div>   
            <h3 className='h3'>Users NOT FOUND</h3>
            <ButtonRout
                  rout = {'addusers'}
                  value = '+add'
                  className = 'btn btn-primary'
                />
            </div>}

            </div>
        </div>
        );
    }
}
 
export default UsersTable;