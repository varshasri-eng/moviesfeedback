let selectedRating = 0;

// Handle star rating
document.addEventListener("DOMContentLoaded", () => {
  const stars = document.querySelectorAll("#stars span");
  stars.forEach(star => {
    star.addEventListener("click", () => {
      selectedRating = parseInt(star.dataset.value);
      stars.forEach(s => s.classList.remove("selected"));
      for (let i = 0; i < selectedRating; i++) {
        stars[i].classList.add("selected");
      }
    });
  });

  // Load feedback
  displayFeedback();

  // Handle feedback submission
  document.getElementById("feedbackForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const movie = document.getElementById("movie").value;
    const comment = document.getElementById("comment").value;
    const email = localStorage.getItem("userEmail") || "Anonymous";

    if (selectedRating === 0) {
      alert("Please select a rating.");
      return;
    }

    const feedback = {
      user: email,
      movie,
      rating: selectedRating,
      comment
    };

    let feedbackList = JSON.parse(localStorage.getItem("feedbackList") || "[]");
    feedbackList.push(feedback);
    localStorage.setItem("feedbackList", JSON.stringify(feedbackList));

    displayFeedback();
    this.reset();
    selectedRating = 0;
    stars.forEach(s => s.classList.remove("selected"));
  });
});

function displayFeedback() {
  const feedbackList = JSON.parse(localStorage.getItem("feedbackList") || "[]");
  const feedbackContainer = document.getElementById("feedbackList");
  feedbackContainer.innerHTML = "";

  feedbackList.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("feedback-item");
    div.innerHTML = `<strong>${item.movie}</strong> - <span class="star">&#9733;</span> ${item.rating}<br>${item.comment}`;
    feedbackContainer.appendChild(div);
  });
}
