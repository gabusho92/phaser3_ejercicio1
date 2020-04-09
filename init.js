var config = {
    type: Phaser.AUTO,
    width: 400,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var score = 0;
var vel1 = 1;
var vel2 = 2;
var vel3 = 3;
var vel4 = 4;
var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('space', 'assets/space.png');
    this.load.image('ship', 'assets/ship.png');
    this.load.image('meteo1', 'assets/meteo1.png');
    this.load.image('meteo2', 'assets/meteo2.png');
    this.load.image('meteo3', 'assets/meteo3.png');
    this.load.image('meteo4', 'assets/meteo4.png');
}

function create ()
{
    this.add.image(400, 300, 'space');

    player = this.physics.add.sprite(100, 500, 'ship');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);


    meteo1 = this.physics.add.sprite(100, 100, 'meteo1');
    meteo2 = this.physics.add.sprite(200, 200, 'meteo2');
    meteo3 = this.physics.add.sprite(300, 300, 'meteo3');
    meteo4 = this.physics.add.sprite(400, 400, 'meteo4');



    cursors = this.input.keyboard.createCursorKeys();
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#FF5733' });


    this.physics.add.overlap(player, meteo1, hitBomb, null, this);
    this.physics.add.overlap(player, meteo2, hitBomb, null, this);
    this.physics.add.overlap(player, meteo3, hitBomb, null, this);
    this.physics.add.overlap(player, meteo4, hitBomb, null, this);
}

function update ()
{

		moveShip(meteo1, vel1);
		moveShip(meteo2, vel2);
		moveShip(meteo3, vel3);
		moveShip(meteo4, vel4);
	if (cursors.left.isDown)
    {
        player.setVelocityX(-300);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(300);
    }
    else
    {
        player.setVelocityX(0);
    }
}

		function moveShip(ship, speed){
		ship.y +=speed;
		if (ship.y > config.height){
			ship.y = 0;
			ship.x = Phaser.Math.Between(20, config.width - 20);
	    score += 1;
	    scoreText.setText('Score: ' + score);
		}
	}

function hitBomb (player, bomb)
{
    this.physics.pause();
    vel1 = 0;
    vel2 = 0;
    vel3 = 0;
    vel4 = 0;

    player.setTint(0xff0000);
}