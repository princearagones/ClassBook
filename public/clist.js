var studentclass = [];
var students = [];


var user = [];
var temp = [];
var old_cookie;
data = document.cookie;

var usero = [];
var usero2 = [];


temp = data.split(' '); //split cookie
old_cookie = temp[0]; //store past cookie
user = temp[1].split(',');
usero = temp[0].split(',');
usero2 = usero[3].split('"');
var type = usero2[3];

//notes
/*
  temp[0] holds the old cookie, the cookie for the active account
  temp[1] holds the cookie used to enter the classroom stream

  user[0] holds the teacher's employee number
  user[1] holds the course code of active class
  user[2] holds the section
*/

getting1 = $.get("/studentEnrolled", function(data) {
  studentclass=data;
});

getting1.done(function(){
  getting2 = $.get("/student",function(data){
    students = data;
  });

  getting2.done(function(){
    var i;
    for(i=0;i<studentclass.length;i++){
      if(studentclass[i].coursecode == user[1]){
        if(students[i].studNo == studentclass[i].Studnum){
          var tab = document.getElementById("studentslist");
          var tabr = document.createElement("tr");
          var tabd = document.createElement("td");
          tabd.innerHTML =students[i].name;
          var tabd2 = document.createElement("td");
          tabd2.innerHTML =students[i].studno;
          tabr.appendChild(tabd);
          tabr.appendChild(tabd2);
          tab.appendChild(tabr);

        }
      }
    }
  });

  if(type == "teacher"){
    var bck = document.getElementById("Stoodlist");
    bck.onclick=(function(){
      window.location.href = "/Classroom1";
   });
  }else{
    var bck = document.getElementById("Stoodlist");
    bck.onclick=(function(){
      window.location.href = "/Classroom2";
    });
  }




});


/*getting1.done(function(){
  var i;
  for(i=0;i<studentclass.length;i++){
    if(studentclass[i].coursecode == user[1]){
      if(students[i].studNo == studentclass[i].Studnum){
        var tab = document.getElementById("studentslist");
        var tabr = document.createElement("tr");
        var tabd = document.createElement("td");
        tabd.innerHTML = students[i].name + ' ' + students[i].studNo;
        tabr.appendChild(tabd);
        tab.appendChild(tabr);
      }
    }
  }

});*/
