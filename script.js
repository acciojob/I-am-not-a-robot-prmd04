document.addEventListener("DOMContentLoaded", () => {
    const imageContainer = document.getElementById("image-container");
    const resetButton = document.getElementById("reset");
    const verifyButton = document.getElementById("verify");
    const para = document.getElementById("para");

    let selectedImages = [];

    // Generate a random integer between min and max (inclusive)
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Fisher-Yates shuffle
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = getRandomInt(0, i);
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Create and render images
    function createImages() {
        const imageClasses = ["img1", "img2", "img3", "img4", "img5"];
        const duplicateClass = imageClasses[getRandomInt(0, imageClasses.length - 1)];
        const allImages = [...imageClasses, duplicateClass];

        shuffleArray(allImages);

        allImages.forEach((imgClass) => {
            const img = document.createElement("img");
            img.className = `tile ${imgClass}`;
            img.src = `https://source-url-for-images.com/${imgClass}.jpg`;
            img.alt = imgClass;

            img.addEventListener("click", () => {
                if (selectedImages.includes(img)) return;

                if (selectedImages.length === 2) {
                    selectedImages.forEach((i) => i.classList.remove("selected"));
                    selectedImages = [];
                }

                img.classList.add("selected");
                selectedImages.push(img);

                if (selectedImages.length === 1) {
                    resetButton.style.display = "block";
                } else if (selectedImages.length === 2) {
                    verifyButton.style.display = "block";
                }
            });

            imageContainer.appendChild(img);
        });
    }

    // Reset game state
    function resetGame() {
        selectedImages.forEach((img) => img.classList.remove("selected"));
        selectedImages = [];
        para.textContent = "";

        verifyButton.style.display = "none";
        resetButton.style.display = "none";
    }

    // Check if selected images are the same class
    function areImagesIdentical() {
        if (selectedImages.length !== 2) return false;

        const class1 = selectedImages[0].classList[1]; // first class after 'tile'
        const class2 = selectedImages[1].classList[1];
        return class1 === class2;
    }

    // Add event listeners
    resetButton.addEventListener("click", resetGame);

    verifyButton.addEventListener("click", () => {
        if (areImagesIdentical()) {
            para.textContent = "You are a human. Congratulations!";
        } else {
            para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
        }

        verifyButton.style.display = "none";
        resetButton.style.display = "block";
    });

    // Initialize
    createImages();
});
