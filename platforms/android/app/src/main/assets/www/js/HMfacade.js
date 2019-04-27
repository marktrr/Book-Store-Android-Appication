/**
 File: HMfacade.js
 Full Name: Hy Minh Tran
 Student #: 7910276
 Mobile Application 1 - FINAL PROJECT
 Created: April 5th, 2019
 **/
function hmUpdateBook() {
    var options = [];

    function callback(tx, results)
    {
        var htmlCode = "";
        for (var i = 0; i < results.rows.length; i++)
        {
            var row = results.rows[i];
            htmlCode += "<li>" +
                "<img alt="+row['image'] +" src="+ row['image'] +" >" +
                "<h1>" + row['name'] + "</h1>" +
                "<h2 style='color: firebrick;'>Price: " + row['price'] + " $CAD</h2>" +
                "<div class='ui-block-a'>" +
                "<a href='#' data-row-id=" + row['id'] + " data-role='button' data-icon='shop'>Add To Cart" + "</a>" +
                "</div>" +
                "</li>";
        }

        var lv = $("#productList");
        lv = lv.html(htmlCode);
        lv.listview('refresh');

        function clickHandler()
        {
            var result = confirm("Add to cart?");
            if (result) {
                localStorage.setItem("id", $(this).attr("data-row-id"));
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows[i];
                    if(localStorage.getItem("id") === row['id'].toString()) {
                        localStorage.setItem("name", row['name']);
                        localStorage.setItem("image", row['image']);
                        localStorage.setItem("price", row['price']);
                    }
                }
                $(location).prop('href', '#hmCartPage');
            }
        }
        $("#productList a").on("click", clickHandler);
    }

    Book.hmSelectAll(options, callback);
}

function  hmShowCart() {
    if(localStorage.length > 3) {
        var itemId = localStorage.getItem("id");
        var itemName = localStorage.getItem("name");
        var itemImage = localStorage.getItem("image");
        var itemPrice = localStorage.getItem("price");

        var opt = [itemId, itemName, itemImage, itemPrice];

        function callback()
        {
            console.info("Cart inserted successfully");
        }
        Cart.hmInsert(opt, callback);
        localStorage.clear();
    }
}

function addToCart() {
    var options = [];

    function callbackCart(tx, results) {
        var htmlCode = "";
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            htmlCode += "<li>" +
                "<img alt=" + row['itemName'] + 'Book' + " src=" + row['itemImage'] + " >" +
                "<h1>" + row['itemName'] + "</h1>" +
                "<h2 style='color: firebrick;'>Price: " + row['itemPrice'] + " $CAD</h2>" +
                "<button data-row-id=" + row['id'] + ">Remove Item" + "</button>" +
                "</li>";
        }

        var lv = $("#cartList");
        lv.html(htmlCode).listview('refresh');

        function eventHanler() {
            results = confirm("Delete item?");
            if(results) {
                localStorage.setItem("id", $(this).attr("data-row-id"));
                deleteItem();
            }
        }
        $("#cartList button").on("click", eventHanler);
    }
    Cart.hmSelectAll(options, callbackCart);
}

function deleteItem() {
    var id = localStorage.getItem("id");
    var options = [id];

    function callback() {
        $(location).prop('href', "#hmCartPage");
        var lv = $("#cartList");
        lv.listview("refresh");
        location.reload(true);
        localStorage.clear();
    }
    Cart.hmDelete(options, callback);
}

function ClrCart() {
    var options = [];

    function callback() {
        var result = confirm("Are you sure to clear your cart?");
        if (result) {
            var lv = $("#cartList");
            lv.listview("refresh");
            location.reload(true);
            localStorage.clear();
        }
    }
    Cart.hmDeleteAll(options, callback);
}

function hmCheckOut() {
    var options = [];

    function callback(tx, results) {
        if (results.rows.length === 0) {
            window.alert("You cart is empty");
            $(location).prop('href', "#hmProductPage");
        }
        else {
            var htmlCode = "";
            var total = 0;
            var tax = 0;
            var final = 0;
            for (var i = 0; i < results.rows.length; i++) {
                var row = results.rows[i];
                localStorage.setItem("item" + i, row['itemId']);
                total += parseFloat(row['itemPrice']);
                tax = total * 0.13;
                final = (parseFloat(total) + parseFloat(tax)).toFixed(2);

                htmlCode += "<li>" +
                    "<img alt='CPlusBook' src=" + row['itemImage'] + " >" +
                    "<h1>" + row['itemName'] + "</h1>" +
                    "<h2 style='color: firebrick;'>Price: " + row['itemPrice'] + " $CAD</h2>" +
                    "</div>" +
                    "</li>" + "<br>";
            }
            total = total.toFixed(2);
            tax = tax.toFixed(2);
        }

        htmlCode += "<div class='ui-grid-a'>" +
            "<div style='font-weight: bold' class='ui-block-a'>Total Before Tax: " +
            "</div>" +
            "<div style='font-weight: bold; color: firebrick;' class='ui-block-b'>" + total + " $CAD" +
            "</div>" +
            "<div style='font-weight: bold' class='ui-block-a'>Tax: " +
            "</div>" +
            "<div style='font-weight: bold; color: firebrick;' class='ui-block-b'>" + tax + " $CAD" +
            "</div>" +
            "<div style='font-weight: bold' class='ui-block-a'>Total: " +
            "</div>" +
            "<div style='font-weight: bold; color: firebrick;' class='ui-block-b'>" + final + " $CAD" +
            "</div>" +
            "</div>";

        var lv = $("#checkOutList");
        lv = lv.html(htmlCode);
        lv.listview('refresh');
    }
    Cart.hmSelectAll(options, callback);
}

function hmAddNewOrder() {
    if(hmValidOrder()){
        console.info("Validation successfully");
        var orderId = randomOrder(5);
        var cusName = createFullName($("#hmFirstName").val(), $("#hmLastName").val());
        var street = $("#hmAddress").val();
        var city = $("#hmCity").val();
        var country = $("#hmCountry").val();
        var province = $("#hmProvince").val();
        var postalCode = $("#hmPostalCode").val();
        var address = createFullAddress(street, city, province, postalCode, country);

        var itemId = "";
        for(var i = 0; i < localStorage.length; i++) {
            if(i+1 === localStorage.length)  {
                itemId += localStorage.getItem("item" +i);
            }
            else {
                itemId += localStorage.getItem("item" +i) + ", ";
            }
        }
        var currentDate = new Date();
        var dd = currentDate.getDate();
        var mm = currentDate.getMonth();
        var yyyy = currentDate.getFullYear();
        var date = dd + "-" +(mm+1) + "-" + yyyy;
        var shippingDate = currentDate.getDate() + 5 + "-" + (mm+1) + "-" + yyyy;

        var opt = [orderId, cusName, address, itemId, date, shippingDate];

        function callback()
        {
            displayOrder();
            console.info("Order Add successfully");
            localStorage.setItem("id", orderId);
            $(location).prop('href', "#hmOrderPage");
        }

        Orders.hmInsert(opt, callback);
    }
    else {
        console.error("Validation failed");
    }
}

function displayOrder() {
    var id = localStorage.getItem("id");
    var options = [id];

    function callback(tx, results) {
        var row = results.rows[0];

        $("#hmOrderId").val(row['orderId']);
        $("#hmCusName").val(row['customerName']);
        $("#hmAddressOrder").val(row['address']);
        $("#hmDate").val(row['date']);
        $("#hmShippingDate").val(row['shippingDate']);
        orderItem();
    }
    Orders.hmSelect(options, callback);
}

function orderItem() {
    var options = [];

    function callback(tx, results) {
        var htmlCode = "";
        var total = 0;
        var tax = 0;
        var final = 0;
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            localStorage.setItem("item" + i, row['itemId']);
            total += parseFloat(row['itemPrice']);
            tax = total * 0.13;
            tax = tax.toFixed(2);
            final = (parseFloat(total) + parseFloat(tax)).toFixed(2);

            htmlCode += "<li>" +
                "<img alt='CPlusBook' src=" + row['itemImage'] + " >" +
                "<h1>" + row['itemName'] + "</h1>" +
                "<h2 style='color: firebrick;'>Price: " + row['itemPrice'] + " $CAD</h2>" +
                "</div>" +
                "</li>" + "<br>";
        }

        htmlCode += "<div class='ui-grid-a'>" +
            "<div style='font-weight: bold' class='ui-block-a'>Total Before Tax: " +
            "</div>" +
            "<div style='font-weight: bold; color: firebrick;' class='ui-block-b'>" + total.toFixed(2) + " $CAD" +
            "</div>" +
            "<div style='font-weight: bold' class='ui-block-a'>Tax: " +
            "</div>" +
            "<div style='font-weight: bold; color: firebrick;' class='ui-block-b'>" + tax + " $CAD" +
            "</div>" +
            "<div style='font-weight: bold' class='ui-block-a'>Total: " +
            "</div>" +
            "<div style='font-weight: bold; color: firebrick;' class='ui-block-b'>" + final + " $CAD" +
            "</div>" +
            "</div>";

        var lv = $("#OrderItemList");
        lv = lv.html(htmlCode);
        lv.listview('refresh');
    }
    Cart.hmSelectAll(options, callback);
}

function clearCurrentCart() {
    var options = [];

    function callback() {
        var lv = $("#cartList");
        lv.listview("refresh");
        localStorage.clear();
        $(location).prop('href', "#hmProductPage");
    }
    Cart.hmDeleteAll(options, callback);
}