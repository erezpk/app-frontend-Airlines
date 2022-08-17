
import {useState} from 'react';
import Input from './input';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import {putcustomer} from '../services/customerServices'
import Joi from "joi-browser";


function UpdateCustomer(props) {
    
    const [register, setRgister] = useState({
        first_name: props.data.first_name,
        last_name: props.data.last_name,
        address: props.data.address,
        phone_no: props.data.phone_no,
        credit_card_no: props.data.credit_card_no,
      });
      
      const [errors, setErrors] = useState({});
      const schema = {
        first_name: Joi.string().min(1).max(250).required().label('first_name'),
        last_name: Joi.string().min(1).max(250).required().label('last_name'),
        address: Joi.string().min(1).max(250).required().label('address'),
        phone_no: Joi.string().min(1).max(10).required().label('phone_no'),
        credit_card_no: Joi.string().min(1).max(250).required().label('credit_card_no'),

      };
    const navigate = useNavigate()

      const handleSubmit = async(event) => {
        event.preventDefault();
        const result = Joi.validate(register, schema, { abortEarly: false });
        const { error} = result;
        if (!error){
            try { 
                const customer = await putcustomer(props.data.id,props.data.user_id,register)
                customer.status === 200 &&
                    toast.success(customer.data.message)
                    setTimeout(() => {  navigate('/customers'); }, 3000)
                }catch (error) {
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
        <div>
            <h1>Update Customer</h1>
            <form onSubmit={handleSubmit} >
            
                    <div>   
                        <ToastContainer />
                    </div>  
            
            <Input
                name = "first_name"
                label={"first name"}
                value={register.first_name}
                onChange={handleChange}
                error={errors.first_name}
                type = {"text"}
                placeholder={"first name: "}


            />     
            <Input
                name = "last_name"
                label={"last name"}
                value={register.last_name}
                onChange={handleChange}
                error={errors.last_name}
                type = {"text"}
                placeholder={"last name: "}


            />     
            <Input
                name = "address"
                label={"address"}
                value={register.address}
                onChange={handleChange}
                error={errors.address}
                type = {"text"}
                placeholder={"address: "}


            />    
            <Input
                name = "phone_no"
                label={"phone number"}
                value={register.phone_no}
                onChange={handleChange}
                error={errors.phone_no}
                type = {"tel"}
                placeholder={"123-45-678"}

            /> 
            <Input
                name = "credit_card_no"
                label={"credit card number"}
                value={register.credit_card_no}
                onChange={handleChange}
                error={errors.credit_card_no}
                type = {"credit_card"}
                placeholder={"123-***-***"}

            />

            
            <br/>
            
            <center>
                <button className='btn btn-warning' >Update</button>

            </center>

            </form>

        </div>
    )
}

export default UpdateCustomer;