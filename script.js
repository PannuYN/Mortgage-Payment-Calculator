//function to add comma for every three digits from the end
function addComma(value) {
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

//function to call elements
function getElements() {
    const mortgageAmt = document.querySelector('#mortgageAmt');
    const mortgageTerm = document.querySelector('#mortgageTerm');
    const interestRate = document.querySelector('#interestRate');
    const mortgageType = document.querySelector('input[name="option"]:checked');
    const imageSection = document.querySelector('#image-section');
    const resultSection = document.querySelector('#result-section');
    const elements = { mortgageAmt, mortgageTerm, interestRate, mortgageType, imageSection, resultSection };
    return elements;
}

//function to hide previous errors when click calculate
function hidePreviousErrors(elementId) {
    document.querySelector(`#${elementId}Error`).classList.add('hidden');
    document.querySelector(`#${elementId}Container`).classList.remove('border-red-600');
    document.querySelector(`#${elementId}Span`).classList.remove('bg-red-600', 'text-white');
}

//function to handle form submit
function calculateRepayment(event) {
    event.preventDefault();
    const elements = getElements();

    //hide previous errors when click calculate
    hidePreviousErrors('mortgageAmt');
    hidePreviousErrors('mortgageTerm');
    hidePreviousErrors('interestRate');
    document.querySelector('#mortgageTypeError').classList.add('hidden');

    // Loop through each field and check if it has a value
    // if no value, then shows error and stops the function 
    let hasError = false;
    Object.entries(elements).forEach(([key, element]) => {
        if (element === null) {//if an element is null, that means radio button is not checked
            document.querySelector('#mortgageTypeError').classList.remove('hidden');
            hasError = true;
        }
        else if (element.value === '') { //for other elements
            document.querySelector(`#${element.id}Error`).classList.remove('hidden');
            document.querySelector(`#${element.id}Container`).classList.add('border-red-600');
            document.querySelector(`#${element.id}Span`).classList.add('bg-red-600', 'text-white');
            hasError = true;
        }
    });
    //exits from function if it has error
    if (hasError) {
        return;
    }

    //call containers in which to show result
    const monthlyRepayment = document.querySelector('#monthlyRepayment');
    const totalRepayment = document.querySelector('#totalRepayment');

    //prepare values in the formula
    const P = parseFloat(elements.mortgageAmt.value.replace(/,/g, '')); //loan (mortgage amount)
    const r = parseFloat(elements.interestRate.value) / (12 * 100); //montly interest rate
    const n = parseInt(elements.mortgageTerm.value) * 12; //total months

    //calculate based on mortgage type
    if (elements.mortgageType.value === "Repayment") {
        const M = (P * r * Math.pow((1 + r), n)) / (Math.pow((1 + r), n) - 1); //monthly repayment
        const T = M * n; //total repayment
        //show results in the containers
        monthlyRepayment.textContent = addComma(M.toFixed(2));
        totalRepayment.textContent = addComma(T.toFixed(2));
    }
    else if (elements.mortgageType.value === "Interest Only") {
        const M = P * r; //monthly repayment
        const T = (M * n) + P; //total repayment
        //show results in the containers
        monthlyRepayment.textContent = addComma(M.toFixed(2));
        totalRepayment.textContent = addComma(T.toFixed(2));
    }

    //show result section
    switchRightSection(elements.imageSection, 'flex', 'hidden') //hide image section
    switchRightSection(elements.resultSection, 'hidden', 'flex') //show result section
}

//function to handle clear all
function clearAll() {
    const elements = getElements();
    elements.mortgageAmt.value = "";
    elements.mortgageTerm.value = "";
    elements.interestRate.value = "";
    const radios = document.querySelectorAll('input[name="option"]');
    radios.forEach(radio => radio.checked = false);

    //show image section
    switchRightSection(elements.resultSection, 'flex', 'hidden') //hide result section
    switchRightSection(elements.imageSection, 'hidden', 'flex') //show image section
}

//function to switch right section
function switchRightSection(section, removingClass, addingClass) {
    section.classList.remove(removingClass);
    section.classList.add(addingClass);
}

//for letting the use check radio by onlying clicking on the container
function checkRadio(radioId) {
    const radioButton = document.querySelector('#' + radioId);
    radioButton.checked = true;
}

