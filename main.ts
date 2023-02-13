const switchBtn = document.querySelector(".switch-btn")!;
const resetBtn = document.querySelector(".reset-btn")!;

const cards: NodeListOf<HTMLElement> = document.querySelectorAll(".card");
const timer = document.querySelector(".timer")!;
const images = [
  "bee.png",
  "bee.png",
  "bumblebee.png",
  "bumblebee.png",
  "pineapple.png",
  "pineapple.png",
  "shield_icon.png",
  "shield_icon.png",
  "sushi.png",
  "sushi.png",
  "ufo.png",
  "ufo.png",
];

let checkArr: any[] = [];
let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let time = 0;
let counter = 0;
let innerCounter = 0;

// Switching Background Color
switchBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-body");
  switchBtn.innerHTML =
    switchBtn.innerHTML == '<i class="fa fa-moon-o"></i>'
      ? '<i class="fa fa-sun-o"></i>'
      : '<i class="fa fa-moon-o"></i>';
});

cards.forEach((item) => {
  // Setting Cards Image
  const newNumber = numbers[Math.floor(Math.random() * numbers.length)];
  numbers = numbers.filter((item) => item != newNumber);
  item.innerHTML = `<img src="images/${images[newNumber]}" class="card-img" />`;
});

// Showing Icons On Click
cards.forEach((item, index) => {
  item.addEventListener("click", () => {
    if (item.style.transform != "rotateY(180deg)") {
      const cardImages = document.querySelectorAll(".card-img");

      // Changing Card
      item.style.transform = "rotateY(180deg)";
      item.style.backgroundImage = "linear-gradient(45deg, #3f3faf, #9f9fff)";

      cardImages[index].classList.add("visible");
      checkArr.push(item);

      // Counting
      counter++;

      setTimeout(CheckCards, 800);

      function CheckCards() {
        if (counter >= 2) {
          if (checkArr[0].innerHTML == checkArr[1].innerHTML) {
            checkArr[0].style.display = "none";
            checkArr[1].style.display = "none";
            innerCounter++;
            if (innerCounter === 5) {
              alert("Congratulation, You Win!");
              ResetGame();
            }
          }
          checkArr.forEach((item) => {
            item.style.transform = "rotate(0deg)";
            item.style.backgroundImage =
              "linear-gradient(135deg, #f8f9fa, #95ebef)";
          });
          cardImages.forEach((item) => item.classList.remove("visible"));

          counter = 0;
          checkArr = [];
        }
      }
    }
  });
});

// Reseting Game
function ResetGame() {
  numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  time = 0;
  innerCounter = 0;
  counter = 0;

  cards.forEach((item) => {
    const newNumber = numbers[Math.floor(Math.random() * numbers.length)];
    numbers = numbers.filter((item) => item != newNumber);
    item.innerHTML = `<img src="images/${images[newNumber]}" class="card-img" />`;
  });

  cards.forEach((item) => {
    item.style.display = "grid";
    item.style.transform = "rotate(0deg)";
    item.style.backgroundImage = "linear-gradient(135deg, #f8f9fa, #95ebef)";
  });
}

resetBtn.addEventListener("click", ResetGame);

// Timer
function Timer() {
  time += 0.01;
  timer.innerHTML = time.toFixed(2).toString();
}

// Start Timer
setInterval(Timer, 10);
