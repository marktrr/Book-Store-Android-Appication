/**
 File: navigation.js
 Full Name: Hy Minh Tran
 Student #: 7910276
 Mobile Application 1 - FINAL PROJECT
 Created: April 5th, 2019
 **/

function getNavigation() {
    $.ajax({
        url: "https://geoip-db.com/jsonp",
        jsonpCallback: "callback",
        dataType: "jsonp",
        success: function( location ) {
            $('#hmCountry').val(location.country_name);
            $('#hmProvince').val(location.state);
            $('#hmCity').val(location.city);
        }
    });
}