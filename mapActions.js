var markers = [];

function leaveContext(){
    require(["dojo/dom-class"], function(domClass){
        domClass.toggle("contextMenu", "hide");
    });
}

function contextClicked(event) {
    
    lastPoint = event.mapPoint;
    
    event.stopPropagation();

    require(["dojo/dom-class"], function(domClass){
        domClass.toggle("contextMenu", "hide");
    });
    
    var menu=document.getElementById("contextMenu");

    menu.setAttribute("style", "margin-left:" + event.screenPoint.x + 'px;margin-top:'+ event.screenPoint.y + 'px;');
    
    var lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
    var lon = Math.round(event.mapPoint.longitude * 1000) / 1000;
    

    
//    alert('bbb');
//    cleanTempMarkers();
//    
//    var el = document.createElement('div');
//    el.className = 'tempMarker';
//
//    var marker = new mapboxgl.Marker(el)
//        .setLngLat(e.lngLat)
//        .addTo(map);
//    
//    markers.push(marker);
//    
//    
    
//     require(["esri/symbols/SimpleMarkerSymbol", "esri/Graphic" ], function(SimpleMarkerSymbol,Graphic ) {
//         
//          var p = event.mapPoint;
//
//         
//         var symbol = {
//              type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
//              style: "square",
//              color: "blue",
//              size: "8px",  // pixels
//              outline: {  // autocasts as new SimpleLineSymbol()
//                color: [ 255, 255, 0 ],
//                width: 3  // points
//              }
//            };
//         
//          var g = new Graphic(p, symbol);
//          gl.add(g);
//         
//     });
//    
    
    
    
//    var contextMenu = $.parseHTML("<div class='contextMenu'><input type=\"button\" value=\"Mar\u0161ruto prad\u017Eia\" onclick=\"setRouteStart()\" class=\"startBtn\"><input type=\"button\" value=\"Aplankytas taškas\" onclick=\"setRoutePoint()\" class=\"pointBtn\"><input type=\"button\" value=\"Mar\u0161ruto pabaiga\" onclick=\"setRouteEnd()\" class=\"endBtn\"><\/div>");
////    
//    
//    marker = new mapboxgl.Marker(contextMenu[0])
//        .setLngLat(e.lngLat)
//        .addTo(map);
//    
//    markers.push(marker);
//    
//    e.preventDefault();
};

function cleanTempMarkers(){
    
    var tempMarker = findMarkerWithClass("tempMarker");
    var menuMarker = findMarkerWithClass("contextMenu");
    if(tempMarker!=null)tempMarker.remove();
    if(menuMarker!=null)menuMarker.remove();
    
    removeMarkerFromArray("contextMenu");
    removeMarkerFromArray("tempMarker");
};

function setRouteEnd(){
     setRoute("endMarker");
}


function setRouteStart(){
    setRoute("startMarker");
}

function setRoutePoint(){
     setRoute("pointMarker");
}


function setRoute(className){
    var marker = findMarkerWithClass(className);
    
    if(marker != null) marker.remove();
    removeMarkerFromArray(className);
    
    var tempMarker = findMarkerWithClass("tempMarker");

    cleanTempMarkers();
    
    createMarker(className,tempMarker.getLngLat());
    
    
    //set in side menu
   
    if(findMarkerWithClass('startMarker')!=null) setAsSelected("startMarker");
    if(findMarkerWithClass('endMarker')!=null) setAsSelected("endMarker");
    if(findMarkerWithClass('pointMarker')!=null) setAsSelected("pointMarker");
    
    if($(".searchBtn").prop('disabled')){
        var startMarker = findMarkerWithClass("startMarker");
        var endMarker = findMarkerWithClass("endMarker");
        
        
        if(startMarker != null && endMarker != null){
            $(".searchBtn").prop('disabled', false);
        }
                
    }
}

function setAsSelected(className){
    $("." + className + "NotSelected").hide();
    $("." + className + "Selected").show();
}


function createMarker(className, coordinates){
    var el = document.createElement('div');
    el.className = className;

    var marker = new mapboxgl.Marker(el)
        .setLngLat(coordinates)
        .addTo(map);
    
    markers.push(marker);
}


function findMarkerWithClass(className) {
    for (var i = 0, len = markers.length; i < len; i++) {
       if (markers[i].getElement().className.startsWith(className)){
            //console.log(markers[i].getElement().className[0]);
            return markers[i]; // Return as soon as the object is found

       }
    }
    return null; // The object was not found
}

function removeMarkerFromArray(markerClass){
    var marker = findMarkerWithClass(markerClass);
    
    var index = markers.indexOf(marker);
    if (index > -1) {
      markers.splice(index, 1);
    }    
}


//# sourceURL=mapActions.js