//var markers = [];
endGraphic = null;
endPoint = null;

startGraphic = null;
startPoint = null;

pointGraphic = null;
pointPoint = null;

function leaveContext() {
    require(["dojo/dom-class"], function(domClass) {
        domClass.toggle("contextMenu", "hide");
    });
}

function contextClicked(event) {

    lastPoint = event.mapPoint;

    require(["dojo/dom-class"], function(domClass) {
        domClass.toggle("contextMenu", "hide");
    });

    var menu = document.getElementById("contextMenu");

    menu.setAttribute("style", "margin-left:" + event.screenPoint.x + 'px;margin-top:' + event.screenPoint.y + 'px;');

   
    event.stopPropagation();
}

function setRouteEnd() {

    
    if (endGraphic != null)
        gl.remove(endGraphic);
    else
        require(["dojo/dom-class"], function(domClass) {
            domClass.toggle("endMarker" + "NotSelected", "hide");
            domClass.toggle("endMarker" + "Selected", "hide");
        });

    require(["esri/symbols/SimpleMarkerSymbol", "esri/Graphic"], function(SimpleMarkerSymbol, Graphic) {

        var symbol = {
            type: "picture-marker",
            url: "img/end_marker.png",
            width: "88px",
            height: "88px",
        };


        endGraphic = new Graphic(lastPoint, symbol);
        endPoint = lastPoint;
        gl.add(endGraphic);

    });
    
    if(startGraphic != null){
         document.getElementById("searchBtn").disabled =false;
        
    }
}


function setRouteStart() {

    
    if (startGraphic != null)
        gl.remove(startGraphic);
    else
        require(["dojo/dom-class"], function(domClass) {
            domClass.toggle("startMarker" + "NotSelected", "hide");
            domClass.toggle("startMarker" + "Selected", "hide");
        });

    require(["esri/symbols/SimpleMarkerSymbol", "esri/Graphic"], function(SimpleMarkerSymbol, Graphic) {

        var symbol = {
            type: "picture-marker",
            url: "img/start_marker.png",
            width: "88px",
            height: "88px",
        };


        startGraphic = new Graphic(lastPoint, symbol);
        startPoint = lastPoint;
        gl.add(startGraphic);

    });
    
     if(endGraphic != null){
         document.getElementById("searchBtn").disabled =false;
        
    }
}

function setRoutePoint() {

    
    if (pointGraphic != null)
        gl.remove(pointGraphic);
    else
        require(["dojo/dom-class"], function(domClass) {
            domClass.toggle("pointMarker" + "NotSelected", "hide");
            domClass.toggle("pointMarker" + "Selected", "hide");
        });

    require(["esri/symbols/SimpleMarkerSymbol", "esri/Graphic"], function(SimpleMarkerSymbol, Graphic) {

        var symbol = {
            type: "picture-marker",
            url: "img/point_marker.png",
            width: "88px",
            height: "88px",
        };


        pointGraphic = new Graphic(lastPoint, symbol);
        pointPoint = lastPoint;
        gl.add(pointGraphic);

    });
}

//function cleanTempMarkers(){
//    
//    var tempMarker = findMarkerWithClass("tempMarker");
//    var menuMarker = findMarkerWithClass("contextMenu");
//    if(tempMarker!=null)tempMarker.remove();
//    if(menuMarker!=null)menuMarker.remove();
//    
//    removeMarkerFromArray("contextMenu");
//    removeMarkerFromArray("tempMarker");
//};
//

//
//
//function setRouteStart(){
//    setRoute("startMarker");
//}
//
//function setRoutePoint(){
//     setRoute("pointMarker");
//}
//
//endGraphic = null;
//
//function setRoute(className){
//    
//    
//    
//    if(endGraphic != null)
//        gl.remove(endGraphic); 
//    
//     require(["esri/symbols/SimpleMarkerSymbol", "esri/Graphic" ], function(SimpleMarkerSymbol,Graphic ) {
//         
//         var symbol = {
//      type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
//      url: "img/end_marker.png",
//      width: "88px",
//      height: "88px",
//    };
//    
//     var newPoint = lastPoint;    
//         
//    endGraphic = new Graphic(lastPoint, symbol);
//  gl.add(endGraphic);
//         
//         
//     });
//    
//    
//    return;
//    
//    var marker = findMarkerWithClass(className);
//    
//    if(marker != null) marker.remove();
//    removeMarkerFromArray(className);
//    
//    var tempMarker = findMarkerWithClass("tempMarker");
//
//    cleanTempMarkers();
//    
//    createMarker(className,tempMarker.getLngLat());
//    
//    
//    //set in side menu
//   
//    if(findMarkerWithClass('startMarker')!=null) setAsSelected("startMarker");
//    if(findMarkerWithClass('endMarker')!=null) setAsSelected("endMarker");
//    if(findMarkerWithClass('pointMarker')!=null) setAsSelected("pointMarker");
//    
//    if($(".searchBtn").prop('disabled')){
//        var startMarker = findMarkerWithClass("startMarker");
//        var endMarker = findMarkerWithClass("endMarker");
//        
//        
//        if(startMarker != null && endMarker != null){
//            $(".searchBtn").prop('disabled', false);
//        }
//                
//    }
//}
//
//function setAsSelected(className){
//    $("." + className + "NotSelected").hide();
//    $("." + className + "Selected").show();
//}
//
//
//function createMarker(className, coordinates){
//    var el = document.createElement('div');
//    el.className = className;
//
//    var marker = new mapboxgl.Marker(el)
//        .setLngLat(coordinates)
//        .addTo(map);
//    
//    markers.push(marker);
//}
//
//
//function findMarkerWithClass(className) {
//    for (var i = 0, len = markers.length; i < len; i++) {
//       if (markers[i].getElement().className.startsWith(className)){
//            //console.log(markers[i].getElement().className[0]);
//            return markers[i]; // Return as soon as the object is found
//
//       }
//    }
//    return null; // The object was not found
//}
//
//function removeMarkerFromArray(markerClass){
//    var marker = findMarkerWithClass(markerClass);
//    
//    var index = markers.indexOf(marker);
//    if (index > -1) {
//      markers.splice(index, 1);
//    }    
//}


//# sourceURL=mapActions.js