
import { e2p } from '../utils/convertor';
import PostTypeConv from '../utils/postTypeConvertor';
import './card.css';
function Card({cardData, user}) {
    


    return ( 
    
        <div className="each-item">

            {user && <div className='badgePostType'>{PostTypeConv(cardData.post_type)}</div>} 
            
            <div className="right">
                
                <div style={{fontSize:'22px'}}>
                    <span> {e2p(cardData.meterage)} متر , </span>
                    <span>{cardData.address}</span>
                </div>

                <div className='card_part2' style={{fontSize:'16px'}}>
                    <span>طبقه: {e2p(cardData.floor)}</span>
                    <span>تعداد اتاق: {e2p(cardData.room_count)}</span>
                    <span>سن بنا: {e2p(cardData.age)}</span>
                </div>
                
                {cardData.rent && (
                    <div style={{fontSize:'18px'}}>
                        <span style={{marginLeft:'30px'}}> رهن: {e2p(cardData.mortgage)} میلیون تومان</span>
                        <span> اجاره:  {e2p(cardData.rent)} میلیون تومان</span>
                    </div>
                )}

                {cardData.sales && (
                    <div style={{fontSize:'18px'}}>
                        <span> قیمت:  {e2p(cardData.sales)} میلیون تومان</span>
                    </div>
                )}

                {cardData.full_mortgage && (
                    <div style={{fontSize:'18px'}}>
                        <span> رهن کامل:  {e2p(cardData.full_mortgage)} میلیون تومان</span>
                    </div>
                )}

            </div>

            <div className='left'>
                <img src={cardData.images[0]} alt="" />
            </div>


       </div>
    
     );
}

export default Card;