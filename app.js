var interval = null,
	qtd = 0,
	sKEYWORDS

function run(time = 300, KEYWORDS = false){
	if(time < 300){
		throw new Error("You shuld use time minor that 250")
	}
	if(typeof interval !== null){
		clearInterval(interval);
	}
	sKEYWORDS = KEYWORDS
	interval = setInterval(() => action(sKEYWORDS), time);
}

function action(KEYWORDS = false){
	qtd += 1;

	let isDislike = false,
		selectorBtn,
		btn,
		cardActived,
		filtered = false,
		msg = "["+ qtd + "]",
		cardNameAgeSelector;

	cardActived = document.querySelector("div.recCard.StretchedBox.active");

	if(cardActived === null){
		msg += "No cards"
		stop()
	} else {
		filtered = filter(cardActived, KEYWORDS);
		isDislike = (filtered && filtered.qtd > 0);
		selectorBtn = isDislike ? 'button.recsGamepad__button--dislike' : 'button.recsGamepad__button--like';

		btn = document.querySelector(selectorBtn);
		cardNameAgeSelector = cardActived.querySelector("div.recCard__nameAge")
		if(btn && cardNameAgeSelector) {
			cardNameAge = cardNameAgeSelector.textContent.split(', ');
			cardNameAge = {
				"name": cardNameAge[0],
				"age": cardNameAge[1]
			}
			msg += (isDislike? 'Dislike' : 'Like') + ' at ' + cardNameAge.name + " ("+ cardNameAge.age +"y).";
			if(isDislike){
				if(filtered.details){
					msg += "\n\t- "+filtered.details.join(' - ');
				}
				if(filtered.qtd > 0){
					msg += "\n\t- "+filtered.qtd + " filtered words: " +"\n\t"+ filtered.words.join(', ');
				}
			}
			btn.click();
		}
	}
	console.log(msg);
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



function stop(){
	console.log('Stopped!')
	clearInterval(interval);
}

//time in milliseconds
run(300, [ 'acompanhante', 'casado' ])
