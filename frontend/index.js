const BASE_URL = "";
const PAYLOAD = {
    method: "GET",
    redirect: "follow",
    headers: {
        "Content-Type": "text/plain;charset=UTF-8",

    },
    // mode:"no-cors" // important or won't work
};
function convertPayloadToUrlEncodes(params = {}) {
    return Object.entries(params)
        .map(([key, value]) => [encodeURIComponent(key), encodeURIComponent(value)].join('='))
        .join('&');
};

async function fetchData(params = { reqType: "nothing" }) {
    const url = `${BASE_URL}?${convertPayloadToUrlEncodes(params)}`;
    console.log(url)

    const res = await fetch(url, PAYLOAD);

    const data = await res.json();
    //  console.log(Object.keys(data));
    //  console.log(Object.values(data));

    console.log(data)
}


async function testConnection() {
    const url = `${BASE_URL}?reqType=nothing`;
    const res = await fetch(url, PAYLOAD);

    const data = await res.json();
    //  console.log(Object.keys(data));
    //  console.log(Object.values(data));

    console.log(data.message)
}


$(document).ready(function () {
    let name = $("#name");
    let email = $("#email");
    let address = $("#address");
    let company = $("#company");
    let date = $("#date");
    let time = $("#time");
    let purpose = $("select");
    let message = $("#messageArea");
    let dateWarningText = $('#dateHelp');
    let timeWarningText = $('#timeHelp');
    let submitButton = $('#submit');
    let termsAndConditions = $('#termsAndConditions');
    // set min date value to today
    let today = new Date().toISOString().split('T')[0];
    document.getElementsByName("date")[0].setAttribute('min', today);




    $('#date').change(function (e) {

        var d = new Date(e.target.value)
        // warn if sunday or saturday
        if (d.getDay() === 0 || d.getDay() === 6) {
            dateWarningText.css('color', 'red');


            $('#date').after(dateWarningText);

        } else {
            dateWarningText.css('color', "")

        }
    })


    // time

    $('#time').change(function (e) {

        console.log(document.getElementsByName("time")[0].value.slice(0, 2));
        if (Number(e.target.value.slice(0, 2)) < 9 || Number(e.target.value.slice(0, 2)) > 17) {

            timeWarningText.css('color', 'red');

        }
        else {
            timeWarningText.css('color', '');

        }
    });


    //  disable button unless agreed to terms and conditions as well as all fields are filled.

    function handleButtonClick(e) {

        console.log("handleButtonClick is called");
        console.log(name.val());
        if (name.val().length <= 0 || address.val().length <= 0 || email.val().length <= 0 || company.val().length <= 0 || date.val().length <= 0 || time.val().length <= 0 || purpose.val().trim() === "You need me to" || !termsAndConditions.is(":checked")) {
            alert("Please fill in all input boxes");
            e.preventDefault(); // don't reload
        }

        else {
            const appointmentData = {
                reqType: "updateAppointment",
                name: name.val(),
                address: address.val(),
                email: email.val(),
                company: company.val(),
                date: date.val(),
                time: time.val(),
                purpose: purpose.val(),
                message: message.val()
            };

            fetchData(appointmentData)

            e.preventDefault();
        }
    }
    submitButton.click(function (e) { handleButtonClick(e); });

});