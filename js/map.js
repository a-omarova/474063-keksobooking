'use strict';

var images = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png'
];

var titles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var types = ['flat', 'house', 'bungalo'];

var checkTimes = ['12:00', '13:00', '14:00'];

var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var shuffleTitles = shuffle(titles);

var competitors = createClosestCompetitors(images, shuffleTitles);

drawPins(competitors);
drawDialogPanel(competitors);

function createClosestCompetitors(imagesList, titlesList) {
  var ads = [];

  for (var i = 0; i < 8; i++) {
    ads.push(createCompetitor(imagesList[i], titlesList[i]));
  }

  return ads;
}

function createCompetitor(image, title) {
  var avatarObj = {avatar: image};
  var locationObj = {
    x: getRandomNumber(300, 900),
    y: getRandomNumber(150, 500)
  };
  var offerObj = {
    address: locationObj.x + ', ' + locationObj.y,
    title: title,
    price: getRandomNumber(1000, 1000000),
    type: getRandomElem(types),
    rooms: getRandomNumber(1, 5),
    guests: getRandomNumber(1, 8),
    checkin: getRandomElem(checkTimes),
    checkout: getRandomElem(checkTimes),
    features: getRandomFeaturesArray(features),
    description: '',
    photos: []
  };

  return {
    author: avatarObj,
    location: locationObj,
    offer: offerObj
  };
}

function getRandomElem(arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomFeaturesArray(featuresArr) {
  var featuresShuffle = shuffle(featuresArr);
  var randomLength = getRandomNumber(1, featuresShuffle.length);

  return featuresShuffle.slice(0, randomLength);
}

function shuffle(arr) {
  var newArray = arr.slice();
  for (var i = newArray.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = newArray[i];
    newArray[i] = newArray[j];
    newArray[j] = t;
  }
  return newArray;
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

  writeAdData(newPanel, 'title', arr[0].offer.title);
  writeAdData(newPanel, 'address', arr[0].offer.address);
  writeAdData(newPanel, 'price', arr[0].offer.price + '&#x20bd;/ночь');
  writeAdData(newPanel, 'type', writeType(arr[0].offer.type));
  writeAdData(newPanel, 'rooms-and-guests', 'Для ' + arr[0].offer.guests + ' гостей в ' + arr[0].offer.rooms + ' комнатах');
  writeAdData(newPanel, 'checkin-time', 'Заезд после ' + arr[0].offer.checkin + ', выезд до ' + arr[0].offer.checkout);
  writeAdData(newPanel, 'features', writeAdFeatures(arr[0].offer.features));
  writeAdData(newPanel, 'description', arr[0].offer.description);

  replaceAvatar(arr);

  parentBlock.removeChild(dialogPanel);
  parentBlock.appendChild(newPanel);
}

function writeAdData(elem, elemName, value) {
  elem.querySelector('.lodge__' + elemName).innerHTML = value;
}

function writeAdFeatures(featuresList) {
  var featuresHtmlList = '';

  for (var i = 0; i < featuresList.length; i++) {
    featuresHtmlList += '<span class="feature__image feature__image--' + featuresList[i] + '"></span>';
  }

  return featuresHtmlList;
}

function writeType(type) {
  if (type === 'flat') {
    return 'Квартира';
  } else if (type === 'bungalo') {
    return 'Бунгало';
  } else if (type === 'house') {
    return 'Дом';
  } else {
    return null;
  }
}

function replaceAvatar(arr) {
  var dialogTitle = document.querySelector('.dialog__title');
  var avatarImg = document.querySelector('.dialog__title > img');

  dialogTitle.removeChild(avatarImg);
  dialogTitle.insertAdjacentHTML('afterbegin', '<img src="' + arr[0].author.avatar + '" alt="Avatar" width="70" height="70">');
}
