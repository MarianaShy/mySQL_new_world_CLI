const pool = require('./db');



async function getCapital(country) {
    const [rows] = await pool.query('SELECT city.Name FROM country INNER JOIN city ON city.ID = country.Capital WHERE country.Name = ?', [country]);
    if (rows.length > 0) {
        return `\x1b[32mThe capital of ${country} is ${rows[0].Name}.\x1b[0m`;
    } else {
        return `Country ${country} not found.`;
    }
}

async function getLanguages(region) {
    const [rows] = await pool.query('SELECT DISTINCT countrylanguage.Language FROM country INNER JOIN countrylanguage ON country.Code = countrylanguage.CountryCode WHERE country.Region = ?', [region]);
    if (rows.length > 0) {
        return `Languages spoken in region ${region}: ${rows.map(row => row.Language).join(', ')}.`;
    } else {
        return `No languages found for region ${region}.`;
    }
}

async function getNumberOfCitiesByLanguage(language) {
	const [rows] = await pool.query(
		 'SELECT COUNT(DISTINCT city.Name) AS cityCount FROM countrylanguage INNER JOIN city ON countrylanguage.CountryCode = city.CountryCode WHERE countrylanguage.Language = ?',
		 [language]
	);
	if (rows[0].cityCount > 0) {
		 return `\x1b[32mNumber of cities where ${language} is spoken: ${rows[0].cityCount}.\x1b[0m`;
	} else {
		 return `\x1b[31mNo cities found where ${language} is spoken.\x1b[0m`;
	}
}

async function findIfSimilarCountries(country) {
	const [rows] = await pool.query(
		'SELECT COUNT(DISTINCT c.Name) AS countryCount FROM country c JOIN countrylanguage cl ON c.Code = cl.CountryCode WHERE ( c.Region = (SELECT Region FROM country WHERE Name = ?)  OR cl.Language IN (SELECT Language FROM countrylanguage WHERE CountryCode = (SELECT Code FROM country WHERE Name = ?) AND IsOfficial = "T") ) AND c.Name != ?',
		[country, country, country]
  );
  if (rows[0].countryCount > 0) {
		return true;
  } else {
		return false;
  }
}

module.exports = {
    getCapital,
    getLanguages,
    getNumberOfCitiesByLanguage,
    findIfSimilarCountries
};