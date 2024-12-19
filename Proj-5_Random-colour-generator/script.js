const randomColour = function(){
  const hex = "0123456789ABCDEF";
  let colour = "#";
  for(let i=0; i<6; i++){
    colour += hex[Math.floor(Math.random() * 16)];
  }
  return colour;
};

let intervalId;

const startColourChange = function(){
  function changeBgColour(){
    document.body.style.backgroundColor = randomColour();
  }
  if(!intervalId){
    intervalId = setInterval(changeBgColour, 1000);
  }
}

const stopColourChange = function(){
  clearInterval(intervalId);
  intervalId = null; // Ensures that any future calls to stopColourChange will not attempt to clear the interval, hence avoids unnecessary operations
}

const resetColourChange = function(){
  clearInterval(intervalId);
  intervalId = null;
  document.body.style.backgroundColor = '#212121';
}

document.querySelector('#start').addEventListener('click', startColourChange);

document.querySelector('#stop').addEventListener('click', stopColourChange);

document.querySelector('#reset').addEventListener('click', resetColourChange);


