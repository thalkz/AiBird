function Species() {
    this.size = 0;
    this.genomes = [];

    this.addGenome = function (g) {
        this.genomes.push(g);
    }

    this.getChampion = function () {
        var max = 0;
        var selected = 0;

        for (var i = 0; i < this.genomes.length; i++) {
            if (this.genomes[i].fitness > max) {
                max = this.genomes[i].fitness;
                selected = i;
            }
        }
        return this.genomes[selected];
    }

    this.getChampionIndex = function () {
        var max = 0;
        var selected = 0;

        for (var i = 0; i < this.genomes.length; i++) {
            if (this.genomes[i].fitness > max) {
                max = this.genomes[i].fitness;
                selected = i;
            }
        }
        return selected;
    }
}