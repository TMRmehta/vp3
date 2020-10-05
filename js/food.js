class Food{

    constructor() {
         this.foodStock=0;
         this.lastFed=0;
         this.image = loadImage("images/Milk.png")
      }

      getFoodStock() {

      }
      
      updateFoodStock() {

      }

      deductFood() {

      }

      display() {
          var x=80,y=100;

        imageMode(CENTER);
        

        for(var i= 0; i<this.foodStock; i++){
            image(this.image,x,y,70,70);
            x= x+30;

        }


      }
      bedroom(){
        background(bedroom,550,500);
      }
      garden(){
        background(garden,550,500);
      }
      washroom(){
        background(washroom,550,500);
      }
}