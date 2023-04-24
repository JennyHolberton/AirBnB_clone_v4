$(document).ready(function() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    var amenityIdList = [];

    function checkBox() {
        var amenityId = this.getAttribute('data-id');

        if (this.checked) {
            var $h4 = $("h4.amenities");
            amenityIdList.push(amenityId);
        } else {
            amenityIdList = amenityIdList.filter(function(amenity) {
                return amenity !== amenityId;
            });
        }
        updateH4();
    }
    function updateH4() {
        var amenityList = amenityIdList.join(', ');
        $("div.amenities h4").text(amenityList);
    }
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener("change", checkBox);
    }
});