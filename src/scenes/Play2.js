class Play2 extends Phaser.Scene {
    constructor() {
        super("2Scene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('piggy2', './assets/piggybank.png');
        //this.load.image('piggy2', './assets/piggybank2.png');
        //this.load.image('money', './assets/money.gif');
       // this.load.image('bank', './assets/bank.png');
        
        // load spritesheet
        this.load.spritesheet('money2', './assets/money.png', {frameWidth: 61, frameHeight: 39, startFrame: 0, endFrame: 9});
        this.load.spritesheet('explosion2', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.spritesheet('bank2', './assets/Backbank.png',  {frameWidth: 640, frameHeight: 480, startFrame: 0, endFrame: 3});
        this.load.spritesheet('coin2', './assets/Coin.png', {frameWidth: 50, frameHeight: 50, startFrame: 0, endFrame: 5}); 
    }

    create() { 
        // place tile sprite
        //this.bank = this.add.tileSprite(0, 0, 640, 480, 'bank').setOrigin(0, 0);

        /* white rectangle borders
        this.add.rectangle(5, 5, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 443, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(603, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
 
        // green UI background
        this.add.rectangle(37, 42, 566, 64, 0xFACADE).setOrigin(0, 0);
        */

        //const money = this.add.sprite(200, 200, 'money', 0);
        const bank2 = this.add.sprite(0, 0, 'bank2', 0).setOrigin(0, 0);
        
     

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2 - 8, 431, 'piggy2').setScale(1, 1).setOrigin(0, 0);
    
        //this.p2Rocket = new Rocket2(this, game.config.width/2 + 8, 431, 'piggy2').setScale(1, 1).setOrigin(0, 0);
    
       

        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + 192, 132, 'money2', 0, 10, Math.random() * (5-4) + 4).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + 96, 196, 'money2', 0, 10,  Math.random() * (4-3) +3).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, 260, 'coin2', 0, 5, Math.random() * (3-1) + 1).setScale(0.8, 0.8);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
       

        // animation config
        this.anims.create({
            key: 'explode2',
            frames: this.anims.generateFrameNumbers('explosion2', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        
        this.anims.create({
            key: 'money2',
            frames: this.anims.generateFrameNumbers('money2', {start: 0, end: 7, first: 0}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'bank2',
            frames: this.anims.generateFrameNumbers('bank2', {start: 0, end: 3, first: 0}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'coin2',
            frames: this.anims.generateFrameNumbers('coin2', {start: 0, end: 5, first: 0}),
            frameRate: 10,
            repeat: -1
        });

        bank.play('bank2');

        //play money animation
        this.ship01.play('money2');
        this.ship02.play('money2');
        this.ship03.play('coin2');
        

        
        

        // player 1 score
        this.p1Score = 0;
       // this.p2Score = 0;

        // score display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '24px',
            backgroundColor: '#FACADE',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 60
        }
        
        this.scoreLeft = this.add.text(220, 44, '$' + this.p1Score, scoreConfig);
        //this.scoreRight = this.add.text(320, 44, '$' + this.p2Score, scoreConfig2);

        // game over flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            
            this.add.text(game.config.width/2, game.config.height/2 + 64, "Press F to Restart", scoreConfig).setOrigin(0.5);
            

            this.gameOver = true;
        }, null, this);
    }

    

    update() {

        
        // check key input for restart / menu
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

       // this.bank.tilePositionX -= 4;  // scroll tile sprite
        if (!this.gameOver) {               
            this.p1Rocket.update();         // update rocket sprite
           // this.p2Rocket.update();
            this.ship01.update();           // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
            
        }        

           /* if (this.ship01.x <=0 ){
                speed = Math.random() * (5-1) +1;
                ship01.update();
                console.log(speed);
            }*/
      // this.moneyFlap(this.ship01);
        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);   
            this.p1Score += this.ship03.points;
            this.scoreLeft.text = '$' + this.p1Score;
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
            this.p1Score += this.ship02.points;
            this.scoreLeft.text = '$' + this.p1Score;
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
            this.p1Score += this.ship01.points;
            this.scoreLeft.text = '$' + this.p1Score;
        }

        
    }

    checkCollision(rocket, ship) {

        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        ship.alpha = 0;                         // temporarily hide ship
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion2').setOrigin(0, 0);
        boom.anims.play('explode2');            // play explode animation
        boom.on('animationcomplete', () => {    // callback after animation completes
            ship.reset();                     // reset ship position
            ship.alpha = 1;                   // make ship visible again
            boom.destroy();                   // remove explosion sprite
        });

        // score increment and repaint
          

        // play sound
        this.sound.play('sfx_explosion');  
    }

    
    
}