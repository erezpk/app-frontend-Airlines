
  
import { Link } from "react-router-dom";
import NavbarSide from "./common/navbarside";
import jwt_decode  from 'jwt-decode'    

function Dashbord(props){


      const token = JSON.parse(localStorage.getItem('token'))
      const user = jwt_decode(token)
      const roles = ()=>{
        if(user.isAdmin === true)return 'Admin'
        if(user.isAirline === true)return 'Airline'
        if(user.isUser === true)return 'User'
      }

    const link=[
        {'link':'fligths' ,'pach':'Flights' },
        {'link':'ticket' ,'pach':'Ticket' },
    ] 
    const link_airline=[
      {'link':'fligths' ,'pach':'Flights' },
      {'link':'ticket' ,'pach':'Ticket' },
      {'link':'customers' ,'pach':'Customer' },
  ] 
    const link_admin=[
      {'link':'fligths' ,'pach':'Flights' },
      {'link':'ticket' ,'pach':'Ticket' },
      {'link':'admin' ,'pach':'Admin' },
    ] 
    const links = ()=>{
        if(user.isAdmin === true)return link_admin
        if(user.isAirline === true)return link_airline
        else return link
    }

      return(
          <div id="main" className="main-dashbord"> 
              <NavbarSide
                  data = {links()}
              />
             <div  className="card-dashbord" >
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                  className="img-dashbord" 
                  alt='...'
                  />
                  <hr/>
                <ul>
                    <ol>Roles: <Link to={'/updateusers'}>{roles()} </Link></ol>
                    <ol>UserName:<Link to={'/updateusers'}> {user.username}</Link> </ol>
                    <ol>Email:  {user.email}</ol>
                </ul>
            </div>
          </div>
      )
  }
  
  export default Dashbord;