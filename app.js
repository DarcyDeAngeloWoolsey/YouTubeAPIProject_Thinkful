/*GLOBAL VARIABLES*/

var YouTube_Search_URL = "https://www.googleapis.com/youtube/v3/search"
var query = "";

/*REQUEST RESULTS*/

//on submit, get results, make results a string if they aren't already, make q equal to that string

function cookieJar(scoinew, woeoifjerj) {
    var scoinew;
    var woeoifjerj;

    var coookie = woeoifjerj * scoinew;

    return cookie;
}


function requestResults(searchTerm) {
    //    console.log(searchTerm);

    //$.getJSON("url", {settingsObject }, function (receivedApiData) { callBackFunction  });

    $.getJSON("https://www.googleapis.com/youtube/v3/search", {
            part: "snippet", //Youtube API special parameter (please check documentation here https://developers.google.com/youtube/)
            maxResults: 20, //number of results per page
            key: "AIzaSyCrbW07tAes0L1UKxHM3VH5KS3QEYYWyFE",
            q: searchTerm, //shearch query from the user
            type: "video" //only return videos (no channels or playlists) so we can take the video ID and link it back to Youtube
        },
        function (receivedApiData) {
            //show the json array received from the API call
            //console.log(receivedApiData);
            // if there are no results it will just empty the list
            if (receivedApiData.pageInfo.totalResults == 0) {
                alert("No videos found!");
            }
            //if there are results, call the displaySearchResults
            else {
                showResults(receivedApiData.items);
            }
        });

}



/* SHOW RESULTS */

//ive done this wrong, check the jsbin
function showResults(requestResults) {
    console.log(requestResults);
    var buildTheHtmlOutput = "";

    $.each(requestResults, function (requestResultsKey, requestResultsValue) {
        //create and populate one LI for each of the results ( "+=" means concatenate to the previous one)
        buildTheHtmlOutput += "<li>";
        buildTheHtmlOutput += "<p>" + requestResultsValue.snippet.title + "</p>"; //output vide title
        buildTheHtmlOutput += "<a href='https://www.youtube.com/watch?v=" + requestResultsValue.id.videoId + "' target='_blank'>"; //taget blank is going to open the video in a new window
        buildTheHtmlOutput += "<img src='" + requestResultsValue.snippet.thumbnails.high.url + "'/>"; //display video's thumbnail
        buildTheHtmlOutput += "</a>";
        buildTheHtmlOutput += "</li>";
    });

    //use the HTML output to show it in the index.html
    $(".searchResults ul").html(buildTheHtmlOutput);
}






/* DOCUMENT READY */





$(document).ready(function () {
    $(".js-results").hide();


    $(".js-search-form").submit(function (event) {
        event.preventDefault();
        $(".js-results").show();
        $(".searchSection").hide();

        var userSearch = $(".js-query").val();

        requestResults(userSearch);
    });

    //    $(".search").click(function (event) {
    //        event.preventDefault();
    //
    //
    //
    //        submitSearch();
    //
    //    });
    // requestResults();
    //  showResults();


});
