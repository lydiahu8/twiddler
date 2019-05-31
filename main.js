$(document).ready(function(){
  
  var $feed = $('.friendsTweet');
  $feed.html('');

  //Show the user new tweets

  var generateNewsfeed = function(tweets) {
    
    //Start at the last element in the tweet array
    //Tweets need to be displayed in reverse chronological order. 

    var index = tweets.length - 1;
    
    while(index >= 0) {
      var tweet = tweets[index];

      //Create new create target element

      var $tweet = $('<div class="singleTweet">');
      var timeAgo = moment(tweet.created_at).fromNow();

      //Make tweets display username and message

      $tweet.append(`<a class='user' data=${tweet.user}>@${tweet.user}</a>`);
      $tweet.append(`<p class="content">${tweet.message}</p>`);

      //Display timestamp of when the tweets were created in a human friendly way

      $tweet.append(`<p class="timestamp">${timeAgo}</p>`);

      // Display the feed in newsfeed section
      $tweet.appendTo($feed);
      index -= 1;
    }
  };

  //Initial Home Page
  var runHomePage = function() {
    $feed.html("");
    generateNewsfeed(streams.home);
  };

  //Get all user tweets to display on user's timeline 
  var getUserTweets = function() {
    $feed.html("");
    var username = $("#username").html();

    generateNewsfeed(streams.users[username]);
  }

  //Allow the user to tweet.

  $('.submit').on('click', function() {

    var inputText = $('.typeHere').val();
    var currentUser = $('#username').html()
    var users = streams.users;
    var isFirstTweet = true;

    for (var key in users) {
      if (key === currentUser) {
        isFirstTweet = false;
      }
    }

    var tweetObj = {
      user: currentUser,
      message: inputText,
      created_at: new Date()
    };

    if (!isFirstTweet) {
      users[currentUser].push(tweetObj);
      $('.typeHere').val('');
    } else {
      users[currentUser] = []
      users[currentUser].push(tweetObj);
      $('.typeHere').val('');
    }

  });


  //Click button to view default user tweets

  $('#click1').on('click', function() {

    if ($('#username').html() === 'lydia') {
      runHomePage();
    } else {
      getUserTweets();
    }

  });

  //Allow the user to click on a username to see that user's timeline

  $(document).on("click", ".user", function() {
    $feed.html('');

    var selectedUser = $(this).attr('data');
    var selectedUserTweets = [];
    var numSelectedUserTweets = 0;

    for (var key in streams.users) {
      if (key === selectedUser) {
        selectedUserTweets = streams.users[key];

        numSelectedUserTweets = streams.users[key].length;

        $("#username").text(selectedUser);
        getUserTweets();
      }
    }

  });

  //Click Back to Home Page to go back to home newsfeed

  $(document).on('click', '#clickHome', function() {
    $feed.html('')

    runHomePage();

    $("#username").text('lydia')
  });

  //Click on default username to view own tweets

  $(document).on('click', '#username', function() {
    $feed.html('');

    var selectedUser = $('#username').html();
    var selectedUserTweets = [];

    for (var key in streams.users) {
      if (key === selectedUser) {
        selectedUserTweets = streams.users[key];

        $("#username").text(selectedUser);

        getUserTweets();
      }
    }

  })

  //Run initial Home Page

  runHomePage();

});

