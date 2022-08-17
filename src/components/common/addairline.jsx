import {useState,useEffect} from 'react';
import Input from './input';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Joi from "joi-browser";
import InputOption from './inputoption';
import { getAllUsers } from '../services/usersServices';
import { getAllCountries } from '../services/countriesServices';
import { postAirline } from '../services/airlineServices';
import ButtonRout from './buttonRout';

function AddAirline() {
    const [users,setUsers] = useState([]);
    const [countries,setcountries] = useState([]);
    const getdata =async()=>{ 
        await getAllUsers().then(data => (setUsers(data.data.all)))
        await getAllCountries().then(data => (setcountries(data.data.Country)))
    };
    useEffect( () => {
        getdata()
    }, []);
    const [add, setAdd] = useState({
        name: "",
        country_id: "",
        user_id:"",
      });
      const [errors, setErrors] = useState({});
      const schema = {
        name: Joi.string().min(1).max(250).required().label('name'),
        country_id: Joi.string().min(1).max(250).required().label('country_id'),
        user_id: Joi.string().min(1).max(250).required().label('user_id'),
      };
    const navigate = useNavigate()
      const handleSubmit = async(event) => {
        event.preventDefault();
        const result = Joi.validate(add, schema, { abortEarly: false });
        const { error} = result;
        if (!error){
            try { 
                const airline = await postAirline(add)
                airline.status === 201 &&
                    toast.success(airline.data.message)
                    setTimeout(() =>   navigate('/airline') , 3000);
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
    return(
        <div className='container-table'>
            <h3 className='h3'>Add Airline</h3>  
            <form onSubmit={handleSubmit} >
                    <div>   
                        <ToastContainer />
                    </div>  
            <Input
                name = "name"
                label={"name"}
                value={add.first_name}
                onChange={handleChange}
                error={errors.first_name}
                type = {"text"}
                placeholder={"name: "}
            />
            <InputOption
            options={countries}
            onChange={handleChange}
            name = {'country_id'}
            label = 'country'
            value={add.country_id}
            error = {errors.country_id}
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
              rout = {'airline'}
              value = 'Back'
              className = 'btn btn-primary sbtg'
              />
              <button className='btn btn-primary sbtg'>+Add</button>
            </div>
            </form>
        </div>
    )
}
export default AddAirline;