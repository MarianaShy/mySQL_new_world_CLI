const pool = require('./db');



async function getCapital(country) {
    const [rows] = await pool.query('SELECT city.Name FROM country INNER JOIN city ON city.ID = country.Capital WHERE country.Name = ?', [country]);
    if (rows.length > 0) {
        return `The capital of ${country} is ${rows[0].Name}.`;
    } else {
        return `Country ${country} not found.`;
    }
}


module.exports = {
    getCapital,
    getLanguages,
    getNumberOfCitiesByLanguage,
    findIfSimilarCountries
};