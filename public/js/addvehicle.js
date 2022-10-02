// ! 1. i need to have user create an even that pulls the data from above selection
// ! 2. once event is pressed i need the event to fetch the data from the db
// ! 2.5- need to fetch an api that event created??? george yoo
// ! 3. once the fetch happens i need the information fetched to render in the applications section of the of the dashboard
// !. 4 criteria should display 
// ! - year, make, model, picture,
<script src="/models/ElectricVehicle.js/"
const response = fetch("/api/fleet/", {

});

const formHandler = async (event) => {
    event.preventDefault();
}


const selectObj = {
    "Year": [""],
    "Make": ["", "", "", ""],
    "Model": [""]

},



    window.onload = function () {
        const selectYear = document.getElementById("year").value.trim();
        const selectMake = document.getElementById("make").value.trim();
        const selectModel = document.getElementById("model").value.trim();
        for (var x in selectObj) {
            selectObj.options[selectObj.options.length] = new Option(x, x);





            if (year && make && model) {
                const response = fetch("/api/fleet/", {
                    method: "POST",
                    body: JSON.stringify({ name: year, make, model }),
                    headers: { "content-type": "application/json" },
                });


                if (response.ok) {
                    document.location.replace("");
                } else {
                    alert("failed to make a valid selection")
                }
            }
        }
    }