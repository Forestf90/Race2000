
var licznik;
var roznica=-60;
var resp=0;
var c;
var ctx;

var punkty=0;
var speed=20;
var lista_przeszkod =[];

var gracz ={
	poz_x: 175,
	poz_y: 490,
	auto :new Image(),
};

function przeszkoda() {
	this.poz_x=Math.floor(Math.random() * 160) + 95;
	this.poz_y=-100 ;
	this.id_przeszkody=Math.floor(Math.random() * 4);
	this.auto =new Image();
	this.auto.src="images/Car"+this.id_przeszkody+".png";
	
}


window.onkeydown =function ster(e){

var key = e.keyCode ? e.keyCode : e.which;

   if (key == 37) {
       if(gracz.poz_x>95)gracz.poz_x -= 8;
   }else if (key == 39) {
       if(gracz.poz_x<255)gracz.poz_x += 8;
   }
   //rys_droge();
}




	
function rys_droge()
{

	c = document.getElementById("myCanvas");
	ctx = c.getContext("2d");

	
	ctx.fillStyle="Green";
	ctx.fillRect(0,0,95,600);
	ctx.fillRect(305,0,195,600);
	ctx.fillStyle="#86827F";
	ctx.fillRect(95,0,210,600);
	
	ctx.fillStyle="White";
	for(var i=0 ;i<11 ;i++)
	{
		ctx.fillRect(160,i*60+roznica ,10 ,30);
		ctx.fillRect(230,i*60+roznica ,10 ,30);
	}
	ctx.fillStyle="Black";
	ctx.font = "22px Arial";
	ctx.fillText("SCORE:",5,50);
	ctx.fillText(punkty,5,80);
	
	for(var i=0 ; i<lista_przeszkod.length ;i++){
		ctx.drawImage(lista_przeszkod[i].auto, lista_przeszkod[i].poz_x, lista_przeszkod[i].poz_y);  
	}
	
	
		ctx.drawImage(gracz.auto, gracz.poz_x, gracz.poz_y);  
	
	ctx.stroke();
}

function muzyka(){
myAudio = new Audio('music/997.mp3'); 
myAudio.loop = true;
myAudio.play();
}


function zderzenie_czolowe(){
	
	var temp =gracz.poz_y -lista_przeszkod[0].poz_y;
	if(temp<90 && temp>-90){
		for(var i=0 ;i<45 ;i++){
			for(var j=0 ;j<45 ;j++){
				if((gracz.poz_x+i==lista_przeszkod[0].poz_x+j)){
					
					if(confirm('Uzyskales: '+(punkty-2)+' punktow \n Czy chcesz zaczac jeszcze raz?')){
						window.location.reload();  
						return;
					}
					else{
						close();
						window.location.reload();
						return;
					}
				}
			
			}
			
		}
	}
	
	
}

function ruch(){

	
	
	for(var i=0 ; i<lista_przeszkod.length ;i++){
		lista_przeszkod[i].poz_y+=2;
		//if(lista_przeszkod[i]poz_y>600) lista_przeszkod[i].splice(i ,1);
		//alert('lista_przeszkod[i].poz_y')
	}
	rys_droge();
	licznik=setTimeout(ruch,speed);
	roznica+=5;
	if(roznica==0){
		roznica=-60;
	}
	
	resp++;
	punkty++;
	if(resp ==130){
		
		lista_przeszkod.push(new przeszkoda());
		var temp = lista_przeszkod.lenght;
		resp=0;
		if(speed!=10)speed--;
		
	}
	zderzenie_czolowe();
	
	if(lista_przeszkod[0].poz_y>600){
		lista_przeszkod.shift();
		}
		
}



window.onload = function main(){
	gracz.auto.src = 'images/police.png';
	muzyka();
	rys_droge();
	ruch();

}