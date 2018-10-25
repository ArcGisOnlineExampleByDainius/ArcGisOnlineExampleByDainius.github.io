mapboxgl.accessToken = 'pk.eyJ1IjoiZGFpbml1c2thdm9saXVuYXMiLCJhIjoiY2ptbHNrd2d0MGFybzNxbzdiM2ttOG9jZiJ9.b94lBZSOYTNLvLLTjUx8OA';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/dainiuskavoliunas/cjmokl18u00q32sljbeffo8k7',
    center: [23.897, 55.322],
    zoom: 7
});

map.on("contextmenu", contextClicked);

map.on('load', function() {

    map.addLayer({
        "id": "ltu-parks",
        "type": "fill",
        "source": {
            type: 'vector',
            url: 'mapbox://dainiuskavoliunas.f34e329f'
        },
        "source-layer": "Parks",
        "layout": {},
        "paint": {
            "fill-color": "#9ACD32",
            "fill-opacity": 1
        }
    });
    
    
     map.addLayer({
        "id": "ltu-vandenys",
        "type": "fill",
        "source": {
            type: 'vector',
            url: 'mapbox://dainiuskavoliunas.bcba50c5'
        },
        "source-layer": "vandenys",
        "layout": {},
        "paint": {
            "fill-color": "#0000CD",
            "fill-opacity": 1
        }
    });
    
    
    map.addLayer({
        "id": "ltu-miskai",
        "type": "fill",
        "source": {
            type: 'vector',
            url: 'mapbox://dainiuskavoliunas.72188b78'
        },
        "source-layer": "miskai3",
        "layout": {},
        "paint": {
            "fill-color": "#228B22",
            "fill-opacity": 1
        }
    });
    
    map.addLayer({
        "id": "routes-osm",
        "type": "line",
        "source": {
            type: 'vector',
            url: 'mapbox://dainiuskavoliunas.4b747573'
        },
        "source-layer": "Keliai_OSM",
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": [
                'match',
                ['get', 'fclass'],
                'bridleway', "black",
                'cycleway', 'black',
                'footway', 'black',
                'living_street', 'white',
                'motorway', 'pink',
                'motorway_link', 'pink',
                'path', 'black',
                'pedestrian', 'white',
                'primary', 'pink',
                'primary_link', 'pink',
                'residential', 'white',
                'secondary', 'pink',
                'secondary_link', 'pink',
                'service', 'white',
                'steps', 'black',
                'tertiary', 'white',
                'track', 'white',
                'track_grade1', 'white',
                'track_grade2', 'white',
                'track_grade3', 'white',
                'track_grade4', 'white',
                'track_grade5', 'white',
                'trunk', 'pink',
                'trunk_link', 'pink',
                'unclassified', 'white',
                /* other */ 'yellow'
            ],
            "line-width": [
                'match',
                ['get', 'fclass'],
                'bridleway', 1,
                'cycleway', 1,
                'footway', 2,
                'living_street', 2,
                'motorway', 5,
                'motorway_link', 3,
                'path', 1,
                'pedestrian', 2,
                'primary', 5,
                'primary_link', 3,
                'residential', 3,
                'secondary', 5,
                'secondary_link', 3,
                'service', 2,
                'steps', 4,
                'tertiary', 3,
                'track', 2,
                'track_grade1', 2,
                'track_grade2', 2,
                'track_grade3', 2,
                'track_grade4', 2,
                'track_grade5', 2,
                'trunk', 5,
                'trunk_link', 3,
                'unclassified', 3,
                /* other */ 1
            ]
        }
    });
    
    map.addLayer({
        "id": "ltu-parks-names",
        "type": "symbol",
        "source": {
            type: 'vector',
            url: 'mapbox://dainiuskavoliunas.f34e329f'
        },
        "source-layer": "Parks",
        "layout": {
            "icon-image": "{marker-symbol}-15",
            "text-field": "{name}",
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-offset": [0, 0.6],
            "text-anchor": "top",
        },
        "paint": {

            "text-color": "black"
        },
        "interactive": false
    });
});

//# sourceURL=initializeMap.js