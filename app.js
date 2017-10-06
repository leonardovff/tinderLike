var interval = null;

function run(time, filterFlag, KEYWORDS){
	let qtd = 0,
	isDislike,
	selectorBtn,
	btn;

	if(typeof interval != null)
		clearInterval(interval);

	interval = setInterval(() => {
		isDislike = (filterFlag && filter(KEYWORDS) == 0);
		selectorBtn = isDislike? 'button.recsGamepad__button--dislike' : 'button.recsGamepad__button--like';
		btn = document.querySelector(selectorBtn);

		qtd++;
		console.log(qtd);
		btn.click()

	}, time);
}

function stop(){
	clearInterval(interval);
}

function filter(KEYWORDS){
	const openProfile = document.querySelector('div.recCard__openProfile');
	console.log('filtering')
	openProfile.click();

	const profileDescription = document.querySelector("div.profileCard__header__info");

	return KEYWORDS.filter(word => {
		return profileDescription.textContent.toUpperCase().includes(word.toUpperCase());
	}).length;
}

//time in milliseconds
run(1000, true, [
	'acompanhante', 'trans', 'signo', 'escorpiana', 'tainara', 'ascendente', 'horoscopo', 'mapa astral', 'oral'
])
