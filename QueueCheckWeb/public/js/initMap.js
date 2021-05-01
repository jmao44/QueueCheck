function initMap() {
    const gt = { lat: 33.7756, lng: -84.3963}
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: gt
    })
    const marker = new google.maps.Marker({
        position: gt,
        map: map,
    })
}

module.exports = initMap