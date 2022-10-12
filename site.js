const name = document.getElementById("fullname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const address = document.getElementById("address");
const formSubmit = document.getElementById("myForm");

const signUpDiv = document.getElementById("SignUp");
const detailDiv = document.getElementById("Records");

const signUpLink = document.getElementById("signUpLink");
const detailLink = document.getElementById("detailLink");

signUpLink.addEventListener('click', (e) => {
    e.preventDefault();
    signUpDiv.style.display = 'block';
    detailDiv.style.display = 'none';
});

detailLink.addEventListener('click', (e) => {
    e.preventDefault();
    signUpDiv.style.display = 'none';
    detailDiv.style.display = 'block';

    retrieveDummyRecord();
    // retrieve data from the api after every 10 seconds
    setInterval(function() {
        retrieveDummyRecord();
      }, 10000);
});


formSubmit.addEventListener('submit', (e) => {
    e.preventDefault();

    let _name = name.value;
    let _email = email.value;
    let _phone = phone.value;
    let _address = address.value;
    const token = 'ALDJAK23423JKSLAJAF23423J23SAD3';

    if (_name === "" || _email === "" || _phone === "" || _address === ""){
        alert("Please input all the fields");
        return;
    }else{

        const data = {
            'fullname': _name,
            'email': _email,
            'phone': _phone,
            'address': _address
        }
            const response = fetch("http://developers.gictsystems.com/api/dummy/submit/", {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin':'*',
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });

            response.then(data => {
                console.log(data);
            })
        }
    
});

function retrieveDummyRecord(){
    const tbody = document.getElementById("tbody");
    tbody.innerHTML = '';
    const token = 'ALDJAK23423JKSLAJAF23423J23SAD3';
    const request = fetch(`http://developers.gictsystems.com/api/dummy/items/`,
        {
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Authorization': `Bearer ${token}`,
            }
        }
    );

    request.then(data => {
        data.forEach(function (item) {
            var tr = document.createElement("tr");
            var td1 = document.createElement("td");
            var td2 = document.createElement("td");
            var td3 = document.createElement("td");
            td1.innerHTML = item.ID;
            td2.innerHTML = item.Message;
            td3.innerHTML = item.Age;
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
    
            tbody.appendChild(tr);
        });
    })
}