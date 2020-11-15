//  const change = document.getElementById('id').addEventListener('click',() => {
//      alert("Clicked!...");
//  })
/*
fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})
*/
/*
fetch('http://localhost:3000/weather?address=!').then((response ) => {
    response.json().then((data) => {
        if(data.error){
            console.log(data.error)
        }else{
            console.log(data.forecast);
            console.log(data.location);
        }
    })
})
*/
const weatherData = document.querySelector("form");
const search = document.querySelector('input');
const messageone = document.querySelector('#message-one');
const messagetwo = document.querySelector('#message-two');


weatherData.addEventListener('submit', (e) =>{
    
    //console.log("Testing");
    //console.log(input);
    const location = search.value;
    messageone.textContent = "Loading...";
    messagetwo.textContent = ''
    search.value ='';
   // console.log(location);
   fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
       // let output;
        if(data.error){
            messageone.textContent = data.error;
        }else{
            messageone.textContent = data.forecast;
            messagetwo.textContent = data.location;
            }
        })
        
    })
    e.preventDefault();
})
