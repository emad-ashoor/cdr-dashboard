function getDarkerColor(hex, percent)
{ 
    hex = hex.replace(/^\s*#|\s*$/g, '');
    if(hex.length === 3)
    { 
        hex = hex.replace(/(.)/g, '$1$1'); 
    }
    var r = parseInt(hex.substr(0, 2), 16),
        g = parseInt(hex.substr(2, 2), 16),
        b = parseInt(hex.substr(4, 2), 16);
  
    /*var hex_glow = '#' + ((0|(1<<8) + r + (256 - r) * percent / 100).toString(16)).substr(1) +
        ((0|(1<<8) + g + (256 - g) * percent / 100).toString(16)).substr(1) +
        ((0|(1<<8) + b + (256 - b) * percent / 100).toString(16)).substr(1);*/
  
    var hex_dark = '#' + ((0|(1<<8) + r * (1- percent / 100)).toString(16)).substr(1) +
        ((0|(1<<8) + g * (1- percent / 100)).toString(16)).substr(1) +
        ((0|(1<<8) + b * (1- percent / 100)).toString(16)).substr(1);

    return hex_dark;
}

export { getDarkerColor }