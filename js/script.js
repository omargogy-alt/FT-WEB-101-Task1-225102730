// 1. Day / night button: only adds or removes the class "dark".
// All the colours are in the CSS.
const themeBtn = document.getElementById("theme-btn");

themeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark");
});

// 2. Greeting with the visitor's name. An empty email is rejected.
const form = document.getElementById("contact-form");
const greeting = document.getElementById("greeting");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();

  if (email === "") {
    greeting.textContent = "Please enter your email.";
    return;
  }

  greeting.textContent = "Signal received, " + (name || "stargazer") + "! \u2726 Talk soon.";
  form.reset();
});

// 3. Shooting stars: a new one every 2.5 seconds. Click one to make a wish.
// Only the position is set here. The look is in the CSS.
const sky = document.getElementById("sky");

function showWish(star) {
  const box = star.getBoundingClientRect();
  const wish = document.createElement("span");
  wish.className = "wish";
  wish.textContent = "\u2726 wish made!";
  wish.style.left = box.left + "px";
  wish.style.top = box.top + "px";
  sky.appendChild(wish);
  wish.addEventListener("animationend", function () {
    wish.remove();
  });
}

function launchStar() {
  const star = document.createElement("span");
  star.className = "shooting-star";
  star.style.left = Math.random() * 70 + "vw";
  star.style.top = Math.random() * 40 + "vh";

  star.addEventListener("click", function (event) {
    event.stopPropagation();
    showWish(star);
    star.remove();
  });

  star.addEventListener("animationend", function () {
    star.remove();
  });

  sky.appendChild(star);
}

launchStar();
setInterval(launchStar, 2500);

// 4. Sparkle burst wherever you click.
document.addEventListener("click", function (event) {
  const count = 7;
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count;
    const spark = document.createElement("span");
    spark.className = "spark";
    spark.textContent = "\u2726";
    spark.style.left = event.clientX + "px";
    spark.style.top = event.clientY + "px";
    spark.style.setProperty("--dx", Math.cos(angle) * 50 + "px");
    spark.style.setProperty("--dy", Math.sin(angle) * 50 + "px");
    sky.appendChild(spark);
    spark.addEventListener("animationend", function () {
      spark.remove();
    });
  }
});

// 5. The space doodles drift a little as the mouse moves.
const decor = document.getElementById("decor");

document.addEventListener("mousemove", function (event) {
  const x = (event.clientX / window.innerWidth - 0.5) * 2;
  const y = (event.clientY / window.innerHeight - 0.5) * 2;
  decor.style.setProperty("--mx", x);
  decor.style.setProperty("--my", y);
});

// 6. Click a planet, moon, rocket or UFO and it wiggles.
const playItems = document.querySelectorAll(".play");

playItems.forEach(function (item) {
  item.addEventListener("click", function () {
    item.classList.add("wiggle");
    item.addEventListener("animationend", function () {
      item.classList.remove("wiggle");
    }, { once: true });
  });
});