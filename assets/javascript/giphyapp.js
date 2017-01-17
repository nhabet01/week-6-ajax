//Giphy API Calls_NH
$(document).ready(function() {

    var superHeroes=["superman","batman","wonder woman", "the flash", "ironman","black widow","the incredible hulk", "cat woman", "jean grey", "mystique","wolverine"];
    var results;

    // Generic function for dumping the JSON content for each hero button into the giphyView div
    function displayHeroGifs(){
        // clear the giphyView div
        $('#giphyView').empty();

        var hero = $(this).attr('data-name');
        // var hero = event.target.getAttribute('data-name');
        hero = hero.replace(' ','+');
        hero = hero.toLowerCase()

        // Constructing a queryURL using the hero name
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        hero + "&api_key=dc6zaTOxFJmzC&limit=10";

           
        // Performing an AJAX request with the queryURL
        $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After data comes back from the request
        .done(function(response) {
            console.log(queryURL);
            console.log(response);
            // store data from AJAX request into results variable
            results = response.data;

            for (var i=0; i<results.length; i++){
              //create div to store gif + rating
              var heroDiv = $('<div>');
              var p=$('<p id = gifRating>').text("Rating: "+ results[i].rating);
              var heroGif = $('<img>');

              heroGif.attr('data-still', results[i].images.fixed_height_still.url);
              heroGif.attr('data-animate', results[i].images.fixed_height.url);
              heroGif.attr('src', heroGif.attr('data-still'));
              heroGif.on('click', function(){
                    
                    if($(this).attr('src') === $(this).attr('data-still')){
                        
                        $(this).attr('src', $(this).attr('data-animate'));

                    } 
                    else {
                        $(this).attr('src', $(this).attr('data-still'));
                    }
                });

                heroDiv.addClass('thumbnail');
                heroDiv.append(heroGif);
                heroDiv.prepend(p);
                
                $('#giphyView').append(heroDiv);

            }

        }); 
        //------
    }
    // Generic function for displaying hero buttons 
    function renderButtons(){ 

        // Deletes the hero buttons prior to adding new buttons (this is necessary otherwise you will have repeat buttons)
        $('#buttonsView').empty();

        // Loops through the array of superheroes
        for (var i = 0; i < superHeroes.length; i++){

            // Then dynamicaly generates buttons for each superhero in the array

            // Note the jQUery syntax here... 
            var a = $('<button>') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
            a.addClass('heroes'); // Added a class 
            a.attr('data-name', superHeroes[i]); // Added a data-attribute
            a.text(superHeroes[i]); // Provided the initial button text
            $('#buttonsView').append(a); // Added the button to the HTML
        }
    }


    // This function handles addition of new heros
    $('#add-hero').on('click', function(){
        event.preventDefault();

        // This line of code will grab the input from the textbox
        var hero = $('#hero-input').val().trim();
        console.log(hero);
        $('#hero-input').val(" ");

        // The hero from the textbox is then added to our array
        superHeroes.push(hero);
        console.log(superHeroes);
        
        // Our array then runs which handles the processing of our movie array
        renderButtons();

        // We have this line so that users can hit "enter" instead of clicking on the button and it won't move to the next page
        return false;
    })

    // ========================================================

    // Generic function for displaying the hero gifs
    $(document).on('click', '.heroes', displayHeroGifs);

    // ========================================================

    // This calls the renderButtons() function
    renderButtons();

});
