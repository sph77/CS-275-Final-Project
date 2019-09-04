var courseData = null;
// Save entire json
function courses()
{
	var URL = "../courses"; 
	$.ajax({
		type : "GET",
		url : URL,
		dataType : "JSON",
		cors: true,
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
		success : function(json) { // On success, save and load table
			courseData = json;
			var table = "<table class='table'><tr><th>Subject</th><th>Number</th><th>Title</th><th>Instructor</th><th>Discussion Page</th></tr>";
			var subjectDrop = "<select class='form-control form-control-sm' id='subjectDrop'><option value='ALL'>ALL</option>";
			var subjects = ['ALL'];
			var numberDrop = "<select class='form-control form-control-sm' id='numberDrop'><option value='ALL'>ALL</option>";
			var numbers = ['ALL'];
			var titleDrop = "<select class='form-control form-control-sm' id='titleDrop'><option value='ALL'>ALL</option>";
			var titles = ['ALL'];
			var instructorDrop = "<select class='form-control form-control-sm' id='instructorDrop'><option value='ALL'>ALL</option>";
			var instructors = ['ALL'];
			for (var i=0; i < json.length; i++) {
				var obj = json[i];
				if (!subjects.includes(obj.subject))
				{
					subjects.push(obj.subject);
					subjectDrop += "<option value='" + obj.subject + "'>" + obj.subject + "</option>";
				}
				if (!numbers.includes(obj.number))
				{
					numbers.push(obj.number);
					numberDrop += "<option value='" + obj.number + "'>" + obj.number + "</option>";
				}
				if (!titles.includes(obj.title))
				{
					titles.push(obj.title);
					titleDrop += "<option value='" + obj.title + "'>" + obj.title + "</option>";
				}
				if (!instructors.includes(obj.instructor))
				{
					instructors.push(obj.instructor);
					instructorDrop += "<option value='" + obj.instructor + "'>" + obj.instructor + "</option>";
				}

				table += "<tr><td>" + obj.subject + "</td><td>" + obj.number + "</td><td>" + obj.title + "</td><td>" + obj.instructor + "</td><td><a href='../courses/" + obj.crn + "'>Discussion</a></td></tr>";
			}
			table += "</table>";
			subjectDrop += "</select>";
			numberDrop += "</select>";
			titleDrop += "</select>";
			instructorDrop += "</select>";
			$("#table").html(table);
			$("#subject").html(subjectDrop);
			$("#number").html(numberDrop);
			$("#title").html(titleDrop);
			$("#instructor").html(instructorDrop);
		},
		error : function(xhr) { // On failure, populate the div with error message
			$("#table").text("There was an error with your request");
		}
	});
}

function search() {
	var table = "<table class='table'><tr><th>Subject</th><th>Number</th><th>Title</th><th>Instructor</th><th>Discussion Page</th></tr>";
	var subject = $("#subjectDrop").val();
	var number = $("#numberDrop").val();
	var title = $("#titleDrop").val();
	var instructor = $("#instructorDrop").val();
	for (var i=0; i < courseData.length; i++) {
		var obj = courseData[i];
		if (	(subject == "ALL" || subject == obj.subject) &&
			(number == "ALL" || number == obj.number) &&
			(title == "ALL" || title == obj.title) &&
			(instructor == "ALL" || instructor == obj.instructor)	)
		table += "<tr><td>" + obj.subject + "</td><td>" + obj.number + "</td><td>" + obj.title + "</td><td>" + obj.instructor + "</td><td><a href='../courses/" + obj.crn + "'>Discussion</a></td></tr>";
	}
	$("#table").html(table);
}

window.onload = function() {
	courses(); // Load courses
}
