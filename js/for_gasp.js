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

  // For destroyer
  function destroyer() {
    const button = document.getElementById("elementDestroyer");
    const buttonTextSpans = button.querySelectorAll("span");
    const shakeIntensity = 5;
    const shakeDuration = 0.3;
    const textRotateIntensity = 20;

    button.addEventListener("mouseover", () => {
      gsap.to(button, {
        duration: shakeDuration,
        x: Math.random() > 0.5 ? shakeIntensity : -shakeIntensity,
        y: Math.random() > 0.5 ? shakeIntensity : -shakeIntensity,
        rotation: Math.random() * 5 - 2.5,
        yoyo: true,
        repeat: 1,
        onComplete: () => gsap.set(button, { x: 0, y: 0, rotation: 0 }),
      });

      gsap.to(buttonTextSpans, {
        duration: shakeDuration * 0.8,
        stagger: 0.04,
        scale: (index) => gsap.utils.random(0.8, 1.2),
        rotationX: (index) =>
          gsap.utils.random(-textRotateIntensity * 2, textRotateIntensity * 2),
        rotationZ: (index) =>
          gsap.utils.random(-textRotateIntensity * 2, textRotateIntensity * 2),
        yoyo: true,
        repeat: 1,
        ease: "elastic.out(1, 0.3)",
        onComplete: () =>
          gsap.set(buttonTextSpans, {
            scale: 1,
            rotationX: 0,
            rotationZ: 0,
          }),
      });
    });
  }
  destroyer();
});
