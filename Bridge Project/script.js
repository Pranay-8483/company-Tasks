document.addEventListener("DOMContentLoaded", () => {
  const bars = document.querySelectorAll(".progress-fill");

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      bars.forEach(bar => {
        const val = bar.getAttribute("data-percent");
        bar.style.width = val + "%";
        const counter = bar.parentElement.previousElementSibling.querySelector(".percent");
        let i = 0;
        const timer = setInterval(() => {
          if (i >= val) clearInterval(timer);
          else counter.textContent = ++i + "%";
        }, 15);
      });
      observer.disconnect();
    }
  });

  observer.observe(document.querySelector(".fundraising-section"));
});




document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  const speed = 100;

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute("data-target");
      let count = 0;

      const update = () => {
        const increment = Math.ceil(target / speed);
        if (count < target) {
          count += increment;
          counter.innerText = count;
          setTimeout(update, 30);
        } else {
          counter.innerText = target;
        }
      };
      update();
    });
  };

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      animateCounters();
      observer.disconnect();
    }
  });

  observer.observe(document.querySelector(".stats-section"));
});







const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.style.display = "flex";
  } else {
    backToTop.style.display = "none";
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});