document.addEventListener("DOMContentLoaded", () => {
  // My gasp template for my project

  // Fix initial scroll prevent when i scrolled occurre wiggle!
  window.onload = function () {
    setTimeout(() => {
      locoScroll.scrollTo(0, { duration: 0, disableLerp: true });
    }, 10);
  };

  gsap.registerPlugin(ScrollTrigger);

  // Initialize Locomotive Scroll for smooth scrolling
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
  });

  // Sync Locomotive Scroll with GSAP ScrollTrigger
  locoScroll.on("scroll", ScrollTrigger.update);
  ScrollTrigger.scrollerProxy("[data-scroll-container]", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
  //GSAP Initialization end!!

  // Text scrolling animation
  gsap.to(".scrub-text", {
    scrollTrigger: {
      trigger: ".scrub-text",
      scroller: "[data-scroll-container]",
      start: "top 70%",
      end: "top 50%",
      scrub: true,
    },
    opacity: 1,
    x: 500,
    rotation: 5,
  });

  //rotate!!
  gsap.to(".rotate-box", {
    scrollTrigger: {
      trigger: ".rotate-box",
      scroller: "[data-scroll-container]",
      start: "top 60%",
      end: "top 10%",
      scrub: true,
    },
    rotation: 360,
    scale: 1.5,
  });

  gsap.to(".fade-in", {
    scrollTrigger: {
      trigger: ".fade-in",
      scroller: "[data-scroll-container]",
      start: "top 60%",
      end: "top 20%",
      scrub: true,
    },
    opacity: 1,
    y: 0, //transform : translateY(0)
  });

  gsap.to(".fade-in-ul", {
    scrollTrigger: {
      trigger: ".fade-in-ul",
      scroller: "[data-scroll-container]",
      start: "top 80%",
      end: "top 50%",
      scrub: true,
    },
    opacity: 1,
    y: 0, //transform : translateY(0)
  });

  gsap.to(".background-change model-viewer", {
    scrollTrigger: {
      trigger: ".background-change ",
      scroller: "[data-scroll-container]",
      start: "top 60%",
      end: "top 10%",
      scrub: true,
    },
    backgroundColor: "#1e90ff",
  });

  gsap.to(".yeeSheepDucks", {
    scrollTrigger: {
      trigger: ".yeeSheepDucks",
      scroller: "[data-scroll-container]",
      start: "top 30%",
      end: "top 0%",
      scrub: true,
    },
    backgroundColor: "#8928d4",
  });
});
