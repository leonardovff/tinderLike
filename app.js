var interval = null;

function run(time = 300, KEYWORDS = false){
	let qtd = 0,
	isDislike = false,
	selectorBtn,
	btn;

	if(typeof interval !== null){
		clearInterval(interval);
	}

	interval = setInterval(() => {
		let filtered = false;
		console.log('filtered', filtered)
		if(Array.isArray(KEYWORDS)){
			filtered = filter(KEYWORDS);
			isDislike = (filtered.qtd > 0)
			console.log(filtered, isDislike)
		}
		selectorBtn = isDislike ? 'button.recsGamepad__button--dislike' : 'button.recsGamepad__button--like';
		btn = document.querySelector(selectorBtn);
		if(typeof btn !== null) {
			qtd++;
			let cardNameAge = document.querySelector("div.recCard__nameAge")
			let msg = "["+ qtd + "] ";
			if(cardNameAge){
				cardNameAge = cardNameAge.textContent.split(', ');
				let cardName = cardNameAge[0];
				let cardAge = cardNameAge[1];
				msg += (isDislike? 'Dislike' : 'Like') + ' at ' + cardName + " ("+ cardAge +")."
				if(filtered && filtered.qtd && filtered.words){
					console.log(filtered)
					msg += "\n\t- "+filtered.qtd + " Filtered words: " + filtered.words;
				}
				btn.click()
			} else {
				msg = 'No cards found.'
			}
			console.log(msg)
		}

	}, time);
}

function stop(){
	console.log('stopped!')
	clearInterval(interval);
}

function filter(KEYWORDS){
	const openProfile = document.querySelector('div.recCard__openProfile');
	let filtered = false
	if(openProfile)  {
		filtered = {}
		openProfile.click();
		const profileDescription = document.querySelector("div.profileCard__textContent");
		const words = KEYWORDS.filter(word => {
			return profileDescription.textContent.toUpperCase().includes(word.toUpperCase());
		})
		const qtd = words.length;
		filtered.words = words;
		filtered.qtd = qtd;
		document.querySelector('a.profileCard__backArrow').click()

	} else {
		stop();
	}
	return filtered;
}

//time in milliseconds
run(2000, [
	'acompanhante', 'trans'
])