import InputOption from "./inputoption";
import {useState,useEffect} from 'react'
import {useNavigate } from 'react-router-dom';
import Joi from "joi-browser";
import Input from './input';
import { putFlight } from "../services/fligthsServices";
import { getAllAirline } from "../services/airlineServices";
import { getAllCountries } from "../services/countriesServices";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function UpdateFligths(props) {

    const getdata =async()=>{ 
        await getAllCountries().then(data => (setcountriess(data.data.Country)))
        await getAllAirline().then( data1 => ( setairlines( data1.data.all)))
    };

    useEffect( () => {
        getdata()
    }, []);

    const [airlines , setairlines] = useState([]);
    const [countries , setcountriess] = useState([]);
    const [errors, setErrors] = useState({});

    const [fligth, setFligth] = useState({
        airline_company:props.data.airline_company,
        origin_country: props.data.origin_country,
        deistination_country: props.data.deistination_country,
        departure_time: props.data.departure_time,
        lending_time: props.data.lending_time,
        remaining_tickets: props.data.remaining_tickets
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
                const post = await putFlight(props.data.id,fligth)
                post.status === 200 && toast.success('Update')
                setTimeout(() => {  navigate('/fligths'); },3000);
            } catch (error) {
                return null
                
            }
            
        }
    }

    
    return(
 
    <div>
        <div>   
            <ToastContainer />
        </div>
        <form onSubmit={onSubmit}>
            <InputOption
            options={airlines}
            onChange={handleChange}
            name = {'airline_company'}
            label = 'Airline Company'
            value={fligth.airline_company}
            error = {errors.airline_company}

            >
            </InputOption>
            <InputOption
            options={countries}
            onChange={handleChange}
            name = {'origin_country'}
            value={fligth.origin_country}
            label = 'Origin Country'
            error = {errors.origin_country}
            
            >
            </InputOption>
            <InputOption
            options={countries}
            onChange={handleChange}
            name = {'deistination_country'}
            label = 'Deistination Country'
            value={fligth.deistination_country}
            error = {errors.deistination_country}

            >
            </InputOption>
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

            <center>
                <button className="btn btn-warning" > Update </button> 
            </center>               
            </form>
    </div>
    )
}

export default UpdateFligths;