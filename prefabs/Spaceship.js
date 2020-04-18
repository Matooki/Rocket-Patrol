//Spaceship Prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, speed) {
        super(scene, x, y, texture, frame);

            scene.add.existing(this);  //add object to the existing scene, displayList, updateList
            this.points = pointValue; 
            this.speed = speed; //track rockets firing status
    }
    


    update(){
        //move spaceship left
        this.x -= this.speed;

        //wraparound screen bounds
        if(this.x <=0 -this.width){
            this.x = game.config.width;
        }
    }

    reset() {
        this.x = game.config.width;
        
    }

    
}
