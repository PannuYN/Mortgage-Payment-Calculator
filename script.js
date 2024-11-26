//function to add comma for every three digits from the end
function addComma (value) {
    // Split into integer and decimal parts
    let parts = value.split('.');
    let integerPart = parts[0];
    let decimalPart = parts.length > 1 ? '.' + parts[1] : '';

    // Add commas to the integer part
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return integerPart + decimalPart;
}

// limiting input to only numbers and . and showing , for every three digits from the end
function restrictAndFormat(input) {
    // Remove invalid characters: anything that isn't a digit or a dot
    let value = input.value.replace(/[^0-9.]/g, '');
    
    // Ensure only one dot is allowed (this is in case. limiting is done in above codeline)
    value = value.replace(/(\..*?)\..*/g, '$1');
    
    // call addComma function to add comma in the displayed string in input box
    input.value = addComma(value);
}

//function to assign filled in values
function assignFormValues(){
    const mortgageAmt = document.querySelector('#mortgageAmt');
    const mortgageTerm = document.querySelector('#mortgageTerm');
    const interestRate = document.querySelector('#interestRate');
    const mortgageType = document.querySelector('input[name="option"]:checked');
    const imageSection = document.querySelector('#image-section');
    const resultSection = document.querySelector('#result-section');
    const fields = {mortgageAmt, mortgageTerm, interestRate, mortgageType, imageSection, resultSection};
    return fields;
}

//function to handle form submit
function calculateRepayment(event){
    event.preventDefault();
    const fields = assignFormValues();
    const monthlyRepayment = document.querySelector('#monthlyRepayment');
    const totalRepayment = document.querySelector('#totalRepayment');

    //prepare values in the formula
    const P = parseFloat(fields.mortgageAmt.value.replace(/,/g, '')); //loan (mortgage amount)
    const r = parseFloat(fields.interestRate.value)/(12 * 100); //montly interest rate
    const n = parseInt(fields.mortgageTerm.value) * 12; //total months

    console.log(P); console.log(r); console.log(n);

    const mortgageType = fields.mortgageType.value;
    if(mortgageType === "Repayment"){
        const M  = (P * r * Math.pow((1+r), n))/(Math.pow((1+r), n) - 1); //monthly repayment
        const T = M * n; //total repayment
        monthlyRepayment.textContent = addComma(M.toFixed(2));
        totalRepayment.textContent = addComma(T.toFixed(2));
    }
    else if(mortgageType === "Interest Only"){
        const M  = P * r; //monthly repayment
        const T = (M * n) + P; //total repayment
        monthlyRepayment.textContent = addComma(M.toFixed(2));
        totalRepayment.textContent = addComma(T.toFixed(2));
    }

    switchRightSection(fields.imageSection, 'flex', 'hidden') //hide image section
    switchRightSection(fields.resultSection, 'hidden', 'flex') //show result section
}

//function to handle clear all
function clearAll() {
    const fields = assignFormValues();
    fields.mortgageAmt.value = "";
    fields.mortgageTerm.value = "";
    fields.interestRate.value = "";
    const radios = document.querySelectorAll('input[name="option"]');
    radios.forEach(radio => radio.checked = false);

    switchRightSection(fields.resultSection, 'flex', 'hidden') //hide result section
    switchRightSection(fields.imageSection, 'hidden', 'flex') //show image section
}

//function to switch right section
function switchRightSection (section, removingClass, addingClass) {
    section.classList.remove(removingClass);
    section.classList.add(addingClass);
}

