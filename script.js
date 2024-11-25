// limiting input to only numbers and . and showing , for every three digits from the end
function restrictAndFormat(input) {
    // Remove invalid characters: anything that isn't a digit or a dot
    let value = input.value.replace(/[^0-9.]/g, '');
    
    // Ensure only one dot is allowed (this is in case. limiting is done in above codeline)
    value = value.replace(/(\..*?)\..*/g, '$1');
    
    // Split into integer and decimal parts
    let parts = value.split('.');
    let integerPart = parts[0];
    let decimalPart = parts.length > 1 ? '.' + parts[1] : '';

    // Add commas to the integer part
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Combine the parts and set the formatted value
    input.value = integerPart + decimalPart;
}

