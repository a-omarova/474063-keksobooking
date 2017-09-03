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

var pinSize = {
  width: 40,
  height: 40
};

var shuffleTitles = shuffle(titles);

var competitors = createClosestCompetitors(images, shuffleTitles);

drawPins(competitors, pinSize);
drawDialogPanel(competitors[0]);

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

function createPin(competitor, size, i) {
  var pin = document.createElement('div');
  var x = competitor.location.x - (size.width / 2);
  var y = competitor.location.y - size.height;

  pin.className = 'pin';
  pin.setAttribute('data-id', i);
  pin.setAttribute('tabindex', i);
  pin.style.left = x + 'px';
  pin.style.top = y + 'px';
  pin.innerHTML = '<img src=" ' + competitor.author.avatar + ' " class="rounded" width=" ' + size.width + ' " height=" ' + size.height + ' "/>';

  return pin;
}

function drawPins(arr, size) {
  var pinMap = document.querySelector('.tokyo__pin-map');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(createPin(arr[i], size, i));
  }

  pinMap.appendChild(fragment);
}

function drawDialogPanel(competitor) {
  var parentBlock = document.querySelector('.dialog');
  var dialogPanel = parentBlock.querySelector('.dialog__panel');
  var newPanel = document.querySelector('#lodge-template').content.querySelector('.dialog__panel').cloneNode(true);

  writeAdData(newPanel, 'title', competitor.offer.title);
  writeAdData(newPanel, 'address', competitor.offer.address);
  writeAdData(newPanel, 'price', competitor.offer.price + '&#x20bd;/ночь');
  writeAdData(newPanel, 'type', writeType(competitor.offer.type));
  writeAdData(newPanel, 'rooms-and-guests', 'Для ' + competitor.offer.guests + ' гостей в ' + competitor.offer.rooms + ' комнатах');
  writeAdData(newPanel, 'checkin-time', 'Заезд после ' + competitor.offer.checkin + ', выезд до ' + competitor.offer.checkout);
  writeAdData(newPanel, 'features', writeAdFeatures(competitor.offer.features));
  writeAdData(newPanel, 'description', competitor.offer.description);

  replaceAvatar(competitor);

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

function replaceAvatar(competitor) {
  var dialogTitle = document.querySelector('.dialog__title');
  var avatarImg = document.querySelector('.dialog__title > img');

  dialogTitle.removeChild(avatarImg);
  dialogTitle.insertAdjacentHTML('afterbegin', '<img src="' + competitor.author.avatar + '" alt="Avatar" width="70" height="70">');
}

var pins = document.querySelectorAll('.pin');
var map = document.querySelector('.tokyo__pin-map');
var dialog = document.querySelector('.dialog');
var dialogClose = document.querySelector('.dialog__close');

function showDialog(target) {

  for (var i = 0; i < pins.length; i++) {
    if (pins[i].classList.contains('pin--active')) {
      pins[i].classList.remove('pin--active');
    }
  }
  target.classList.add('pin--active');

  var pinID = target.dataset.id;
  if (pinID) {
    drawDialogPanel(competitors[pinID]);
    dialog.style.display = 'block';
  }
}

function onPinClick(e) {
  var target = e.target;

  if (!target.classList.contains('.pin')) {
    if (target === map) {
      return;
    }
    target = e.target.parentNode;
  }

  showDialog(target);
}

function enterPinClick(e) {
  var target = e.target;
  if (e.keyCode === 13 || e.which === 13) {
    showDialog(target);
  }
}

function onCloseDialogClick() {
  dialog.style.display = 'none';
  for (var i = 0; i < pins.length; i++) {
    if (pins[i].classList.contains('pin--active')) {
      pins[i].classList.remove('pin--active');
    }
  }
}

function enterCloseDialog(e) {
  if (e.keyCode === 13 || e.which === 13) {
    onCloseDialogClick();
  }
}

function escCloseDialog(e) {
  if (e.keyCode === 27 || e.which === 27) {
    onCloseDialogClick();
  }
  document.removeEventListener('keydown', escCloseDialog);
}

map.addEventListener('click', onPinClick);
map.addEventListener('keypress', enterPinClick);

dialogClose.addEventListener('click', onCloseDialogClick);
dialogClose.addEventListener('keypress', enterCloseDialog);

document.addEventListener('keydown', escCloseDialog);
