// ------------------------------------------------------------------------
// Trip Array
// ------------------------------------------------------------------------

const arrTrips = [
    {
      name: "Queen Ocean",
      price: 38000,
      description: "Experience a Mediterranean voyage aboard a cruise ship. Departing from the city of Barcelona, your journey takes you to the enchanting ports of La Goulette, Palermo, Naples, Genoa, and Marseille, each offering a blend of culture, history, and cuisine. After a exploration of these destinations, your cruise returns full circle to Barcelona.",
      image: "cruise ship 1.png",
      destinations: "multiple",
      roundTrip: "round",
      cost: "High",
      stop: 6,
      addedDate: "long",
      origin: "Barcelona"
    },
    {
        name: "Island Princess",
        price: 5000,
        description: "Experience a Mediterranean voyage aboard our cruise ship departing from Valencia, Spain. Set sail towards the island of Palma, where azure waters and picturesque landscapes await. After exploring Palma's charming streets, the cruise returs to Valencia.",
        image: "cruise ship 2.png",
        destinations: "single",
        roundTrip: " ",
        cost: "low",
        stop: 2,
        addedDate: "short",
        origin: "Valenia"
    },
    {
        name: "Coastle Cruise",
        price: 1000,
        description: "Experience the coastal beauty on a Mediterranean cruise that begins in Tarragona and concludes of Nice. This cruise ship offers world-class amenities, including gourmet dining, and entertainment options, all while navigating the Mediterranean coastline. Enjoy the cultural heritage and vistas as you sail from Spain to France.",
        image: "cruise ship 3.png",
        destinations: "single",
        roundTrip: " ",
        cost: "high",
        stop: 1,
        addedDate: "short",
        origin: "Tarragona"
    },
    {
        name: "Hopper",
        price: 9000,
        description: "Experience the Mediterranean's unforgettable cruise journey that departs from Barcelona, Spain. Set sail on a cruise ship equipped with breathtaking ocean views. Your itinerary includes stops at three destinations: Ibiza, Palma, and Mahon, the capital of Menorca. After exploring these destinations, your voyage circles back to Barcelona.",
        image: "cruise ship 4.png",
        destinations: "multiple",
        roundTrip: "round",
        cost: "high",
        stop: 4,
        addedDate: "short",
        origin: "Barcelona"
    },
    {
        name: "Marry way",
        price: 3800,
        description: "Experience the Mediterranean aboard our cruise ship as it embarks on a journey from Valencia to  Gibraltar. With elegant design and world-class amenities, this ship offers a blend of relaxation and adventure. Revel in breathtaking sea views.",
        image: "cruise ship 5.png",
        destinations: "single",
        roundTrip: " ",
        stop: 1,
        addedDate: "short",
        cost: "low",
        origin: "Valencia"
    },
    {
        name: "Mediterranean Prince",
        price: 9800,
        description: "Luxurious cruise from Barcelona to Nice, Alghero, Tunis, Algiers, and Valencia, offering breathtaking views and unparalleled relaxation.",
        image: "cruise ship 6.png",
        destinations: "multiple",
        roundTrip: " ",
        stop: 5,
        addedDate: "short",
        cost: "high",
        origin: "Barcelona"
    },
    {
        name: "Cross Country",
        price: 15000,
        description: "Experience luxury aboard a Mediterranean cruise ship departing from Barcelona, visiting Nice, Naples, Palermo, Tunis, Algiers, and concluding in Valencia. Unforgettable destinations await.",
        image: "cruise ship 7.png",
        destinations: "multiple",
        roundTrip: " ",
        stop: 6,
        addedDate: "long",
        cost: "high",
        origin: "Barcelona"
    },
    {
        name: "Sea Side",
        price: 3800,
        description: "Experience luxury on a captivating cruise ship journey from Gibraltar to Barcelona. Enjoy stunning Mediterranean views, gourmet dining, and enriching shore excursions on this unforgettable voyage.",
        image: "cruise ship 8.png",
        destinations: "signle",
        roundTrip: "round",
        stop: "1",
        addedDate: "short",
        cost: "low",
        origin: "Gibralta"
    },
];
  
  let appliedFilter = "";
  let appliedSort = "date added";
  
  // ------------------------------------------------------------------------
  // When the document loads
  // ------------------------------------------------------------------------
  
  $(document).ready(function(){
  
      console.log("Hello");
  
      // ------------------------------------------------------------------
      // Home
  
      // When the document loads, animate the hero image upwards
      $("#hero-image").animate({top: '-=100px'});
  
      // ------------------------------------------------------------------
      // Browse
  
      filterSortTrips();
  
  });
  
  // ------------------------------------------------------------------------
  // Load all trips
  // ------------------------------------------------------------------------
  
  function loadTrips(tripsToShow) {
  
    // Clear all elements inside the trips cards container
  
    $("#tripsContainer").empty();
  
    // Loop though trips
  
    for (let i = 0; i < tripsToShow.length; i++) {
        const trips = tripsToShow[i];
        
        console.log(trips.name);

        // Open weather API call for getting the temprature
        $.ajax({
        type: "GET",
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + trips.origin + "&appid=0c8a911e5c7f8e5a03991afe2075de21",
            success: function (data) {
                tempData = data;
                console.log(tempData);
            },
        }).done(function () {

            // Set Temperature
            $(currentChild).find("#originTemp").text("Origin Temp: " + Math.round(tempData.main.temp- 273) + "°C");
        
        
        });

        // 1: Select the trips container add the trips card to it
        $("#tripsContainer").append($("#tripsCardTemplate").html());

        // 2: Create a variable that contains the most recently added trips card
        let currentChild = $("#tripsContainer").children().eq(i);

        // 3: Set the content for the current trips card from the trips array
        $(currentChild).find("#nameText").text(trips.name);
        $(currentChild).find("#priceText").text("R" + trips.price);
        $(currentChild).find("#descriptionText").text(trips.description);
        $(currentChild).find(".card-img-top").attr('src','assets/' + trips.image);
        $(currentChild).find("#destinationText").text(trips.destination)
        $(currentChild).find("#roundTrips").text(trips.roundTrips)
        $(currentChild).find("#stopNum").text(trips.stopNum)
        $(currentChild).find("#timeText").text(trips.time)
        $(currentChild).find("#costPrice").text(trips.costPrice)

        // 4: Hide the description text from the curent card
        $(currentChild).find("#descriptionText").hide();
        $(currentChild).find("#originTemp").hide();
        $(currentChild).find("#destinationText").hide();
        $(currentChild).find("#roundTrips").hide();
        $(currentChild).find("#stopNum").hide();
        $(currentChild).find("#timeText").hide();
        $(currentChild).find("#costPrice").hide();

    };
  
};
  
// ------------------------------------------------------------------------
// When a filter or sort option is clicked
// ------------------------------------------------------------------------
  
$("input[name='filterRadio']").click(function(){
    appliedFilter = $(this).attr('value');

    filterSortTrips();
});

$("input[name='sortRadio']").click(function(){
    appliedSort = $(this).attr('value');

    filterSortTrips();
});
  
function filterSortTrips() {

    let filteredSortedArrTrips = [];

    console.log(appliedFilter);
    console.log(appliedSort);

    // Filter Trips

    if (appliedFilter) {
        filteredSortedArrTrips = arrTrips.filter(trips => trips.roundTrip == appliedFilter);
    } else {
        filteredSortedArrTrips = arrTrips
    }

   

    // Sort Trips

    if (appliedSort == "low to high") {

        // Sort plants from the lowest to highest price
        filteredSortedArrTrips = filteredSortedArrTrips.sort((a, b) => {
            return a.price - b.price;
        });

    } else if (appliedSort == "time"){

        // Sort trips from the newest to oldest
        filteredSortedArrTrips = filteredSortedArrTrips.sort((a, b) => {
            let da = new Date(a.addedDate);
            let db = new Date(b.addedDate);
          return db - da;
        });
    
    }

   
    console.log(filteredSortedArrTrips)
    loadTrips(filteredSortedArrTrips);

}

// ------------------------------------------------------------------------
// When a trips card is clicked
// ------------------------------------------------------------------------
  
$("#TripsContainer").on('click','.card', function() {

    // Toggle the price & description text
    $(this).find("#priceText").toggle();
    $(this).find("#descriptionText").toggle();
    $(this).find("#originTemp").toggle();
    $(this).find("#destinationText").toggle();
    $(this).find("#roundTrips").toggle();
    $(this).find("#stopNum").toggle();
    $(this).find("#timeText").toggle();
    $(this).find("#costPrice").toggle();

    // Resize the image to fit the additional content
    $(this).find(".card-img-top").toggleClass("small");

});
  
  
  
$(document).ready(function(){

    $.ajax({
        type:"GET",
        url:"https://api.openweathermap.org/data/2.5/weather?q=Pretoria&appid=ce99ac815b1a9674667be6acd3c6b6ac",
        success: function(data){

            tempDate = data 

            console.log(data)
        }
    }).done(function(){
        $("#tempData").html(tempData.main)
    })
})