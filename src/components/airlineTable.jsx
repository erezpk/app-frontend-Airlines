import React, {Component} from 'react'
import TableBody from './common/tableBody';
import TableHeader from './common/tableHeader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteAirline, getAllAirline } from './services/airlineServices';
import ButtonRout from './common/buttonRout';
import { paginate } from '../ustils';
import Pagination from './common/pagination';
import NavbarSide from './common/navbarside';
import _ from "lodash"
import { getUser, putUser } from './services/usersServices';

class AirlineTable extends Component {
    state = { 
      pageSize:5,
      currentPage: 1,
      sortColumn : {path: 'id', order: 'asc'}
     }
    
    async componentDidMount(){
        const {data} = await getAllAirline()      
        this.setState({Data:data.all}) 
      }
      handleSort = colunmn =>{      
        this.setState({sortColumn: colunmn})
      }     

    handleDelete = async(item) =>{
        await deleteAirline(item.name)
        const {data} = await getAllAirline()
        this.setState({Data:data.all})
        const user = {username:item.user_id}
        const uesr_data = await getUser(user)
        let password = prompt('enter password')
        uesr_data.data.user['password']= password
        uesr_data.data.user.user_roles_id = 3
        const updateusers = await putUser(item.user_id,uesr_data.data.user)
        updateusers.status === 200 && toast.success('Deleted successfule')
      }
      
    handleUpdate =async(item)=>{
        this.props.setupdate(item,'updateairline')

    }
    
   columns = [
            { path: "id", label: "id" },
            { path: "name", label: "Name" },
            { path: "country_id", label: "Country" },
            { path: "user_id", label: "User" },
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
      
    const {Data,pageSize,currentPage,sortColumn}= this.state
    const sorted =_.orderBy(this.state.Data, sortColumn.path, sortColumn.order)
    const data = paginate(
        sorted,
        currentPage,
        pageSize
      );
   const links=[
     {'link':'airline' ,'pach':'Airline Company' },
     {'link':'users' ,'pach':'Users' },
     {'link':'fligths' ,'pach':'Flights' },
     {'link':'customers' ,'pach':'Customers' },
     {'link':'admin' ,'pach':'Admin Dashbord' },
     {'link':'dashbord' ,'pach':'Dashbord' },
   ]
        return (
          <div >
          <NavbarSide 
              data = {links}
          />
          <div className="container-table">
          {Data ?
          <div>   
              <div>   
               <ToastContainer />
              </div>
              <h3 className='h3'>Airline Company Table</h3>
              <ButtonRout
                rout = {'addairline'}
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
              <h3 className='h3'>Airline Company NOT FOUND</h3>
              <ButtonRout
              rout = {'addairline'}
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
 
export default AirlineTable;