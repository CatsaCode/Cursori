const saveData = {
    properties: {},

    // Set a saveData property and save it to localStorage
    SetProperty(key, value) {
        this.properties[key] = value;
        window.localStorage.setItem("Cursori", JSON.stringify(this.properties));
    },

    // Get a saveData property from cache
    GetProperty(key) {
        return this.properties[key];
    },

    // Initialize all saveData properties to default values
    Init() {
        // Initialize highscores
        Object.values(difficulties).forEach(elem => {
            const storeName = "highScore" + elem.name;
            this.SetProperty(storeName, "0");
        });
        
        // Initialize selected patterns
        this.SetProperty("backgroundPattern", "0");
        this.SetProperty("pathPattern", "0");
        this.SetProperty("trailPattern", "0");
        // Initialize unlocked patterns
        this.SetProperty("unlockedBackgroundPatterns", "0".repeat(patterns.backgrounds.length));
        this.SetProperty("unlockedPathPatterns", "0".repeat(patterns.paths.length));
        this.SetProperty("unlockedTrailPatterns", "0".repeat(patterns.trails.length));
        // Initialize custom patterns
        this.SetProperty("customBackgroundColor", "#ff00ff");
        this.SetProperty("customPathColor", "#ff00ff");
        this.SetProperty("customTrailColor", "#ff00ff");
        this.SetProperty("customBackgroundImageData", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABHNCSVQICAgIfAhkiAAAAA1JREFUCFtj+M/w/z8ABv4C/pK9xMUAAAAASUVORK5CYII=");
        this.SetProperty("customPathImageData", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABHNCSVQICAgIfAhkiAAAAA1JREFUCFtj+M/w/z8ABv4C/pK9xMUAAAAASUVORK5CYII=");
        this.SetProperty("customTrailImageData", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABHNCSVQICAgIfAhkiAAAAA1JREFUCFtj+M/w/z8ABv4C/pK9xMUAAAAASUVORK5CYII=");
        
        // Initialize custom settings
        this.SetProperty("trailLength", "0.3");
        this.SetProperty("trailWidth", "5");
    },

    // Load localStorage saveData into cache
    Load() {
        // Initialize everything with default values if no data exists
        if(window.localStorage.getItem("Cursori") == null) this.Init();

        // Load localStorage into the properties object
        this.properties = JSON.parse(window.localStorage.getItem("Cursori"));
    }
}