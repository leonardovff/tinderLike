var interval = null;
function run(time){
	var qtd = 0, 
	btn = document.querySelector('button.recsGamepad__button--like');
	
	if(typeof interval != null)
		clearInterval(interval);
	
	interval = setInterval(() => {
		qtd++;
		console.log(qtd);	
		btn.click()
	}, time);
}
function stop(){
	clearInterval(interval);
}
//time in milliseconds
//run(200)
