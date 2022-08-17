
import {useState,useEffect} from 'react';
import Input from './input';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import {postcustomer} from '../services/customerServices'
import Joi from "joi-browser";
import InputOption from './inputoption';
import { getAllUsers, getUser } from '../services/usersServices';
import ButtonRout from './buttonRout';


function AddCustomer() {
    const [users,setUsers] = useState([]);
    const getusers =async()=>{ 
        await getAllUsers().then(data => (setUsers(data.data.all)))
    };
    useEffect( () => {
        getusers()
    }, []);
    const [add, setAdd] = useState({
        first_name: "",
        last_name: "",
        address: "",
        phone_no: "",
        credit_card_no: "",
        user_id:"",
      });
      const [errors, setErrors] = useState({});
      const schema = {
        first_name: Joi.string().min(1).max(250).required().label('first_name'),
        last_name: Joi.string().min(1).max(250).required().label('last_name'),
        address: Joi.string().min(1).max(250).required().label('address'),
        phone_no: Joi.string().min(1).max(250).required().label('phone_no'),
        credit_card_no: Joi.string().min(1).max(250).required().label('credit_card_no'),
        user_id: Joi.string().min(1).max(250).required().label('user_id'),
      };
    const navigate = useNavigate()
      const handleSubmit = async(event) => {
        event.preventDefault();
        const result = Joi.validate(add, schema, { abortEarly: false });
        const { error} = result;
        if (!error){
            try { 
                let username = {username:add.user_id}
                const user = await getUser(username)
                const customer = await postcustomer(add,user.data.user.id)
                customer.status === 201 &&
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
        let addData = { ...add };
        addData[name] = value;
        setAdd(addData);
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
        <div  className='container-table'>
            <h1>Add Customer</h1>  
            <form onSubmit={handleSubmit} >
             <div>   
                <ToastContainer />
            </div>  
            <Input
                name = "first_name"
                label={"first name"}
                value={add.first_name}
                onChange={handleChange}
                error={errors.first_name}
                type = {"text"}
                placeholder={"first name: "}
            />     
            <Input
                name = "last_name"
                label={"last name"}
                value={add.last_name}
                onChange={handleChange}
                error={errors.last_name}
                type = {"text"}
                placeholder={"last name: "}
            />     
            <Input
                name = "address"
                label={"address"}
                value={add.address}
                onChange={handleChange}
                error={errors.address}
                type = {"text"}
                placeholder={"address: "}
            />    
            <Input
                name = "phone_no"
                label={"phone number"}
                value={add.phone_no}
                onChange={handleChange}
                error={errors.phone_no}
                type = {"tel"}
                placeholder={"123-45-678"}
            /> 
            <Input
                name = "credit_card_no"
                label={"credit card number"}
                value={add.credit_card_no}
                onChange={handleChange}
                error={errors.credit_card_no}
                type = {"credit_card"}
                placeholder={"123-***-***"}
            />
            <InputOption
            options={users}
            onChange={handleChange}
            name = {'user_id'}
            label = 'User'
            value={add.user_id}
            error = {errors.user_id}
            />
            <br/>
            <div className="btn-group btg">
              <ButtonRout 
              rout = {'customers'}
              value = 'Back'
              className = 'btn btn-primary sbtg'
              />
              <button className='btn btn-primary sbtg'>+Add</button>

            </div>

            </form>
        </div>
    )
}
export default AddCustomer;