
var userInput;
var articleCounter = 0;
var NYT;
var RT;

function NYTimes() {
  Input = $("#searchBar").val().trim();
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=9bbd8167715c47cf98ffd217a669c995&sort=newest&q=" + Input;
    $.ajax({
        url: queryURL,
        method: "GET"
      })

      .done(function(NYTresponse) {
        NytData = NYTresponse.response.docs;
        $("#display-article").empty();
        for (i = 0; i < 8; i++) {

        var newsURL = NytData[i].web_url;
        var nytArticleTitles = NytData[i].headline.main;
        
        articleCounter++;
        NYT = "<a href='" + newsURL + "'>" + "<li class='Nyt_article_list list-group-item'>" + nytArticleTitles + "</li></a>";

        $("#display-article").append(NYT);
          console.log("WooHoo");
    }
      });
}

function RToday() {
  Input = $("#searchBar").val().trim();
  
    var queryURLRT = 'https://newsapi.org/v2/everything?' +
      'q=' + Input + '&' +
      'sources=' + 'rt' + '&' +
      'sortBy=publishedAt&' +
      'language=en&' +
      'apiKey=0c00fa308b284243bbe4762d4db48e66';


    $.ajax({
      url: queryURLRT,
      method: "GET"
    }).done(function(RTresponse) {
        RTData = RTresponse.articles;
        $("#display-article2").empty();
        for (i = 0; i < 8; i++) {
          
        var RTArticleTitles = RTData[i].title;
        var RTurl = RTData[i].url;
          console.log(RTArticleTitles);

        articleCounter++;
        RT = "<a href='" + RTurl + "'>" + "<li class='rt_article_list list-group-item'>" + RTArticleTitles + "</li></a>";
          
        $("#display-article2").append(RT);
        }
    });
}

//mygtukai////

$("#submitBtn").on("click", function(event){
      event.preventDefault();
      NYTimes();
      RToday();
      keywordArray.push(userInput);
      createButton();
      $('#searchBar').val('');
      $('.appears').removeClass('appears');
});

// Pirmas mygtukas
$("#searchBar").keypress(function(event) {
  if (event.which == 13) {
      event.preventDefault();
      NYTimes();
      RToday();
      keywordArray.push(userInput);
      createButton();
      $('#searchBar').val('');
  }
});

// antras
var keywordArray = [];

function createButton() {
       $('.center-slider').empty();
       for (i = 0; i < keywordArray.length; i++) {
         $('.center-slider').append('<div><button class="previous-searches" onclick="NYTimes();RToday();createButton();">' + keywordArray[i] + '</button></div>');
      }
      }