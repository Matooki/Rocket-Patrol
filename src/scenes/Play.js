class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('piggy', './assets/piggybank.png');
        this.load.image('piggy2', './assets/piggybank2.png');
        //this.load.image('money', './assets/money.gif');
       // this.load.image('bank', './assets/bank.png');
        
        // load spritesheet
        this.load.spritesheet('money', './assets/money.png', {frameWidth: 55, frameHeight: 36, startFrame: 0, endFrame: 9});
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.spritesheet('bank', './assets/Backbank.png',  {frameWidth: 640, frameHeight: 480, startFrame: 0, endFrame: 3});
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

        const moneyFly = this.add.sprite(200, 200, 'money', 0);
        const bank = this.add.sprite(0, 0, 'bank', 0).setOrigin(0, 0);
        
     

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2 - 8, 431, 'piggy').setScale(1, 1).setOrigin(0, 0);
    
        this.p2Rocket = new Rocket2(this, game.config.width/2 + 8, 431, 'piggy2').setScale(1, 1).setOrigin(0, 0);
    
       

        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + 192, 132, 'money', 0, 30, Math.random() * (5-4) + 4).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + 96, 196, 'money', 0, 20,  Math.random() * (4-3) +3).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, 260, 'money', 0, 10, Math.random() * (3-1) + 1);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        
      

        this.anims.create({
            key: 'bank',
            frames: this.anims.generateFrameNumbers('bank', {start: 0, end: 3, first: 0}),
            frameRate: 5,
            repeat: -1
        });

        bank.play('bank');
        

        // player 1 score
        this.p1Score = 0;

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

        // game over flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
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
            this.p2Rocket.update();
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
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }

        if(this.checkCollision(this.p2Rocket, this.ship03)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship03);   
        }
        if (this.checkCollision(this.p2Rocket, this.ship02)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p2Rocket, this.ship01)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship01);
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
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');            // play explode animation
        boom.on('animationcomplete', () => {    // callback after animation completes
            ship.reset();                     // reset ship position
            ship.alpha = 1;                   // make ship visible again
            boom.destroy();                   // remove explosion sprite
        });

        // score increment and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;  

        // play sound
        this.sound.play('sfx_explosion');  
    }

    moneyFlap(ship) {
        ship.alpha = 0;                         // temporarily hide ship
        // create explosion sprite at ship's position
        let flap = this.add.sprite(ship.x, ship.y, 'money').setOrigin(0, 0);
        flap.anims.play('money');            // play explode animation
        flap.on('animationcomplete', () => {    // callback after animation completes
                              // reset ship position
            ship.alpha = 1;                   // make ship visible again
                              // remove explosion sprite
        });
    }
}