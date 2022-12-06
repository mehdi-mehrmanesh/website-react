import axios from "axios";
import { useEffect, useState } from "react";
import FormRendering from "../../components/form/formRendering";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
import axiosInstance from "../../components/config/axios";
function CreatePost2({user}) {

    const [images,setImages] = useState([]);
    const [loading,setLoading] = useState(false);
    const [forbiden, setForbiden] = useState(['p_description', 'p_equipment', 'p_owner', 'p_post', 'p_price', 'submit_button', 'image_container', 'file']);
    const [filteredElem, setFilterElem] = useState({});
    const [postType, setPostType] = useState('rent');
    const [formElements,setFormElements] = useState({
        p_post:{
          element:'p',
          value:'ثبت آگهی',
          label:false,
          labelText:'',
          config:{
            name:'price_info',
          }
        },
        post_type: {
            element:'select',
            value:'rent',
            label:true,
            labelText:'نوع آگهی',
            config:{
              name:'post_type',
              placeholder:'منطقه',
              options:[
                {
                    name:"رهن و اجاره",
                    id:"rent"
                },
                {
                    name:"خرید و فروش",
                    id:"sale"
                },
                {
                    name:"رهن کامل",
                    id:"full_mortgage"
                }
            ]
            }
        },
        property_type: {
            element:'select',
            value:'',
            label:true,
            labelText:'نوع ملک',
            config:{
              name:'property_type',
              placeholder:'',
              options:[
                {
                    name:"آپارتمان",
                    id:""
                },
                {
                    name:"خانه ویلایی",
                    id:""
                },
                {
                    name:"مغازه تجاری",
                    id:""
                },
                {
                    name:"باغ",
                    id:""
                },
                {
                    name:"کلنگی",
                    id:""
                }
            ]
            }
        },
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
          street:{
            element:'input',
            value:'',
            label:true,
            labelText:'خیابان فرعی یا کوچه',
            config:{
              name:'street',
              type:'text',
              placeholder:'',
            }
        },
        address:{
            element:'input',
            value:'',
            label:true,
            labelText:'آدرس دقیق و پلاک',
            config:{
              name:'address',
              type:'text',
              placeholder:'',
            }
        },
        meterage:{
            element:'input',
            value:'',
            label:true,
            labelText:'متراژ(متر)',
            config:{
              name:'meterage',
              type:'text',
              placeholder:'',
            }
        },
        floor_count:{
            element:'select',
            value:'',
            label:true,
            labelText:'تعداد طبقات',
            config:{
              name:'floor_count',
              type:'text',
              placeholder:'',
              options:[
                {
                    name:"1",
                    id:"1"
                },
                {
                    name:"2",
                    id:"2"
                },
                {
                    name:"3",
                    id:"3"
                },
                {
                    name:"4",
                    id:"4"
                },
                {
                    name:"5",
                    id:"5"
                }
            ]
            }
        },
        floor:{
            element:'select',
            value:'',
            label:true,
            labelText:'طبقه',
            config:{
              name:'floor',
              type:'text',
              placeholder:'',
              options:[
                {
                    name:"1",
                    id:"1"
                },
                {
                    name:"2",
                    id:"2"
                },
                {
                    name:"3",
                    id:"3"
                },
                {
                    name:"4",
                    id:"4"
                },
                {
                    name:"5",
                    id:"5"
                }
            ]
            }
        },
        unit_count:{
            element:'select',
            value:'',
            label:true,
            labelText:'تعداد واحد هر طبقه',
            config:{
              name:'unit_count',
              type:'text',
              placeholder:'',
              options:[
                {
                    name:"1",
                    id:"1"
                },
                {
                    name:"2",
                    id:"2"
                },
                {
                    name:"3",
                    id:"3"
                },
                {
                    name:"4",
                    id:"4"
                },
                {
                    name:"5",
                    id:"5"
                }
            ]
            }
        },
        room_count:{
            element:'select',
            value:'',
            label:true,
            labelText:'تعداد اتاق خواب',
            config:{
              name:'room_count',
              type:'text',
              placeholder:'',
              options:[
                {
                    name:"1",
                    id:"1"
                },
                {
                    name:"2",
                    id:"2"
                },
                {
                    name:"3",
                    id:"3"
                },
                {
                    name:"4",
                    id:"4"
                },
                {
                    name:"5",
                    id:"5"
                }
            ]
            }
        },
        age:{
            element:'select',
            value:'',
            label:true,
            labelText:'سال ساخت',
            config:{
              name:'age',
              type:'text',
              placeholder:'',
              options:[
                {
                    name:"1401",
                    id:"1401"
                },
                {
                    name:"1400",
                    id:"1400"
                },
                {
                    name:"1399",
                    id:"1399"
                },
                {
                    name:"1398",
                    id:"1398"
                },
                {
                    name:"1397",
                    id:"1397"
                }
            ]
            }
        },
        floorـcovering:{
            element:'select',
            value:'',
            label:true,
            labelText:'کف‌پوش',
            config:{
              name:'floorـcovering',
              placeholder:'',
              options:[{
                  name:"سرامیک",
                  id:"سرامیک"
                },
                {
                  name:"لمینت",
                  id:"لمینت"
                },
                {
                  name:"چوب",
                  id:"چوب"
              }]
            }
          },
          view:{
            element:'select',
            value:'',
            label:true,
            labelText:'نما',
            config:{
              name:'view',
              placeholder:'',
              options:[{
                name:"سنگ",
                id:"سنگ"
              },
              {
                name:"آجر",
                id:"آجر"
              }
            ]
            }
          },
          cabinets:{
            element:'select',
            value:'',
            label:true,
            labelText:'کابینت',
            config:{
              name:'cabinets',
              placeholder:'',
              options:[{
                name:"ام دی اف",
                id:"ام دی اف"
              },
              {
                name:"چوب",
                id:"چوب"
              },]
            }
          },
          p_equipment:{
            element:'p',
            value:'تجهیزات و امکانات',
            label:false,
            labelText:'',
            config:{
              name:'equipment',
            }

          },
          elevator:{
            element:'input',
            value:false,
            label:true,
            labelText:'آسانسور',
            config:{
              name:'elevator',
              id:'elevator',
              type:'checkbox',
              placeholder:'',
              options:[{
                
              }]
            }
          },
          parking:{
            element:'input',
            value:false,
            label:true,
            labelText:'پارکینگ ',
            config:{
              name:'parking',
              id:'parking',
              type:'checkbox',
              placeholder:'',
              options:[{
                
              }]
            }
          },
          toilet:{
            element:'input',
            value:false,
            label:true,
            labelText:'سرویس فرنگی',
            config:{
              name:'toilet',
              id:'toilet',
              type:'checkbox',
              placeholder:'',
              options:[{
                
              }]
            }
          },
          oven:{
            element:'input',
            value:false,
            label:true,
            labelText:'گاز رومیزی',
            config:{
              name:'oven',
              id:'oven',
              type:'checkbox',
              placeholder:'',
              options:[{
                
              }]
            }
          },
          warehouse:{
            element:'input',
            value:false,
            label:true,
            labelText:'انباری',
            config:{
              name:'warehouse',
              id:'warehouse',
              type:'checkbox',
              placeholder:'',
              options:[{
                
              }]
            }
          },
          terrace:{
            element:'input',
            value:false,
            label:true,
            labelText:'تراس',
            config:{
              name:'terrace',
              id:'terrace',
              type:'checkbox',
              placeholder:'',
              options:[{
                
              }]
            }
          },
          p_owner:{
            element:'p',
            value:'اطلاعات مالک',
            label:false,
            labelText:'',
            config:{
              name:'owner_info',
            }
        },
          ownerName:{
            element:'input',
            value:'',
            label:true,
            labelText:'نام مالک',
            config:{
              name:'ownerName',
              type:'text',
              placeholder:'',
            }
        },
        mobile:{
            element:'input',
            value:'',
            label:true,
            labelText:'همراه',
            config:{
              name:'mobile',
              type:'text',
              placeholder:'',
            }
        },
        p_price:{
            element:'p',
            value:'اطلاعات قیمت',
            label:false,
            labelText:'',
            config:{
              name:'price_info',
            }
        },
        full_mortgage:{
            element:'input',
            value:'',
            label:true,
            labelText:'رهن کامل',
            config:{
              name:'full_mortgage',
              type:'text',
              placeholder:'',
            }
        },
        mortgage:{
            element:'input',
            value:'',
            label:true,
            labelText:'رهن',
            config:{
              name:'mortgage',
              type:'text',
              placeholder:'',
            }
        },
        rent:{
            element:'input',
            value:'',
            label:true,
            labelText:'اجاره',
            config:{
              name:'rent',
              type:'text',
              placeholder:'',
            }
        },
        sale:{
            element:'input',
            value:'',
            label:true,
            labelText:'قیمت فروش',
            config:{
              name:'sale',
              type:'text',
              placeholder:'',
            }
        },
        p_description:{
          element:'p',
          value:'اطلاعات بیشتر',
          label:false,
          labelText:'',
          config:{
            name:'price_info',
          }
        },


        description:{
            element:'textarea',
            value:'',
            label:true,
            labelText:'توضیحات',
            config:{
              name:'description',
              placeholder:'',
              rows:10,
              cols:90
            }
        },
        file:{
            element:'input',
            value:'',
            label:true,
            labelText:'عکس خود را انتخاب کنید',
            config:{
              id:'file-input',
              name:'file',
              type:'file',
              placeholder:'',
            }
        },
        image_container:{
          element:'div',
          value:'',
          label:false,
          labelText:'',
          config:{
            name:'image_container',
          }
        },
        submit_button:{
            element:'input',
            value:'ثبت آگهی',
            label:false,
            labelText:'',
            config:{
              name:'submit_button',
              type:'submit',
              placeholder:''
            }
        },
        


    })

    const changeHandler = (e) => {
        let account = {...formElements};
        if(e.target.name === 'file'){
          setLoading(true)
          let image = e.target.files[0];
          const file = new FormData();
          file.append(
            'file',image
          )
          async function sendFile(){
            let {data} = await axiosInstance.post('upload',file);
            setImages([...images, data.url]);
            setLoading(false)
          }
          sendFile()
        }
        if(e.target.name === 'post_type')
          setPostType(e.target.value)
        
        let val = account[e.target.name].config.type === 'checkbox' ? e.target.checked : e.target.value;
        account[e.target.name].value = val
        setFormElements(account)

    }

    useEffect(() => {

        var filtered = {...formElements};
        switch(postType){

          case('rent'):
            let forbiden1 = ['sale', 'full_mortgage'];
            forbiden1.map((item) => delete filtered[item])
            setFilterElem(filtered)
          break;
  
          case('sale'):
            let forbiden2 = ['rent', 'full_mortgage', 'mortgage'];
            forbiden2.map((item) => delete filtered[item])
            setFilterElem(filtered)
          break;
  
          case('full_mortgage'):
            let forbiden3 = ['sale', 'mortgage', 'rent'];
            forbiden3.map((item) => delete filtered[item])
            setFilterElem(filtered)
          break;
  
          default:
            return true;
  
        }

    },[postType])

    const renderForms = () => {
        let formArr = [];
        for(let elementName in filteredElem){
           formArr.push(filteredElem[elementName])     
        }
        return formArr.map((item,i) => (                   
             <FormRendering
                loading={loading}
                images={images}
                key={i}
                formdata={item}
                change={changeHandler}
             />             
        ))
    } 

    const handleSubmit = (e) => {
        e.preventDefault();
        let dataToSubmit = {};
        for(let key in filteredElem){
            dataToSubmit[key] = filteredElem[key].value;
            forbiden.map((item) => delete dataToSubmit[item])
        }

        dataToSubmit['images'] = images;
        dataToSubmit['is_published'] = user ? true : false;

        async function postData(){
            const res = await axiosInstance.post(`${postType}`,dataToSubmit)
            res.status === 200 ? Swal.fire({
              text: 'فرم با موفقیت ثبت شد',
              icon: 'success',
              confirmButtonText: 'باشه'
            }) : 
            Swal.fire({
              text: '!مشکلی در ثبت فرم بوجود آمد',
              icon: 'error',
              confirmButtonText: 'باشه'
            })
        }
        postData()

    }


    return ( 
       <>
         <form onSubmit={handleSubmit} className="inputs_container" encType="multipart/form-data">
            {renderForms()}
        </form>
        
        
        <ToastContainer
            position="bottom-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={true}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
       </>
     );
}

export default CreatePost2;