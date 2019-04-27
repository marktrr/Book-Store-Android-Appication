/**
 File: HMutil.html
 Full Name: Hy Minh Tran
 Student #: 7910276
 Mobile Application 1 - FINAL PROJECT
 Created: April 5th, 2019
**/
function hmValidOrder() {
    var form = $("#orderForm");
    form.validate({
        rules: {
            hmFirstName: {
                required: true,
                maxlength: 15
            },
            hmLastName: {
                required: true,
                maxlength: 15
            },
            hmAddress: {
                required: true
            },
            hmCountry: {
                required: true
            },
            hmProvince: {
                required: true
            },
            hmCity: {
                required: true
            },
            hmPostalCode: {
                required: true,
                pcCheck: true
            },
            hmEmail: {
                required: true,
                emailCheck: true
            },
            hmCardNumber: {
                required: true,
                creditcard: true
            },
            hmCVV: {
                required: true,
                min: 100,
                max: 999
            }
        },
        messages: {
            hmFirstName: {
                required: "First Name is required.",
                maxlength: "First Name must less than 15 characters."
            },
            hmLastName: {
                required: "Last Name is required.",
                maxlength: "Last Name must less than 15 characters."
            },
            hmAddress: {
                required: "Address is required."
            },
            hmCountry: {
                required: "Country is required."
            },
            hmProvince: {
                required: "Province is required."
            },
            hmCity: {
                required: "City is required."
            },
            hmPostalCode: {
                required: "PostalCode is required.",
                pcCheck: "Postal Code should be Canadian Postal Code: A1A-1A1 or A1A1A1"
            },
            hmEmail: {
                required: "Email is required.",
                emailCheck: "Invalid Email Address."
            },
            hmCardNumber: {
                required: "Card Number is required.",
                creditcard: "Invalid credit card."
            },
            hmCVV: {
                required: "CVV is required.",
                min: "CVV must be 3 digits",
                max: "CVV must be 3 digits."
            }
        }
    });
    return form.valid();
}

jQuery.validator.addMethod("emailCheck",
    function(value, element){
        var regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        return this.optional(element) || regex.test(value);
    },
    "Our custom email checker");

jQuery.validator.addMethod("pcCheck",
    function(value, element){
        var regex = /^([A-Za-z]\d[A-Za-z][-]?\d[A-Za-z]\d)/;
        return this.optional(element) || regex.test(value);
    },
    "Our custom postal code checker");

function randomOrder(inputLength)
{
    var output = "";
    var randomSet = "ABCDEFGHIJKLMNOPURSTUPWXYZ0123456789";
    for( var i = 0; i < inputLength; i++ )
        output += randomSet.charAt(Math.floor(Math.random() * randomSet.length));

    return output;
}

function createFullName(firstName, lastName) {
    var output = "";
    output = firstName + " " + lastName;
    return output;
}

function createFullAddress(address, city, province, postalCode, country) {
    var output = "";
    output = address + ", " + city + ", " + province + ", " + postalCode + ", " + country;
    return output;
}