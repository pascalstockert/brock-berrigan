const colors = {
  l0: "#131112",
  l1: "#423B3F",
  l2: "#595055",
  l3: "#6F6369",
  base: "#FCF3D0",
  accent: "#CD3723",
  highlight: "#272325"
};

// Ensure the DOM is fully loaded before interacting with it
document.addEventListener('readystatechange', event => {
  if (event.target.readyState === "complete") {
    for (let elementRef of document.getElementsByClassName("album-carousel")) {
      new AlbumCarousel(elementRef);
    }
  }
});

class AlbumCarousel {
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

  constructor(elementRef, scrollBy = 3) {
    this.elementRef = elementRef;
    this.albumContainerRef = elementRef.firstElementChild;
    this.scrollBy = scrollBy;
    this.imageWidth = Number.parseInt(getComputedStyle(elementRef.firstElementChild.firstElementChild).width);
    this.imageGap = Number.parseInt(getComputedStyle(elementRef.firstElementChild.firstElementChild).marginRight);
    this.imageCount = elementRef.firstElementChild.children.length;
    this.compoundWidth = elementRef.firstElementChild.scrollWidth;
    this.arrowLeft = elementRef.children[1];
    this.arrowRight = elementRef.children[2];

    const scrollLeft = () => {
      const offsetAmount = this.scrollPosition - this.scrollBy * (this.imageWidth + this.imageGap);
      this.albumContainerRef.scrollTo({left: offsetAmount, behavior: "smooth"});
      this.scrollPosition = Math.max(offsetAmount, 0);
    }

    const scrollRight = () => {
      const offsetAmount = this.scrollPosition + this.scrollBy * (this.imageWidth + this.imageGap);
      console.log( { offsetAmount });
      this.albumContainerRef.scrollTo({left: offsetAmount, behavior: "smooth"});
      const albumContainerWidth = Number.parseInt(getComputedStyle(this.albumContainerRef).width);
      this.scrollPosition = Math.min(offsetAmount, this.compoundWidth - albumContainerWidth);
    }

    this.arrowLeft.contentDocument.addEventListener("click", scrollLeft);
    this.arrowRight.contentDocument.addEventListener("click", scrollRight);

    if (this.compoundWidth > Number.parseInt(getComputedStyle(this.albumContainerRef).width)) {
      this.arrowRight.contentDocument.children[0].style.fill = colors.base;
    }
  }

}
