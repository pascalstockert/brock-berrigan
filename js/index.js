const colors = {
  l0: "#131112",
  l1: "#423B3F",
  l2: "#595055",
  l3: "#6F6369",
  base: "#FCF3D0",
  accent: "#CD3723",
  highlight: "#272325"
};

const albumData = [
  {
    author: "Brock Berrigan",
    title: "Utah",
    coverUrl: "./assets/images/covers/utah.jpg",
    description: "This is some example text just for the funsies n shite."
  },
  {
    author: "Brock Berrigan",
    title: "The Scenic Route",
    coverUrl: "./assets/images/covers/the-scenic-route.jpg",
    description: "This is some example text just for the funsies n shite."
  },
  {
    author: "Brock Berrigan",
    title: "Cadillac Mountain",
    coverUrl: "./assets/images/covers/cadillac-mountain.jpg",
    description: "This is some example text just for the funsies n shite."
  },
  {
    author: "Brock Berrigan",
    title: "The Narrows",
    coverUrl: "./assets/images/covers/the-narrows.jpg",
    description: "This is some example text just for the funsies n shite."
  },
  {
    author: "Brock Berrigan",
    title: "Way of Life",
    coverUrl: "./assets/images/covers/way-of-life.jpg",
    description: "This is some example text just for the funsies n shite."
  },
  {
    author: "Brock Berrigan",
    title: "Diamond in the Rough",
    coverUrl: "./assets/images/covers/diamond-in-the-rough.jpg",
    description: "This is some example text just for the funsies n shite."
  },
  {
    author: "Brock Berrigan",
    title: "Chapter 10",
    coverUrl: "./assets/images/covers/chapter-10.jpg",
    description: "This is some example text just for the funsies n shite."
  },
  {
    author: "Brock Berrigan",
    title: "Two AM",
    coverUrl: "./assets/images/covers/two-am.jpg",
    description: "This is some example text just for the funsies n shite."
  },
  {
    author: "Brock Berrigan",
    title: "Four Walls",
    coverUrl: "./assets/images/covers/four-walls.jpg",
    description: "This is some example text just for the funsies n shite."
  },
  {
    author: "Brock Berrigan",
    title: "Backwards Blues",
    coverUrl: "./assets/images/covers/backwards-blues.jpg",
    description: "This is some example text just for the funsies n shite."
  },
  {
    author: "Brock Berrigan",
    title: "Good Company",
    coverUrl: "./assets/images/covers/good-company.jpg",
    description: "This is some example text just for the funsies n shite."
  },
  {
    author: "Brock Berrigan",
    title: "Pura Vida",
    coverUrl: "./assets/images/covers/pura-vida.jpg",
    description: "This is some example text just for the funsies n shite."
  },
  {
    author: "Brock Berrigan",
    title: "Daily Routine",
    coverUrl: "./assets/images/covers/daily-routine.jpg",
    description: "This is some example text just for the funsies n shite."
  }
]

// Ensure the DOM is fully loaded before interacting with it
document.addEventListener('readystatechange', event => {
  if (event.target.readyState === 'complete') {
    for (let elementRef of document.getElementsByClassName('album-carousel')) {
      new AlbumCarousel(elementRef, albumData);
    }
  }
});

class AlbumCarousel {
  albumData;

  elementRef;
  albumContainerRef;
  scrollPosition = 0;
  scrollBy;

  imageWidth;
  imageGap;
  imageCount;
  compoundWidth;

  arrowLeft;
  arrowRight;

  constructor(elementRef, albums, options = { scrollBy: 3 } ) {
    console.log(albums);
    this.albumData = albums;

    this.elementRef = elementRef;
    this.albumContainerRef = elementRef.firstElementChild;
    this.scrollBy = options.scrollBy;

    this.albumData.forEach(album => {
      const cover = document.createElement('div');
      cover.classList.add('cover');
      cover.style.backgroundImage = `url("${ album.coverUrl }")`;
      // TODO Add logic to open lighbox with further information on the clicked album
      cover.addEventListener('click', () => { console.log('CLICKED ', album.title) });
      this.albumContainerRef.appendChild( cover );  
    });
    

    this.imageWidth = Number.parseInt(getComputedStyle(elementRef.firstElementChild.firstElementChild).width);
    this.imageGap = Number.parseInt(getComputedStyle(elementRef.firstElementChild.firstElementChild).marginRight);
    this.imageCount = elementRef.firstElementChild.children.length;
    this.compoundWidth = elementRef.firstElementChild.scrollWidth;
    this.arrowLeft = elementRef.children[1];
    this.arrowRight = elementRef.children[2];

    const albumContainerWidth = Number.parseInt(getComputedStyle(this.albumContainerRef).width);

    const checkArrows = () => {
      this.scrollPosition > 0
        ? this.arrowLeft.classList.add("clickable")
        : this.arrowLeft.classList.remove("clickable");
      this.scrollPosition < (this.compoundWidth - albumContainerWidth)
        ? this.arrowRight.classList.add("clickable")
        : this.arrowRight.classList.remove("clickable");
    }

    const scrollLeft = () => {
      const offsetAmount = this.scrollPosition - this.scrollBy * (this.imageWidth + this.imageGap);
      this.albumContainerRef.scrollTo({left: offsetAmount, behavior: "smooth"});
      this.scrollPosition = Math.max(offsetAmount, 0);
      checkArrows();
    }

    const scrollRight = () => {
      const offsetAmount = this.scrollPosition + this.scrollBy * (this.imageWidth + this.imageGap);
      this.albumContainerRef.scrollTo({left: offsetAmount, behavior: "smooth"});
      this.scrollPosition = Math.min(offsetAmount, this.compoundWidth - albumContainerWidth);
      checkArrows();
    }

    this.arrowLeft.addEventListener("click", scrollLeft);
    this.arrowRight.addEventListener("click", scrollRight);

    if (this.compoundWidth > Number.parseInt(getComputedStyle(this.albumContainerRef).width)) {
      this.arrowRight.classList.add("clickable");
    }
    console.log(this);
  }
}

function navigateTo(url) {
  window.location = url;
}

function scrollToContact() {
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" })
}

function alertNotImplemented(component) {
  window.alert(`${component} has not been implemented (yet)!`);
}
