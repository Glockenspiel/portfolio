/*
  Author: Geff Bourke
*/
var offsetTop;
bwe.pages = [
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

window.onload = function(){
  genProfile();
  genNav();

  //add content container
  bwe.append("body", {
    tag : "div",
    class : "container"
  });

  genFooter();

  //loads the catagory depending on the url hash
  changePage(getPageID());

  //sets the starting offset for scrolling
  offsetTop  = $(".nav-con").offset().top;
}

//returns the id of the current hash catagory
function getPageID(){
  var id = "game";
  var curPage = window.location.href.split("/").pop();
  for(var i in bwe.pages){
    if(curPage === bwe.pages[i]["page"]){
      id = curPage.replace("#", "");
      break;
    }
  }
  if(curPage === "#contact"){
    id = "contact";
  }
  return id;
}

//changing page event
$(document).on("click", ".change-page", function(){
  var sel = this;
  $("html, body").animate({ scrollTop: offsetTop }, 'fast', function(){
    changePage($(sel).attr("id").replace("cat-", ""));
  });
});

//media list item click event
$(document).on("click", ".media-item", function(){
  changePreview(this, $(this).data("parent"), $(this).data("media"), $(this).data("type"))
})

//fixes the navbar to the top when you scroll past it
$(document).scroll(function() {
     $(".nav-con").toggleClass('fixed-nav', $(window).scrollTop() > offsetTop);
 });

//generates the navbar html
function genNav(){
  var items = {
    tag : "div",
    class : "nav-items"
  };

  for(var i in bwe.pages){
    bwe.appendAttr(items, "children", {
      tag : "a",
      id : "cat-"+bwe.pages[i]["page"].replace("#", ""),
      class : "catagory change-page",
      con : bwe.pages[i]["name"],
      href : bwe.pages[i]["page"]
    });
  }
  bwe.append("body",{
    tag : "nav",
    children : [
      {
        tag : "div",
        class : "nav-con",
        children : [
          items,
          {
            tag : "div",
            class : "nav-social",
            children : [
              {
                tag : "a",
                class : "fa fa-envelope-o change-page",
                id : "cat-contact",
                href : "#contact"
              },
              {
                tag : "a",
                class : "fa fa-github",
                href : "https://github.com/pohka",
                target : "_blank"
              },
              {
                tag : "a",
                class : "fa fa-linkedin",
                href : "https://www.linkedin.com/in/geff-bourke-91b238115/",
                target : "_blank"
              }
            ]
          }
        ]
      },

    ]
  });
}

function genFooter(){
  bwe.append("html", {
    tag : "footer",
    children : [
      {
        tag : "a",
        href : "https://github.com/pohka/portfolio",
        target : "_blank",
        con : "<span class='footer-icon fa fa-github'></span><br>View the source code of this website on GitHub"
      }
    ]
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
        class : "profile-img row",
        children : [
          {
            tag : "img",
            src : "/res/img/profile.png"
          }
        ]
      },
      {
        tag : "div",
        class : "profile-info row",
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

//switches the page and generates the new project items
function changePage(id){
  if($("#cat-"+id).hasClass('active') == false){
    $(".change-page.active").removeClass('active');
    $("#cat-"+id).addClass('active');

    $(".container").html("");
    for(var p in pageData){
      if(pageData[p]["type"] === id){
        var data = pageData[p];

        var item =
         {
          tag : "div",
          class : "item",
          children : [
            genMedia(data),
            genInfo(data)
          ]
        }
        bwe.append(".container", item);
      }
    }
  }
}

//generates the json for the info of a project item
function genInfo(data){
  var info =
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
  if(data["links"] != undefined && data["links"].length > 0){
    var links = {
      tag : "div",
      class : "item-buttons"
    }
    for(var i in data["links"]){
    bwe.appendAttr(links, "children",
      {
        tag : "a",
        href : data["links"][i]["href"],
        target : "_blank",
        con : data["links"][i]["con"]
      });
    }
    bwe.appendAttr(info, "children", links);
  }

  return info;
}

//generates the json for the media of an item
function genMedia(data){
  var media = [];
  var list = [];
  var hasVideo = 0;
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
    hasVideo=1;
    preview["children"] = [
      {
        tag : "iframe",
        src : "https://www.youtube.com/embed/" + data["videoID"] + "?rel=0&amp;enablejsapi=1;showinfo=0",
        frameborder : "0",
        allowfullscreen : ""
      }
    ];
    var videoThumbnail = "http://img.youtube.com/vi/"+data["videoID"]+"/default.jpg";
    list.push(genMediaListItem(videoThumbnail, data["id"], 0, true));
  }



  for(var i in data["imgs"]){
    var mediaItem = genMediaListItem(data["imgs"][i], data["id"], i+hasVideo);
    if(data["videoID"] === "" && i==0){
      bwe.appendAttr(mediaItem, "class", "active");
    }
    list.push(mediaItem);
  }


  media.push(preview);
  media.push({
    tag : "div",
    class : "media-list",
    children : list
  });
  return {
    tag : "div",
    class : "item-media row",
    children : media
  };
}

//generates the json for the media list items
function genMediaListItem(img, id, ind, isVideo){
  if(isVideo == undefined || !isVideo){ //image
    return {
      tag : "div",
      class : "media-item row media-" + id,
      children : [
        {
          tag : "img",
          src : "/res/img/"+id+"/"+img
        }
      ],
      data : [
        ["parent", id],
        ["media", img],
        ["type", "img"]
      ]
    }
  }
  else{ //video
    var thumnailData = img.split("/");
    var vid = thumnailData[thumnailData.length-2];
    return {
      tag : "div",
      class : "media-item row active media-" + id,
      children : [
        {
          tag : "img",
          src : img
        }
      ],
      data : [
        ["parent", id],
        ["media", vid],
        ["type", "youtube"]
      ]
    }
  }
}

//toggles the preview image on an item
function changePreview(sel, parent, media, type){
  if($(sel).hasClass('active') ==false){
      $(".media-"+parent+".active").removeClass('active');
      $(sel).addClass('active');
      if(type==="img"){
        $("#preview-"+parent).html(
          bwe.build({
          tag : "img",
          src : "/res/img/" + parent + "/" + media
        }));
      }
      else if(type==="youtube"){
        $("#preview-"+parent).html(
          bwe.build({
            tag : "iframe",
            src : "https://www.youtube.com/embed/" + media + "?rel=0&amp;enablejsapi=1;showinfo=0",
            frameborder : "0",
            allowfullscreen : ""
          })
        );
      }
  }
}

/*
  json data for the page
  which is being parsed and build with bwe
  bwe is a JavaScript library I made which extends jQuery
*/
var pageData = [
  {
    type : "game",
    id : "payload",
    title : "Payload on Winters Lane",
    date : "Nov 2017",
    videoID : "FztJDS6z_Wg",
    imgs  : ["screen_1.jpg", "screen_2.jpg", "screen_3.jpg", "screen_4.jpg"],
    desc : [
      "Payload PvP",
      "Lua Dota 2 modding tools"
    ],
    links : [
      {
        href : "http://steamcommunity.com/sharedfiles/filedetails/?id=1201546443",
        con : "View"
      },
      {
        href : "https://github.com/pohka/Payload-Dota/tree/master/scripts/vscripts",
        con : "GitHub"
      }
    ]
  },
  {
    type : "game",
    id : "rapidless",
    title : "Rapidless",
    date : "Jul 2017",
    videoID : "6dPV2LQNfWI",
    imgs  : ["screen_1.jpg", "screen_2.jpg", "screen_3.jpg"],
    desc : ["3 day game jam", "C# Unity", "Arcade style car physics", "AI"]
  },
  {
    type : "game",
    id : "phantom",
    title : "Phantom Palace",
    date : "Oct 2016",
    videoID : "iVH01jBOEB0",
    imgs  : ["screen_1.jpg", "screen_2.jpg", "screen_3.jpg", "screen_4.jpg"],
    desc : ["Dota 2 Tools", "Lua", "Multiplayer PvP", "Paricle effects", "Custom map"]
  },
  {
    type : "game",
    id : "mjj",
    title : "Mythical Jetpack Journey",
    date : "Mar 2016",
    videoID : "aLekW5fLcHY",
    imgs  : ["screen_1.jpg", "screen_3.jpg"],
    desc : ["Unity C#", "Randomly generated maps", "Use of coroutines", "7 day game jam"]
  },
  {
    type : "game",
    id : "java-game",
    title : "Java Game Engine",
    date : "Dec 2015",
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
    links : [
      {
        con : "GitHub",
        href : "https://github.com/pohka/Java-Game-Engine"
      },
    ]
  },
  {
    type : "soft",
    id : "cdf",
    title : "CoolDownFeed.com",
    date : "Oct 2017 - Present",
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
    links : [
      {
        con : "View",
        href : "http://www.cooldownfeed.com"
      },
      {
        con : "GitHub",
        href : "https://github.com/pohka/CoolDownFeed"
      }
    ]
  },
  {
    type :  "soft",
    id :    "fiber",
    title : "Fiber Library",
    date :  "Apr 2016",
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
    links : [
      {
        con : "GitHub",
        href : "https://github.com/pohka/Fibers4U"
      }
    ]
  },
  {
    type :  "edu",
    id :    "uni",
    title : "B.Sc in Computer Games Development",
    date :  "Sep 2012 - Aug 2016",
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
    ]
  },
  {
    type : "contact",
    id : "contact",
    title : "Contact Email",
    date : "",
    videoID : "",
    imgs  : ["img.jpg"],
    desc : ["geffbourke123@gmail.com"]
  },
  /*json template*/
  {
    type : "",
    id : "",
    title : "",
    date : "",
    videoID : "",
    imgs  : [],
    desc : [],
    links : []
  },
];
