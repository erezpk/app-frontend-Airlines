
import { Link } from 'react-router-dom';



function NavbarSide(props) {


    function openNav() {
        document.getElementById("mySidenav").style.display = "block";
        document.getElementById("main").style.marginLeft = "250px";
        document.getElementById("menu-side").innerHTML = "";
         
      }
      
      function closeNav() {
        document.getElementById("mySidenav").style.display = "none";
        document.getElementById("main").style.marginLeft = "0";
        document.getElementById("menu-side").innerHTML ='<H1> &#9776; menu </H1>'
      }
      const {data} = props
    return(
        <div>
           <div id="mySidenav" className="sidenav left">
            <span  className="closebtn btn " onClick={closeNav}>&times;</span>
            
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
            <h3 > Air <i className="fa fa-plane" aria-hidden="true"></i>Line </h3>
            <hr/>
            {data.map(item=>{
              return(
                
              <Link to={`/${item.link}`} key={item.link}>{item.pach}</Link>
              )
            })}
            
            
            </div> 

        <span className="span-sidebar" id="menu-side" onClick={openNav}><h1 > &#9776; menu</h1></span>
        
        </div>

       
    )
    
}
export default NavbarSide;