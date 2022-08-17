
import { useNavigate } from 'react-router-dom';

const ButtonRout = (props) => {
    const {className,rout,value} = props;
    const navigate = useNavigate()

    return ( 
        <div>
            <button className={className} onClick={()=> navigate(`/${rout}`)}>{value}</button>
        </div>
       
     );
}
 
export default ButtonRout;