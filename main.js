window.onload = ()=>{
const text=document.getElementById('text');
const author=document.getElementById('author');
const input=document.getElementById('test');
const highscore = localStorage.getItem("highscore");
if(highscore){
	document.getElementById("highscore").textContent += highscore
}
let switcher=false;
let index = Math.floor(Math.random()*1642);
console.log(index)
fetch("https://type.fit/api/quotes")
  .then(res => res.json())
  .then(data =>{
  	text.innerHTML = data[index].text
  	author.innerHTML = `${data[index].author} once said :`
  	switcher = true
  	console.log(data[index].author, '\n', data[index].text)
  })

let sample = text.textContent

function sortString(x, start, end) {
  let a="";
  for(i=start; i<=end ; i++){
    a=a+x[i];
  }
  return a;
}

let start;
input.addEventListener("keyup",check);
function check(e){
 if(switcher){
    start=e.timeStamp;
    switcher=false;

  }



  if(sortString(text.textContent,0,e.target.value.length-1)==e.target.value){

    document.getElementById('toValidate').style.zIndex=3;
    document.getElementById('toValidate').textContent=e.target.value;
    document.getElementById('toValidate').style.color="rgb(10,255,10)";
    
    if (e.target.value.length==text.textContent.length) {
      const end= e.timeStamp;
      const duration=(end-start)/60000;
      const speed = Math.floor((text.textContent.split(" ").length)/duration);
      if(localStorage.getItem("highscore")){
      	if(speed >= localStorage.getItem("highscore")){
      		localStorage.setItem("highscore", speed)
      	}
      }else{
       localStorage.setItem("highscore", speed)
      }
    
      window.alert(`Your speed is ${speed} WPM`);
      input.value="";
      input.disabled=true;
      button = document.createElement('button')
      button.textContent = "Play Again"
      button.classList.add("play-again-btn")
      document.body.appendChild(button)
      button.addEventListener('click',(e)=>{
      	e.preventDefault()
      	window.location.reload()
      })
    }



   
  }else{
    document.getElementById('toValidate').style.zIndex=3;
    document.getElementById('toValidate').style.color="rgb(255,10,10)";
  
  }



}



}


