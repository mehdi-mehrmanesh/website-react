export const e2p = n => {
    const farsiDigits = [ '۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];  
    return typeof(n) === 'number' ? n
    .toString()
    .split('')
    .map(x => farsiDigits[x])
    .join('') : ""
}

//export const e2p = s => s.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])
