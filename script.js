/* --- DOM elements connections --- */

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');


/* --- Global variables --- */

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

/* --- Connecting Unsplash API --- */

let numberOfPhotos = 5;
const apiKey = '1qolww0EXG7XtCnU4CvgC6xDnH8qbKm8SnDikBPOklQ';
const unsplashApiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${numberOfPhotos}`

/* --- Get photos from Unsplash API --- */

async function getPhotosFromUnsplash(){
    try{
        const response = await fetch(unsplashApiUrl);
        photosArray = await response.json();
        displayUnsplashPhotos();
    }catch (error){
        //catch error here
    }
}

/* --- Helper fx to set attributes on DOM Elements --- */

function setElementsAttributes (element, attributes){
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}



/* --- Create Elements for Links & Photos and Add to DOM --- */

function displayUnsplashPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photosArrayElement) => {
        // create <a> to link to Unsplash and set href(what to open) and target(where to open)
       
        const anchor = document.createElement('a');
        setElementsAttributes(anchor, {
            href: photosArrayElement.links.html,
            target: '_blank'
        });
        // anchor.setAttribute('href', photosArrayElement.links.html);
        // anchor.setAttribute('target', '_blank');
        // create an <img> inside the anchor
        // urls.regular --> photo size
        const img = document.createElement('img');
        setElementsAttributes(img, {
            src: photosArrayElement.urls.regular,
            alt: photosArrayElement.alt_description,
            title: photosArrayElement.alt_description
        });
        // img.setAttribute('src', photosArrayElement.urls.regular);
        // img.setAttribute('alt', photosArrayElement.alt_description);
        // img.setAttribute('title', photosArrayElement.alt_description);
        
        // check if the image is loaded, one img by one img call the fx imageLoaded
        // as we are inside the forEach
        img.addEventListener('load', imageLoaded);
           
        // Put <img> inside <a>, then put both inside ImageContainer element
        anchor.appendChild(img);
        imageContainer.appendChild(anchor);
    });
}

/* --- Check if scrolling is near botton, if so, load more photos --- */

window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotosFromUnsplash();
    }
});


/* --- Check if all images were loaded --- */

//Every time the fx imageLoaded is called the imagesLoaded counter increase by 1
// when this counter is equal to totalImages, the boolean ready (to load again) become true
// In the first web load we load 5 photos just in case slow connection, after that 30 photos
function imageLoaded(){
    imagesLoaded++;
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        numberOfPhotos = 30;
    }
}


/* --- Load fxs --- */

getPhotosFromUnsplash();
