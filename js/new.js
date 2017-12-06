window.onload = function(){
  genProfile();
  genNav();
  bwe.append("body", {
    tag : "div",
    class : "container"
  });

  var id = "game";
  var curPage = window.location.href.split("/").pop();
  for(var i in pages){
    if(curPage === pages[i]["page"]){
      id = curPage.replace("#", "");
      break;
    }
  }
  changePage(id);
}

//changing page event
$(document).on("click", ".catagory", function(){
  changePage($(this).attr("id").replace("cat-", ""));
});

var pages = [
  {
    name : "Games",
    page : "#game"
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

//generates the navbar html
function genNav(){


  var items = {
    tag : "div",
    class : "nav-items"
  };

  for(var i in pages){
    bwe.appendAttr(items, "children", {
      tag : "a",
      id : "cat-"+pages[i]["page"].replace("#", ""),
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
          }
        ]
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
  };
  bwe.append("body", about);
}

//returns the string of active for building json on load
function getActiveNav(page){
  var curPage = window.location.href.split("/").pop();
  console.log("page:" + page + "," + curPage);
  if(curPage === page || (page==="#game" && curPage=="")){
    return " active";
  }
  return "";
}

//switches the page
function changePage(id){
  if($("#cat-"+id).hasClass('active') == false){
    $(".catagory.active").removeClass('active');
    $("#cat-"+id).addClass('active');
  }

  $(".container").html("");
  for(var p in pageData){
    if(pageData[p]["type"] === id){
      var data = pageData[p];


      var media = {
        tag : "div",
        class : "item-media row",
        children : genMedia(data)
      }

      var item =
       {
        tag : "div",
        class : "item",
        children : [
          media,
          {
            tag : "div",
            class : "item-info row",
            id : "info-" + data["id"],
            children : [
              {
                tag : "h2",
                con : data["title"]
              },
              {
                tag : "div",
                class : "date",
                con : data["date"]
              },
              {
                tag : "div",
                class : "desc",
                children : [
                  bwe.genList({}, data["desc"])
                ]
              }
            ]
          }
        ]
      }

      bwe.append(".container", item);
    }
  }
}

//generates the media for an item
function genMedia(data){
  var media = [];
  var list = [];
  var preview = {
    tag : "div",
    class : "item-preview",
    id : "preview-" + data["id"],
    children : [
      {
        tag : "img",
        src : "/res/img/"+ data["id"]+ "/" + data["imgs"][0]
      }
    ]
  }
  if(data["videoID"] !== ""){
    //<iframe src="https://www.youtube.com/embed/6dPV2LQNfWI?rel=0&amp;enablejsapi=1;showinfo=0" frameborder="0" allowfullscreen=""></iframe>
    preview["children"] = [
      {
        tag : "iframe",
        src : "https://www.youtube.com/embed/" + data["videoID"] + "?rel=0&amp;enablejsapi=1;showinfo=0",
        frameborder : "0",
        allowfullscreen : ""
      }
    ];
    var videoThumbnail = "http://img.youtube.com/vi/"+data["videoID"]+"/default.jpg";
    list.push(genMediaListItem(videoThumbnail, data["id"], true));
  }



  for(var i in data["imgs"]){
    var mediaItem = genMediaListItem(data["imgs"][i], data["id"]);
    list.push(mediaItem);
  }


  media.push(preview);
  media.push({
    tag : "div",
    class : "media-list",
    children : list
  });
  return media;
}

//generates the json for the media list items
function genMediaListItem(img, id, isVideo){
  if(isVideo == undefined || !isVideo){ //image
    return {
      tag : "div",
      class : "media-item row",
      children : [
        {
          tag : "img",
          src : "/res/img/"+id+"/"+img
        }
      ]
    }
  }
  else{ //video
    return {
      tag : "div",
      class : "media-item row",
      children : [
        {
          tag : "img",
          src : img
        }
      ]
    }
  }
}

var pageData = [
  {
    type : "game",
    id : "rapidless",
    title : "Rapidless",
    date : "Nov 2017",
    link : "",
    videoID : "6dPV2LQNfWI",
    imgs  : ["screen_1.jpg", "screen_2.jpg", "screen_3.jpg"],
    desc : ["3 day game jam", "C# Unity", "Arcade style car physics", "AI"],
    more : {
      text : "",
      img : ""
    }
  },
  {
    type : "game",
    id : "phantom",
    title : "Phantom Palace",
    date : "Oct 2016",
    link : "",
    videoID : "iVH01jBOEB0",
    imgs  : ["screen_1.jpg", "screen_2.jpg", "screen_3.jpg", "screen_4.jpg"],
    desc : ["Dota 2 Tools", "Lua", "Multiplayer PvP", "Paricle effects", "Custom map"],
    more : {
      text : "",
      img : ""
    }
  },
  {
    type : "game",
    id : "mjj",
    title : "Mythical Jetpack Journey",
    date : "Mar 2016",
    link : "",
    videoID : "aLekW5fLcHY",
    imgs  : ["screen_1.jpg", "screen_3.jpg"],
    desc : ["Unity C#", "Randomly generated maps", "Use of coroutines", "7 day game jam"],
    more : {
      text : "",
      img : ""
    }
  },
  {
    type : "game",
    id : "java-game",
    title : "Java Game Engine",
    date : "Dec 2015",
    link : "",
    videoID : "",
    imgs  : ["screen_1.jpg"],
    desc : [
      "Entity Component System",
      "Sprites and Animations",
      "Multichannel Audio",
      "Collision Detection",
      "Quad Trees",
      "Multithreading",
      "Tile Maps",
      "Saving and Loading"
    ],
    more : {
      text : "",
      img : ""
    }
  },
  {
    type : "soft",
    id : "cdf",
    title : "CoolDownFeed.com",
    date : "Oct 2017 - Present",
    link : "http://www.cooldownfeed.com",
    videoID : "yICAr1zacbk",
    imgs  : ["screen_0.jpg", "screen_1.jpg", "screen_2.jpg", "screen_3.jpg"],
    desc :
    [
      "Website",
      "HTML, CSS, JavaScript, JQuery",
      "Blog and infographics",
      "Infographic tool generates html from templates and input fields",
      "Custom blogging tool",
      "Meta tag generation for new posts",
      "Table generation from csv strings",
      "Comment section with Disqus"
    ],
    more : {
      text : "",
      img : ""
    }
  },
  {
    type : "soft",
    id : "fiber",
    title : "Fiber Library",
    date : "Apr 2016",
    link : "",
    videoID : "",
    imgs  : [
      "screen_1.jpg",
      "screen_2.jpg"
    ],
    desc : [
      "Alternative implementation of coroutines",
      "C++11",
      "Single application uses worker threads and schedules tasks onto allocated memory called fibers",
      "Task scheduling",
      "Concurrent atomic data structures",
      "Multi-threading"
    ],
    more : {
      text : "",
      img : ""
    }
  },
  {
    type : "edu",
    id : "uni",
    title : "B.Sc in Computer Games Development",
    date : "Sep 2012 - Aug 2016",
    link : "",
    videoID : "",
    imgs  : ["screen_1.jpg"],
    desc : [
      "University of Limerick",
      "Object Orientated Programming",
      "Software Design Patterns and Architecture",
      "SQL Database Queries and Design",
      "Multi-threaded Programming",
      "Event Driven Programming",
      "Software Testing",
      "Android Development",
      "Artificial Intelligence and Machine Learning"
    ],
    more : {
      text : "",
      img : ""
    }
  },
  {
    type : "",
    id : "",
    title : "",
    date : "",
    link : "",
    videoID : "",
    imgs  : [],
    desc : [],
    more : {
      text : "",
      img : ""
    }
  },
];
