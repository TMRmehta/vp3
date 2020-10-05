//Create variables here
var dog, happyDog, database, foodS,foodstock
var dogImg1, dogImg2
var  foodobj
var fedTime,lastFed
var feed, addFood
var readState, gameState
var beadroom, garden, washroom
function preload()
{
  //load images here
  dogImg1 = loadImage("images/dogImg.png")
  dogImg2 = loadImage("images/dogImg1.png")
  bedroom = loadImage("images/Bed Room.png")
  garden  = loadImage("images/Garden.png")
  washroom = loadImage("images/Wash Room.png")

}

function setup() {
  createCanvas(1000, 500);
  dog = createSprite(850,250,50,50)
  dog.addImage("dog",dogImg1)
  dog.scale=0.3
  database = firebase.database()
  foodstock = database.ref('food')
  foodstock.on("value", readstock)
  foodobj = new Food()

  feed = createButton("feed the dog")
  feed.position(700,95)
  feed.size(150,30)
  
  addFood = createButton("add  food")
  addFood.position(900,95)
  addFood.size(100,30)
  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  })
  
}


function draw() {  
background(46,139,87)
currentTime = hour()
if(currentTime ==(lastFed+1)){
  update("playing")
  foodobj.garden()
}
else if (currentTime>(lastFed+2)&& currentTime<(lastFed+4)){
  update("bathng")
  foodobj.washroom()
}
else{
  update("hungry")
  foodobj.display()
}
if(gameState!="hungry"){
  feed.hide()
  addFood.hide()
  dog.remove()
}

else{
  feed.show();
  addFood.show();
  dog.addImage(dogImg2)
}
/*if(keyWentDown(UP_ARROW)){
  writestock(foodS)
  dog.addImage(dogImg2)*/
//}

foodobj.display()
fedTime=database.ref('FeedTime');
fedTime.on("value",function(data){
  lastFed=data.val();
});

fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("last Feed :"+ lastFed%12 +"pm",800,30);
}else if(lastFed ==0){
  text("Last Feed: 12 AM",800,30);
}else{
  text("Last Feed :"+lastFed + "AM",800,30)
  }


  drawSprites();
  //add styles here
  fill("black")
  text("foodRemaining:"+ foodS,100,100)


}

function readstock(data){
foodS = data.val()
}

function writestock(x){
  if(x<0){
    x=0
  }
  else {
    x=x-1
  }


  database.ref('/').update({
    food:x
  })
}

function update(state){
  database.ref('/').update({
    gameState:state
  })
}