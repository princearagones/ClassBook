var classes = [];
var teachers = [];
var students = [];
var user;

(function init() {
	$(document).ready(function(){
		$("#formToAdd").hide();
		$("#addClassRoom").submit(function(event){
			event.preventDefault();
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
				var posting = $.post("/class", data);
				//posting.done(function(){
					alert("Classroom added.");
					window.location.href = "/panel";
				//});
		});
		$.get("/teacher", function(datas) {
			teachers=datas;
			});
		$.get("/student", function(datas) {
			students=datas;
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
			}
			var container = document.getElementById("container");
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
					manage.style= "height=150%;width=150%";
					pan.appendChild(manage);
				a.appendChild(pan)
				container.appendChild(a);
				}
				else if(user.type=="student"){
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
				var teacher = document.createElement("p");
				var teacherText =document.createTextNode("Teacher not specified");
				teachers.forEach(function(teacher){
				if(teacher.employeeno == classes[i].empno){
						teacherText=document.createTextNode(teacher.name);	
					}
				});
				teacher.appendChild(teacherText);
				pan.appendChild(teacher);
				pan.appendChild(document.createElement("br"));
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