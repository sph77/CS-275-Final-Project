
var ratingData = null;
var rating = null;
var text = null;
// Save rating data and load in
function getrating()
{
	var URL = "../ratings/" + $("#CRNdiv").text(); 
	$.ajax({
		type : "GET",
		url : URL,
		dataType : "JSON",
		cors: true,
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
		success : function(json) { // On success, save and load table
			ratingData = json;
			if (ratingData.rating <= 0)
			{
				$("#RatingDiv").text("Not yet rated");
			}
			else
			{
				var calcrating = ratingData.rating / ratingData.count;
				$("#RatingDiv").text("Rating: " + calcrating.toFixed(2));
			}
		},
		error : function(xhr) { // On failure, populate the div with error message
			$("#RatingDiv").text("There was an error with your request");
		}
	});
}

function saverating()
{
	if ($("#5-stars").is(':checked'))
	{
		rating = 5;
	}
	else if ($("#4-stars").is(':checked'))
	{
		rating = 4;
	}
	else if ($("#3-stars").is(':checked'))
	{
		rating = 3;
	}
	else if ($("#2-stars").is(':checked'))
	{
		rating = 2;
	}
	else if ($("#1-star").is(':checked'))
	{
		rating = 1;
	}
	else
	{
		rating = 0;
	}
	ratingData.rating += rating;
	ratingData.count += 1;
	var URL = "../ratings/" + $("#CRNdiv").text();
	$.ajax({
		type : "POST",
		url : URL,
		data : { rating : rating },
		dataType : "text",
		cors: true,
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
		success : function(n) { // On success, save and load rating
			var calcrating = ratingData.rating / ratingData.count;
			$("#RatingDiv").text("Rating: " + calcrating.toFixed(2));
		},
		error : function(xhr) { // On failure, populate the div with error message
			$("#RatingDiv").text("There was an error with your request");
		}
	});
}

function getcomment()
{
	var URL = "../comments/" + $("#CRNdiv").text(); 
	$.ajax({
		type : "GET",
		url : URL,
		dataType : "JSON",
		cors: true,
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
		success : function(json) { // On success, save and load table
			var commentData = JSON.parse(json.data);
			var html = "";
			for (var i = 0; i < commentData.length; i++) {
				var obj = commentData[i];
				var ratingVar = commentData[i].rating;
				var messageVar = commentData[i].comment;
				html = "<p1 id='comment1'><strong>Rating : " + ratingVar + "</strong><br>" + messageVar + "</p1>" + html;
			}
			$("#comments").html(html);
		},
		error : function(xhr) { // On failure, populate the div with error message
			$("#RatingDiv").text("There was an error with your request");
		}
	});
}
function savecomment()
{
	text = $("#comment").val();
	var URL = "../comments/" + $("#CRNdiv").text();
	$.ajax({
		type : "POST",
		url : URL,
		data : { rating : rating, text : text },
		dataType : "text",
		cors: true,
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
		success : function(n) { // On success, add comment
			var html = "<p1 id='comment1'><strong>Rating : " + rating + "</strong><br>" + text + "</p1>" + $("#comments").html();
			$("#comments").html(html);
		},
		error : function(xhr) { // On failure, populate the div with error message
			$("#RatingDiv").text("There was an error with your request");
		}
	});
}

function sendthot()
{
	saverating();
	savecomment();
}

window.onload = function() {
	getrating(); // Load rating
	getcomment(); // Load comments
	chat();//Load messaging
}
