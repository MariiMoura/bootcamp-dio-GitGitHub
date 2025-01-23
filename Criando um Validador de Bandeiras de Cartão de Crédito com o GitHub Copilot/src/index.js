// Function to validate credit card number using Luhn algorithm
function validateCreditCardNumber(cardNumber) {
    const regex = new RegExp("^[0-9]{16}$");
    if (!regex.test(cardNumber)) return false;

    let sum = 0;
    for (let i = 0; i < cardNumber.length; i++) {
        let intVal = parseInt(cardNumber.substr(i, 1));
        if (i % 2 == 0) {
            intVal *= 2;
            if (intVal > 9) {
                intVal = 1 + (intVal % 10);
            }
        }
        sum += intVal;
    }
    return (sum % 10) == 0;
}

// Function to determine the card issuer (bandeira)
function getCardIssuer(cardNumber) {
    const cardPatterns = {
        visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
        mastercard: /^5[1-5][0-9]{14}$/,
        amex: /^3[47][0-9]{13}$/,
        discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
        // Add more patterns as needed
    };

    for (let issuer in cardPatterns) {
        if (cardPatterns[issuer].test(cardNumber)) {
            return issuer;
        }
    }
    return "unknown";
}

// Main function to validate card and get issuer
function validateCard(cardNumber) {
    if (!validateCreditCardNumber(cardNumber)) {
        return { valid: false, bandeira: null };
    }

    const bandeira = getCardIssuer(cardNumber);
    return { valid: true, bandeira: bandeira };
}

// Example usage
const cardNumber = "4111111111111111"; // Replace with actual card number
const result = validateCard(cardNumber);
console.log(result); // { valid: true, bandeira: 'visa' }