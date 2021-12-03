$(document).ready(function(){
  var fa = new FAApp(function(r, rule){
    $("<option/>").attr("value", r).text(rule['name']).appendTo("#rules");
  });
 $("#rundir").on("click", function(){
    arundir();
  })
});
  
  async function arunit(){
    var [fileHandle] = await window.showOpenFilePicker();
    const file = await fileHandle.getFile();
    const contents = await file.text();
    console.log(contents);
  }
  
  async function arundir() {
    // Note that this function is experimental.  It works in Chrome and Edge.  Does not work in Safari or Firefox.
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/showDirectoryPicker
    var dirHandle = await window.showDirectoryPicker();
    $("#seldir").text(dirHandle.name);
    $('#datatable').bootstrapTable('destroy');
    $('#datatable').bootstrapTable({
      sortable: true,
      pageList: [10, 25, 50, 100, 200, 500]
    });
    var rows = [];
    await arundirItem(rows, "/", dirHandle);
    $('#datatable').bootstrapTable('append', rows);
  }
  
  async function arundirItem(rows, path, dirHandle){
    for await (var entry of dirHandle.values()) {
      if (entry.kind === "file"){
        var file = await entry.getFile();
        var p = file.name.split(".");
        rows.push({
          file: file.name,
          path: path,
          created: file.lastModifiedDate.toLocaleDateString('en-CA'),
          size: file.size,
          ext: p[p.length - 1]
        });
      }
      if (entry.kind === "directory") {
        if (entry.name === ".git") continue;
        var newHandle = await dirHandle.getDirectoryHandle( entry.name, { create: false } );
        //console.log(entry.name);
        await arundirItem(rows, path + entry.name + "/", newHandle);
      }
    }
  }  