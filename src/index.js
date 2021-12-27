import "./index.css";
import innerHouse1 from "../img/innerHouse1.jpg";
import innerHouse2 from "../img/innerHouse2.jpg";
import innerHouse3 from "../img/innerHouse3.jpg";
import innerHouse4 from "../img/innerHouse4.jpg";
import innerHouse5 from "../img/innerHouse5.jpg";
import searchIcon from "../img/searchIcon.png";
import esliteLogo from "../img/eslite-logo.png";

// animation.css 涵式
const animateCSS = (element, animation, prefix = "animate__") =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });
//改變幻燈片
let slideLen = $(".slide").length;
function changeSlide(i) {
  for (let j = 0; j < slideLen; j++) {
    $(".slide").eq(j).fadeOut(1000);
    $(".dot").eq(j).removeClass("active");
  }
  $(".slide").eq(i).fadeIn(1000);
  $(".dot").eq(i).addClass("active");
}
//自動撥放幻燈片
let k = -1;
var timer;

function autoChangeSlide() {
  k += 1;
  if (k >= slideLen) k = 0;
  changeSlide(k);
  //要用全域變數宣告timer
  timer = setTimeout("autoChangeSlide()", 3000);
}
window.autoChangeSlide = autoChangeSlide;

$(document).ready(function () {
  autoChangeSlide();
  console.log("ready");
});

//點擊dot切換幻燈片
$(".dots").on("click", ".dot", function () {
  let whichDot = $(".dot").index(this);
  changeSlide(whichDot);
  k = whichDot;
  //先把計時器中斷再重新呼叫
  clearTimeout(timer);
  timer = setTimeout("autoChangeSlide()", 3000);
});
//開啟菜單轉換hamburger icon & menu出現
$("#hamburgerIcon").on("click", "#menuIcon", function () {
  $("#topHeader").removeClass("sticky-top");
  $(this).stop().fadeOut(500);
  $(".mask").stop().fadeIn(1000).css("display", "flex");
  $("#closeIcon")
    .stop()
    .removeClass("animate__rotateOut")
    .addClass("animate__rotateIn");
  animateCSS("#closeIcon", "rotateIn");
});
//關閉菜單轉換hamburger icon & menu消失
$(".menu").on("click", "#closeIcon", function () {
  $(".mask").stop().fadeOut(1000);
  $("#closeIcon").stop().addClass("animate__rotateOut");
  animateCSS("#closeIcon", "rotateOut");
  $("#topHeader").addClass("sticky-top");
  $("#menuIcon").stop().fadeIn(800);
});
//點擊搜尋出現搜尋頁
$("#searchIcon").click(function () {
  $(".search-wrap")
    .addClass("animate__animated animate__fadeInUpBig")
    .css("display", "flex");
  $("#closeSearchIcon").addClass("animate__animated animate__rotateIn");
  animateCSS(".search-wrap", "fadeInUpBig"); //自動移除動畫class
  animateCSS("#closeSearchIcon", "rotateIn");
});
//點擊搜尋頁的關閉鈕
$("#closeSearchIcon").click(function () {
  $(".search-wrap").addClass("animate__animated animate__fadeOutDownBig");
  animateCSS(".search-wrap", "fadeOutDownBig").then((message) => {
    $(".search-wrap").css("display", "none");
  });
});
//點擊arrow down頁面下移
let headerHeight = $(window).innerHeight(); //100vh
$(window).resize(function () {
  headerHeight = $(window).height();
});
$("#arrowDown").click(function () {
  $("html, body").animate(
    {
      scrollTop: headerHeight,
    },
    700
  );
});
//頁面滾動下滑時headertop動畫
$(window).scroll(function () {
  let scrollTop = $(window).scrollTop();
  if (scrollTop > 0) {
    $("#topHeader").addClass(
      "animate__animated  animate__fadeInDown top-header-active"
    );
    $(".rightIcon").addClass("rightIcon-active");
  } else {
    $("#topHeader").removeClass(
      "animate__animated  animate__fadeInDown top-header-active"
    );
    $(".rightIcon").removeClass("rightIcon-active");
  }
});

//最新消息hover效果
$(".post-wrapper").mouseenter(function () {
  $(this).find("div").find("img").addClass("onhover");
  // $(this).find("div").find("img").css("transform", "scale(1.2");
});
$(".post-wrapper").mouseleave(function () {
  $(this).find("div").find("img").removeClass("onhover");
});

//lazy loading
let option_lazyload = {
  root: null,
  rootMargin: "0px",
  threshold: [0],
};
const watcher = new IntersectionObserver(onEnterView, option_lazyload); //callback:當target進入window範圍時要做什麼
const lazyimgs = $(".ll-img-box");
for (let imgBox of lazyimgs) {
  watcher.observe(imgBox);
}
function onEnterView(entries, observer) {
  for (let entry of entries) {
    if (entry.isIntersecting) {
      let img = entry.target.childNodes[1];
      img.setAttribute("src", img.dataset.src);
      img.classList.add(img.dataset.animate);
      let mask = entry.target.childNodes[3];
      mask.classList.add(img.dataset.animate);
      img.removeAttribute("data-src");
      observer.unobserve(entry.target);
    }
  }
}
