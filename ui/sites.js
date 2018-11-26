var fs=require("fs");

// Secondary API
function isFolderGood(path){
  var files=fs.readdirSync(path);
  for(var a=0;a<files.length;a++){
    if(files[a].toString()=="index.html") return true;
  }
  return false;
}

// Wrapper library
function baseWidget(icon,click,name,bg="gray",bdr="black"){
  return $("<div>").addClass("site")
    .attr("onclick",click)
    .append($("<img>")
      .css("background-color",bg)
      .css("border-color",bdr)
      .attr("src",icon))
    .append($("<div>").text(name));
}
function addWidget(){
  return baseWidget("../assets/add.svg","ops.add()","add",bg="white").addClass("add");
}
function fileWidget(name){
  return baseWidget("../assets/file.svg","ops.site(this)",name,bg="#e2e2e2",bdr="#a5a5a5")
    .attr("title","A single file");
}
function folderWidget(name){
  return baseWidget("../assets/folder.svg","ops.site(this)",name,bg="#42c5f4",bdr="#1c8db5")
    .attr("title","A proper web directory");
}
function noIndexFolderWidget(name){
  return baseWidget("../assets/noIndexFolder.svg","ops.site(this)",name,bg="#95cee2",bdr="#1c8db5")
    .attr("title","This directory lacks an immediate index.html file");
}

// Access point
module.exports=function(){
  var root=$(".sites").empty().append(
    $("<div>").addClass("options")
  );
  var sites=fs.readdirSync("/var/www/html");
  for(var a=0;a<sites.length;a++){
    var name=sites[a].toString();
    var path="/var/www/html/"+name;
    var fd=fs.openSync(path,flags="r");
    var stat=fs.fstatSync(fd);
    if(stat.isFile()){
      root.append(fileWidget(name));
    }else if (stat.isDirectory()){
      if(isFolderGood(path)){
        root.append(folderWidget(name));
      }else{
        root.append(noIndexFolderWidget(name));
      }
    }
  }
  root.append(addWidget());
}
