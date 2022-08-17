import InputOption from "./inputoption";
import {useState,useEffect} from 'react'
import {useNavigate } from 'react-router-dom';
import Joi from "joi-browser";
import Input from './input';
import ButtonRout from './buttonRout';
import { postFlight } from "../services/fligthsServices";
import { getAllAirline } from "../services/airlineServices";
import { getAllCountries } from "../services/countriesServices";    
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

    
function AddFligths(props) {
    
    const getdata =async()=>{ 
        await getAllCountries().then(data => (setcountries(data.data.Country)))
        await getAllAirline().then( data1 => ( setairlines( data1.data.all)))
    };

    useEffect( () => {
        getdata()
    }, []);

    const [airlines , setairlines] = useState([]);
    const [countries , setcountries] = useState([]);
    const [errors, setErrors] = useState({});

    const [fligth, setFligth] = useState({
        airline_company: "",
        origin_country: "",
        deistination_country: "",
        departure_time: "",
        lending_time: "",
        remaining_tickets: ""
      });

 
    const schema = {
        airline_company: Joi.string().required().label('airline_company'),
        origin_country: Joi.string().required().label('origin_country'),
        deistination_country: Joi.string().required().label('deistination_country'),
        departure_time: Joi.string().required().label('departure_time'),
        lending_time: Joi.string().required().label('lending_time'),
        remaining_tickets: Joi.string().min(1).max(250).required().label('remaining_tickets'),

      };
    const validateProperty = (event) => {
        const { name, value } = event.target;
        const obj = { [name]: value };
        const subSchema = { [name]: schema[name] };
        const result = Joi.validate(obj, subSchema);
        const { error } = result;
        return error ? error.details[0].message : null;
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
        let fligthData = { ...fligth };
        fligthData[name] = value;
        setFligth(fligthData);
        setErrors(errorData);
      };      
     
    const navigate = useNavigate() 

    const onSubmit = async (event)=>{
        event.preventDefault();

        const result = Joi.validate(fligth, schema, { abortEarly: false });
        const {error} = result;
        
        if (error) {
            const errorData = {};
            for(let item of error.details){
            const name = item.path[0];
            const message = item.message;
            errorData[name] = message;
            toast.error(message)        
            } 
            setErrors(errorData);
            return errorData;
        }
        else{
            try {
                
                const post = await postFlight(fligth)
                toast.success(post.data.message)
                setTimeout(() => {  navigate('/fligths'); }, 5000);
            } catch (error) {
                return null
                
            }
            
        }
    }
  
    return(
        
    <div  className='container-table'>
        <div>   
            <ToastContainer />
        </div>
        <form onSubmit={onSubmit}>
            <InputOption
            options={airlines}
            onChange={handleChange}
            name = {'airline_company'}
            label = 'Airline Company'
            
            error = {errors.airline_company}

            >
            </InputOption>
            <InputOption
            options={countries}
            onChange={handleChange}
            name = {'origin_country'}
            label = 'Origin Country'
            error = {errors.origin_country}
            ></InputOption>

            <InputOption
            options={countries}
            onChange={handleChange}
            name = {'deistination_country'}
            label = 'Deistination Country'
            error = {errors.deistination_country}
            ></InputOption>

            <Input
            label = 'from: '
            type="datetime-local"
            name={"departure_time"}
            onChange={handleChange}
            value={fligth.departure_time}
            error = {errors.departure_time}

            ></Input>
            <Input
            label = ' to: '
            type="datetime-local"
            name= {"lending_time"}
            onChange={handleChange}
            value={fligth.lending_time}
            error = {errors.lending_time}

            ></Input>
                <br/>
               <h6>account Tickets:  {fligth.remaining_tickets}</h6>
            
            <input  
                type="range" 
                className="form-range"  
                id="customRange2" 
                name="remaining_tickets" 
                max={250} 
                onChange={handleChange} 
            ></input>
            {errors.remaining_tickets && <div className='alert alert-danger'> {errors.remaining_tickets} </div>} 
                <br/>
            <div className="btn-group btg">
              <ButtonRout
              rout = {'fligths'}
              value = 'Back'
              className = 'btn btn-primary sbtg'
              />
              <button className='btn btn-primary sbtg'>+Add</button>
            </div>
             
            </form>
    </div>
    )
}

export default AddFligths;