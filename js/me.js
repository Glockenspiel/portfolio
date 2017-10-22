
$(document).on("click", ".showcode", function(){
  var name = $(this).data("name");
  $("#"+name).slideDown('300');;
  $(this).hide();
});

$(document).on("click", ".hidecode button", function(){
  var name = $(this).data("name");
  $("#"+name).slideUp(300);
  $(".showcode").each(function(){
    if(name==$(this).data("name"))
    {
      $(this).show();
    }
  })
})

$(document).ready(function() {
  var rapidInfo = ["3 day game jam", "Car physics", "Arcade style physics", "Unity C#", "AI"];

  addItem("rapidless", "Rapidless", null, "Jul 2017", ["screen_1.png", "screen_2.png", "screen_3.png"], rapidInfo, null, "");

  var phantomInfo = ["Dota 2 mod", "Lua", "Multiplayer PvP", "Paricle effects"];
  addItem("phantom", "Phantom Palace", "iVH01jBOEB0", "Oct 2016", ["screen_1.jpg", "screen_2.jpg", "screen_3.jpg"], phantomInfo, null, null);

  var mjjInfo = ["Unity C#", "Randomly generated maps", "Use of coroutines", "7 day game jam"];
  var mjjImgs = ["screen_2.gif", "screen_3.jpg", "screen_4.jpg"];
  var mjjCodeText = "Arrow traps used coroutines for their animation:";
  addItem("mjj", "Mythical Jetpack Journey", "aLekW5fLcHY", "Mar 2016", mjjImgs, mjjInfo, null, mjjCodeText);


  var javaInfo = ["Entity Component System", "Sprites and Animations", "Multichannel Audio", "Collision Detection", "Quad Trees", "Multithreading", "Tile Maps", "Saving and Loading"];
  var javaCodeText = "Code to initalize level:";
  addItem("java-game", "Java Game Library", null, "Dec 2015", ["screen_1.jpg"], javaInfo, null, javaCodeText);
});

function addItem(id, title, videoID, date, imgs, bulletPts, extraInfo, codeText)
{
  var html =
  '<div class="item">'+
    '<div class="item-showcase">'+
      '<div class="item-preview">';
        if(videoID!=null)
          html += '<iframe width="480" height="270" src="https://www.youtube.com/embed/'+videoID+'?rel=0&amp;showinfo=0"  frameborder="0" allowfullscreen></iframe>';
        else {
          html += '<img src="/res/img/'+id+'/'+imgs[0]+'"/>';
        }
        html +=
        '</div>'+
      '<div class="item-preview-list">';
        if(videoID!=null)
          html+='<button><img src="http://img.youtube.com/vi/'+videoID+'/maxresdefault.jpg"/></button>';

        for(var i=0; i<4; i++)
        {
          if(imgs[i]!=null)
          {
            html+='<button><img src="/res/img/'+id+'/'+imgs[i]+'"/></button>';
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
      '<div class="item-btn-con">'+
        '<button class="btn showcode" data-name="'+id+'">'+
          'Show Code Sample <span class="fa fa-code"></span>'+
        '</button>'+
      '</div>'+
    '</div>'+
    '<div class="code-preview" id="'+id+'">'+
      codeText+
      '<br><img src="/res/img/'+id+'/code.png"/>'+
      '<div class="hidecode">'+
        '<button class="btn " data-name="'+id+'">Hide Code Sample </button>'+
      '</div>'+
    '</div>'+
  '</div>';

  $(".item-con").append(html);
}
