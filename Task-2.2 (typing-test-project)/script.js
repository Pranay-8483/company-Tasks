let timer = 0;
let interval = null;
let started = false;


(function () {
  emailjs.init("QcV1Kiv-E_ZXpHToi"); 
})();


const sampleText = document.getElementById("sample-text").innerText;
const typingBox = document.getElementById("typing-box");
const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const statusEl = document.getElementById("status");


document.getElementById("start-btn").onclick = () => {
  if (started) return;

  started = true;
  timer = 0;
  typingBox.value = "";
  typingBox.disabled = false;
  typingBox.focus();

  interval = setInterval(() => {
    timer++;
    timeEl.innerText = timer + "s";
    updateStats();
  }, 1000);
};


document.getElementById("stop-btn").onclick = () => {
  clearInterval(interval);
  started = false;
  typingBox.disabled = true;
};


document.getElementById("reset-btn").onclick = () => {
  clearInterval(interval);
  timer = 0;
  started = false;
  typingBox.value = "";
  typingBox.disabled = true;
  timeEl.innerText = "0s";
  wpmEl.innerText = "0";
  accuracyEl.innerText = "0%";
  statusEl.innerText = "";
};


function updateStats() {
  const typedText = typingBox.value;
  const words = typedText.trim().split(/\s+/).filter(Boolean).length;
  const wpm = timer > 0 ? Math.round((words / timer) * 60) : 0;

  let correctChars = 0;
  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === sampleText[i]) correctChars++;
  }

  const accuracy = typedText.length
    ? Math.round((correctChars / typedText.length) * 100)
    : 0;

  wpmEl.innerText = wpm;
  accuracyEl.innerText = accuracy + "%";
}


document.getElementById("email-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const userName = document.getElementById("username").value;
  const userEmail = document.getElementById("useremail").value;

  const templateParams = {
    
    to_email: `${userEmail},vankadari.pranaykumar@gmail.com`,
    user_name: userName,

    result_wpm: wpmEl.innerText,
    result_accuracy: accuracyEl.innerText,
    result_time: timeEl.innerText,

    sample_text: sampleText,
    typed_text: typingBox.value
  };

 emailjs.send(
  "service_pxvyd0a",   
  "template_lo71kbe",
  templateParams
)

    .then(() => {
      statusEl.innerText = "✅ Result sent to user & developer email!";
      statusEl.style.color = "green";
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
      statusEl.innerText = "❌ Error: " + error.text;
      statusEl.style.color = "red";
    });
});

