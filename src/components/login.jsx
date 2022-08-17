
import {useState} from 'react';
import Input from './common/input';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link,useNavigate  } from 'react-router-dom';
import Joi from "joi-browser";
import { Login } from './services/loginService';

    


function Loginpage(props) {

    const [uesr, setuesr] = useState({
        username: "",
        password: "",
      });
      
      const [errors, setErrors] = useState({});
      const schema = {
        username: Joi.string().min(1).max(250).required().label('username'),
        password: Joi.string().min(1).max(250).required().label('password')

      };
      const navigate = useNavigate()

      const handleSubmit = async(event) => {
        event.preventDefault();
        const result = Joi.validate(uesr, schema, { abortEarly: false });
        const { error} = result;
        if (!error){
            try {
                const User = await Login(uesr)
                if(User.status === 200){
                  props.setUser(User.data)
                  toast.success(`login successfully`)
                  setTimeout(() => {  navigate('/home'); }, 2000)
                }
                else{
                  setTimeout(() => {  navigate('/login'); }, 3000)
                  toast.error('error server')
                }
            }       
             catch (error) {
                toast.error(error.response.data.message)
  
            }
            
        } else {
            const errorData = {};
            for (let item of error.details){
            const name = item.path[0];
            const message = item.message;
            errorData[name] = message;
            }
        
        setErrors(errorData);
        return errorData;
        }
        

      };
      
      const handleChange = (event) => {
        const { name, value } = event.target;
        let errorData = { ...errors };
        const errorMessage = validateProperty(event);
        if (errorMessage) {
          errorData[name] = errorMessage;
        } else {
          delete errorData[name];
        }
        let uesrData = { ...uesr };
        uesrData[name] = value;
        setuesr(uesrData);
        setErrors(errorData);
      };
      
      const validateProperty = (event) => {
        const { name, value } = event.target;
        const obj = { [name]: value };
        const subSchema = { [name]: schema[name] };
        const result = Joi.validate(obj, subSchema);
        const { error } = result;
        return error ? error.details[0].message : null;
      };
      // const clearState = () => {
      //   setuesr({
      //     username: "",
      //     password: "",
      //   });
      // };

    
    return(
<div className="row">
      <div className="col-md-6 login-form-1">
        

            <h3>Login</h3>
            <form onSubmit={handleSubmit} >

            <div>   
                <ToastContainer />
            </div>
            <div className="form-group">

              <Input
                name = "username"
                value={uesr.username}
                onChange={handleChange}
                error={errors.username}
                type='text'
                placeholder="Your Username *"
                />
            </div>
  
          <div className="form-group">
          <Input
                name = "password"
                value={uesr.password}
                onChange={handleChange}
                error={errors.password}
                type='password'
                className="form-control"
                placeholder="Your Password *"
            />
          </div>
           
           <br/>
            <div className="footer">
                <button className="btnSubmit" > Login </button><br/><br/>
                if you are not registered?   <Link className="ForgetPwd" to='/login' > Register </Link>  
            </div>
            </form>
            </div>
        </div>


    )
}
export default Loginpage 
