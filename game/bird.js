function Bird(id) {
    this.type = 'bird';
    this.id = id;

    this.img = new Image();
    this.img.src = 'img/bird.png';
    this.frame = 0;
    this.spriteX = 0;
    this.spriteY = 0;

    this.width = 34;
    this.height = 24;

    this.y = 130;
    this.x = 48;

    this.velocity = 0;
    this.rotation = 0;

    this.gravity = 0.25;
    this.jump_velocity = -2.6;

    this.make_jump = false;
    this.is_alive = true;

    this.update = function () {

        if (!this.is_alive) {
            return;
        }

        this.velocity += this.gravity;
        this.y += this.velocity;

        if (this.y <= 1) {
            this.y = 1;
        }

        if (this.y >= height - floorHeight) {
            this.y = height - floorHeight;
        }

        this.rotation = Math.min((this.velocity / 10) * 90, 90);

        if (this.make_jump) {
            this.velocity = this.jump_velocity;
            this.make_jump = false;
        }
    };

    this.jump = function() {
        this.make_jump = true;
    }

    this.kill = function() {
        this.is_alive = false;
        birds_alive--;

        genomes[id].fitness = distance;
    }

    this.render = function () {

        if (!this.is_alive) {
            return;
        }

        if (this.frame++ > 5) {
            this.frame = 0;
            if (this.spriteY == this.height * 3) {
                this.spriteY = 0
            }
            this.spriteY += this.height;
        }

        Draw.Sprite(this.img, this.spriteX, this.spriteY, this.width, this.height, this.x, this.y, this.width, this.height, this.rotation);
    }
}
