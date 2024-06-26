const {
   getCapital,
   getLanguages,
   findIfSameContinent,
   findIfSameLang,
   getNumberOfCitiesByLanguage,
} = require('./instructions');

async function commandsController(command, args) {
   switch (command) {
      // Call functions when matching commands are send

      case 'CAPITAL':
         const countryForCapital = args.join(' ');
         if (!countryForCapital) {
            console.log('\x1b[31mPlease provide a country name\x1b[0m');
         } else {
            const result = await getCapital(countryForCapital);
            console.log(result);
         }
         break;

      case 'LANG':
         const region = args.join(' ');
         if (!region) {
            console.log('\x1b[31mPlease provide a region name\x1b[0m');
         } else {
            const result = await getLanguages(region);
            console.log(result);
         }
         break;

      case 'SPOKEN':
         const language = args.join(' ');
         if (!language) {
            console.log('\x1b[31mPlease provide a language\x1b[0m');
         } else {
            const result = await getNumberOfCitiesByLanguage(language);
            console.log(result);
         }
         break;

      case 'SAMELANG':
         const countrySameLang = args.join(' ');
         if (!countrySameLang) {
            console.log('\x1b[31mPlease provide a country name\x1b[0m');
         } else {
            const result = await findIfSameLang(countrySameLang);
            console.log(result);
         }
         break;

      case 'SAMECONTINENT':
         const countrySameContinent = args.join(' ');
         if (!countrySameContinent) {
            console.log('\x1b[31mPlease provide a country name\x1b[0m');
         } else {
            const result = await findIfSameContinent(countrySameContinent);
            console.log(result);
         }
         break;

      //set default message if command does not exist

      default:
         console.log('\x1b[31mPlease enter correct command\x1b[0m');
   }
}

module.exports = commandsController;
