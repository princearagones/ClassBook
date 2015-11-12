var account = [];

(function init() {
	$(document).ready(function(){
		$.get("/account", function(data) {
			account=data.rows;
			for(var i=0;i<account.length;i++){
				console.log(account[i].username +" "+ account[i].type);
			}
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
	console.log(x);
	console.log(y);
	account.forEach(function(acc){
		console.log(acc.username);
		console.log(acc.password);
		if (x === acc.username && y === acc.password) {
			flag = 1;
		}
	});
	if(flag === 1){return true;}
	else{
	alert("Invalid Username or password");
	return false;
	}
}
