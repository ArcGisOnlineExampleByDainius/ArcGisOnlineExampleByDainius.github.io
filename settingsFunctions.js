function invertSettings(){
    $('#settings').toggle();
}

function invertDownloadBox(){
    $('#downloadBox').toggle();
}


function showDownloadBtn(){
    $('.downloadBtn').show();
}

function hideDownloadBtn(){
    $('.downloadBtn').hide();
}

function downloadRoute(){
    var id = this.id;
    var index = id.split('_')[1];
    
    var data = oldData.routes[index];  
    
    var kml = tokml(data.data);
    
    download('route' + index + '.kml', kml);
}


function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}



//# sourceURL=settingsFunctions.js