


import { Link } from 'react-router-dom';
import jwt_decode  from 'jwt-decode' 



const NavBar =  (props) => {

    const token = JSON.parse(localStorage.getItem('token'))
    const user =()=>{
        if(token){
             return(jwt_decode(token).username)
        }
        else{
            return( 'Anonymous')
        }
    }

    const admin = ()=>{
        if(token){
            if (jwt_decode(token).isAdmin === true)
                return <li className="nav-item">
                            <Link className='nav-link' to='/admin'>
                                Admin
                            </Link>
                        </li>
        }
    }
        return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            
                <Link className="navbar-brand" to='/'><h3> Air <i className="fa fa-plane" aria-hidden="true"></i>Line </h3></Link>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                                <Link className='nav-link nav-item' to='/home'>
                                    Home
                                </Link>
                            <li className="nav-item">
                                <Link className='nav-link nav-item' to='/fligths'>
                                Fligths
                                </Link>
                            </li>
                        {!token && 
                                <div className='navbar-nav '>
                                <Link className='nav-link nav-item' to='/login'>
                                    Login
                                </Link>
                                <Link className='nav-link nav-item' to='/register'>
                                    Register
                                </Link>
                                </div>
            
                            }
                        {token &&
                        <div className='navbar-nav '>
   
                            <li className="nav-item">
                                <Link className='nav-link nav-item' to='/dashbord' >
                                    Deshbord 
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className='nav-link nav-item' to='/login' onClick={props.logout}>
                                    Logout 
                                </Link>
                            </li>
                            
                        </div>
                        }         
            
                        {<span className='nav-link nav-item' >wellcome {user()} </span>}

                    </ul>    
                </div>
        </nav>
            )
    }
export default NavBar;


