

const InputOption =({options,onChange,name,label,error,value}) =>{
    
    return(
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select className="form-select" aria-label="Default select example" name={name} onChange={onChange} >
            <option >{null ||value}</option>
            {options.map(option=>{

                return(
                    <option value={option.username||option.name || option.id ||option.Roles} key={option.id}>{option.name || option.username||option.Roles}</option>
                    
                )
            })}
            </select> 
            {error && <div className='alert alert-danger'> {error} </div>}
        </div>
    );
};

export default InputOption