
import {useState,useEffect} from 'react';
import Input from './input';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Joi from "joi-browser";
import InputOption from './inputoption';
import {putUser } from '../services/usersServices';
import { getAllUser_Roles } from '../services/user_roles';
import ButtonRout from './buttonRout';
import { deleteAdmin, getAdmin, postAdmin } from '../services/adminServicse';
import { getAllCountries } from '../services/countriesServices';
import { deleteAirline, getAirline, postAirline } from '../services/airlineServices';
import jwt_decode  from 'jwt-decode'    
import { getcustomer_by_userId } from '../services/customerServices';


function UpdateUser(props) {

    const [roles,setRoles] = useState([]);
    const [constries,seConstries] = useState([]);
    const token = JSON.parse(localStorage.getItem('token')) 
    const data_token = jwt_decode(token)

    const getdata =async()=>{ 
        await getAllUser_Roles().then(data => (setRoles(data.data.all)))
        await getAllCountries().then(data=>seConstries(data.data.Country))
    };
    useEffect( () => {
        getdata()
    }, []);

    const [add, setAdd] = useState({
        username: props.data.username || "",
        password: props.data.password || "",
        email:props.data.email || "",
        user_roles_id: props.data.user_roles_id || "User",
        user_id:props.data.username,
        first_name:" ",
        last_name:" ",
        name: " ",
        country_id: " "    

      });
      const [errors, setErrors] = useState({});
      const schema = {
        username: Joi.string().min(1).max(250).required().label('username'),
        password: Joi.string().min(1).max(250).required().label('password'),
        email: Joi.string().min(1).max(250).required().label('email'),
        user_roles_id: Joi.string().min(1).max(250).required().label('user_roles_id'),
        user_id: Joi.string().min(1).max(250).required().label('user_id'),
        first_name: Joi.string().min(1).max(250).required().label('first_name'),
        last_name: Joi.string().min(1).max(250).required().label('last_name'),
        name :  Joi.string().min(1).max(250).required().label('name'),
        country_id :  Joi.string().min(1).max(250).required().label('country_id'),
      };
    const navigate = useNavigate()
  const handleSubmit = async(event) => {
    event.preventDefault();
    
    const result = Joi.validate(add, schema, { abortEarly: false });
    const { error} = result;
    if (!error){
        try {          
            const user = await putUser(props.data.username,add)
            if(add.user_roles_id === '1' ){
              try {
                await getAdmin(props.data.id)
              } catch (error) {
                await postAdmin(add,props.data.id)
                // await getcustomer_by_userId(props.data.id)
              }
            }
            if(add.user_roles_id === '2'){
              try {
                await getAirline(add.name)
              } catch (error) {
                await postAirline(add)
              }
            }
            if(props.data.user_roles_id.id === 1){
              add.user_roles_id !== '1' &&
              await deleteAdmin(props.data.id)
            }
            if(props.data.user_roles_id.id === 2 ){
              add.user_roles_id !== '2'&&
              await deleteAirline(data_token.Airline_name)
            }     
          user.status === 200 &&
                  toast.success(user.data.message)
                setTimeout(() => {  navigate('/users'); }, 3000);
            }            
        catch (error) {
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
const add_input_for_admin=()=>{
  if(add.user_roles_id === '1'){
    return(
      <div>
      <Input
          name = "first_name"
          label={"First Name"}
          value={add.first_name}
          onChange={handleChange}
          error={errors.first_name}
          type = {"text"}
          placeholder={"First Name: "}
      />            
      <Input
      name = "last_name"
      label={"Last Name"}
      value={add.last_name}
      onChange={handleChange}
      error={errors.last_name}
      type = {"text"}
      placeholder={"Last Name: "}
      />

      </div>
    )
  }
}

const add_input_for_airline=()=>{
  if(add.user_roles_id === '2'){
    return(
      <div>
      <Input
          name = "name"
          label={"Name"}
          value={add.name}
          onChange={handleChange}
          error={errors.name}
          type = {"text"}
          placeholder={"Name: "}
      />   
      <InputOption
      options={constries}
      onChange={handleChange}
      name = {'country_id'}
      label = 'Countr'
      value={add.country_id}
      error = {errors.country_id}
      />         
      </div>
    )
  }
}
    return(
        <div>
            <h1>Update User</h1>  
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
            <InputOption
            options={roles}
            onChange={handleChange}
            name = {'user_roles_id'}
            label = 'User Roles'
            value={add.user_roles_id.roles}
            error = {errors.user_roles_id}
            />
            {add_input_for_admin()}
            {add_input_for_airline()}
            <br/>
            <div className="btn-group btg">
              <ButtonRout
              rout = {'users'}
              value = 'Back'
              className = 'btn btn-primary sbtg'
              />
              <button className='btn btn-warning'>Update</button>
            </div>
            </form>

        </div>
    )
}

export default UpdateUser;