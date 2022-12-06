function PostTypeConv(p) {
    switch(p){
        case('rent'):
            return 'رهن و اجاره'
        break;

        case('sale'):
            return 'خرید و فروش'
        break;

        case('full_mortgage'):
            return 'رهن کامل'
        break;
    }
}

export default PostTypeConv;