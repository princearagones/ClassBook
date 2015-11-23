var account=[];
var teacher=[];
var data={};

(function init() {
	$(document).ready(function(){
		$.get("/teacher", function(data) {
		teacher=data;
		});
		
	$.get("/account", function(data) {
		account=data;
		});
	$("#addTeacher").submit(function(event){
			event.preventDefault();
			var flag = 0;
			var $form = $(this),
				resname = $("input[id='firstName']").val();
				resusername = $("input[id='Username']").val();
				respassword = $("input[id='password']").val();
				resempno = $("input[id='empno']").val();
				rescontact = $("input[id='Contactno']").val();
				resemail = $("input[id='email']").val();
				data = {
					"username": resusername,
					"password": respassword,
					"name": resname,
					"employeeno": resempno,
					"type": "teacher",
					"userid": "null",
					"connum": rescontact,
					"email": resemail
				}
				account.forEach(function(acc){
					if(acc.username == resusername) flag = 1;
				});
				teacher.forEach(function(acc){
					if(acc.employeeno == resempno) flag = 2;
				});
				if(flag === 1){
					alert("Username already exist");
				}
				else if (flag == 2){
					alert("Employee number already used");
				}
				else if (flag ===0){
					var posting = $.post("/account", data);
					var getOne = $.get("/account/"+data.username,function(one){
						data.userid= one[0].userid;
						console.log(data);
						var posting2 = $.post("/teacher", data)
						$.post("/email",data)
						$.post("/contact", data)
						alert("Sucessfully Created");
						window.location.href = "/";
					});
					
				}
		});
	});
})();