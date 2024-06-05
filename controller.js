const { getCapital, getLanguages, findIfSimilarCountries, getNumberOfCitiesByLanguage } = require('./instructions');

async function commandsController (command, args) {


	switch (command){


// Call functions when matching commands are send

		case 'CAPITAL':
			const countryForCapital = args.join(' ');
			if (!countryForCapital) {
				 console.log("\x1b[31mPlease provide a country name\x1b[0m");
			} else {
				 const result = await getCapital(countryForCapital);
				 console.log(result);
			}
			break;

	  case 'LANG':
			const region = args.join(' ');
			if (!region) {
				 console.log("\x1b[31mPlease provide a region name\x1b[0m");
			} else {
				 const result = await getLanguages(region);
				 console.log(region);
			}
			break;

			
	  case 'SPOKEN':
			const language = args.join(' ');
			if (!language) {
				 console.log("\x1b[31mPlease provide a language\x1b[0m");
			} else {
				const result = await getNumberOfCitiesByLanguage(language);
				 console.log(language);
			}
			break;

			case 'COUNTRIES':
				const countryForCountries = args.join(' ');
				if (!countryForCountries) {
					 console.log("\x1b[31mPlease provide a country name\x1b[0m");
				} else {
				 const result = await findIfSimilarCountries(countryForCountries);
					 console.log(countryForCountries);
				}
				break;

//set default message if command does not exist

	default:
		console.log("\x1b[31mPlease enter correct command\x1b[0m")
}
}




module.exports = commandsController;