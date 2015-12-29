class Character {
    constructor(settings) {
        this.attack = settings.attack || 100;
        this.defense = settings.defense || 100;
        this.name = settings.name || "none";
        this.imageIndex = settings.imageIndex || 0;
        this.initialTime = settings.initialTime || 10;
        this.timeScale = settings.timeScale || 1.0;
    }
}