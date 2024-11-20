function Setup() {
    // Load all of the localStorage
    saveData.Load();

    // Load custom trail settings from saveData
    mouseTrail.GetSettings();

    // Initialize screens
    GameScreen.InitScreens();
    Pattern.InitDOM();
    GameScreen.Load(screens.mainMenu);

    // Add menu sound effects
    Array.from(document.querySelectorAll(".basicMenuButton")).concat(Array.from(document.querySelectorAll(".hoverButtonSFX"))).forEach(elem => elem.addEventListener("mouseenter", () => {if(!elem.disabled) sounds.NewPlay(sounds.hoverButton, Map(Math.random(), 0, 1, 0.9, 1));}));
    document.querySelectorAll(".patternDiv div").forEach(elem => elem.addEventListener("mouseenter", () => sounds.NewPlay(sounds.locked, Map(Math.random(), 0, 1, 0.9, 1))));

    // Add Safari audio warning
    if(navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome")) document.getElementById("audioNotice").querySelector("p").innerHTML += "<br />Safari does <i>not</i> work well";

    const loadingScreen = document.getElementById("loadingScreen");
    loadingScreen.style.animationPlayState = "running";
    setTimeout(() => loadingScreen.remove(), 300);

    // Start frame loop
    window.requestAnimationFrame(Frame);
}

// Seconds between last frame
let deltaTime;
// Timestamp of previous frame used for deltaTime calculation
let lastFrame = Date.now();
// Current frame number
let frameNum = 0;
function Frame() {
    // Update time counters
    deltaTime = (Date.now() - lastFrame) / 1000;
    lastFrame = Date.now();
    frameNum++

    // Update mouse position variables
    mouse.UpdatePos();

    // Clear visible and collision canvas
    // ctx.clearRect(0, 0, canvas.width, canvas.height); // It's kinda funny how transparency in a custom background image will have a no-draw effect
    collCtx.clearRect(0, 0, collCanvas.width, collCanvas.height);

    // Draw background
    ctx.fillStyle = currentBackground.canvasColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Run any functions such as GameLoop() attatched to current screen
    GameScreen.Tick();

    // Update and draw the mouse trail
    mouseTrail.Tick();

    // Draw the FPS if it's low
    if(1 / deltaTime < 25) {
        ctx.fillStyle = "#ffffff";
        ctx.font = "30px Arial";
        ctx.fillText("FPS: " + Math.round(1 / deltaTime), 0, 30);
    }

    // Call next frame
    window.requestAnimationFrame(Frame);
}

// Run Setup() once DOM has loaded
window.addEventListener("load", Setup);
