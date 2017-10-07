var interval = null;

function run(time, KEYWORDS = false){
	let qtd = 0,
	isDislike,
	selectorBtn,
	btn,
	filterFlag = false;

	if(Array.isArray(KEYWORDS))
		filterFlag = true

	if(typeof interval !== null)
		clearInterval(interval);

	interval = setInterval(() => {
		isDislike = (filterFlag && filter(KEYWORDS) == 0);
		selectorBtn = isDislike? 'button.recsGamepad__button--dislike' : 'button.recsGamepad__button--like';
		btn = document.querySelector(selectorBtn);
		if(typeof btn !== null) {
			qtd++;
			console.log(qtd + ' likes');
			btn.click()
		}

	}, time);
}

function stop(){
	console.log('stopped!')
	clearInterval(interval);
}

function filter(KEYWORDS){
	const openProfile = document.querySelector('div.recCard__openProfile');
	if(openProfile)  {
		openProfile.click();
		const profileDescription = document.querySelector("div.profileCard__header__info");
		return KEYWORDS.filter(word => {
			console.log('word', word, 'profileDescription.textContent.toUpperCase()', profileDescription.textContent.toUpperCase())
			return profileDescription.textContent.toUpperCase().includes(word.toUpperCase());
		}).length;
	}
	console.log((openProfile !== null), openProfile.click())
	stop();
	return false;
}

//time in milliseconds
run(1000, [
	'acompanhante', 'trans', 'signo', 'escorpiana', 'tainara', 'ascendente', 'horoscopo', 'mapa astral', 'oral'
])