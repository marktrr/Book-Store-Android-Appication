/**
 File: HMglobal.js
 Full Name: Hy Minh Tran
 Student #: 7910276
 Mobile Application 1 - FINAL PROJECT
 Created: April 5th, 2019
**/
function hmProductPage_show() {
    hmUpdateBook();
}

function hmCartPage_show() {
    hmShowCart();
    addToCart();
}

function btnClrCart_click() {
    ClrCart();
}

function hmCheckOutPage_show() {
    hmCheckOut();
}

function btnSubmit_click() {
    hmAddNewOrder();
}

function hmOrderPage_show() {
    displayOrder();
}

function btnNavigation_click() {
    getNavigation();
}

function hmFinishBtn_click() {
    clearCurrentCart();
}

function init(){
    $("#hmProductPage").on("pageshow", hmProductPage_show);
    $("#hmCartPage").on("pageshow", hmCartPage_show);
    $("#ClrCart").on("click", btnClrCart_click);
    $("#hmCheckOutPage").on("pageshow", hmCheckOutPage_show);
    $("#btnSubmitOrder").on("click", btnSubmit_click);
    $("#hmOrderPage").on("pageshow", hmOrderPage_show);
    $("#hmNavigation").on("click", btnNavigation_click);
    $("#hmFinishBtn").on("click", hmFinishBtn_click);
}

function initDB()
{
    try
    {
        DB.hmCreateDatabase();
        if (db)
        {
            DB.hmCreateTables();
        }
        else
        {
            console.error("Error: Cannot create tables: Database does not exist");
        }
    }
    catch (e)
    {
        console.error("Error: (Fatal) Error in initDB(). Cannot proceed");
    }
}

$(function(){
    init();
    initDB();
});