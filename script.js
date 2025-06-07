//your code here

function shuffleArray(array){
  for(let i=array.length -1;i>0;i--){
    const j = Math.floor(Math.random() * (i+1));

    let temp = array[i];
    array[i] = array[j];
    array[j]=temp;
  }
  return array;
}

// Image class list
const classNames = ["img1", "img2", "img3", "img4", "img5"];
const duplicateClass = classNames[Math.floor(Math.random() * classNames.length)];
const imageClasses = shuffleArray([...classNames, duplicateClass]);

const imageContainer = document.getElementById("image-container");
const resetButton = document.getElementById("reset");
const verifyButton = document.getElementById("verify");
const resultPara = document.getElementById("para");

// Dynamically render images
imageClasses.forEach(className => {
  const img = document.createElement("img");
  img.className = className;
  img.classList.add("tile");
  imageContainer.appendChild(img);
});

// Selection and state
let selectedImages = [];

// Event: Image Click
function handleImageClick(event) {
  const img = event.target;

  if (selectedImages.includes(img)) return;

  if (selectedImages.length === 2) {
    selectedImages.forEach(i => i.classList.remove("selected"));
    selectedImages = [];
  }

  img.classList.add("selected");
  selectedImages.push(img);

  if (selectedImages.length === 1) {
    resetButton.style.display = "block";
  } else if (selectedImages.length === 2) {
    verifyButton.style.display = "block";
  }
}

// Event: Reset
function handleReset() {
  selectedImages.forEach(i => i.classList.remove("selected"));
  selectedImages = [];

  resetButton.style.display = "none";
  verifyButton.style.display = "none";
  resultPara.textContent = "";
}

// Event: Verify
function handleVerify() {
  if (selectedImages.length !== 2) return;

  const [img1, img2] = selectedImages;
  const isIdentical = img1.className === img2.className;

  resultPara.textContent = isIdentical
    ? "You are a human. Congratulations!"
    : "We can't verify you as a human. You selected the non-identical tiles.";

  verifyButton.style.display = "none";
}

// Add image click handlers
const images = document.querySelectorAll(".tile");
images.forEach(img => img.addEventListener("click", handleImageClick));

// Add button handlers
resetButton.addEventListener("click", handleReset);
verifyButton.addEventListener("click", handleVerify);
