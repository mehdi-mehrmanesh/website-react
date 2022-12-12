import { useState } from "react";
import FormRendering from "../form/formRendering";

function Search() {


    const [formElements,setFormElements] = useState({
      region:{
        element:'input',
        value:'',
        label:true,
        labelText:'منطقه',
        config:{
          name:'region',
          type: 'text',
          placeholder:'منطقه',
          options:[]
        }
      },
        min_meterage:{
          element:'input',
          value:'',
          label:true,
          labelText:'حداقل متراژ',
          config:{
            name:'min_meterage',
            type:'text',
            placeholder:'حداقل متراژ',
          }
        },
        max_meterage:{
            element:'input',
            value:'',
            label:true,
            labelText:'حداکثر متراژ',
            config:{
              name:'max_meterage',
              type:'text',
              placeholder:'حداکثر متراژ',
            }
        },
        min_mortgage:{
            element:'input',
            value:'',
            label:true,
            labelText:'حداقل رهن',
            config:{
              name:'min_mortgage',
              type:'text',
              placeholder:'حداقل رهن',
            }
        },
        max_mortgage:{
            element:'input',
            value:'',
            label:true,
            labelText:'حداکثر رهن',
            config:{
              name:'max_mortgage',
              type:'text',
              placeholder:'حداکثر رهن',
            }
        },
        min_rent:{
            element:'input',
            value:'',
            label:true,
            labelText:'حداقل اجاره',
            config:{
              name:'min_rent',
              type:'text',
              placeholder:'حداقل اجاره',
            }
        },
        max_rent:{
            element:'input',
            value:'',
            label:true,
            labelText:'حداکثر اجاره',
            config:{
              name:'max_rent',
              type:'text',
              placeholder:'حداکثر اجاره',
            }
        },
        // propertyـcode:{
        //     element:'input',
        //     value:'',
        //     label:true,
        //     labelText:'کد ملک',
        //     config:{
        //       name:'propertyـcode',
        //       type:'text',
        //       placeholder:'کد ملک',
        //     }
        // },
        submit_date:{
            element:'input',
            value:'',
            label:true,
            labelText:'تاریخ ثبت',
            config:{
              name:'submit_date',
              type:'date',
              placeholder:'تاریخ ثبت',
            }
        },
        search_button:{
            element:'input',
            value:'جستجو',
            label:false,
            labelText:'',
            config:{
              name:'search_button',
              type:'submit',
              placeholder:'',
            }
        },
  })
   

    const changeHandler = (e) => {
        let account = {...formElements};
        account[e.target.name].value = e.target.value;
        setFormElements(account)
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        let dataToSubmit = {};

        for(let key in formElements){
            if(key !== "search_button" && formElements[key].value !== '')
                dataToSubmit[key] = formElements[key].value
        }

        // async function getData(){
        //     const {data: jwt} = await axios.post('http://localhost:3001/login',dataToSubmit)
        //     localStorage.setItem("token", jwt);
        //     window.location = "/"
        // }

        // getData()

        
    }

    const renderForms = () => {
        let formArr = [];
        for(let elementName in formElements){
           formArr.push(formElements[elementName])     
        }
        return formArr.map((item,i) => (                   
             <FormRendering
                key={i}
                formdata={item}
                change={changeHandler}
             />             
        ))
    } 


    

    return ( 
        <form onSubmit={handleSubmit} className="inputs_container">
            {renderForms()}
        </form>
     );
}

export default Search;