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
  scrollBy;

  imageWidth;
  imageGap;
  imageCount;
  compoundWidth;

  paddingJustification = 0;

  arrowLeft;
  arrowRight;

  constructor(elementRef, scrollBy) {
    this.elementRef = elementRef;
    this.scrollBy = scrollBy;
    this.imageWidth = getComputedStyle(elementRef.firstElementChild.firstElementChild).width;
    this.imageGap = getComputedStyle(elementRef.firstElementChild.firstElementChild).marginRight;
    this.imageCount = elementRef.firstElementChild.children.length;
    this.compoundWidth = elementRef.firstElementChild.scrollWidth;
    this.arrowLeft = elementRef.children[1];
    this.arrowRight = elementRef.children[2];
    console.log(this)

    this.arrowLeft.contentDocument.addEventListener("click", this.scrollLeft);
    this.arrowRight.contentDocument.addEventListener("click", this.scrollRight);
  }

  scrollLeft() { console.log("scrolling left") }
  scrollRight() { console.log("scrolling right") }
}
