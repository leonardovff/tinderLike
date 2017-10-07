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
		selectorBtn = isDislike ? 'button.recsGamepad__button--dislike' : 'button.recsGamepad__button--like';
		btn = document.querySelector(selectorBtn);
		if(typeof btn !== null) {
			let cardName = document.querySelector("span.recCard__name").textContent;
			let cardAge = document.querySelector("span.recCard__age ").textContent.split(', ')[1];
			qtd++;
			console.log("["+ qtd + "] " + (isDislike? 'Dislike' : 'Like') + ' at ' + cardName + " ("+ cardAge +")")
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
		const qtd = KEYWORDS.filter(word => {
			return profileDescription.textContent.toUpperCase().includes(word.toUpperCase());
		}).length;
		document.querySelector('a.profileCard__backArrow').click()
		return qtd
	}
	stop();
	return false;
}

//time in milliseconds
run(2000, [
	'acompanhante', 'trans', 'signo', 'escorpiana', 'tainara', 'ascendente', 'horoscopo', 'mapa astral', 'oral'
])