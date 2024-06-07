const pool = require('./db');

async function getCapital(country) {
   const connection = await pool.getConnection();
   const statement = await connection.prepare(
      'SELECT city.Name FROM country INNER JOIN city ON city.ID = country.Capital WHERE country.Name = ?'
   );
   connection.release();

   const [rows] = await statement.execute([country]);
   if (rows.length > 0) {
      return `\x1b[32mThe capital of ${country} is ${rows[0].Name}.\x1b[0m`;
   } else {
      return `Country ${country} not found.`;
   }
}

async function getLanguages(region) {
   const connection = await pool.getConnection();
   const statement = await connection.prepare(
      'SELECT DISTINCT countrylanguage.Language FROM country INNER JOIN countrylanguage ON country.Code = countrylanguage.CountryCode WHERE country.Region = ?'
   );
   connection.release();

   const [rows] = await statement.execute([region]);

   if (rows.length > 0) {
      return `\x1b[32mLanguages spoken in region ${region}: ${rows
         .map(row => row.Language)
         .join(', ')}.\x1b[0m`;
   } else {
      return `\x1b[31mNo languages found for region ${region}.\x1b[0m`;
   }
}

async function getNumberOfCitiesByLanguage(language) {
   const connection = await pool.getConnection();
   const statement = await connection.prepare(
      'SELECT COUNT(DISTINCT city.Name) AS cityCount FROM countrylanguage INNER JOIN city ON countrylanguage.CountryCode = city.CountryCode WHERE countrylanguage.Language = ?'
   );
   connection.release();

   const [rows] = await statement.execute([language]);

   if (rows[0].cityCount > 0) {
      return `\x1b[32mNumber of cities where ${language} is spoken: ${rows[0].cityCount}.\x1b[0m`;
   } else {
      return `\x1b[31mNo cities found where ${language} is spoken.\x1b[0m`;
   }
}

async function findIfSameContinent(country) {
   const connection = await pool.getConnection();
   const statement = await connection.prepare(
      'SELECT Name FROM country WHERE Region = (SELECT Region FROM country WHERE Name = ?)  AND Name != ?'
   );
   connection.release();

   const [rows] = await statement.execute([country, country]);

   if (rows.length > 0) {
      return `\x1b[32mCountries on the same continent as ${country} are:\n ${rows
         .map(row => row.Name)
         .join(',\n')}.\x1b[0m`;
   } else {
      return false;
   }
}

async function findIfSameLang(country) {
   const connection = await pool.getConnection();
   const statement = await connection.prepare(
      'SELECT DISTINCT c.Name FROM country c JOIN countrylanguage cl ON c.Code = cl.CountryCode WHERE cl.IsOfficial = "T" AND (cl.Language IN (SELECT Language FROM countrylanguage WHERE IsOfficial = "T" AND CountryCode = (SELECT Code FROM country WHERE Name = ?) ) ) AND c.Name != ?'
   );
   connection.release();

   const [rows] = await statement.execute([country, country, country]);

   if (rows.length > 0) {
      return `\x1b[32mCountries with the same official language as ${country} are:\n ${rows
         .map(row => row.Name)
         .join(',\n')}.\x1b[0m`;
   } else {
      return false;
   }
}

module.exports = {
   getCapital,
   getLanguages,
   getNumberOfCitiesByLanguage,
   findIfSameContinent,
   findIfSameLang,
};
