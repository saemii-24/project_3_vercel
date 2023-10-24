const header = document.querySelector("header");
$(function () {
  $(".menu-trigger").click(function (event) {
    $(this).toggleClass("active");
    $("#menu_wrap").slideToggle();
    if (header.style.position === "fixed") {
      header.style.position = "absolute";
      event.preventDefault();
    } else {
      header.style.position = "fixed";
    }
  });

  $(".menu_main>ul>li>a").hover(
    function () {
      if ($(this).hasClass("fixed") === false) {
        $(this).addClass("animate").siblings().removeClass("animate");
      }
    },
    function () {
      $(".menu_main>ul>li>a").removeClass("animate");
    }
  );
});

let windowSize = window.innerWidth;

window.addEventListener("resize", function () {
  windowSize = window.innerWidth;
  natural();
  city();
});

/*city*/
city();
function city() {
  const cityBoxes = document.querySelectorAll(".city__box");
  if (windowSize <= 769) {
    cityBoxes.forEach((cityBox) => {
      cityBox.classList.remove("to-left");
      cityBox.classList.remove("to-right");
      cityBox.classList.add("to-top");
    });
  } else {
  }
}

/*natural*/
natural();
function natural() {
  const naturalBoxs = document.querySelectorAll(".natural-ani-js");
  if (windowSize <= 769) {
    naturalBoxs.forEach((naturalBox) => {
      naturalBox.classList.remove("to-top");
      naturalBox.classList.add("to-left");
    });
  } else {
    naturalBoxs.forEach((naturalBox) => {
      naturalBox.classList.remove("to-left");
      naturalBox.classList.add("to-top");
    });
  }
}

/*district*/
//스크롤에 따라 내려가거나 올라가는 애니메이션
const bg = document.querySelector(".district__bg");
let bgHeight = bg.clientHeight;
let bgTop = window.scrollY + bg.getBoundingClientRect().top - bgHeight; //요소 TOP scroll위치

const food = document.querySelector(".food__show");
const foodBoxes = document.querySelectorAll(".food__content");
let foodHeight = food.clientHeight;
let foodTop = window.scrollY + food.getBoundingClientRect().top - foodHeight;

let scrollHeight = 0;

function district() {
  window.addEventListener("scroll", () => {
    scrollHeight = window.scrollY;
    imageMove(bgTop, bgHeight, bg, 100, 30);

    foodBoxes.forEach((foodBox) => {
      imageMove(foodTop, foodHeight, foodBox, 100, 500);
    });
  });
}
district();

function imageMove(elTop, elHeight, el, ifPCsize, ifOthersize) {
  if (windowSize <= 1200) {
    let move = (scrollHeight - elTop) / 50;
    if (move < elHeight) {
      el.style.backgroundPosition = `center ${-ifPCsize + move}px`;
    } else if (move > elHeight) {
      el.style.backgroundPosition = `center ${-ifPCsize + move}px`;
    }
  } else {
    let move = (scrollHeight - elTop) / 50;
    if (move < elHeight) {
      el.style.backgroundPosition = `center ${-ifOthersize + move}px`;
    } else if (move > elHeight) {
      el.style.backgroundPosition = `center ${-ifOthersize + move}px`;
    }
  }
}

function coverBgSize(el) {
  //html 요소 사이즈를 가져온다.
  // console.log(el);
  const elWidth = el.offsetWidth;
  const elHeight = el.offsetHeight;
  // console.log(elWidth);

  //해당 요소에 포함 된 background img url값만 가져온다
  const elBgImg = getComputedStyle(el)
    .getPropertyValue("background-image")
    .replace('url("', "")
    .replace('")', "");
  // console.log(elBgImg);

  //img url의 실제 사이즈를 가져온다.
  const elBg = new Image();
  elBg.src = elBgImg;
  const elBgWidth = elBg.width;
  const elBgHeight = elBg.height;

  ///컨테이너와 이미지 사이즈를 이용해 기준을 설정

  let stand = elWidth / elBgWidth;

  if (elWidth / elBgWidth > elHeight / elBgHeight) {
    stand = elWidth / elBgWidth;
  } else {
    stand = elHeight / elBgHeight;
  }

  let nowWidth = elBgWidth * stand;
  let nowHeight = elBgHeight * stand;

  return { nowWidth: nowWidth, nowHeight: nowHeight };
}

/*호주 즐길거리 hover 애니메이션*/
//창 사이즈 변경될때마다 실행
window.addEventListener("resize", function () {
  hoverAnimation(recommendThings);
  hoverAnimation(naturalThings);
  hoverAnimation(cityThings);
  hoverAnimation(foodTypes);
});

const recommendThings = document.querySelectorAll(".swiper-slide");
const naturalThings = document.querySelectorAll(".natural__box--picture");
const cityThings = document.querySelectorAll(".city__box");
const foodTypes = document.querySelectorAll(".food__type");

//실행되면 바로 실행
window.onload = function () {
  hoverAnimation(recommendThings);
  hoverAnimation(naturalThings);
  hoverAnimation(cityThings);
  hoverAnimation(foodTypes);
};

function hoverAnimation(els) {
  els.forEach((el) => {
    let size = coverBgSize(el);
    let size_width = size["nowWidth"];
    let size_height = size["nowHeight"];
    el.style.backgroundSize = `${size_width}px ${size_height}px`;

    el.addEventListener("mouseover", function () {
      el.style.backgroundSize = `${size_width * 1.05}px ${
        size_height * 1.05
      }px`;
    });
    el.addEventListener("mouseleave", function () {
      el.style.backgroundSize = `${size_width}px ${size_height}px`;
    });
  });
}

/*food*/
/*음식 미리보기 사진을 클릭하면 음식 설명이 바뀐다*/
/*현재 보여지고 있는 사진을 표시해준다.*/
function foodImgChange() {
  //음식 설명 변경
  const foodTypes = document.querySelectorAll(".food__type");
  const foodContents = document.querySelectorAll(".food__content");

  foodTypes.forEach(function (foodType, index) {
    if (index === 0) {
      foodType.classList.add("active");
    }
    foodType.addEventListener("click", function (event) {
      foodTypes.forEach((foodType) => {
        foodType.classList.remove("active");
      });
      event.target.classList.add("active");
      foodContents.forEach((foodContent) => {
        foodContent.classList.remove("active");
      });
      foodContents[index].classList.add("active");
    });
  });
}
foodImgChange();

/*district*/
/*지도를 클릭하면 그 주의 정보를 불러온다.*/
const districtMap = document.querySelectorAll(".district__map--js");
const districtInfo = document.querySelectorAll(".district__info--js");
const districtInfoContent = [
  [
    "태즈메이니아",
    "Tasmania",
    "호바트",
    "2,296,411명",
    "90,758 km²",
    "	UTC+10 / 서머타임 시행",
  ],
  [
    "웨스턴 오스트레일리아",
    "Western Australia",
    "퍼스",
    "2,296,411명",
    "2,645,615km²",
    "UTC +8 / UTC+8:45",
  ],
  [
    "사우스 오스트레일리아",
    "South Australia",
    "애들레이드",
    "1,514,337명",
    "1,043,514 km²",
    "UTC+9:30 / 서머타임 시행",
  ],
  [
    "퀸즐랜드",
    "Queensland",
    "브리즈번",
    "4,907,600명",
    "1,852,642 km²",
    "UTC+10",
  ],
  [
    "빅토리아",
    "Victoria",
    "멜버른",
    "5,713,000명",
    "237,629 km²",
    "UTC+10 / 서머타임 시행",
  ],
  [
    "뉴사우스웨일스",
    "New South Wales",
    "시드니",
    "6,889,100 명",
    "809,444 km²",
    "UTC+10 / 서머타임 시행",
  ],
];

districtMap.forEach((district, index) => {
  district.addEventListener("click", (event) => {
    districtMap.forEach((district) => {
      district.classList.remove("active");
    });
    event.target.classList.add("active");

    console.log(districtInfoContent[index]);
    for (key in districtInfoContent[index]) {
      districtInfo[key].innerText = districtInfoContent[index][key];
    }
  });
});

/*weatehr__bg*/
/*비디오가 끝나도 자연스럽게 fadein으로 연결시킨다.*/
/*추가 확인 필요!*/

let weatherVideoFirst = document.getElementById("weather__bg--js--first");
let weatherVideoSecond = document.getElementById("weather__bg--js--second");

videoLoad();
function videoLoad() {
  weatherVideoFirst.onloadedmetadata = function () {
    // weatherVideoSecond.pause();
    let videoFirstPlay = true;

    function videoIntervalPlay() {
      if (videoFirstPlay) {
        weatherVideoFirst.style.opacity = 1;
        weatherVideoFirst.play();
        setTimeout(() => {
          weatherVideoSecond.pause();
          weatherVideoSecond.currentTime = 0;
        }, 1000);
        videoFirstPlay = false;
      } else {
        weatherVideoFirst.style.opacity = 0;
        weatherVideoSecond.play();
        setTimeout(() => {
          weatherVideoFirst.pause();
          weatherVideoFirst.currentTime = 0;
        }, 1000);
        videoFirstPlay = true;
      }
    }
    videoIntervalPlay();
    setInterval(videoIntervalPlay, 20000);
  };
}

/*swiper js*/
function myPlugin({ swiper, extendParams, on }) {
  extendParams({
    debugger: false,
  });

  on("init", () => {
    if (!swiper.params.debugger) return;
    console.log("init");
  });
  on("click", (swiper, e) => {
    if (!swiper.params.debugger) return;
    console.log("click");
  });
  on("tap", (swiper, e) => {
    if (!swiper.params.debugger) return;
    console.log("tap");
  });
  on("doubleTap", (swiper, e) => {
    if (!swiper.params.debugger) return;
    console.log("doubleTap");
  });
  on("sliderMove", (swiper, e) => {
    if (!swiper.params.debugger) return;
    console.log("sliderMove");
  });
  on("slideChange", () => {
    if (!swiper.params.debugger) return;
    console.log("slideChange", swiper.previousIndex, "->", swiper.activeIndex);
  });
  on("slideChangeTransitionStart", () => {
    if (!swiper.params.debugger) return;
    console.log("slideChangeTransitionStart");
  });
  on("slideChangeTransitionEnd", () => {
    if (!swiper.params.debugger) return;
    console.log("slideChangeTransitionEnd");
  });
  on("transitionStart", () => {
    if (!swiper.params.debugger) return;
    console.log("transitionStart");
  });
  on("transitionEnd", () => {
    if (!swiper.params.debugger) return;
    console.log("transitionEnd");
  });
  on("fromEdge", () => {
    if (!swiper.params.debugger) return;
    console.log("fromEdge");
  });
  on("reachBeginning", () => {
    if (!swiper.params.debugger) return;
    console.log("reachBeginning");
  });
  on("reachEnd", () => {
    if (!swiper.params.debugger) return;
    console.log("reachEnd");
  });
}

function windowSizeSwiper() {
  let windowSize = window.innerWidth;
  if (windowSize <= 769) {
    let swiper = new Swiper(".mySwiper", {
      slidesPerView: 3,
      centeredSlides: true,
      spaceBetween: 20,
      grabCursor: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      // Enable debugger
      debugger: true,
      pagination: {
        el: ".swiper-pagination",
        type: "progressbar",
      },
    });
  } else {
    let swiper = new Swiper(".mySwiper", {
      slidesPerView: 4,
      centeredSlides: true,
      spaceBetween: 20,
      grabCursor: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      // Enable debugger
      debugger: true,
      pagination: {
        el: ".swiper-pagination",
        type: "progressbar",
      },
    });
  }
}
windowSizeSwiper();

/*intersectionObserver animation*/
/*각 요소가 화면에 등장할 때 적용할 애니메이션을 작성한다.*/
let observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("back-origin");
      }
    });
  },
  { threshold: 0.5 }
);

const toTopEls = document.querySelectorAll(".to-top");
toTopEls.forEach((toTopEl) => observer.observe(toTopEl));

const toLeftEls = document.querySelectorAll(".to-left");
toLeftEls.forEach((toLeftEl) => observer.observe(toLeftEl));

const toRightEls = document.querySelectorAll(".to-right");
toRightEls.forEach((toRightEl) => observer.observe(toRightEl));

const toChargeEls = document.querySelectorAll(".to-charge");
toChargeEls.forEach((toChargeEl) => observer.observe(toChargeEl));

const opacityChanges = document.querySelectorAll(".opacityChange");
opacityChanges.forEach((opacityChange) => observer.observe(opacityChange));

const mainTitle = document.querySelector(".main__title");
const sentence = [
  ["하버", "브리지에서", "바라보는", "붉게", "물든", "시드니"],
  ["태양과", "만나", "일곱", "가지", "색으로", "빛나는", "바위산"],
  ["호주에서", "살고", "있는", "동물들과의", "특별한", "만남"],
  ["남극해의", "시원한", "바람을", "맞으며", "떠나는", "드라이브"],
  ["크루즈를", "타고", "만나는", "장난기", "가득한", "돌고래"],
  ["푸른", "바다", "위", "파도를", "가르며", "즐기는", "서핑"],
];

let sentenceNum = 0;
let wordNum = 0;
let startTime = 0;
let callBackTime = 0;
const gageBar = document.getElementById("main__bar--gage");
$(".main__bg>div:gt(0)").hide(); //fadeIn Out animation

function oneSentence() {
  gageBar.classList.add("gageBar");
  let span = document.createElement("span");
  span.textContent = `
      ${sentence[sentenceNum][wordNum]}
      `;
  mainTitle.append(span);

  // 한 문장의 모든 단어를 출력하면 애니메이션 종료
  if (wordNum === sentence[sentenceNum].length - 1) {
    clearTimeout(oneSentence);
    mainTitle.classList.add("fadeOut");
    mainTitle.style.animationDelay = `${
      5 - sentence[sentenceNum].length * 0.3
    }s`;
    wordNum = 0;

    setTimeout(() => {
      // 첫 애니메이션 총 시간 5초가 지난 후 다음 문장 애니메이션 시작
      mainTitle.textContent = "";
      sentenceNum++;

      if (sentenceNum === sentence.length) {
        sentenceNum = 0;
      }

      oneSentence();

      gageBar.classList.remove("gageBar");
      mainTitle.classList.remove("fadeOut");
      $(".main__bg>div:first-child")
        .fadeOut(1000)
        .next("div")
        .fadeIn(1000)
        .end()
        .appendTo(".main__bg");
    }, 5000 - (sentence[sentenceNum].length - 1) * 300);
  } else {
    wordNum++;
    setTimeout(oneSentence, 300);
  }
}

oneSentence();

const sydneyTimeZone = "Australia/Sydney";
const melbourneTimeZone = "Australia/Melbourne";
const brisbaneTimeZone = "Australia/Brisbane";

function putAustraliaTime(cityTimeZone) {
  function timeUpDate() {
    //도시 시간대(기본정보) 불러오기
    let cityTime = luxon.DateTime.now().setZone(cityTimeZone);
    // console.log(cityTime);
    let cityTimeNow = cityTime.toFormat("HH:mm:ss");
    let putTime = document.getElementById("time__now--australia");
    putTime.innerText = cityTimeNow;

    //오전 오후 확인
    let cityHour = cityTime.toFormat("HH");
    // console.log(cityHour);
    let putCityHour = document.getElementById("time__merdiem--australia");
    if (cityHour >= 0 && cityHour < 12) {
      putCityHour.innerText = "오전";
    } else {
      putCityHour.innerText = "오후";
    }

    //날짜 확인
    let cityDate = cityTime.toFormat("yyyy.LL.dd.");
    let putCityDate = document.querySelector("#today__now--australia");
    putCityDate.innerText = cityDate;
    // console.log(cityDate);

    //요일 확인
    let cityDay = cityTime.toFormat("c");
    const putCityDay = document.getElementById("today__day--australia");
    //luxon은 월요일 = 1, 일요일 = 7
    switch (cityDay) {
      case "1":
        cityDay = "월요일";
        break;
      case "2":
        cityDay = "화요일";
        break;
      case "3":
        cityDay = "수요일";
        break;
      case "4":
        cityDay = "목요일";
        break;
      case "5":
        cityDay = "금요일";
        break;
      case "6":
        cityDay = "토요일";
        break;
      case "7":
        cityDay = "일요일";
        break;
    }
    putCityDay.innerText = cityDay;

    /*DST 시행 확인*/
    const isCityDST = luxon.DateTime.now().setZone(cityTimeZone).isInDST;
    const putIsCityDST = document.getElementById("weather__summertime--dtc");

    if (isCityDST) {
      putIsCityDST.innerText = "sunny";
    } else {
      putIsCityDST.innerText = "";
    }
    setTimeout(timeUpDate, 200);
  }
  timeUpDate();
}

/*날씨정보 알아오기*/

//날씨별 아이콘 이름
async function weather(city) {
  await fetch(`/api/serverless?city=${city}`, {
    method: "POST",
    body: JSON.stringify({ city: city }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      //나라 판별
      let country = data["sys"]["country"];
      switch (country) {
        case "KR":
          country = "korea";
          break;
        case "AU":
          country = "australia";
          break;
      }
      // console.log(country);

      //도시 판별
      let city = data["name"];
      let putCity = document.getElementById(`weather__city--${country}`);
      switch (city) {
        case "Sydney":
          city = "시드니";
          break;
        case "Melbourne":
          city = "멜버른";
          break;
        case "Brisbane":
          city = "브리즈번";
          break;
        case "Seoul":
          city = "서울";
          break;
      }
      putCity.innerText = city;

      //날씨 판별
      let weatherIcon = data["weather"][0]["icon"];
      // console.log(weatherIcon);
      let putIcon = document.querySelector(`.weather__icon--${country}`);

      //날씨 아이콘 선택
      let iconName = "clear_day";
      if (weatherIcon === "01d" || weatherIcon === "01n") {
        iconName = "clear_day";
      } else if (weatherIcon === "02d" || weatherIcon === "02n") {
        iconName = "partly_cloudy_day";
      } else if (weatherIcon === "03d" || weatherIcon === "03n") {
        iconName = "cloud";
      } else if (weatherIcon === "04d" || weatherIcon === "04n") {
        iconName = "cloud";
      } else if (weatherIcon === "09d" || weatherIcon === "09n") {
        iconName = "rainy_light";
      } else if (weatherIcon === "10d" || weatherIcon === "10n") {
        iconName = "rainy";
      } else if (weatherIcon === "11d" || weatherIcon === "11n") {
        iconName = "thunderstorm";
      } else if (weatherIcon === "13d" || weatherIcon === "13n") {
        iconName = "ac_unit";
      } else if (weatherIcon === "50d" || weatherIcon === "50n") {
        iconName = "foggy";
      }
      putIcon.innerText = iconName;
      // console.log(putIcon);

      //온도 넣기
      let temp = data["main"]["temp"].toFixed(1);
      let putTemp = document.getElementById(`weather__now--${country}`);
      putTemp.innerText = temp;
    })
    .catch((error) => {
      console.error("오류가 발생했습니다. 기본값이 출력됩니다.");

      document.querySelector(".weather__error").innerText =
        "현재 기본값이 출력 중입니다.";

      //default값 (20도, 맑음 출력)
      const defaultWeather = document.querySelectorAll(".weather__now");
      const defaultWeatherIcon = document.querySelectorAll(
        ".weather__icon--now"
      );
      const defaultBtnWeather = document.querySelectorAll(
        ".btn__blur--weather"
      );
      const defaultCity = document.querySelector("#weather__city--australia");

      defaultWeather.forEach((weather) => {
        weather.innerText = "20.0";
      });
      defaultWeatherIcon.forEach((weatherIcon) => {
        weatherIcon.innerText = "sunny";
      });

      defaultBtnWeather.forEach((btn) => {
        btn.addEventListener("click", (event) => {
          defaultCity.innerText = event.target.innerText;
        });
      });
    });
}

const sydneyBtn = document.getElementById("btn__blur--sydney");
const melbourneBtn = document.getElementById("btn__blur--melbourne");
const brisbaneBtn = document.getElementById("btn__blur--brisbane");
const btnAll = document.querySelectorAll(".btn__blur--weather");

//기본 한 번 호출
let firstCall = putAustraliaTime(sydneyTimeZone);
weather("seoul");
weather("sydney");

//버튼 호출
const putAusTime = document.getElementById("time__now--australia");
sydneyBtn.addEventListener("click", (event) => {
  putAusTime.innerText = "";
  putAustraliaTime(sydneyTimeZone);
  weather("Sydney, AU");
  btnAll.forEach((btn) => {
    btn.classList.remove("active");
  });
  event.target.classList.add("active");
});
melbourneBtn.addEventListener("click", (event) => {
  putAusTime.innerText = "";
  putAustraliaTime(melbourneTimeZone);
  weather("Melbourne, AU");
  btnAll.forEach((btn) => {
    btn.classList.remove("active");
  });
  event.target.classList.add("active");
});
brisbaneBtn.addEventListener("click", (event) => {
  putAusTime.innerText = "";
  putAustraliaTime(brisbaneTimeZone);
  weather("Brisbane, AU");
  btnAll.forEach((btn) => {
    btn.classList.remove("active");
  });
  event.target.classList.add("active");
});

/*시간 계산하기*/
//한국 시간 계산하기
function koreaTime() {
  let koreaDate = new Date();
  let year = koreaDate.getFullYear();
  let month = koreaDate.getMonth() + 1;
  let date = koreaDate.getDate();
  let day = koreaDate.getDay();
  let hour = koreaDate.getHours();

  //요일 판별
  switch (day) {
    case 0:
      day = "일요일";
      break;
    case 1:
      day = "월요일";
      break;
    case 2:
      day = "화요일";
      break;
    case 3:
      day = "수요일";
      break;
    case 4:
      day = "목요일";
      break;
    case 5:
      day = "금요일";
      break;
    case 6:
      day = "토요일";
      break;
  }

  //포맷맞추기
  let dateFormat = `${year}.${month >= 10 ? month : "0" + month}.${
    date >= 10 ? date : "0" + date
  }.`;
  document.getElementById("today__now--korea").innerText = dateFormat;
  document.getElementById("today__day--korea").innerText = day;

  //시간 구하기
  let timeFormat = new Date().toTimeString().split(" ")[0];
  document.getElementById("time__now--korea").innerText = timeFormat;

  //오전 오후 확인
  let putHour = document.getElementById("time__merdiem--korea");
  if (putHour >= 0 && putHour < 12) {
    putHour.innerText = "오전";
  } else {
    putHour.innerText = "오후";
  }

  setTimeout(koreaTime, 200);
}
koreaTime();
