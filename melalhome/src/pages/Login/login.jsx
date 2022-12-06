import axios from "axios";
import Joi from "joi-browser";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import './login.css'
import axiosInstance from "../../components/config/axios";
import FormRendering from "../../components/form/formRendering";

function Login() {

    const [errors, setErrors] = useState([]);
    const [loading,setLoading] = useState(false)
    const [inputs,setInputs] = useState({
        email:{
            element:'input',
            value:'',
            label:true,
            labelText:'نام کاربری',
            config:{
                name:'email',
                id:'email',
                type:'text',
                placeholder:'نام کاربری خود را وارد کنید',
            }
        },
        password:{
            element:'input',
            value:'',
            label:true,
            labelText:'پسورد',
            config:{
                name:'password',
                id:'password',
                type:'password',
                placeholder:' پسورد خود را وارد کنید',
            }
        },
        submit:{
            element:'input',
            value:'ورود',
            label:false,
            labelText:'',
            config:{
                name:'submit',
                id:'submit',
                type:'submit',
            }
        }
    })


    let schema = {
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().min(6).max(30).required()
    }


    const getData = async (data) => {
       
        await axiosInstance.post('login',data).then(({data : jwt}) => {
            localStorage.setItem("token", jwt);
            window.location = "/"
            setLoading(false)
        }).catch((err) => {
            setLoading(false)
            Swal.fire({
                text: err.response.data,
                icon: 'error',
                confirmButtonText: 'باشه'
              })

        })
        
    }


    const validate = (data,schema) => {

       const config =  { abortEarly: false };
       const result =  Joi.validate(data, schema, config);
       if(!result.error){
            setErrors({});
            getData(data);
            setLoading(true)
            return true
       } 
       const errors = {};
       for(let item of result.error.details)
            errors[item.path[0]] = {
                error_message : item.message,
                error_type    : item.type
            }
        setErrors(errors)

    }

  
    const renderForms = () => {
        let formArr = [];
        for(let elementName in inputs){
           formArr.push(inputs[elementName])     
        }
        // return formArr.map((item,i) => (                   
        //      <MelalFormElements
        //         name={item.name}
        //         label={item.label}
        //         type={item.type}
        //         value={item.value}
        //         change={handleChange}
        //         error={errors}
        //         loading={loading}
        //     />                
        // ))

        return formArr.map((item,i) => (                   
            <FormRendering
               formdata={item}
               change={handleChange}
               error={errors}
               loading={loading}
           />                
       ))
        
    } 
    

    const handleChange = (e) => {
        let account = {...inputs};
        account[e.target.name].value = e.target.value;
        setInputs(account)
    }
    

    const handleSubmit = (e) => {
        e.preventDefault();
        let dataToSubmit = {};
        for(let key in inputs){
            if(key !== "submit")
                dataToSubmit[key] = inputs[key].value
        }

        validate(dataToSubmit,schema)

        
        // async function getData(){
        //     const {data: jwt} = await axios.post('http://localhost:3001/login',dataToSubmit)
        //     localStorage.setItem("token", jwt);
        //     window.location = "/"
        // }

        // console.log(Object.keys(errors).length)
        // getData()

        

        

        
    }

   
    
    return ( 
        <>
        <div className="login_container">
            <h1>آژانس املاک ملل</h1>
        <form onSubmit={handleSubmit}>


            {renderForms()}
          
           </form>
        </div>
        </>
     );
}

export default Login;