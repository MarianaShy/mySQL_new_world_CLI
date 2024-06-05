
mysql> use new_world
Database changed

mysql> create table new_world.notification (
    countrycode char(3) references country(Code),
    has_10_languages Boolean );
Query OK, 0 row affected (0.01 sec)

mysql> show tables;
+---------------------+
| Tables_in_new_world |
+---------------------+
| city                |
| country             |
| countrylanguage     |
| notification        |
+---------------------+
4 rows in set (0.00 sec)


DELIMITER //

CREATE TRIGGER language_count_trigger 
AFTER INSERT ON new_world.countrylanguage
FOR EACH ROW
BEGIN
    DECLARE language_count INT;
  

    SELECT COUNT(*) INTO language_count
    FROM new_world.countrylanguage
    WHERE CountryCode = NEW.CountryCode;
    
  
    IF language_count >= 10 THEN
        
        INSERT INTO new_world.notification (countrycode, has_10_languages)
        VALUES (NEW.CountryCode, TRUE);
    END IF;
END;
//

DELIMITER ;

mysql> insert into new_world.countrylanguage (CountryCode, Language) values ('USA', 'Ukrainian');
Query OK, 1 row affected (0.01 sec)

mysql> select * fron notification;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'fron notification' at line 1
mysql> select * from notification;
+-------------+------------------+
| countrycode | has_10_languages |
+-------------+------------------+
| USA         |                1 |
+-------------+------------------+
1 row in set (0.00 sec)

mysql>