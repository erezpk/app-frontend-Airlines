
import {useState} from 'react';
import Input from './common/input';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link ,useNavigate } from 'react-router-dom';
import {postcustomer} from './services/customerServices'
import { postUser } from './services/usersServices';
import Joi from "joi-browser";


function Register(props) {

    const [register, setRgister] = useState({
        username: "",
        password: "",
        email: "",
        first_name: "",
        last_name: "",
        address: "",
        phone_no: "",
        credit_card_no: "",
      });
      
      const [errors, setErrors] = useState({});
      const schema = { 
        username: Joi.string().min(1).max(250).required().label('username'),
        password: Joi.string().min(1).max(250).required().label('password'),
        email: Joi.string().min(1).max(250).required().label('email'),
        first_name: Joi.string().min(1).max(250).required().label('first_name'),
        last_name: Joi.string().min(1).max(250).required().label('last_name'),
        address: Joi.string().min(1).max(250).required().label('address'),
        phone_no: Joi.string().min(1).max(250).required().label('phone_no'),
        credit_card_no: Joi.string().min(1).max(250).required().label('credit_card_no'),

      };
    const navigate = useNavigate()

      const handleSubmit = async(event) => {
        event.preventDefault();
        const result = Joi.validate(register, schema, { abortEarly: false });
        const { error} = result;
        if (!error){
            try { 
                const user = await postUser(register)
                const customer = await postcustomer(register,user.data.id)
                if(user.status === 201 & customer.status === 201){
                    toast.success('regisered successful') 
                    setTimeout(() => {  navigate('/login'); }, 5000);
                } 
                
                
            
            
            } catch (error) {
              console.log(register)
                error.response.data.message && toast.error(error.response.data.message)
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
        let registerData = { ...register };
        registerData[name] = value;
        setRgister(registerData);
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

    return(
        <div className="row-register">
            <div className="col-md-6 login-form-1">
        

            <h3>Rgister</h3>
            <form onSubmit={handleSubmit} >
            
                    <div>   
                        <ToastContainer />
                    </div>

            <div className="form-group">
            <Input
                name = "username"
                value={register.username}
                onChange={handleChange}
                error={errors.username}
                type ={ "text"}
                placeholder={"username: "}
            />
            </div>

            <div className="form-group">
            <Input
                    name = "password"
                    value={register.password}
                    onChange={handleChange}
                    error={errors.password}
                    type ={ "password"}
                    placeholder={"password: "}
                />

            </div>
     
            <div className="form-group">
            <Input
                name = "email"
                value={register.email}
                onChange={handleChange}
                error={errors.email}
                type ={ "email"}
                placeholder={"email: "}
            />      
            </div>          
            
            <div className="form-group">
                <Input
                name = "first_name"
                value={register.first_name}
                onChange={handleChange}
                error={errors.first_name}
                type = {"text"}
                placeholder={"first name: "}
            />  
            </div>          
            <div className="form-group">

            <Input
                name = "last_name"
                value={register.last_name}
                onChange={handleChange}
                error={errors.last_name}
                type = {"text"}
                placeholder={"last name: "}
            />    
            </div>          

          <div className="form-group">
            <Input
                name = "address"
                value={register.address}
                onChange={handleChange}
                error={errors.address}
                type = {"text"}
                placeholder={"address: "}
            />  
          </div>
          <div className="form-group">
            <Input
                name = "phone_no"
                value={register.phone_no}
                onChange={handleChange}
                error={errors.phone_no}
                type = {"tel"}
                placeholder={"123-45-678"}
            /> 
          </div>
          <div className="form-group">         
            <Input
                name = "credit_card_no"
                value={register.credit_card_no}
                onChange={handleChange}
                error={errors.credit_card_no}
                type = {"credit_card"}
                placeholder={"123-***-***"}
            />
            </div>
   
            <br/>
            <div className="footer">
                <button className="btn btn-primary" > Register </button><br/>
                if you are registered?  <Link className="ForgetPwd" to='/login' > Login </Link>  
            </div>
            
            </form>
        </div>
        </div>
    )
}

export default Register;