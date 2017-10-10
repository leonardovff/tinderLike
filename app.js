var interval = null,
	qtd = 0;

function run(time = 300, KEYWORDS = false){
	if(typeof interval !== null){
		clearInterval(interval);
	}
	interval = setInterval(action(KEYWORDS), time);
}

function action(KEYWORDS = false){
	qtd += 1;

	let isDislike = false,
		selectorBtn,
		btn,
		cardActived,
		filtered = false,
		msg = "["+ qtd + "] ";

	try {
		cardActived = document.querySelector("div.recCard.needsclick.active");

		filtered = filter(cardActived, KEYWORDS);
		isDislike = (filtered.qtd > 0);
		selectorBtn = isDislike ? 'button.recsGamepad__button--dislike' : 'button.recsGamepad__button--like';
		btn = document.querySelector(selectorBtn);

		cardNameAge = cardActived.querySelector("div.recCard__nameAge").textContent.split(', ');
		cardNameAge = {
			"name": cardNameAge[0],
			"age": cardNameAge[1]
		}
		msg += (isDislike? 'Dislike' : 'Like') + ' at ' + cardNameAge.name + " ("+ cardNameAge.age +")."
		if(filtered){
			msg += "\n\t- "+filtered.qtd + " Filtered words: " + filtered.words.join(', ');
		}
		btn.click()
	} catch (e) {
		msg = e
	} finally {
		console.log(msg)
	}

}

function filter(cardActived, KEYWORDS){
	try {
		const click = cardActived.querySelector('div.recCard__openProfile').click();
		const profileDescription = document.querySelector("div.profileCard__textContent");
		const words = KEYWORDS.filter(word => {
			return profileDescription.textContent.toUpperCase().includes(word.toUpperCase());
		})
		const close = document.querySelector('a.profileCard__backArrow').click()
		return {
			"qtd": words.length,
			"words": words
		}
	} catch (e) {
		console.log(e)
		return false;
	}
}


function stop(){
	console.log('stopped!')
	clearInterval(interval);
}

//time in milliseconds
run(2000, [
	'acompanhante', 'trans'
])