import { Fragment } from "react";
import './footer.css'

function FooterUser() {
    return ( 
        <Fragment>
            <div className="footer_container">
                {/* <div className="links">
                    <span>جدیدترین آپارتمان های تهران</span>
                    <span>جدیدترین آپارتمان های تهران</span>
                    <span>جدیدترین آپارتمان های تهران</span>
                </div> */}
               
                <div>
                    <h5>تماس با ما</h5>
                    <div className="info">
                        <p style={{marginLeft:'20px'}}>آدرس: لرستان ، الیگودرز ، خیابان هلال احمر ، روبروی مخابرات ، املاک ملل</p>
                        <a style={{marginLeft:'20px'}} href="tel:06643328410">  ۰۶۶-۴۳۳۲۸۴۱۰   </a>
                        <a>نشانی در مسیریاب نشان </a>
                    </div>
                   
                </div>


            </div>
        </Fragment>
     );
}

export default FooterUser;