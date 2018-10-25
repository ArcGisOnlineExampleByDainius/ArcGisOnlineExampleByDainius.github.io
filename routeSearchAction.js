routesCount = 0;

function routeSearch(){
    
    var btn = $('.searchBtn')[0];
    var loader = $('.loader')[0];
    
    $(btn).toggle();
    $(loader).toggle();
    
    var startMarker = findMarkerWithClass('startMarker');
    var endMarker = findMarkerWithClass('endMarker');
    var pointMarker = findMarkerWithClass('pointMarker');
    
    var pointMarkerCoordinates = null;
    
    if(pointMarker!=null)
        pointMarkerCoordinates = pointMarker.getLngLat();
    
    var pathValue = $('#pathValue')[0].value;
    var walkingPathValue = $('#walkingPathValue')[0].value;
    var routeValue = $('#routeValue')[0].value;
    var seriousRouteValue = $('#seriousRouteValue')[0].value;
    var routeOverlapValue = $('#routeOverlapValue')[0].value;
    
    var forrestValue = $('#forrestValue')[0].value;
    var waterDistanceValue = $('#waterDistanceValue')[0].value;
    var waterValue = $('#waterValue')[0].value;

    
    
    var request = 
        {
            'start':startMarker.getLngLat(),
            'end':endMarker.getLngLat(),
            'point':pointMarkerCoordinates,
            'searchOptions':{
                'trackOverlapImportance':routeOverlapValue,
                'propertyValueImportance':[
                    {"property":"distance_to_forrest", "threshold":0,"importance":forrestValue},
                    {"property":"distance_to_water", "threshold":waterDistanceValue,"importance":waterValue},
                ],
                'propertyImportance':[
                    {"property": "fclass","value": "bridleway","importance":pathValue},
                    {"property": "fclass","value": "cycleway","importance":pathValue},
                    {"property": "fclass","value": "path","importance":pathValue},
                    {"property": "fclass","value": "footway","importance":walkingPathValue},
                    {"property": "fclass","value": "steps","importance":walkingPathValue},
                    {"property": "fclass","value": "living_street","importance":routeValue},
                    {"property": "fclass","value": "pedestrian","importance":routeValue},
                    {"property": "fclass","value": "residential","importance":routeValue},
                    {"property": "fclass","value": "service","importance":routeValue},
                    {"property": "fclass","value": "tertiary","importance":routeValue},
                    {"property": "fclass","value": "track","importance":routeValue},
                    {"property": "fclass","value": "track_grade1","importance":routeValue},
                    {"property": "fclass","value": "track_grade2","importance":routeValue},
                    {"property": "fclass","value": "track_grade3","importance":routeValue},
                    {"property": "fclass","value": "track_grade4","importance":routeValue},
                    {"property": "fclass","value": "track_grade5","importance":routeValue},
                    {"property": "fclass","value": "unclassified","importance":routeValue},
                    {"property": "fclass","value": "motorway","importance":seriousRouteValue},
                    {"property": "fclass","value": "motorway_link","importance":seriousRouteValue},
                    {"property": "fclass","value": "primary","importance":seriousRouteValue},
                    {"property": "fclass","value": "primary_link","importance":seriousRouteValue},
                    {"property": "fclass","value": "secondary","importance":seriousRouteValue},
                    {"property": "fclass","value": "secondary_link","importance":seriousRouteValue},
                    {"property": "fclass","value": "trunk","importance":seriousRouteValue},
                    {"property": "fclass","value": "trunk_link","importance":seriousRouteValue},
                ]
            }
        }
        
    fetch(url, {
        method: "POST", 
        headers: {"Content-Type": "application/json; charset=utf-8"}, 
        body: JSON.stringify(request),
    })
    .then(response => {
        $(btn).toggle();
        $(loader).toggle();
        return response.json()
    })
    .then(data => processResponse(data))
    .catch(function(){
        alert("Error");
        hideDownloadBtn();
        cleanRoutes();
        $(btn).show();
        $(loader).hide();
        routesCount=0;
        oldData = null;
    });
}


function processResponse(data){
    
    oldData = data;
    
    cleanRoutes();
    routesCount = data.routes.length;
    
    var i = 0;
        data.routes.forEach(function(element) {
          addRoute(element, i);
            i++;
        });
   
    
    if(routesCount == 0){
        hideDownloadBtn();
        alert('No route found');
    }
        
    else{
        showDownloadBtn();
        highLight('route' + (routesCount - 1));
    }
}


function cleanRoutes(){
    for(var i =0; i < routesCount; i++)
        if (map.getSource('route' + i)) {
            map.removeLayer('route' + i)
            map.removeSource('route' + i)
        }
    
    $('#routeResultBox').empty();
    $('#routeResultBox2').empty();
}

function addRoute (route, i) {
  var colors = ['#e6194b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe'];
    
    map.addLayer({
      "id": "route" + i,
      "type": "line",
      "source": {
        "type": "geojson",
        "data": {
          "type": "Feature",
          "properties": {},
          "geometry": route.data
        }
      },
      "layout": {
        "line-join": "round",
        "line-cap": "round"
      },
      "paint": {
        "line-color": colors[i],
        "line-width": 8,
        "line-opacity": 1
      }
    });
  
    addRouteInfo(colors[i], i, route.info.length);
}

function addRouteInfo(color, index, info){
    
    var routeResult = document.createElement('div');
    routeResult.className = 'routeResult';
    $(routeResult).attr("id","route" + index);
    
    
    var routeColorBox = document.createElement('div');
    routeColorBox.className = 'routeColorBox';
    $(routeColorBox).css('background-color', color);
    
    var routeInfo = document.createElement('p');
    $(routeInfo).text(info);
    
    routeResult.append(routeColorBox);
    routeResult.append(routeInfo);
    
    
    $('#routeResultBox').append(routeResult);
    
    
    
    
    var routeColorBox2 = document.createElement('div');
    routeColorBox2.className = 'routeColorBox';
    $(routeColorBox2).css('background-color', color);
    
    var routeResult2 = document.createElement('div');
     routeResult2.className = 'routeResult2';
    routeResult2.append(routeColorBox2);
    
    var routeInfo2 = document.createElement('p');
    $(routeInfo2).text("Atsisiųsti");
    
    routeResult2.append(routeInfo2);
    $(routeResult2).attr("id","downloadRoute_" + index);

    
    routeResult2.addEventListener("click", downloadRoute, false);
    
    $('#routeResultBox2').append(routeResult2);
    
    $(routeResult).click(function(){ highLight('route' + index);});
}

function highLight(layerId){
    map.moveLayer(layerId);
    
    $('.routeResult').css("background", 'white');
    $('#'+layerId).css("background", '#C0C0C0');
    
    
//    map.setPaintProperty(layerId, "line-width", 16);
}

//# sourceURL=routeSearchAction.js