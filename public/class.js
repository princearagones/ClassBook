var classes = [];
var teachers = [];
var students = [];
var classesEnrolled = [];
var studentclass = [];
var user;

(function init() {
	$(document).ready(function(){
		$("#formToAdd").hide();
		$("#formToEnroll").hide();
		$("#addClassRoom").submit(function(event){
			event.preventDefault();
			var flag = 0;
			var $form = $(this),
				rescoursecode = $("input[name='coursecode']").val();
				rescoursetitle = $("input[name='coursetitle']").val();
				ressection = $("input[name='section']").val();
				data = {
					"coursecode": rescoursecode,
					"coursetitle": rescoursetitle,
					"section": ressection,
					"userid": user.userid,
					"empno": user.employeeno
				}
				classes.forEach(function(classRoom){
					if(classRoom.coursecode == rescoursecode) flag = 1;
				});
				if(flag === 1){
					alert("Course code already exist");
				}
				else if (flag ===0){
					var posting = $.post("/class", data);
				//posting.done(function(){
					alert("Classroom added.");
					window.location.href = "/panel";
				//});
				}
		});
		$("#enrollClassRoom").submit(function(event){
			event.preventDefault();
			var flag = 0;
			var $form = $(this),
				rescoursecode = $("input[name='inputcode']").val();
				data = {
					"studnum": user.studno,
					"coursecode": rescoursecode
				}
				classes.forEach(function(classRoom){
					console.log(classRoom.coursecode+" "+rescoursecode);
					if(classRoom.coursecode == rescoursecode) flag = 1;
				});
				classesEnrolled.forEach(function(classRoom){
					if(classRoom.coursecode == rescoursecode) flag = 2;
				});
				if(flag === 0){
					alert("Course code does not exist");
				}
				if(flag === 2){
					alert("Already enrolled to the class");
				}
				else if (flag ===1){
					var posting = $.post("/studentEnrolled", data);
				//posting.done(function(){
					alert("Classroom enrolled.");
					window.location.href = "/panel";
				//});
				}
		});
		$.get("/studentEnrolled", function(data) {
			studentclass=data;
			});

		$.get("/teacher", function(data) {
			teachers=data;
			});
		
		$.get("/student", function(data) {
			students=data;
			});
		$.get("/class", function(data) {
			tempuser = "";
			classes=data;
			x = document.cookie;
			var temp = new Array();
			temp = x.split(";");
			temp.forEach(function(obj){
				keyvalue=[];
				keyvalue = obj.split("=");
				if(keyvalue[0].trim() == "userid"){
					tempuser = keyvalue[1];
				}

			});
			if(tempuser.split("\"")[15]== "teacher"){
					teachers.forEach(function(teacher){
					if(tempuser.split("\"")[3] == teacher.userid.toString()){
						user = teacher;
					}
				});
				$("#welcome").text("Hi "+user.name+"! Logged in as "+user.type);
			}
			else if(tempuser.split("\"")[15] == "student"){
				students.forEach(function(student){
					if(tempuser.split("\"")[3] == student.userid.toString()){
						user = student;
					}
				});
				$("#welcome").text("Hi "+user.name+"! Logged in as "+user.type);
				var getting = $.get("/studentEnrolled", function(data) {
					data.forEach(function(datum){
						if(datum.studnum == user.studno){
							classesEnrolled.push(datum);
						}
					});
				});
				$("#createClass").attr('value','Enroll To a Class');
				$("#createClass").attr('onclick','enrollToClass()');
			}
			var container = document.getElementById("container");
			if(user.type=="student"){
					getting.done(function(){
						classesEnrolled.forEach(function(CRoom){
							classes.forEach(function(classRoom){
								if(CRoom.coursecode == classRoom.coursecode){
									var a = document.createElement("a")
									var pan = document.createElement("div");
									pan.classList.add('classroompanel');
									var coursetitle= document.createElement("h4");
									var titletext=document.createTextNode(classRoom.coursetitle);	
									var section = document.createElement("p");
									var sectiontext=document.createTextNode(classRoom.section);
									
									section.appendChild(sectiontext);
									coursetitle.appendChild(titletext);
									pan.appendChild(coursetitle);
									pan.appendChild(document.createElement("br"));
									pan.appendChild(section);
									pan.appendChild(document.createElement("br"));
									var teacher = document.createElement("p");
									var teacherText =document.createTextNode("Teacher not specified");
									teachers.forEach(function(teacher){
									if(teacher.employeeno == classRoom.empno){
											teacherText=document.createTextNode(teacher.name);	
										}
									});
									var Unenroll = document.createElement("input");
									Unenroll.value = "Unenroll";
									Unenroll.type = "button";
									Unenroll.id = CRoom.id;
									Unenroll.className = "btn btn-danger"
									Unenroll.style= "height=150%;width=150%";
									Unenroll.addEventListener("click", function(){
										console.log(CRoom);
										unenrollClass(CRoom);
									});
									teacher.appendChild(teacherText);
									pan.appendChild(teacher);
									pan.appendChild(Unenroll);
									pan.appendChild(document.createElement("br"));
									a.appendChild(pan)
									container.appendChild(a);								}
							});
						
					});
					});
				}
			for(var i=0;i<classes.length;i++){
				if(user.type=="teacher" && classes[i].empno == user.employeeno){
				var a = document.createElement("a")
				var pan = document.createElement("div");
				pan.classList.add('classroompanel');
				var coursetitle= document.createElement("h4");
				var titletext=document.createTextNode(classes[i].coursetitle);	
				var section = document.createElement("p");
				var sectiontext=document.createTextNode(classes[i].section);
				
				section.appendChild(sectiontext);
				coursetitle.appendChild(titletext);
				pan.appendChild(coursetitle);
				pan.appendChild(document.createElement("br"));
				pan.appendChild(section);
				pan.appendChild(document.createElement("br"));
					var manage = document.createElement("input");
					manage.value = "Manage";
					manage.type = "button";
					manage.className = "btn btn-primary"
					manage.style= "height=150%;width=150%";
					pan.appendChild(manage);
					pan.innerHTML+= "<br/>";
					pan.innerHTML+= "<br/>";
					var deleteB = document.createElement("input");
					deleteB.value = "Delete";
					deleteB.id = i;
					deleteB.className ="btn btn-danger";
					deleteB.type = "button";
					deleteB.addEventListener("click", function(){
						console.log(this.id);
						deleteClass(classes[this.id]);
					});
					deleteB.style= "height=150%;width=150%";
					pan.appendChild(deleteB);
				a.appendChild(pan)
				container.appendChild(a);
				}
			}
		});
	});
})();
function createClass(){
		$("#formToAdd").fadeToggle();
		}
function enrollToClass(){
		$("#formToEnroll").fadeToggle();
}
function deleteClass(classToDelete){
		var r = confirm("Are you sure you want to delete this class?");
			if (r == true) {
				console.log(classToDelete);
				console.log(studentclass);
				studentclass.forEach(function(clas){
					if(clas.coursecode == classToDelete.coursecode){
						console.log ("Existing peeps enrolled");
						$.ajax({
						   url: '/studentEnrolled/'+clas.id,
						   type: 'DELETE',
						   success: function(response) {
						   }
						});
					}
				});
				$.ajax({
				   url: '/class/'+classToDelete.coursecode,
				   type: 'DELETE',
				   success: function(response) {
				   		alert("Successfully deleted");
						window.location.href = "/panel";
				   }
				});
			} else {
			}
	}
function unenrollClass(classToUnenroll){
		var r = confirm("Are you sure you want to unenroll this class?");
			if (r == true) {
				console.log(classToUnenroll);
				$.ajax({
				   url: '/studentEnrolled/'+classToUnenroll.id,
				   type: 'DELETE',
				   success: function(response) {
				   		alert("Successfully unenrolled");
						window.location.href = "/panel";
				   }
				});
			} else {
			}
	}	
