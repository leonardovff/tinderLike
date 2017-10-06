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
		if(typeof btn !== null) {
			qtd++;
			console.log(qtd + 'likes');
			btn.click()
		}

	}, time);
}

function stop(){
	console.log('stopped!')
	clearInterval(interval);
}

function filter(PROFILE, KEYWORDS){
	const openProfile = document.querySelector('div.recCard__openProfile');
	if(openProfile !== null) {
		openProfile.click();

		const profileDescription = document.querySelector("div.profileCard__header__info");

		return KEYWORDS.filter(word => {
			return profileDescription.textContent.toUpperCase().includes(word.toUpperCase());
		}).length;
	}
	stop();
	return false;
}

//time in milliseconds
run(1000, true, [
	'acompanhante', 'trans', 'signo', 'escorpiana', 'tainara', 'ascendente', 'horoscopo', 'mapa astral', 'oral'
])
