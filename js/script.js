let centers = [];
const info = document.querySelector(".info");
const searchBtn = document.querySelector(".search").querySelector("button"); 

let today, date, month, year;
today = new Date();
date = today.getDate();
month = today.getMonth() + 1;
year = today.getFullYear();
today = `${date}-${month}-${year}`;
 



function covidData(pincode){
    let url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${today}`;

    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function(){
        if(this.status === 200){
            let data = JSON.parse(this.responseText);
            
            if(data.sessions !== []){
                  data.sessions.map((e , i) => {
                     let centerInfo = [                                       
                         e.name,
                         e.address,
                         e.state_name,
                         e.district_name,
                         e.block_name,
                         e.from,
                         e.to,
                         e.date,
                         e.available_capacity, 
                         e.available_capacity_dose1, 
                         e.available_capacity_dose2, 
                         e.min_age_limit,
                         e.vaccine, 
                         e.slots,         
                        ];
                      centers.push(centerInfo);
                      let details = `
                      <div class="main">
                      <h1>
                      <span class="category">Center Name - </span>
                      ${centers[i][0]}
                    </h1>
              
                    <div class="all-data">
                    <h3>
                    <span class="category">Center Address - </span>
                    ${centers[i][1]}
                  </h3>
                  <h3>
                    <span class="category">State Name - </span>
                    ${centers[i][2]}
                  </h3>
                  <h3>
                    <span class="category">District Name - </span>
                    ${centers[i][3]}
                  </h3>
                  <h3>
                    <span class="category">Block Name - </span>
                    ${centers[i][4]}
                  </h3>
                  <h3>
                    <span class="category">From - </span>
                    ${centers[i][5]}
                  </h3>
                  <h3>
                    <span class="category">To - </span>
                    ${centers[i][6]}
                  </h3>
                  <h3>
                    <span class="category">Date - </span>
                    ${centers[i][7]}
                  </h3>
                  <h3>
                    <span class="category">Available Capacity - </span>
                     ${centers[i][8]}
                  </h3>
                  <h3>
                      <span class="category">Available Capacity of Dose 1 - </span>
                       ${centers[i][9]}
                    </h3>
                    <h3>
                      <span class="category">Available Capacity of Dose 2 - </span>
                       ${centers[i][10]}
                    </h3>
                    <h3>
                      <span class="category">Minimum Age Limit - </span>
                       ${centers[i][11]}
                    </h3>
                    <h3>
                      <span class="category">Vaccine Name - </span>
                       ${centers[i][12]}
                    </h3>
                    <h3>
                      <span class="category">Available Slots - </span>
                       ${centers[i][13].join(" | ")}
                    </h3>
                    
                    </div>
                    </div>`;

                    info.innerHTML += details; 
                 });
           
             if(data.sessions.length === 0){
                alert('There is no centre associated with this pincode');
            }
            centers = []
        }
    }
        else{
            alert('An error occurred')
        }
    };
    xhr.send();
}
//covidData()

const input = document.querySelector("#input")

input.addEventListener("keypress", (e) =>{
    if(e.which === 13){
        let pincode = input.value;
        info.innerHTML = "";
        if(pincode === ""){
            alert("Please enter your Pincode");
        }
        else if(pincode !== "")
        {
            covidData(pincode)
        } 
    }    
})
 
searchBtn.addEventListener("click", () =>{
    let pincode = input.value;
    info.innerHTML = "";
    if(pincode === ""){
        alert("Please enter your Pincode");
    }
    else if(pincode !== "")
    {
        covidData(pincode)
    }
})