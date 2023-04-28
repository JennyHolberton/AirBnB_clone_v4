$(document).ready(function () {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  var amenityIdList = [];

  function checkBox() {
    var amenityId = this.getAttribute('data-id');

    if (this.checked) {
      var $h4 = $("h4.amenities");
      amenityIdList.push(amenityId);
    } else {
      amenityIdList = amenityIdList.filter(function (amenity) {
        return amenity !== amenityId;
      });
    }
    updateH4();
  }
  function updateH4() {
    var amenityList = amenityIdList.map(function (amenityId) {
      return $('[data-id="' + amenityId + '"]').data('name');
    }).join(', ');
    $("div.amenities h4").text(amenityList);
  }
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("change", checkBox);
  }
  $('button[type="button"]').on("click", function () {
    $.post({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: JSON.stringify({ amenities: amenityIdList }),
      success: function (data) {
        searchPlaces(data);
      },
      contentType: "application/json"
    });
  });
});

$(document).ready(function () {
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    checkStatus(data);
  });
});

function checkStatus(data) {
  if (data.status == 'OK') {
    $('#api_status').addClass('available');
  } else {
    $('#api_status').removeClass('available');
  }
}

$(document).ready(function () {
  $.post({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    data: JSON.stringify({}),
    success: function (data) {
      searchPlaces(data);
    },
    contentType: "application/json"
  });
});

function searchPlaces(data) {
  data.forEach(function (item) {
    var newArticle = document.createElement("article");
    var placesSection = document.getElementsByClassName("places")[0];
    placesSection.appendChild(newArticle);
    console.log(item);
  });
}
