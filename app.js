var interval = null,
	qtd = 0;

function run(time = 300, KEYWORDS = false, distanceKm = 99999){
	if(typeof interval !== null){
		clearInterval(interval);
	}
	var sKEYWORDS = KEYWORDS
	interval = setInterval(() => action(sKEYWORDS, distanceKm), time);
}

function action(KEYWORDS = false, distanceKm = 99999){
	qtd += 1;

	let isDislike = false,
		selectorBtn,
		btn,
		cardActived,
		filtered = false,
		msg = "["+ qtd + "] ";

	try {
		cardActived = document.querySelector("div.recCard.needsclick.active");

		filtered     = filter(cardActived, KEYWORDS);
		filteredByKm = filterByDistance(cardActived, distanceKm);
		isDislike    = (filtered.qtd > 0 || filteredByKm.distance < 0);
		selectorBtn = isDislike ? 'button.recsGamepad__button--dislike' : 'button.recsGamepad__button--like';
		btn = document.querySelector(selectorBtn);

		cardNameAge = cardActived.querySelector("div.recCard__nameAge").textContent.split(', ');
		cardNameAge = {
			"name": cardNameAge[0],
			"age": cardNameAge[1]
		}
		msg += (isDislike? 'Dislike' : 'Like') + ' at ' + cardNameAge.name + " ("+ cardNameAge.age +"y).";
		if(filtered){
			if(filtered.details){
				msg += "\n\t- "+filtered.details.join(' - ');
			}
			if(filtered.qtd > 0){
				msg += "\n\t- "+filtered.qtd + " filtered words: " +"\n\t"+ filtered.words.join(', ');
			}
		}
		btn.click();
	} catch (e) {
		msg = e;
	} finally {
		console.log(msg);
	}

}

function filter(cardActived, KEYWORDS){
	try {
		const click = cardActived.querySelector('div.recCard__openProfile').click();
		const profileDescription = document.querySelector("div.profileCard__textContent");
		const words = KEYWORDS.filter(word => {
			return profileDescription.textContent.toUpperCase().includes(word.toUpperCase());
		})
		let profileDetails = []
		document.querySelectorAll('.profileCard__info').forEach(function(e) {
			profileDetails.push(e.textContent)
		}, this);
		profileDetails[profileDetails.length - 1] = profileDetails[profileDetails.length - 1].split(" ")[0] + "km"
		const close = document.querySelector('a.profileCard__backArrow').click()
		return {
			"qtd": words.length,
			"words": words,
			"details": profileDetails
		}
	} catch (e) {
		console.log(e);
		return false;
	}
}

function filterByDistance( cardActived, distance ){
	try {
		const click = cardActived.querySelector('div.recCard__openProfile').click();
		let profileDetails = []
		document.querySelectorAll('.profileCard__info').forEach(function (e) {
			profileDetails.push(e.textContent)
		}, this);

		realDistance = profileDetails[profileDetails.length - 1].split(" ")[0]

		return { "distance": distance - realDistance }
	} catch (e) {
		console.log(e);
		return { "distance": 1 };
	}
}

function openProfileCard( cardActived ){
	return cardActived.querySelector('div.recCard__openProfile').click();
}

function stop(){
	console.log('stopped!')
	clearInterval(interval);
}

//time in milliseconds
run(1000, ['acompanhante', 'trans'], 3)
