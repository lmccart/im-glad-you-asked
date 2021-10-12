const images = [
  "https://cdn.glitch.me/975d1c2a-4788-4aff-bf0c-2c012aafb369%2Fphrase5%402x.png?v=1633736883545",
  "https://cdn.glitch.me/975d1c2a-4788-4aff-bf0c-2c012aafb369%2Fphrase1%402x.png?v=1633736865482"
];

$('#enter-button').click(enter);
$('.help-button').click(toggleHelp);
$('#back-button').click(toggleHelp);
resize();
initPhrase();

function resize() {
  let vw = window.innerWidth * 0.01;
  document.documentElement.style.setProperty('--vw', `${vw}px`);
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

function enter() {
  
  let videoElement = document.getElementById('cam');
  let camera = new JslibHtml5CameraPhoto.default(videoElement);
  camera.startCamera(JslibHtml5CameraPhoto.FACING_MODES.ENVIRONMENT)
  .then((stream)=>{
    console.log('Camera started');
    showMain();
  })
  .catch((error)=>{
    console.log('Camera failed');
  });
}

function showMain() {
  $('#intro').hide();
  $('#main').show();
  $('#help').hide();
}

function toggleHelp() {
  if ($('#help').is(':visible')) {
    $('#help').hide();
  } else {
    $('#help').show();
  }
}

function initPhrase() {
  let n = Number(window.location.hash.substring(1));
  console.log(n);
  $('#phrase').attr('src', images[n]);
}