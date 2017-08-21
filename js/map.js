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

var chechTimes = ['12:00', '13:00', '14:00'];

var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

function createClosestCompetitors() {
  var ads = [];

  for (var i = 0; i < 8; i++) {
    ads.push(createCompetitor());
  }

  return ads;
}

console.log(createClosestCompetitors());

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
  oneAd.offer.chechin = getRandomElem(chechTimes);
  oneAd.offer.features = getRandomElem(features);
  oneAd.offer.description = '';
  oneAd.offer.photos = [];

  return oneAd;
}

console.log(createCompetitor());

function getRandomElem(arr) {
  var rand = Math.floor(Math.random() * arr.length);

  return arr[rand];
}

function getRandomNumber(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}
