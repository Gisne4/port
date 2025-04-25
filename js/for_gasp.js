document.addEventListener("DOMContentLoaded", () => {
  // My gasp template for my project

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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

  function scroll() {
    const container = document.querySelector(".container");
    const divs = gsap.utils.toArray(".container > div");
    const navDots = gsap.utils.toArray(".nav-dot");

    divs.forEach((div, index) => {
      ScrollTrigger.create({
        trigger: div,
        scroller: container,
        start: "top center",
        end: "bottom center",
        snap: 1 / (div.length - 1),
        onEnter: () => setActiveDot(index),
        onEnterBack: () => setActiveDot(index),
        markers: false,
      });
    });
    ("");
    navDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        gsap.to(container, {
          duration: 1,
          scrollTo: divs[index],
          ease: "power2.inOut",
        });
      });
    });

    function setActiveDot(index) {
      navDots.forEach((dot) => dot.classList.remove("active"));
      navDots[index].classList.add("active");
    }

    setActiveDot(0);

    let isScrolling = false;

    container.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault();

        if (!isScrolling) {
          isScrolling = true;
          const currentScroll = container.scrollTop;
          const deltaY = e.deltaY;
          const scrollAmount = window.innerHeight;

          let targetScroll =
            currentScroll + (deltaY > 0 ? scrollAmount : -scrollAmount);
          targetScroll = Math.max(
            0,
            Math.min(
              targetScroll,
              container.scrollHeight - container.clientHeight
            )
          );

          gsap.to(container, {
            duration: 1.2,
            scrollTo: targetScroll,
            ease: "power2.inOutt",
            onComplete: () => {
              isScrolling = false;
            },
          });
        }
      },
      { passive: false }
    );

    // Text scrolling animation
    gsap.to(".scrub-text", {
      scrollTrigger: {
        trigger: ".scrub-text",
        scroller: container,
        start: "top 70%",
        end: "top 50%",
        scrub: true,
      },
      opacity: 1,
      x: 500,
      rotation: 10,
    });

    //rotate!!
    gsap.to(".rotate-box", {
      scrollTrigger: {
        trigger: ".rotate-box",
        scroller: container,
        start: "top 60%",
        end: "top 10%",
        scrub: true,
      },
      rotation: 360,
      scale: 1.5,
      transformOrigin: "center center",
    });

    gsap.to(".fade-in", {
      scrollTrigger: {
        trigger: ".fade-in",
        scroller: container,
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
        scroller: container,
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
        scroller: container,
        start: "top 60%",
        end: "top 10%",
        scrub: true,
      },
      backgroundColor: "#1e90ff",
      immediateRender: false,
    });

    gsap.to(".yeeSheepDucks", {
      scrollTrigger: {
        trigger: ".yeeSheepDucks",
        scroller: container,
        start: "top 30%",
        end: "top 0%",
        scrub: true,
      },
      backgroundColor: "#8928d4",
      immediateRender: false,
    });
  }
  scroll();
});
