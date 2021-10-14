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
const translations = {
  title: ['I\'m glad you asked', '我很高兴你问'],
  introEnter: ['Enter', '进入'],
  lang: ['中文', 'EN'],
  helpDescript: ['I’m glad you asked spreads over Chinatown in San Francisco, augmenting the social landscape of the area. Various sites are virtually labeled with phrases such as “This seat is for people that need to be seen.” or “This seat is for people that are missing someone.” Visitors that identify with the statements may sit, inevitably mixing with unwitting visitors that are simply sitting. In the process of determining the other’s reasons for being there, spontaneous conversations may arise. “Excuse me, are you also missing someone?”',
                 '我很高兴你问了旧金山唐人街的分布，增加了该地区的社会景观。 各种网站都虚拟地贴上了诸如“这个座位是给需要被看到的人”之类的短语的标签。 或“这个座位是为想念某人的人准备的。” 认同这些陈述的访问者可能会坐着，不可避免地与只是坐着的不知情的访问者混在一起。 在确定对方在场原因的过程中，可能会出现自发的对话。 “请问，您也想念一个人吗？”'],
  artist: ['Lauren Lee McCarthy', '劳伦·李·麦卡锡'],
  designer: ['Designer Qianqian Ye', 'Designer Qianqian Ye']
}


let lang = 'en';

$('#enter-button').click(enter);
$('#help-button').click(toggleHelp);
$('#lang-button').click(changeLang)
resize();
init();

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

window.onhashchange = function() {
  init();
}