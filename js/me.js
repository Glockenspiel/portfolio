var catTop; //offset the navbar is from the top of the page
var currentEnlargeIndex=0;
var enlargeMaxIndex=0;

$(document).on("click", ".showcode", function(){
  var name = $(this).data("name");
  var preview;
  $(".code-preview").each(function(){
    if($(this).attr("id")==name)
    {
      preview = this;
      return;
    }
  });

  if($(preview).is(':hidden'))
  {
    $(preview).slideDown('300');
    $(".showcode").each(function(){
      if($(this).data("name")==name)
        $(this).text("Hide More Info");
    });
  }
  else {
    $(preview).slideUp('300');
    $(".showcode").each(function(){
      if($(this).data("name")==name)
        $(this).text("Show More Info");
    });
  }
});

$(document).ready(function() {
  catTop  = $("#catagory").offset().top;

  addAllItems();
  setItemType();

  //navigate catagories
  $("#catagory button").click(function(){
    var type = $(this).data("type");
    document.location.href = "#"+type;

    var offsetTop  = $(document).scrollTop();
    if(offsetTop < catTop)
    {
      setItemType();
    }
    else {
      $("html, body").animate({ scrollTop: 0 }, 'fast', function(){
        setItemType();
      });
    }

    jQuery("iframe").each(function() {
      jQuery(this)[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      console.log("pausing");
    });
  });

  $(".skills").fadeIn(100, function() {
    $(".skills").animate({left: '+=100'}, 400);
  });
});

//sets item type depending on the current href
function setItemType()
{
  var type = document.location.href.split("/").pop().replace("#", "");

  if(type==undefined || type==null || type =="")
    type ="games";

  $(".item").each(function(){
    if($(this).data("type") == type)
    {
      $(this).show();
    }
    else {
      $(this).hide();
    }
  });
  document.location.href = "#"+ type;

  $("#catagory button").each(function(){
    if($(this).data("type")==type)
    {
      $(this).addClass('active');
    }
    else {
      $(this).removeClass('active');
    }
  });

  $(".show-email").click(function(){
    if($(".email").is(":hidden"))
    {
      $(this).addClass("active");
      $(".email").show();
    }
    else {
      $(".email").hide();
      $(this).removeClass("active");
    }
  });
}

var screenshots = [
  ["rapidless", "screen_1.jpg", "screen_2.jpg", "screen_3.jpg"],
  ["phantom", "screen_1.jpg", "screen_4.jpg", "screen_3.jpg", "screen_2.jpg"],
  ["mjj", "generation.mp4", "screen_3.jpg", "screen_1.jpg"],
  ["java-game", "screen_1.jpg"],
  ["cdf", "screen_0.jpg","screen_1.jpg","screen_2.jpg", "screen_3.jpg"],
  ["fiber", "screen_2.jpg", "screen_1.jpg"],
  ["uni", "screen_1.jpg"]
];

function getScreenShots(name)
{
  var imgs = [];
  for(var i=0; i< screenshots.length; i++)
  {
    if(screenshots[i][0]==name)
    {
      for(var j=1; j<screenshots[i].length; j++)
      {
        imgs.push(screenshots[i][j]);
      }
      return imgs;
    }
  }
  return imgs;
}

//adds all the items on load
function addAllItems()
{
  var rapidInfo = ["3 day game jam", "Car physics", "Arcade style physics", "Unity C#", "AI"];
  addItem("games", "rapidless", "Rapidless", "6dPV2LQNfWI", "Jul 2017", rapidInfo, null, null);

  var phantomInfo = ["Dota 2 mod", "Lua", "Multiplayer PvP", "Paricle effects"];
  addItem("games", "phantom", "Phantom Palace", "iVH01jBOEB0", "Oct 2016", phantomInfo, null, null);

  var mjjInfo = ["Unity C#", "Randomly generated maps", "Use of coroutines", "7 day game jam"];
  var mjjCodeText = "Arrow traps used coroutines for their animation:";
  addItem("games", "mjj", "Mythical Jetpack Journey", "aLekW5fLcHY", "Mar 2016", mjjInfo, null, mjjCodeText);


  var javaInfo = ["Entity Component System", "Sprites and Animations", "Multichannel Audio",
  "Collision Detection", "Quad Trees", "Multithreading", "Tile Maps", "Saving and Loading"];
  var javaCodeText = "Code to initalize level:";
  addItem("games", "java-game", "Java Game Library", null, "Dec 2015", javaInfo, null, javaCodeText, "https://github.com/Glockenspiel/Java-Game-Engine");

  var cdfInfo = ["Website", "HTML, CSS, JavaScript, JQuery", "Blog and infographics",
  "Infographic tool generates html from templates and input fields", "Custom blogging tool", "Meta tag generation for new posts", "Table generation from csv strings", "Comment section with Disqus"];
  addItem("software", "cdf", "CoolDownFeed.com", "yICAr1zacbk", "Oct 2017",  cdfInfo, null, null, "http://www.cooldownfeed.com");

  var fiberInfo = ["Alternative implementation of coroutines",
  "Single application uses worker threads and schedules tasks onto allocated memory called fibers",
  "C++11", "Task scheduling", "Concurrent atomic data structures", "Multi-threading"];
  addItem("software", "fiber", "Fiber Library", null, "Apr 2016", fiberInfo, null,"Example of binding and scheduling multiple tasks:","https://github.com/Glockenspiel/Fibers4U");

  var uniInfo = ["University of Limerick", "Object Orientated Programming", "Software Design Patterns and Architecture", "SQL Database Queries and Design", "Multi-threaded Programming",
  "Event Driven Programming", "Software Testing", "Android Development", "Artificial Intelligence and Machine Learning"];
  addItem("edu", "uni", "B.Sc in Computer Games Development", null, "Aug 2016", uniInfo, null, null, null);

}

//adds an item to the page
function addItem(type, id, title, videoID, date, bulletPts, extraInfo, codeText, url)
{
  var imgs = getScreenShots(id);

  var html =
  '<div class="item" data-type="'+type+'">'+
    '<div class="item-showcase">'+
      '<div class="item-preview" data-name="'+id+'">';
        if(videoID!=null)
          html += getVideoHtml(videoID);
        else {
          html += '<img src="/res/img/'+id+'/'+imgs[0]+'" class="item-preview-img" data-name="'+id+'"/>';
        }

        html +=
        '</div>'+
        '<div class="item-preview-enlarge" data-name="'+id+'"><button class="btn fa fa-expand" data-name="'+id+'"></button></div>'+
      '<div class="item-preview-list">';
        if(videoID!=null)
        {
          var imgSrc= 'http://img.youtube.com/vi/'+videoID+'/default.jpg';
          html+='<button data-name="'+id+'" data-videoid="'+videoID+'"><div class="play-btn"><img src="/res/img/play-btn.png"/></div><img src="'+imgSrc+'"/></button>';
        }

        for(var i=0; i<5; i++)
        {
          if(imgs[i]!=null)
          {
            var imgSrc= '/res/img/'+id+'/'+imgs[i];
            if(imgs[i].indexOf(".mp4")!=-1)
            {
              html+= '<button data-name="'+id+'" data-src="'+imgSrc+'">'+
                      '<video autoplay loop>'+
                        '<source src="'+imgSrc+'" type="video/mp4" />'+
                        'Your browser does not support the video tag.'+
                      '</video></button>';
            }
            else {
              html+='<button data-name="'+id+'" data-src="'+imgSrc+'"><img src="'+imgSrc+'"/></button>';
            }
          }
        }
      html+=
        '</div>'+
      '</div>'+
      '<div class="item-desc">'+
        '<h2>'+title+'</h2>'+
        '<div class="date">'+date+'</div>'+
        '<ul>';

      if(bulletPts!=null)
        for(var i=0; i<bulletPts.length; i++)
        {
          html += '<li>'+bulletPts[i]+'</li>';
        }

      html += '</ul>';

      if(extraInfo!=null)
      {
        html+=extraInfo;
      }

      html +=
      '<div class="item-btn-con">';

      if(url!=undefined && url!=null)
        html+='<button class="btn view-item" data-url="'+url+'">View</button>';

      if(!(codeText==null && extraInfo==null))
      {
        html+=
          '<button class="btn showcode" data-name="'+id+'">'+
            'Show More Info'+
          '</button>';
      }

      //if(codeText==null) codeText='';

    html+=
      '</div>'+
    '</div>';
    if(codeText!=null)
    {
      html+=
      '<div class="code-preview" id="'+id+'">'+
        codeText+
        '<br><img src="/res/img/'+id+'/code.png"/>'+
        '<div class="hidecode">'+
          '<button class="btn showcode" data-name="'+id+'">Hide More Info</button>'+
        '</div>'+
      '</div>';
    }
    html += '</div>';

  $(".item-con").append(html);

  toggleEnlargeVisiblity(id, videoID==null);
}

function getVideoHtml(videoID)
{
  return '<iframe width="650" height="365" src="https://www.youtube.com/embed/'+videoID+'?rel=0&enablejsapi=1;showinfo=0"  frameborder="0" allowfullscreen></iframe>';
}

//toggle preview
$(document).on("click", ".item-preview-list button", function(){
    var name = $(this).data("name");
    var preview;

    $(".item-preview").each(function(){
      if($(this).data("name")==name)
      {
        preview=this;
        return;
      }
    });

    var videoID = $(this).data("videoid");
    var imgSrc = $(this).data("src");
    if(videoID!=undefined && videoID!=null)
    {
      $(preview).html(getVideoHtml(videoID));
      toggleEnlargeVisiblity(name, false);
    }
    else {
      if(imgSrc.indexOf(".mp4")==-1)
      {
        $(preview).html('<img src="'+imgSrc+'" class="item-preview-img" data-name="'+name+'"/>');
      }
      else {
        var html = '<video autoplay loop><source src="'+imgSrc+'" type="video/mp4" class="item-preview-img" data-name="'+name+'"/>Your browser does not support the video tag.</video>';
        $(preview).html(html);
      }
      toggleEnlargeVisiblity(name, true);
    }
});

//hides or shows the enlarge btn
function toggleEnlargeVisiblity(name, show)
{
  $(".item-preview-enlarge").each(function(){
    if($(this).data("name")==name)
    {
      if(show) $(this).show();
      else $(this).hide();
    }
  });
}

//sticks the navbar to top of page when you scroll past it
$(document).scroll(function() {
     $("#catagory").toggleClass('sticky', $(window).scrollTop() > catTop);
 });

//opens new tab for view btns
 $(document).on("click", ".view-item", function(){
   var url = $(this).data("url");
   var win = window.open(url, '_blank');
   win.focus();
 });

//when enlarging images
 $(document).on("click", ".item-preview-enlarge button", function(){
   if($(".enlarge-modal").is(':hidden'))
   {
     var name = $(this).data("name");
     var imgs = getScreenShots(name);

     var element = getElementByName(".item-preview-img", name);
     var imgName;


      imgName = $(element).attr("src").split("/").pop();


     var startingIndex = imgs.indexOf(imgName);
     currentEnlargeIndex = startingIndex;
     enlargeMaxIndex = imgs.length -1;

     var html = '';
     for(var i=0; i<imgs.length; i++)
     {
        var cls='englarged-item';
        if(i==startingIndex)
          cls += ' active';

        var imgSrc= 'res/img/'+name+'/'+imgs[i];

        //gif video
        if(imgs[i].indexOf(".mp4")!=-1)
        {
          html += '<video autoplay loop data-index="'+i+'" class="'+cls+'"><source src="'+imgSrc+'" type="video/mp4"/>Your browser does not support the video tag.</video>';
        }
        else{
          html+='<img src="'+imgSrc+'" data-index="'+i+'" class="'+cls+'"/>';
        }
      }

     $(".enlarge-con").html(html);
     $(".enlarge-modal").show();
     lockScrolling(true);
   }
   else {
     $(".enlarge-modal").hide();
     lockScrolling(false);
   }
 });

//toggle scroll lock
 function lockScrolling(lock)
 {
   if(lock)
   {
     disableScroll();
   }
   else {
     enableScroll();
   }
 }

//returns the element selector with the matching name
 function getElementByName(selector, name)
 {
   var element;
   $(selector).each(function(){
     if($(this).data("name")==name)
     {
       element=this;
       return;
     }
   });

   return element;
 }

//close modal
 $(document).on("click", ".modal-bg, .modal-close button", function(){
   $(".enlarge-modal").hide();
   lockScrolling(false);
 });

//move image left and right in modal
 $(document).on("click", ".changeImg", function(){
   var direction = Number(1);
   if($(this).data("direction") == "left")
    direction = Number(-1);

    currentEnlargeIndex += direction;

    if(currentEnlargeIndex < 0)
      currentEnlargeIndex = enlargeMaxIndex;
    else if(currentEnlargeIndex > enlargeMaxIndex)
      currentEnlargeIndex = 0;

    $(".englarged-item.active").removeClass('active');

    $(".englarged-item").each(function(){
      if($(this).data("index") == currentEnlargeIndex)
      {
        $(this).addClass('active');
        return;
      }
    });
 });

 var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
}
