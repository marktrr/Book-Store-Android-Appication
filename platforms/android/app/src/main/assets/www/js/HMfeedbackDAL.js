/**
 File: HMfeedbackDAL.js
 Full Name: Hy Minh Tran
 Student #: 7910276
 Mobile Application 1 - FINAL PROJECT
 Created: April 5th, 2019
**/

var Cart = {
    hmInsert: function (options, callback)
    {
        function txFunction(tx)
        {
            var sql = "INSERT INTO cart (itemId, itemName, itemImage, itemPrice) VALUES(?,?,?,?);";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction()
        {
            console.info("Add New Item")
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    hmDelete: function (options, callback)
    {
        function txFunction(tx)
        {
            var sql = "DELETE FROM cart WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction()
        {
            console.info("Item deleted successfully");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    hmDeleteAll: function (options, callback)
    {
        function txFunction(tx)
        {
            var sql = "DELETE FROM cart;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction()
        {
            console.info("Deleted successfully");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    hmSelectAll: function (options, callback)
    {
        function txFunction(tx)
        {
            var sql = "SELECT * FROM cart;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction()
        {
            console.info("SelectAll Cart transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

var Book = {
    hmSelect: function (options, callback)
    {
        function txFunction(tx)
        {
            var sql = "SELECT * FROM book WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction()
        {
            console.info("Select from book transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    hmSelectAll: function (options, callback)
    {
        function txFunction(tx)
        {
            var sql = "SELECT * FROM book;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction()
        {
            console.info("SelectAll Book transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

var Orders = {
    hmInsert: function (options, callback)
    {
        function txFunction(tx)
        {
            var sql = "INSERT INTO orders (orderId, customerName, address, itemId, date, shippingDate) VALUES(?,?,?,?,?,?);";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction()
        {
            console.info("New Order Created.")
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    hmSelect: function (options, callback)
    {
        function txFunction(tx)
        {
            var sql = "SELECT * FROM orders WHERE orderId=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction()
        {
            console.info("Select from cart transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};