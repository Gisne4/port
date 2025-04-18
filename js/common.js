document.addEventListener("DOMContentLoaded", function () {
  var tb = "var(--trans-black)";
  var ob = "var(--opaci-black)";
  var me = "mouseenter";
  var ml = "mouseleave";
  var bg = "background-color";

  loadHeader();

  //헤더 로딩
  async function loadHeader() {
    try {
      //로딩 관련 함수
      const response = await fetch("header.html");
      const headerContent = await response.text();
      document.getElementById("header-container").innerHTML = headerContent;

      //야랄 맞게 스크립트 로딩 다음 인식을 못해서 그냥 같이 넣어 버림... 헤더 함수 뭣같음
      $(".headerM").on("click", function () {
        $(".tata1").toggleClass("line1");
        $(".tata2").toggleClass("line2");
        $(".bibi").toggleClass("opacity");
        var papa = $(".bibi").css("opacity");
        if (papa == 0) {
          $(".menu_mo").css({
            transform: " translate(0px)",
            transition: "0.5s",
          });
        } else {
          $(".menu_mo").css({
            transform: " translate(150vw)",
            transition: "0.5s",
          });
        }
      });

      //헤더 스크롤 및 호버 관련 함수
      //the scroll func doesn't work any more all that [data-scroll-container] clarified as new LocomotiveScroll in for_gasp.js I knew that I have to solve this conmflict, fuxk!!!!
      $(".header")
        .on(me, function () {
          $(".header").css(bg, tb);
        })
        .on(ml, function () {
          $(".header").css(bg, "rgba(0, 0, 0, 0.062)");
        });
      $(window).scroll(function () {
        winTop = $(this).scrollTop();
        if (winTop > 0) {
          $(".header")
            .css(bg, tb) //unscroll
            .on(me, function () {
              $(".header").css(bg, tb);
            })
            .on(ml, function () {
              $(".header").css(bg, tb);
            });
        } else {
          $(".header")
            .css(bg, ob) //scrolled!
            .on(me, function () {
              $(".header").css(bg, tb);
            })
            .on(ml, function () {
              $(".header").css(bg, ob);
            });
        }
      });
    } catch (error) {
      console.error("Error loading header:", error);
    }
  }

  setInterval(function () {
    let t = $(".snow_zone .snow").length;
    if (t >= 8) {
    }
    let p = [];
    for (i = 0; i < 8; i++) {
      p[i] = Math.random();
      $(".snow_zone").append(` <div class="snow snow${i}"></div>`);
      $(`.snow${i}`)
        .css({
          transform: `scale(${p[i]}) translate(-${p[i] * 20 * p[i]}vw, ${
            p[i] * 100 * p[i - 1]
          }vh) rotate(${p[i] * 120}deg)`,
        })
        .animate({ opacity: "1" }, 2000, function () {
          $(".snow")
            .delay(500)
            .animate({ opacity: "0" }, 2000, function () {
              $(".snow_zone .snow").remove();
            });
        });
    }
  }, 5000);

  const selectTyped = document.querySelector(".typed");
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute("data-typed-items");
    typed_strings = typed_strings.split(",");
    //I Love this guy
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    });
  }
  $(".btn")
    .on("mouseenter", function () {
      var btn2 = $(this).attr("class");
      if (btn2 == "btn btn2") {
        $(this).find("p").css({ color: "white", transition: "1s" });
        //before after 접근방법이 참.....
        $(this).find(".btnp2").addClass("btnsp");
      }
      $(this)
        .find(".btnc")
        .css({ transform: "translate(0px)", transition: "0.5s" });
      $(this)
        .find(".btnp")
        .css({ transform: "rotate(540deg)", transition: "1s linear" });
    })
    .on("mouseleave", function () {
      var btn2 = $(this).attr("class");
      if (btn2 == "btn btn2") {
        $(this).find("p").css({ color: "#f26027", transition: "0.5s" });
      }
      $(this)
        .find(".btnc")
        .css({ transform: "translate(-100%)", transition: "0.5s" });
      $(this)
        .find(".btnp")
        .css({ transform: "rotate(0deg)", transition: "0s" });
    });

  //loading
  const loadingScreen = document.getElementById("loading-screen");
  const progressBarFill = document.getElementById("progress-bar-fill");
  const progressText = document.getElementById("progress-text");
  const bodyElement = document.body; // Directly get the body element

  let loaded = false;

  function updateProgress(percent) {
    progressBarFill.style.width = `${percent}%`;
    progressText.textContent = `Loading... ${percent}%`;
  }

  // Listen for the window's load event (includes all resources)
  window.onload = () => {
    loaded = true;
    checkAndHideLoading();
  };

  function checkAndHideLoading() {
    if (loaded) {
      loadingScreen.style.display = "none";
      bodyElement.style.display = "block";
      bodyElement.style.overflow = ""; // Re-enable scrolling
    }
  }

  // Simulate initial loading progress (Optional)
  let currentProgress = 0;
  const interval = setInterval(() => {
    currentProgress += 6;
    if (currentProgress > 95) currentProgress = 95; // Get closer to 100%
    updateProgress(currentProgress);
    if (loaded) {
      clearInterval(interval);
      updateProgress(100); // Ensure 100% is displayed
      setTimeout(checkAndHideLoading, 300); // Slightly shorter delay
    }
  }, 200); // Update more frequently for smoother visual

  // Initial CSS to hide the body
  bodyElement.style.display = "none";
  // Optionally disable initial scrolling
  bodyElement.style.overflow = "hidden";
});
