const fs=require("fs");
var ops=new Object();

function placeOptions(elem){
  var root=elem.parent();
  var options=$(".options");
  options.css("height","0").css("padding","0").remove();
  var i=(Math.floor((root.children().index(elem)-1)/4)+1)*4;
  var cap=root.children().length-1;
  i=(i<cap)?i:cap;
  $(root.children()[i]).after(options);
  options.animate({height:"200",padding:"20"});
  return options;
}

ops.add=function(){
  placeOptions($(".add")).html(
    fs.readFileSync("ui/add-options.html").toString()
  );
}
ops.site=function(target){
  ops.target=$(target);
  placeOptions(ops.target).html(
    fs.readFileSync("ui/site-options.html").toString()
  );
}

module.exports=ops;
