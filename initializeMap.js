require([
    "esri/Map",
    "esri/layers/FeatureLayer",
    "esri/layers/TileLayer",
    "esri/views/MapView",
     "esri/layers/GraphicsLayer",
    "dojo/domReady!"
], function(Map, FeatureLayer, TileLayer, MapView, GraphicsLayer) {

    var map = new Map({
        basemap: "gray",
        slider: false
    });

    var parkLayer = new TileLayer({
        url: "https://services9.arcgis.com/Ft7DENNtF3ueB5vS/arcgis/rest/services/verkiuParkas2/MapServer" // REQUIRED: Paste your feature service URL here
    });

    var path = {
        type: "simple-line",
        color: "black",
        width: 1,
        style: "solid"
    };

    var footway = {
        type: "simple-line",
        color: "black",
        width: 2,
        style: "solid"
    };

    var road = {
        type: "simple-line",
        color: "white",
        width: 3,
        style: "solid"
    };

    var mainroad = {
        type: "simple-line",
        color: "pink",
        width: 5,
        style: "solid"
    };

    var roadsRenderer = {
        type: "unique-value",
        field: "fclass",
        defaultSymbol: road,
        uniqueValueInfos: [{
                value: "motorway",
                symbol: mainroad
            },
            {
                value: "motorway_link",
                symbol: mainroad
            },
            {
                value: "primary",
                symbol: mainroad
            },
            {
                value: "primary_link",
                symbol: mainroad
            },
            {
                value: "secondary",
                symbol: mainroad
            },
            {
                value: "secondary_link",
                symbol: mainroad
            }, {
                value: "path",
                symbol: path
            }, {
                value: "bridleway",
                symbol: path
            }, {
                value: "cycleway",
                symbol: path
            }, {
                value: "steps",
                symbol: path
            }, {
                value: "footway",
                symbol: footway
            }
        ]
    };

    var roadsLayer = new FeatureLayer({
        url: "https://services9.arcgis.com/Ft7DENNtF3ueB5vS/arcgis/rest/services/keliai_LT/FeatureServer", // REQUIRED: Paste your feature service URL here
        renderer: roadsRenderer
    });

    var waterLayer = new TileLayer({
        url: "https://services9.arcgis.com/Ft7DENNtF3ueB5vS/arcgis/rest/services/vandenys_world_shape/MapServer" // REQUIRED: Paste your feature service URL here
    });

    var forrestLayer = new TileLayer({
        url: "https://services9.arcgis.com/Ft7DENNtF3ueB5vS/arcgis/rest/services/miskai_world_shape/MapServer" // REQUIRED: Paste your feature service URL here
    });


    map.add(parkLayer);
    map.add(forrestLayer);
    map.add(waterLayer);
    map.add(roadsLayer);
    
    
    gl = new GraphicsLayer();
    map.add(gl);
    
    mapView = new MapView({
        container: "map",
        map: map,
        center: [25.2797, 54.6872],
        zoom: 13
    });

    
    mapView.on("click", function(event) {
        contextClicked(event);
    });

});

//# sourceURL=initializeMap.js