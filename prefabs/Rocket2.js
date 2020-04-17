//Rocket Prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

            scene.add.existing(this);  //add object to the existing scene, displayList, updateList
            this.isFiring = false;  //track rockets firing status
    }

    update(){

        //add left right movement 
        if(!this.isFiring){
            if(keyA.isDown  && this.x >= 47){
                this.x -= 2;
            }
            else if(keyD.isDown  && this.x <= 578){
                this.x += 2;
            }
        }

        //fire button
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.isFiring = true;
        }

        // if fired move up
        if(this.isFiring && this.y >= 108){
            this.y -= 2;
        }

        //reset on miss
        if(this.y <= 108){
            this.isFiring = false;
            this.y = 431;
        }
    }

    reset() {
        this.isFiring = false;
        this.y = 431;
    }

}