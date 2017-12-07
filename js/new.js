var offsetTop;

window.onload = function(){
  genProfile();
  genNav();

  //add container
  bwe.append("body", {
    tag : "div",
    class : "container"
  });

  //loads the catagory depending on the url hash
  changePage(getPageID());

  //sets the offset for scrolling
  offsetTop  = $(".nav-con").offset().top;
}

//returns the id of the current hash catagory
function getPageID(){
  var id = "game";
  var curPage = window.location.href.split("/").pop();
  for(var i in pages){
    if(curPage === pages[i]["page"]){
      id = curPage.replace("#", "");
      break;
    }
  }
  return id;
}

//changing page event
$(document).on("click", ".catagory", function(){
  var sel = this;
  $("html, body").animate({ scrollTop: 0 }, 'fast', function(){
    changePage($(sel).attr("id").replace("cat-", ""));
  });
});

//media list item click event
$(document).on("click", ".media-item", function(){
  changePreview(this, $(this).data("parent"), $(this).data("media"), $(this).data("type"))
})

$(document).scroll(function() {
     $(".nav-con").toggleClass('fixed-nav', $(window).scrollTop() > offsetTop);
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
      class : "catagory",
      con : pages[i]["name"],
      href : pages[i]["page"]
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
                class : "fa fa-envelope-o",
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
                class : "fa fa-linkedin-square",
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

//switches the page
function changePage(id){
  if($("#cat-"+id).hasClass('active') == false){
    $(".catagory.active").removeClass('active');
    $("#cat-"+id).addClass('active');


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
}

//generates the media for an item
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
  return media;
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

//data for the page
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
