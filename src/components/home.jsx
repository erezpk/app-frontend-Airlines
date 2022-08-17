
import { useState,useEffect  } from "react";
import {useNavigate } from 'react-router-dom';
import Joi from "joi-browser";
import Input from "./common/input";
import InputOption from "./common/inputoption";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllCountries } from "./services/countriesServices";


function Home(props) {

  const getdata =async()=>{ 
    await getAllCountries().then(data => (setcountries(data.data.Country)))
    localStorage.removeItem('data_fligths')
   
  };
  
  useEffect( () => {
    getdata()
    }, []);

  const [countries , setcountries] = useState([]);
  const [errors, setErrors] = useState({});
  const [fligth, setFligth] = useState({
      origin_country: "",
      deistination_country: "",
      departure_time: "",
      lending_time: "",
    });

 
  const schema = {
        origin_country: Joi.string().required().label('origin_country'),
        deistination_country: Joi.string().required().label('deistination_country'),
        departure_time: Joi.string().required().label('departure_time'),
        lending_time: Joi.string().required().label('lending_time')

      };
    const validateProperty = (event) => {
        const { name, value } = event.target;
        const obj = { [name]: value };
        const subSchema = { [name]: schema[name] };
        const result = Joi.validate(obj, subSchema);
        const { error } = result;
        return error ? error.details[0].message : null;
      };
    
    const navigate = useNavigate() 

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

                props.setfligth(fligth)
                toast.loading('serach ')
                setTimeout(() => {  navigate('/fligths'); }, 2000);
                
            } catch (error) {
                return null
                
            }
            
        }
    }

  return(
    <div>
      <div className="bg-dark main-home text-white">
        <div >   
            <ToastContainer />
        </div>
        <form onSubmit={onSubmit}>
        <h1 className='text-center'> Search Fligth <i className="fa fa-search" aria-hidden="true"></i> </h1>
        <br />
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
            {errors.remaining_tickets && <div className='alert alert-danger'> {errors.remaining_tickets} </div>} 
                <br/>

            <center>
                <button className="btn btn-primary" > Search <i className="fa fa-search" aria-hidden="true"></i> </button> 
            </center>         
        </form>
      </div>
      </div>

      
  )
  
}
export default Home;

