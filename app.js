var interval = null;
const keywords = [
	'acompanhante', 'trans', 'signo', 'escorpiana', 'tainara', 'ascendente', 'horoscopo'
];
function run(time){
	var qtd = 0, 

	selectorBtn = (filter() ? 'button.recsGamepad__button--dislike' : 'button.recsGamepad__button--like')
	btn = document.querySelector(selectorBtn);
	
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

function filter(){
	const openProfile = document.querySelector('div.recCard__openProfile');
	openProfile.click();

	const profileDescription = document.querySelector("div.profileCard__header__info");

	return keywords.filter(word => {
		return profileDescription.textContent.toUpperCase().includes(word.toUpperCase());
	}).length;
}

//time in milliseconds
run(2000)
