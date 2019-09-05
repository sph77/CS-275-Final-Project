
var ratingData = null;
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
			if (ratingData.rating < 0)
			{
				$("#RatingDiv").text("Not yet rated");
			}
			else
			{
				$("#RatingDiv").text("Rating: " + ratingData.rating);
			}
		},
		error : function(xhr) { // On failure, populate the div with error message
			$("#RatingDiv").text("There was an error with your request");
		}
	});
}

window.onload = function() {
	getrating(); // Load rating
}
