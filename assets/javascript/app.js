// API key =4NWQSXVMf0vi6WcWVDdWRahL40ABo8Qn

var animals = ["Dog", "Cat", "Hamster", "Bear"];

function renderButtons() {
    $("#giph-view").empty();
    for (var i = 0; i < animals.length; i++) {
        var a = $("<button>");
        a.addClass("animal");
        a.attr("data-name", animals[i]);
        a.text(animals[i]);
        $("#giph-view").append(a);
    }
}


$("#add-giph").on("click", function (event) {
    event.preventDefault();
    var animal = $("#giph-input").val().trim();
    animals.push(animal);
    $("#giph-input").val("");
    renderButtons();
});
renderButtons();

function displayGiphy() {

    var newGiph = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + newGiph + "&api_key=4NWQSXVMf0vi6WcWVDdWRahL40ABo8Qn&limit=10";


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)

        var results = response.data
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");
            gifDiv.addClass("display");
            var p = $("<p>").text("Rating: " + results[i].rating);
            var p2 = $("<p>").text("Title: " + results[i].title);
            var p3 = $("<p>").text("Source: " + results[i].source_tld);
            var favorite = $("<button>").text("Favorite")
            favorite.addClass("favorite");
            var image = $("<img>");
            image.attr("src", results[i].images.fixed_height_still.url);
            image.attr("data-still", results[i].images.fixed_height_still.url);
            image.attr("data-animate", results[i].images.fixed_height.url);
            image.attr("state", "still");
            image.addClass("image");
            gifDiv.append(p);
            gifDiv.append(p2);
            gifDiv.append(p3);
            gifDiv.append(image);
            gifDiv.append(favorite);
            $("#giph-here").prepend(gifDiv);
            image.on("click", function () {
                var state = $(this).attr("state");
    
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("state", "still");
                }
            })


        }
       

        $(".favorite").on("click", function () {
            console.log("yay")
            $("#favorites").append(gifDiv);
            var storeRating = JSON.stringify(p);
            var storeImage = JSON.stringify(image);
            localStorage.setItem("rating",storeRating);
            localStorage.setItem("image",storeImage);
           


        })

    })
}
$(document).on("click", ".animal", displayGiphy);

