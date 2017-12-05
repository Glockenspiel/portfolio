window.onload = function(){
  genProfile();
  genNav();
}

//changing page event
$(document).on("click", ".catagory", function(){
  changePage($(this).attr("id"));
});

//generates the navbar html
function genNav(){
  pages = [
    {
      name : "Games",
      page : "#games"
    },
    {
      name : "Software",
      page : "#soft"
    },
    {
      name : "Education",
      page : "#edu"
    }
  ];

  var items = {
    tag : "div",
    class : "nav-items"
  };

  for(var i in pages){
    bwe.appendAttr(items, "children", {
      tag : "a",
      id : pages[i]["page"].replace("#", ""),
      class : "catagory " + getActiveNav(pages[i]["page"]),
      con : pages[i]["name"],
      href : pages[i]["page"]
    });
  }
  bwe.append("body",{
    tag : "nav",
    children : [items]
  });
}

//generates the profile html
function genProfile(){
  var about = {
    tag : "div",
    class : "profile",
    children : [
      {
        tag : "div",
        class : "profile-img",
        children : [
          {
            tag : "img",
            src : "/res/img/profile.png"
          },
          {
            tag : "div",
            class : "profile-info",
            children : [
              {
                tag : "h1",
                con : "Geff Bourke - Portfolio"
              },
              bwe.genTable({},
                  [
                    ["", ""],
                    ["Location", "Clare, Ireland"],
                    ["Education", "B.Sc in Computer Games Development"],
                    ["Languages", "C++, Java, C#, JavaScript, Lua, CSS, SQL, HTML"],
                    ["Technologies", "Git, Unity, JQuery"],
                    ["Hobbies", "	Breakdancing, Esports"]
                  ]
                )
            ]
          }
        ]
      }
    ]
  };
  bwe.append("body", about);
}

//returns the string of active for building json on load
function getActiveNav(page){
  var curPage = window.location.href.split("/").pop();
  if(curPage === page || (page=="#games" && curPage=="")){
    return "active";
  }
  return "";
}

//switches the page
function changePage(id){
  if($("#"+id).hasClass('active') == false){
    $(".catagory.active").removeClass('active');
    $("#"+id).addClass('active');
  }
}
