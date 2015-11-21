var account = [];
var teachers = [];
var students = [];

(function init() {
	$(document).ready(function(){
		$.get("/teacher",function(data){
			teachers = data;
		});
		$.get("/student",function(data){
			students = data;
		});
		$.get("/account", function(data) {
			account=data;
		});

		$("#addCurriculum").submit(function(event){
		event.preventDefault();
		var $form = $(this),
			name = $form.find("input[name='name']").val(),
			code = $form.find("input[name='code']").val(),
			degreeProgramId = $form.find("input[name='degreeProgramId']").val(),
			url = $form.attr('action');
			
			var posting = $.post(url, {
				name: name,
				code: code,
				degreeProgramId: degreeProgramId
			});
			
			posting.done(function(){
				alert("Curriculum added.");
				window.location.href = "home.html";
			});
	});
	});
})();

function validateForm() {
	var x = document.getElementById("Username").value;
	var y = document.getElementById("Password").value;
	var flag = 0;
	account.forEach(function(acc){
		if (x === acc.username && y === acc.password) {	
			document.cookie = "userid="+JSON.stringify(acc);
			flag = 1;
		}
	});
	if(flag === 1){
		return true;}
	else{
	alert("Invalid Username or password");
	return false;
	}
}
