import { Link } from "react-router-dom";
import NavbarSide from "./common/navbarside";
import jwt_decode  from 'jwt-decode'    

function Admin(props){
    const token = JSON.parse(localStorage.getItem('token'))
    const user = jwt_decode(token)
    const roles = ()=>{
        if(user.isAdmin === true)return 'Admin'
        if(user.isAirline === true)return 'Airline'
        if(user.isUser === true)return 'User'
      }
    const links=[
        {'link':'airline' ,'pach':'Airline Company' },
        {'link':'users' ,'pach':'Users' },
        {'link':'fligths' ,'pach':'Flights' },
        {'link':'customers' ,'pach':'Customers' },
        {'link':'admin' ,'pach':'Admin Dashbord' },
        {'link':'dashbord' ,'pach':'Dashbord' },
    ] 
    return(
        <div id="main"> 
            <NavbarSide 
                data = {links}
            />
           <h1> Admin page</h1>
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

export default Admin;