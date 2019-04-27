/**
 File: HMdatabase.js
 Full Name: Hy Minh Tran
 Student #: 7910276
 Mobile Application 1 - FINAL PROJECT
 Created: April 5th, 2019
**/

var db;

function errorHandler(tx, error)
{
    console.error("SQL error: " + tx + " (" + error.code + "): " + error.message);
}

var DB = {
    hmCreateDatabase: function ()
    {
        var shortName = "HMBookStore";
        var version = "1.0";
        var displayName = "DB for HMBookStore app";
        var dbSize = 2 * 1024 * 1024; // this is a 2 MB estimated size

        function dbCreate()
        {
            console.info("Success: Database created successfully");
        }

        db = openDatabase(shortName, version, displayName, dbSize, dbCreate);
    },
    hmCreateTables: function ()
    {
        function txFunction(tx)
        {
            var options = [];

            var sqlDrop = "DROP TABLE IF EXISTS book;";
            function successDrop()
            {
                console.info("Table book dropped successfully");
            }
            tx.executeSql(sqlDrop, options, successDrop, errorHandler);

            var sqlCreateBook = "CREATE TABLE IF NOT EXISTS book("
                        + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
                        + "name VARCHAR(40) NOT NULL,"
                        + "image VARCHAR(20),"
                        + "price DECIMAL(2,2) NOT NULL);";
            function successCreateType()
            {
                console.info("Table book Created successfully");
            }
            tx.executeSql(sqlCreateBook, options, successCreateType, errorHandler);

            var sqlInsert1st = "INSERT INTO book(name, image, price) VALUES ('Practical C++ Programming - 4th Edition', 'images/c++.jpg', 19.99)";
            var sqlInsert2nd = "INSERT INTO book(name, image, price) VALUES ('Programming CSharp - 4th Edition', 'images/csharp.jpg', 25.99)";
            var sqlInsert3rd = "INSERT INTO book(name, image, price) VALUES ('Learning Java - 4th Edition', 'images/java.jpg', 30.99)";
            var sqlInsert4th = "INSERT INTO book(name, image, price) VALUES ('JavaScript - The Definitive Guide - 4th Edition', 'images/javascript.jpg', 23.99)";
            var sqlInsert5th = "INSERT INTO book(name, image, price) VALUES ('jQuery - Pocket Reference - 4th Edition', 'images/jquery.jpg', 39.99)";
            var sqlInsert6th = "INSERT INTO book(name, image, price) VALUES ('Programming PHP - 4th Edition', 'images/php.jpg', 27.99)";

            tx.executeSql(sqlInsert1st, options, successInsert, errorHandler);
            tx.executeSql(sqlInsert2nd, options, successInsert, errorHandler);
            tx.executeSql(sqlInsert3rd, options, successInsert, errorHandler);
            tx.executeSql(sqlInsert4th, options, successInsert, errorHandler);
            tx.executeSql(sqlInsert5th, options, successInsert, errorHandler);
            tx.executeSql(sqlInsert6th, options, successInsert, errorHandler);

            function successInsert()
            {
                console.info("book insert successfully");
            }

            var sqlCreateCart = "CREATE TABLE IF NOT EXISTS cart("
                                + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
                                + "itemId INTEGER,"
                                + "itemName VARCHAR(40),"
                                + "itemImage VARCHAR(20),"
                                + "itemPrice DECIMAL(2,2),"
                                + "CONSTRAINT item_pk FOREIGN KEY (itemId) REFERENCES book(id));";
            tx.executeSql(sqlCreateCart, options, successCreateCart, errorHandler);
            function successCreateCart()
            {
                console.info("Cart table created successfully");
            }

            var sqlCreateOrder = "CREATE TABLE IF NOT EXISTS orders("
                            + "orderId VARCHAR(8) NOT NULL PRIMARY KEY,"
                            + "customerName VARCHAR(30),"
                            + "address VARCHAR(50),"
                            + "itemId VARCHAR(15),"
                            + "date DATE,"
                            + "shippingDate DATE,"
                            + "CONSTRAINT itemId_pk FOREIGN KEY (itemId) REFERENCES cart(itemId));";
            tx.executeSql(sqlCreateOrder, options, successCreateOrder, errorHandler);
            function successCreateOrder()
            {
                console.info("Order table created successfully");
            }
        }

        function successTransaction()
        {
            console.info("All tables created successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};