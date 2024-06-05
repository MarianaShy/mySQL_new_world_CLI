use new world;

SELECT Name FROM country WHERE  Population > 8000000;

SELECT Name FROM country WHERE Name LIKE '%land%';


SELECT Name FROM city WHERE Population > 500000 AND Population < 1000000;


SELECT city.Name FROM country INNER JOIN city ON city.ID = country.Capital WHERE country.Continent = 'Europe';


SELECT country.Name FROM city INNER JOIN country ON country.Code = city.CountryCode 
GROUP BY country.Name HAVING COUNT(city.ID) > 10 AND SUM(city.Population) > 50000000;


WITH bigCountry AS ( SELECT country.Name FROM city INNER JOIN country ON country.Code = city.CountryCode 
GROUP BY country.Name HAVING COUNT(city.ID) > 10 AND SUM(city.Population) > 50000000) 
SELECT city.Name FROM city
INNER JOIN country ON country.Code = city.CountryCode 
WHERE country.Name IN (SELECT Name FROM bigCountry) AND city.Population> 5000000;



SELECT country.Continent, country.Name, city.Name FROM country INNER JOIN city ON city.ID = country.Capital 
WHERE (country.Population / country.SurfaceArea) > 1000;




SELECT continent, name FROM country WHERE surfaceArea = ( 
SELECT MAX(surfaceArea) FROM country AS c2 WHERE c2.continent = country.continent 
AND c2.continent != 'Antarctica') ORDER BY continent;




mysql> SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| hr                 |
| information_schema |
| mysql              |
| new_world          |
| performance_schema |
| sys                |
+--------------------+
6 rows in set (0.01 sec)

mysql> USE HR;
Database changed






mysql> SHOW TABLES;
Empty set (0.00 sec)

mysql> CREATE TABLE locations (
    ->     locationId INT AUTO_INCREMENT PRIMARY KEY,
    ->     officeName VARCHAR(200),
    ->     address VARCHAR(200),
    ->     city VARCHAR(100),
    ->     postalCode VARCHAR(20),
    ->     country VARCHAR(100),
    ->     contactPerson VARCHAR(100),
    ->     contactEmail VARCHAR(100),
    ->     contactPhone VARCHAR(100),
    ->     numberOfEmployees INT,
    ->     squareMeters INT,
    ->     hasParking BOOLEAN,
    ->     nearestPublicTransport VARCHAR(200),
    ->     petsFriendly BOOLEAN
    -> );
Query OK, 0 rows affected (0.08 sec)

mysql> SHOW TABLES
    -> SHOW TABLES;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'SHOW TABLES' at line 2
mysql> SHOW TABLES;
+--------------+
| Tables_in_hr |
+--------------+
| locations    |
+--------------+
1 row in set (0.00 sec)

mysql> CREATE TABLE employee (
    ->     employeeId INT AUTO_INCREMENT PRIMARY KEY,
    ->     firstName VARCHAR(50),
    ->     lastName VARCHAR(50),
    ->     email VARCHAR(100),
    ->     phoneNumber VARCHAR(20),
    ->     startDate DATE,
    ->     endDate DATE,
    ->     jobTitle VARCHAR(10),
    ->     salary DECIMAL(10, 2),
    ->     locationId INT,
    ->     FOREIGN KEY (locationId) REFERENCES locations(locationId)
    -> );
Query OK, 0 rows affected (0.06 sec)

mysql> SHOW TABLES;
+--------------+
| Tables_in_hr |
+--------------+
| employee     |
| locations    |
+--------------+
2 rows in set (0.00 sec)

mysql> INSERT INTO locations (officeName, address, city, postalCode, country, contactPerson, contactEmail, contactPhone, numberOfEmployees, squareMeters, hasParking, nearestPublicTransport, petsFriendly)
    -> VALUES
    -> ('Volvo Headquarters', 'Gropegårdsgatan 2', 'Göteborg', '417 15', 'Sweden', 'Andreas Nilsson', 'andreas.nilsson@volvo.com', '+46 31 66 00 00', 5000, 2500, TRUE, 'Bus stop: Kungsgatan', TRUE),
    -> ('Volvo Cars Torslanda', 'Karossvägen', 'Göteborg', '418 78', 'Sweden', 'Eva Bergström', 'eva.bergstrom@volvocars.com', '+46 31 59 00 00', 3500, 1500, TRUE, 'Bus stop: Volvo Torslanda', TRUE),
    -> ('Volvo Trucks Lundby', 'Arendal Skans', 'Göteborg', '405 08', 'Sweden', 'Erik Svensson', 'erik.svensson@volvotrucks.com', '+46 31 66 60 00', 2000, 10000, TRUE, 'Bus stop: Volvo', TRUE);
Query OK, 3 rows affected (0.01 sec)
Records: 3  Duplicates: 0  Warnings: 0

mysql> ALTER TABLE employee MODIFY jobTitle VARCHAR(100); 

mysql>  INSERT INTO employee (firstName, lastName, email, phoneNumber, startDate, endDate, jobTitle, salary, locationId)
    -> VALUES
    ->  ('Erik', 'Johansson', 'erik.johansson@volvo.com', '0701234567', '2020-01-15', NULL, 'Engineer', 60000.00, 17),
    -> ('Anna', 'Larsson', 'anna.larsson@volvo.com', '0705678910', '2021-03-10', NULL, 'Researcher', 65000.00, 17),
    -> ('Maria', 'Andersson', 'maria.andersson@volvo.com', '0709876543', '2019-05-20', NULL, 'Sales Representative', 55000.00, 16),
    -> ('Erik', 'Johansson', 'erik.johansson@volvo.com', '0701234567', '2020-01-15', NULL, 'Engineer', 60000.00, 17);
Query OK, 4 rows affected (0.01 sec)
Records: 4  Duplicates: 0  Warnings: 0

mysql>



