var classes = [];
var teachers = [];
var students = [];
var studentclass = [];
var posts = [];
var user = [];
var temp = []; //container for each element in cookie
var data = document.cookie; //get cookie
var getting1;
var getting2;
var getting3;
var getting4;
var getting5;
var old_cookie;
var usero = [];
var usero2 = [];
var post = {};


temp = data.split(' '); //split cookie
old_cookie = temp[0]; //store past cookie
user = temp[1].split(',');
usero = temp[0].split(',');
usero2 = usero[3].split('"');
var type = usero2[3];

//notes
/*
  usero2[3] is the active user's type
  temp[0] holds the old cookie, the cookie for the active account
  temp[1] holds the cookie used to enter the classroom stream

  user[0] holds the teacher's employee number
  user[1] holds the course code of active class
  user[2] holds the section
*/
(function getts(){
  $(document).ready(function(){
    getting1 = $.get("/studentEnrolled", function(data) {
      studentclass=data;
    });

    //students enrolled, used for the comment section in the stream
    getting1.done(function(){


      if(type === "teacher"){
        var rem = document.getElementById("remove");
        rem.className = "btn btn-danger";
        rem.innerHTML = "Remove Student";
        $("#divleave").hide();
        $("#divrem").hide();
      }else{
      	
        $("#divrem").hide();
        var lc = document.getElementById("leaveclass");
        lc.className = "btn btn-danger";
        lc.innerHTML = "Leave Classroom";
        lc.onclick = (function(){
          var j;
          for(j = 0;j<studentclass.length;j++){
            if(user[1]==studentclass[j].coursecode){
              var r = confirm("Are you sure you want to unenroll this class?");
                if (r == true) {
                  console.log(studentclass[j]);
                  $.ajax({
                     url: '/studentEnrolled/'+studentclass[j].id,
                     type: 'DELETE',
                     success: function(response) {
                        alert("Successfully unenrolled");
                      window.location.href = "/panel";
                     }
                  });
                }
            }
          }
        });
      }


      getting2 = $.get("/teacher", function(data) {
        teachers=data;
      });

      //teacher in the active class
      getting2.done(function(teachers){
        var i;
          for(i = 0;i<teachers.length;i++){
            if(teachers[i].employeeno == user[0]){
                var bann = document.getElementById("banname");
                bann.innerHTML = teachers[i].name;
                break;
            }
          }

        getting3 = $.get("/student", function(data) {
          students=data;
        });

        getting3.done(function(){
          getting4 = $.get("/class", function(data) {
            classes=data;
          });

          getting4.done(function(){
            var i;
            for(i=0;i<classes.length;i++){
              if(classes[i].coursecode == user[1]){
                document.title = classes[i].coursetitle + '-' + classes[i].section;
                var banner = document.getElementById("bandet");
                banner.innerHTML =  classes[i].coursetitle;
                var banner2 = document.getElementById("bansec");
                banner2.innerHTML = classes[i].section;
                var Logout = document.getElementById("logout");
                var butn = document.createElement("button");
                butn.className = "btn btn-danger";
                butn.innerHTML = "Logout";
                butn.onclick = (function(){
                  $.cookie = "";
                });
                Logout.appendChild(butn);

                var home = document.getElementById("Homebutt");
                home.onclick = (function(){
                  document.cookie = old_cookie;
                  window.location.href="/panel";
                });

                var sl = document.getElementById("Studlist");
                sl.onclick = (function(){
                  window.location.href="/studentlist"; //add students page l8r
                });

              }
            }
          });

          getting5 = $.get("/post", function(data){
            posts = data;
          });

          getting5.done(function(){
              var maintable = document.getElementById("postcontainer");
              posts.forEach(function(pos){
                teachers.forEach(function(teacher){

                  if(teacher.userid.toString() == pos.posterid.toString() && pos.crscode == user[1]){
                    if( teacher.employeeno.toString() == user[0] ){
                      var td = document.createElement("tr");
                    var subdiv = document.createElement("div");
                    subdiv.style.width = "400%";
                    subdiv.style.textAlign = "center";
                    var postname = document.createElement("h4");
                    postname.style.textAlign = "left";
                    var hr = document.createElement("hr");
                    hr.className = ("newhr");
                    var hr2 = document.createElement("hr");
                    hr2.className = ("newhr");
                    var hr3 = document.createElement("hr");
                    hr3.className = ("newhr");
                    var hr4 = document.createElement("hr");
                    hr4.className = ("newhr");
                    var postnametext = document.createTextNode(teacher.name);
                    postname.appendChild(postnametext);
                    var post = document.createElement("p");
                    var posttext = document.createTextNode(pos.thepost);
                    post.style.textAlign = "left";
                    post.style= "margin-left:10px";
                    post.appendChild(posttext);
                    var textarea = document.createElement("textarea");
                    //textarea.setAttribute("resize", "none");
                    textarea.style.resize = "none";
                    textarea.style.color = "black";
                    textarea.placeholder = "Enter a comment";
                    textarea.style.width = "100%";
                    var comment = document.createElement("input");
                    comment.type = "button";
                    comment.value= "Comment";
                    comment.className = "btn btn-primary";
                    var file = document.createElement("input");
                    file.type = "button";
                    file.value= "Attach File";
                    file.className = "btn btn-primary";

                    subdiv.appendChild(hr);
                    subdiv.appendChild(postname);
                    subdiv.appendChild(post);
                    subdiv.appendChild(hr3);
                    subdiv.appendChild(textarea);
                    subdiv.appendChild(document.createElement("br"));
                    subdiv.appendChild(comment);
                    subdiv.appendChild(file);
                    subdiv.appendChild(hr4);
                    td.appendChild(subdiv);
                    //maintable.appendChild(td);
                    $("#postcontainer").prepend(td);
                    }
                  }
                });
              });
              $("#addPost").submit(function(event){
                event.preventDefault();
                var flag = 0;
                var $form = $(this),
                  resthePost = $("textarea[id='posttext']").val();
                  resposterID = usero[0].split(":")[1];
                  rescoursecode = user[1];
                  respostdate = Date().toString();
                  post = {
                    "posterID": resposterID,
                    "crsCode": rescoursecode,
                    "postDate": respostdate,
                    "thePost": resthePost
                  }
                  if (flag ===0){
                    var posting = $.post("/post", post);
                  //posting.done(function(){
                    alert("Post posted.");
                    window.location.href = "/Classroom1";
                  //});
                  }
              });
          });
        });
      });
    });
  });
})();

function leave(thisclass){
  var r = confirm("Are you sure you want to unenroll this class?");
    if (r == true) {
      console.log(thisclass);
      $.ajax({
         url: '/studentEnrolled/'+thisclass.id,
         type: 'DELETE',
         success: function(response) {
            alert("Successfully unenrolled");
          window.location.href = "/panel";
         }
      });
    } else {
    }
}
