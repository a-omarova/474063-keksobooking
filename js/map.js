'use strict';

var images = ['img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png'];

var titles = ['Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'];

var types = ['flat', 'house', 'bungalo'];

var checkTimes = ['12:00', '13:00', '14:00'];

var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

createClosestCompetitors();

function createClosestCompetitors() {
  var ads = [];

  for (var i = 0; i < 8; i++) {
    ads.push(createCompetitor());
  }

  drawPins(ads);
  drawDialogPanel(ads);
}

function createCompetitor() {
  var oneAd = {
    'author': {},
    'offer': {},
    'location': {}
  };

  oneAd.author.avatar = getRandomElem(images);
  oneAd.location.x = getRandomNumber(300, 900);
  oneAd.location.y = getRandomNumber(100, 500);

  oneAd.offer.title = getRandomElem(titles);
  oneAd.offer.address = oneAd.location.x + ',' + oneAd.location.y;
  oneAd.offer.price = getRandomNumber(1000, 1000000);
  oneAd.offer.type = getRandomElem(types);
  oneAd.offer.rooms = getRandomNumber(1, 5);
  oneAd.offer.guests = getRandomNumber(1, 8);
  oneAd.offer.checkin = getRandomElem(checkTimes);
  oneAd.offer.checkout = getRandomElem(checkTimes);
  oneAd.offer.features = getRandomElem(features);
  oneAd.offer.description = '';
  oneAd.offer.photos = [];

  return oneAd;
}

function getRandomElem(arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}

function getRandomNumber(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}

function drawPins(arr) {
  var pinMap = document.querySelector('.tokyo__pin-map');
  var fragment = document.createDocumentFragment();

  var widthPin = 40;
  var heightPin = 40;

  for (var i = 0; i < arr.length; i++) {
    var pin = document.createElement('div');
    var x = arr[i].location.x - (widthPin / 2);
    var y = arr[i].location.y - heightPin;

    pin.className = 'pin';
    pin.style.left = x + 'px';
    pin.style.top = y + 'px';
    pin.innerHTML = '<img src=" ' + arr[i].author.avatar + ' " class="rounded" width=" ' + widthPin + ' " height=" ' + heightPin + ' "/>';

    fragment.appendChild(pin);
  }

  pinMap.appendChild(fragment);
}

function drawDialogPanel(arr) {
  var parentBlock = document.querySelector('.dialog');
  var dialogPanel = parentBlock.querySelector('.dialog__panel');

  var newPanel = document.querySelector('#lodge-template').content.querySelector('.dialog__panel').cloneNode(true);
  writeAdData(newPanel, '.lodge__title', arr[0].offer.title);
  writeAdData(newPanel, '.lodge__address', arr[0].offer.address);
  writeAdData(newPanel, '.lodge__price', arr[0].offer.price + '&#x20bd;/ночь');
  writeAdData(newPanel, '.lodge__type', arr[0].offer.type);
  writeAdData(newPanel, '.lodge__rooms-and-guests', 'Для ' + arr[0].offer.guests + ' гостей в ' + arr[0].offer.rooms + ' комнатах');
  writeAdData(newPanel, '.lodge__checkin-time', 'Заезд после ' + arr[0].offer.checkin + ', выезд до ' + arr[0].offer.checkout);
  writeAdData(newPanel, '.lodge__features', arr[0].offer.features);
  writeAdData(newPanel, '.lodge__description', arr[0].offer.description);

  replaceAvatar(arr);

  parentBlock.removeChild(dialogPanel);
  parentBlock.appendChild(newPanel);
}

function writeAdData(elem, className, value) {
  elem.querySelector(className).innerHTML = value;
}

function replaceAvatar(arr) {
  var dialogTitle = document.querySelector('.dialog__title');
  var avatarImg = document.querySelector('.dialog__title > img');

  dialogTitle.removeChild(avatarImg);
  dialogTitle.insertAdjacentHTML('afterbegin', '<img src="' + arr[0].author.avatar + '" alt="Avatar" width="70" height="70">');
}
