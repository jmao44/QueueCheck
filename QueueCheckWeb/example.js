var docClient = new AWS.DynamoDB.DocumentClient();
var markers= [];
function initMap() {
var params = {
    TableName: "tablename"
};

docClient.scan(params, onScan);

var noida = {lat: 28.475, lng: 77.601};
// The map, centered at Noida
var map = new google.maps.Map(
    document.getElementById('map'), {zoom: 10 , center: noida});
function onScan(err, data) {
    if (err) {
    alert("Ooops!! Some error occurred");
    } else {
        // Show markers at fetched locations
        data.Items.forEach(function(location) {
            var lati = location.Latitude;
            var longi = location.Longitude;
            var v_id  = location.Vehicle_Id;
            var latlng= new google.maps.LatLng(lati, longi);
            var iconimg = "https://img.icons8.com/ios/25/000000/sedan-filled.png"
        markers.push(new google.maps.Marker({position:latlng,map: map, title:"Vehicle No. "+ v_id.toString(), icon: iconimg}));
        });
    }
}
}