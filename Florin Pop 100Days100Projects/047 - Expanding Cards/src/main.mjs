import CardsContainer from './CardsContainer.mjs';

async function fetchImage(url, images) {
  return fetch(url)
  .then((response) => response.blob())
  .then(blob => {
    images.push(URL.createObjectURL(blob));
  });
}

async function loadImages(unsplashCollectionURL, count) {
  const images = [];
  const requests = [];
  for (let i = 0; i < count ; i++) {
    requests.push(fetchImage(`${unsplashCollectionURL}?${i}`, images));
  }
  await Promise.all(requests);
  return images;
}

loadImages("https://source.unsplash.com/collection/1319040", 5).then(images => {
  new CardsContainer(document.querySelector("#root"), { images });
});

