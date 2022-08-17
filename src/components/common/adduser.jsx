
import {useState} from 'react';
import Input from './input';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Joi from "joi-browser";
import {  getUser, postUser } from '../services/usersServices';
import ButtonRout from './buttonRout';



function AddUser() {
    const [add, setAdd] = useState({
        username:"",
        password:"",
        email:"",
      });
      const [errors, setErrors] = useState({});
      const schema = {
        username: Joi.string().min(1).max(250).required().label('username'),
        password: Joi.string().min(1).max(250).required().label('password'),
        email: Joi.string().min(1).max(250).required().label('email'),
      };
    const navigate = useNavigate()
      const handleSubmit = async(event) => {
        event.preventDefault();
        const result = Joi.validate(add, schema, { abortEarly: false });
        const { error} = result;
        if (!error){ 
            try { 
                const user = await postUser(add)
                await getUser(add)
                  user.status === 201 &&
                    toast.success(user.data.message)
                    setTimeout(() => {  navigate('/users'); }, 3000)
                } catch (error) {
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
        <div className='container-table'>

            <h1 className='h3'>Add User</h1>  
            <form onSubmit={handleSubmit} >
              <div>   
                  <ToastContainer />
              </div>  
            <Input
                name = "username"
                label={"UserName"}
                value={add.username}
                onChange={handleChange}
                error={errors.username}
                type = {"text"}
                placeholder={"UserName: "}
            />
            <Input
                name = "password"
                label={"Password"}
                value={add.password}
                onChange={handleChange}
                error={errors.password}
                type = {"password"}
                placeholder={"Password: "}
            />
            <Input
                name = "email"
                label={"Email"}
                value={add.email}
                onChange={handleChange}
                error={errors.email}
                type = {"email"}
                placeholder={"Email: "}
                />
            <br/>
            <div className="btn-group btg">
                <ButtonRout
                className ={'btn btn-primary'}
                rout={'users'}
                value={'Back'}
                /> 
                &ensp;
                &ensp;
                <button className='btn btn-primary'>Add</button>
            </div>
            </form>
        </div>
        )
}
export default AddUser;