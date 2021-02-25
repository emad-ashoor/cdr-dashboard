// Separate currency numbers with comma
function formatMoney(n) {
    const t = ',',
        s = n < 0 ? '-' : '',
        i = String(parseInt((n = Math.abs(Number(n) || 0))));
    let j;
    j = (j = i.length) > 3 ? j % 3 : 0;
    return (
        (j ? i.substr(0, j) + t : '') +
        i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) +
        s
    );
}

// Check validation of numbers
function numberValidation(value){
    let regex = /^[0-9]+$/;
    return (regex.test(value.trim()));
}

// Convert numbers to Hindi characters
function convertNumToHindiChar(str) {
    if(str === undefined)
        return undefined;
    else
        return str.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
}

function convertObjNumsToHindiChars(obj)
{
    if(Object.isExtensible(obj)) {
        for (let [key, value] of Object.entries(obj)) {
            if(Object.isExtensible(value))
                obj[key] = convertObjNumsToHindiChars(value);
            else
                obj[key] = convertNumToHindiChar(value);
        }
        return obj;
    }
    else
        return convertNumToHindiChar(obj);
}
  
export { formatMoney, numberValidation, convertNumToHindiChar, convertObjNumsToHindiChars };