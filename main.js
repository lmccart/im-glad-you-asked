const images = [
  'assets/phrase1_@.png',
  'assets/phrase5_@.png',
  'assets/phrase5_@.png',
  'assets/phrase5_@.png',
  'assets/phrase5_@.png',
  'assets/phrase5_@.png',
  'assets/phrase5_@.png',
  'assets/phrase5_@.png',
  'assets/phrase5_@.png'
];

const alts = [
  'These seats are reserved for',
  'These seats are reserved for',
  'These seats are reserved for',
  'These seats are reserved for',
  'These seats are reserved for',
  'These seats are reserved for',
  'These seats are reserved for',
  'These seats are reserved for',
  'These seats are reserved for',
  'These seats are reserved for',
  'These seats are reserved for',
  'These seats are reserved for',
  'These seats are reserved for'
];


const translations = {
  introTitle: ['I\'m\nglad\nyou\nasked', '我很高兴你问'],
  introEnter: ['Enter', '进入'],
  lang: ['中文', 'EN'],
  helpTitle: ['I\'m glad you asked', '我很高兴你问'],
  helpDescript: ['I’m glad you asked augments the social landscape of Chinatown. Various sites are virtually labeled with phrases like “This seat is for people that are missing someone.” If you identify with the statements you may sit, inevitably mixing with unwitting visitors. In the process of determining why others are there, conversations may arise. “Excuse me, are you also missing someone?”',
                 '我很高兴你问了旧金山唐人街的分布，增加了该地区的社会景观。 各种网站都虚拟地贴上了诸如“这个座位是给需要被看到的人”之类的短语的标签。 或“这个座位是为想念某人的人准备的。” 认同这些陈述的访问者可能会坐着，不可避免地与只是坐着的不知情的访问者混在一起。 在确定对方在场原因的过程中，可能会出现自发的对话。 “请问，您也想念一个人吗？”'],
  lauren: ['Lauren Lee McCarthy', '劳伦·李·麦卡锡'],
  qianqian: ['Design by Qianqian Ye', 'Design by 叶千千'],
}


let lang = 'en';
let camera;

$('#enter-button').click(enter);
$('#help-button').click(toggleHelp);
$('#lang-button').click(changeLang);
$( window ).bind('hashchange', init);
$( window ).resize(resizeCam);

console.log('hi')
mapboxgl.accessToken = 'pk.eyJ1IjoibGF1cmVubGVlbWFjayIsImEiOiJja3BjMWJmMDcwNzh3MnBtbHIxeHIwMWgwIn0.7y2mRzNJ7IS467f_-ZHSFg'; 
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/laurenleemack/ckux7p8dhtlj917pjne0p7tr2',
  center: [-122.4065303925001, 37.79358422321932],
  zoom: 15
});
map.on('click', function(e) {
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['glad-you-asked']
  });
  if (!features.length) {
    return;
  }
  var feature = features[0];
  var popup = new mapboxgl.Popup({ offset: [0, -15] })
  .setLngLat(feature.geometry.coordinates)
  .setHTML(
    '<h3>' + feature.properties.phrase + '</h3>')
  .addTo(map);

});
map.on('mousemove', function(e) {
  console.log("mousemove")
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['glad-you-asked']
  });
  if (!features.length) {     
    map.getCanvas().style.cursor = 'grab';
  } else {
    map.getCanvas().style.cursor = 'pointer';
  }

});

map.on('load', () => {
  map.resize();
});











resize();
init();


function enter() {
  $('#enter-button').text('Loading');
  $('#enter-button').addClass('fade');
  $('#enter-button').prop('disabled', true);
  startCam();

}

function startCam() {
  let videoElement = document.getElementById('cam');
  camera = new JslibHtml5CameraPhoto.default(videoElement);
  camera.startCameraMaxResolution(JslibHtml5CameraPhoto.FACING_MODES.ENVIRONMENT)
  .then((stream)=>{
    console.log('Camera started');
    resizeCam();
    videoElement.addEventListener('playing', showMain);
  })
  .catch((error)=>{
    console.log('Camera failed');
    $('#error').show();
  });
}

function showMain() {
  $('#intro').hide();
  $('#main').show();
  $('#help').hide();
}

function toggleHelp() {
  console.log($('#help').is(':visible'))
  if ($('#help').is(':visible')) {
    $('#help').hide();
    $('#help-button').html('?');
  } else {
    $('#help').show();
    $('#help-button').html('←');
  }
}

function changeLang() {
  if (lang === 'en') {
    lang = 'zh';
  } else {
    lang = 'en';
  }
  init();
}

function init() {
  let n = Number(window.location.hash.substring(1));
  console.log(n);
  let path = images[n].replace('@', lang);
  $('#phrase').attr('src', path);
  $('#phrase').attr('alt', alts[n]);
  $('#debug').html(n);
  initLang();
}

function initLang() {
  let n = lang === 'en' ? 0 : 1;
  $('[data-i18n]').each(function(i) {
    let label = $(this).attr('data-i18n');
    $(this).text(translations[label][n]);
  });
}

function resize() {
  let vw = window.innerWidth * 0.01;
  document.documentElement.style.setProperty('--vw', `${vw}px`);
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  if (map) map.resize();
}

function resizeCam() {
  if (!camera) return;
  let cameraSettings = camera.getCameraSettings();
  if (cameraSettings) {
    let ww = window.innerWidth, wh = window.innerHeight;
    let ca = cameraSettings.aspectRatio, cw = cameraSettings.width, ch = cameraSettings.height;
    if (cw / ch > ww / wh) {
      $('#cam').height(wh);
      $('#cam').width(ca * wh);
      $('#cam').css('top', 0);
      $('#cam').css('left', -0.5 * (cw - ww));

    } else {
      $('#cam').width(ww);
      $('#cam').height(ww / ca);
      $('#cam').css('top', -0.5 * (ch - wh));
      $('#cam').css('left', 0);
    }
    console.log(cw, ch, ca, ww, wh)
  }
  resize();
}
