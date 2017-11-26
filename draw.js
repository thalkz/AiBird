Draw = {
    clear: function () {
        context.clearRect(0, 0, width, height);
    },
    rect: function (x, y, w, h, col) {
        context.fillStyle = col;
        context.fillRect(x, y, w, h);
    },
    circle: function (x, y, r, col) {
        context.fillStyle = col;
        context.beginPath();
        context.arc(x + 5, y + 5, r, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
    },
    Image: function (img, x, y) {
        context.drawImage(img, x, y);
    },
    Sprite: function (img, srcX, srcY, srcW, srcH, destX, destY, destW, destH, r) {
        context.save();
        context.translate(destX, destY);
        context.rotate(r * (Math.PI / 180));
        context.translate(-(destX + destW / 2), -(destY + destH / 2));
        context.drawImage(img, srcX, srcY, srcW, srcH, destX, destY, destW, destH);
        context.restore();
    },
    semiCircle: function (x, y, r, col) {
        context.fillStyle = col;
        context.beginPath();
        context.arc(x, y, r, 0, Math.PI, false);
        context.closePath();
        context.fill();
    },
    text: function (string, x, y, size, col) {
        context.font = '' + size + 'px sans-serif';
        context.fillStyle = col;
        context.fillText(string, x, y);
    }
};