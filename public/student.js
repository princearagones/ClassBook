var account=[];
var student=[];
var data={};

(function init() {
	$(document).ready(function(){
		$.get("/student", function(data) {
		student=data;
		});
		
	$.get("/account", function(data) {
		account=data;
		});
	$("#addStudent").submit(function(event){
			event.preventDefault();
			var flag = 0;
			var $form = $(this),
				resname = $("input[id='firstName']").val();
				resusername = $("input[id='Username']").val();
				respassword = $("input[id='password']").val();
				resstudno = $("input[id='Studno']").val();
				rescontact = $("input[id='Contactno']").val();
				resemail = $("input[id='email']").val();
				data = {
					"username": resusername,
					"password": respassword,
					"name": resname,
					"studno": resstudno,
					"type": "student",
					"userid": "null",
					"connum": rescontact,
					"email": resemail
				}
				account.forEach(function(acc){
					if(acc.username == resusername) flag = 1;
				});
				student.forEach(function(acc){
					if(acc.studno == resstudno) flag = 2;
				});
				if(flag === 1){
					alert("Username already exist");
				}
				else if (flag == 2){
					alert("Student number already used");
				}
				else if (flag ===0){
					var posting = $.post("/account", data);					alert(data);
					var getOne = $.get("/account/"+data.username,function(one){
						data.userid= one[0].userid;
						console.log(data);
						var posting2 = $.post("/student", data)
						$.post("/email",data)
						$.post("/contact", data)
						alert("Successfully Created");

					});
					window.location.href = "/";
				}
		});
	});
})();