var catTop;

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
    $(this).each(function(){
      $(this).text("Hide More Info");
    });
  }
  else {
    $(preview).slideUp('300');
    $(this).each(function(){
      $(this).text("Show More Info");
    });
  }
})

$(document).ready(function() {
  catTop  = $("#catagory").offset().top;

  addAllItems();
  setItemType();
  $

  //navigate catagories
  $("#catagory button").click(function(){
    var type = $(this).data("type");
    document.location.href = "#"+type;

    $("html, body").animate({ scrollTop: 0 }, "100", function(){
    setItemType();
    });
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
}

function addAllItems()
{
  var rapidInfo = ["3 day game jam", "Car physics", "Arcade style physics", "Unity C#", "AI"];

  addItem("games", "rapidless", "Rapidless", null, "Jul 2017", ["screen_1.png", "screen_2.png", "screen_3.png"], rapidInfo, null, "");

  var phantomInfo = ["Dota 2 mod", "Lua", "Multiplayer PvP", "Paricle effects"];
  addItem("games", "phantom", "Phantom Palace", "iVH01jBOEB0", "Oct 2016", ["screen_1.jpg", "screen_2.jpg", "screen_3.jpg"], phantomInfo, null, null);

  var mjjInfo = ["Unity C#", "Randomly generated maps", "Use of coroutines", "7 day game jam"];
  var mjjImgs = ["screen_2.gif", "screen_3.jpg", "screen_4.jpg"];
  var mjjCodeText = "Arrow traps used coroutines for their animation:";
  addItem("games", "mjj", "Mythical Jetpack Journey", "aLekW5fLcHY", "Mar 2016", mjjImgs, mjjInfo, null, mjjCodeText);


  var javaInfo = ["Entity Component System", "Sprites and Animations", "Multichannel Audio",
  "Collision Detection", "Quad Trees", "Multithreading", "Tile Maps", "Saving and Loading"];
  var javaCodeText = "Code to initalize level:";
  addItem("games", "java-game", "Java Game Library", null, "Dec 2015", ["screen_1.jpg"], javaInfo, null, javaCodeText, "https://github.com/Glockenspiel/Java-Game-Engine");

  var cdfInfo = ["Website", "HTML, CSS, JavaScript, JQuery", "Blog and infographics",
  "Infographic tool generates html from templates and input fields", "Custom blogging tool", "Meta tag generation for new posts", "Table generation from csv strings", "Comment section with Disqus"];
  addItem("software", "cdf", "CoolDownFeed.com", "ssda", "Oct 2017", ["screen_0.jpg","screen_1.jpg","screen_2.jpg", "screen_3.jpg"], cdfInfo, null, null, "http://www.cooldownfeed.com");

  var fiberInfo = ["Alternative implementation of coroutines",
  "Single application uses worker threads and schedules tasks onto allocated memory called fibers",
  "C++11", "Task scheduling", "Concurrent atomic data structures", "Multi-threading"];
  addItem("software", "fiber", "Fiber Library", null, "Apr 2016", ["screen_2.jpg", "screen_1.jpg"],fiberInfo, null,null,"https://github.com/Glockenspiel/Fibers4U");
}

function addItem(type, id, title, videoID, date, imgs, bulletPts, extraInfo, codeText, url)
{
  var html =
  '<div class="item" data-type="'+type+'">'+
    '<div class="item-showcase">'+
      '<div class="item-preview" data-name="'+id+'">';
        if(videoID!=null)
          html += getVideoHtml(videoID);
        else {
          html += '<img src="/res/img/'+id+'/'+imgs[0]+'"/>';
        }
        html +=
        '</div>'+
      '<div class="item-preview-list">';
        if(videoID!=null)
        {
          var imgSrc= 'http://img.youtube.com/vi/'+videoID+'/maxresdefault.jpg';
          html+='<button data-name="'+id+'" data-videoid="'+videoID+'"><div class="play-btn"><img src="/res/img/play-btn.png"/></div><img src="'+imgSrc+'"/></button>';
        }

        for(var i=0; i<5; i++)
        {
          if(imgs[i]!=null)
          {
            var imgSrc= '/res/img/'+id+'/'+imgs[i];
            html+='<button data-name="'+id+'" data-src="'+imgSrc+'"><img src="'+imgSrc+'"/></button>';
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

      if(codeText==null) codeText='';

      html +=
      '<div class="item-btn-con">';

      if(url!=undefined && url!=null)
        html+='<button class="btn view-item" data-url="'+url+'">View</button>';

      html+=
        '<button class="btn showcode" data-name="'+id+'">'+
          'Show More Info'+
        '</button>'+
      '</div>'+
    '</div>'+
    '<div class="code-preview" id="'+id+'">'+
      codeText+
      '<br><img src="/res/img/'+id+'/code.png"/>'+
      '<div class="hidecode">'+
        '<button class="btn showcode" data-name="'+id+'">Hide More Info</button>'+
      '</div>'+
    '</div>'+
  '</div>';

  $(".item-con").append(html);
}

function getVideoHtml(videoID)
{
  return '<iframe width="650" height="365" src="https://www.youtube.com/embed/'+videoID+'?rel=0&amp;showinfo=0"  frameborder="0" allowfullscreen></iframe>';
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
    }
    else {
      $(preview).html('<img src="'+imgSrc+'""/>')
    }
});

$(document).scroll(function() {
     $("#catagory").toggleClass('sticky', $(window).scrollTop() > catTop);
 });

 $(document).on("click", ".view-item", function(){
   var url = $(this).data("url");
   var win = window.open(url, '_blank');
   win.focus();
 });
