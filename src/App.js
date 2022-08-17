
import './App.css';
import Home from './components/home';
import NavBar from './components/navbar';
import { Routes, Route ,useNavigate} from "react-router-dom";
import React, {useState} from 'react'
import Register from './components/register';
import Loginpage from './components/login';
import Admin from './components/admin'
import AddFligths from './components/common/addfigths'
import Customers from './components/customers';
import UpdateFligths from './components/common/updateflights';
import Fligths from './components/flight';
import UpdateCustomer from './components/common/updatecustomer';
import AirlineTable from './components/airlineTable';
import AddCustomer from './components/common/addcustomr';
import AddAirline from './components/common/addairline';
import UpdateAirline from './components/common/updateairline';
import UsersTable from './components/userTable';
import AddUser from './components/common/adduser';
import UpdateUser from './components/common/updateuser';
import NotFoundPage from './components/common/notfoundpage';
import Dashbord from './components/dashbord';
import Tickets from './components/ticket';
import jwt_decode  from 'jwt-decode' 

function App() {

  const displayUserHandler=(data)=>{
    data.access_token &&  localStorage.setItem('token', JSON.stringify(data.access_token))
  
  }
  
  const clearUserHandler =()=>{
    localStorage.clear() 
  }

  
  const [dataupdate,setupdate] = useState({});
  const navigate = useNavigate()

  const putUpdate=(dataupdate,rout)=>{
    setupdate(dataupdate)
    navigate(`/${rout}`)
  }

  const data_fligths = (data)=>{
    localStorage.setItem('data_fligths', JSON.stringify(data))
  }
  const token = JSON.parse(localStorage.getItem('token'))
  return (
    <div>
  <NavBar logout = {clearUserHandler}> </NavBar>

    <main className="container">
      <Routes >      
        <Route path='/' element={<Home/>} />
        <Route path='/home' element={<Home setfligth = {data_fligths}/>} />
        <Route path='/login' element={ <Loginpage  setUser={displayUserHandler}/>} />
        <Route path='/register' element={<Register setUser={displayUserHandler}/>} />  
        <Route path='/fligths' element={<Fligths  setupdate={putUpdate}  />} />    

      {token &&
      <React.Fragment>
        <Route path='/dashbord' element={<Dashbord />} />     
        <Route path='/ticket' element={<Tickets />} />     
        <Route path='/addfligths' element={<AddFligths />} />
        <Route path='/updatefligths' element={<UpdateFligths data={dataupdate}/>} /> 
        <Route path='/airline' element={<AirlineTable setupdate={putUpdate} data={dataupdate}  />} />
        <Route path='/addairline' element={<AddAirline />} />
        <Route path='/updateairline' element={<UpdateAirline data={dataupdate} />} /> 
        <Route path='/users' element={<UsersTable setupdate={putUpdate} />} />
        <Route path='/addusers' element={<AddUser />} />
        <Route path='/updateusers' element={<UpdateUser  data={dataupdate}/>} />  
        <Route path='/customers' element={<Customers setupdate={putUpdate}/>} />
        <Route path='/addcustomer' element={<AddCustomer  />} />
        <Route path='/updatecustomer' element={<UpdateCustomer data={dataupdate}/>} />
        </React.Fragment>
      }
      {token && jwt_decode(token).isAdmin === true &&
      <React.Fragment>
        <Route path='/admin' element={<Admin />} />
      </React.Fragment>
                            
        }

      </Routes>
    </main>
  </div>
  
  );
}

export default App;
