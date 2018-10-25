






 
    
    
     
    
    
       
    
});

 map.on('mouseenter', 'ltu-parks', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'ltu-parks', function () {
        map.getCanvas().style.cursor = '';
    });


 map.on('click', 'ltu-parks', function (e) {
        
     if( map.getZoom() > 10)
         return;
     
     var coordinates = e.features[0].geometry.coordinates;
        var name = e.features[0].properties.name;
    
        var bounds = getBoundingBox(e);

        map.fitBounds(bounds, {
            padding: 20
        });
     
//     alert(name);
 })

map.on("contextmenu",function(e) {
    
    var tlatlng=e.lngLat;
    var point = e.point;
    
    var menu = document.getElementById("context-menu");
    var startMarker = document.getElementById("start-marker");
    var endMarker = document.getElementById("end-marker");
    
   // menu.style.top=point.y + 'px';
    //menu.style.left=point.x + 'px';
    
    //startMarker.style.top=point.y + 'px';
    //startMarker.style.left=point.x + 'px';
    
    
    
    new mapboxgl.Marker(startMarker)
    .setLngLat(tlatlng)
    .addTo(map);
    
    
     new mapboxgl.Marker(menu)
    .setLngLat(tlatlng)
    .addTo(map);
    
    
//    var el = document.createElement('div');
//  el.className = 'marker';

    
    //alert("You've tried to open context menu"); //here you draw your own menu
            e.preventDefault();
    
});

function getBoundingBox(data) {
    var bounds = {};

    var coordinates = data.features[0].geometry.coordinates;
    
    var coords = [];
    
     for (var i = 0; i < coordinates.length; i++) {
         coords= coords.concat(getElements(coordinates[i]));         
     }
 
    for (var j = 0; j <coords.length; j++) {
      var longitude = coords[j][0];
      var latitude = coords[j][1];
      bounds.xMin = bounds.xMin < longitude ? bounds.xMin : longitude;
      bounds.xMax = bounds.xMax > longitude ? bounds.xMax : longitude;
      bounds.yMin = bounds.yMin < latitude ? bounds.yMin : latitude;
      bounds.yMax = bounds.yMax > latitude ? bounds.yMax : latitude;
    }
  

  return [[bounds.xMax, bounds.yMax],[bounds.xMin, bounds.yMin]];
}

function getElements(data){
    
    if(Array.isArray(data) && Array.isArray(data[0]) && !Array.isArray(data[0][0]))
        return data;
    
    var coords = [];
    
    for (var i = 0; i < data.length; i++) {
        coords= coords.concat(getElements(data[i]));         
    }
    
    return coords;
}
    
function addRoute (coords, i) {
  // check if the route is already loaded
//  if (map.getSource('route')) {
//    map.removeLayer('route')
//    map.removeSource('route')
//  }
    map.addLayer({
      "id": "route" + i,
      "type": "line",
      "source": {
        "type": "geojson",
        "data": {
          "type": "Feature",
          "properties": {},
          "geometry": coords
        }
      },
      "layout": {
        "line-join": "round",
        "line-cap": "round"
      },
      "paint": {
        "line-color": colors[i],
        "line-width": 8,
        "line-opacity": 0.8
      }
    });
  
}

var colors = ['#e6194b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe'];


map.on('click', function (e) {
    
       input.value = JSON.stringify(e.lngLat);
});

input = null;

function inputClicked(input2){
    input=input2;
}

function findRoute(){
    
    var start = document.getElementById("start").value;
    var end = document.getElementById("end").value;
    
    var request = 
        {
            'start':JSON.parse(start),
            'end':JSON.parse(end)
        }
    
    var url = 'https://gis-vu-api.azurewebsites.net/api/route';
    
    fetch(url, {
        method: "POST", 
        headers: {"Content-Type": "application/json; charset=utf-8"}, 
        body: JSON.stringify(request),
    })
    .then(response => response.json())
    .then(data => process(data));
    
}

routesCount = 0;

function process (data){
    
    var text = document.getElementById("text");
    text.innerHTML  = 'lol';
    
    if(data.routes.length == 0)
        text.innerHTML = "Nerasta maršrutų";
    else{
        cleanRoutes(routesCount);
        routesCount = data.routes.length;
        var i = 0;
        data.routes.forEach(function(element) {
          addRoute(element, i)
            text.innerHTML += i;
            i++;
        });
    }
}

function cleanRoutes(count){
    for(var i =0; i < count; i++)
        if (map.getSource('route' + i)) {
            map.removeLayer('route' + i)
            map.removeSource('route' + i)
        }
}