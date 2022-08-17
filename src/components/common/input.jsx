

const Input =({name,label,value,error,onChange,type,placeholder,max,classname}) =>{

    return(
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
            id = {name}
            name = {name}
            value ={value}
            type={type}
            className={'form-control'||classname}
            onChange={onChange}
            placeholder={placeholder}
            max = {max}
            />
        {error && <div className='alert alert-danger'> {error} </div>}
        </div>
    );
};

export default Input