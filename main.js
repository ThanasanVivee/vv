mapboxgl.accessToken = "pk.eyJ1Ijoidml2ZWVsb3ZlIiwiYSI6ImNtbjJ5b3psZzFhODEyeG9lY2pycng4cDcifQ.KDsmqpaV4SdFgt3PK5F83Q";

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11',
    center: [100.5, 13.7],
    zoom: 10,
    projection: 'mercator'
});

map.addControl(new mapboxgl.NavigationControl(), 'top-right');
map.addControl(new mapboxgl.ScaleControl(), 'bottom-left');

map.on('load', () => {
    // roads source
    map.addSource('roads-source', {
        type: 'vector',
        url: 'mapbox://viveelove.qvgl0vpu8vra'
    });

    // roads layer
    map.addLayer({
        id: 'roads-layer',
        type: 'line',
        source: 'roads-source',
        'source-layer': 'a8bc0c9ed6e95c51ff8f',
        paint: {
            'line-color': '#00ffea',
            'line-width': 1.5,
            'line-opacity': 1
        }
    });

    // LAYER2 
    map.addSource('admin-source', {
        type: 'vector',
        url: 'mapbox://viveelove.61n24si9o4pi'
    });

    // admin layer
    map.addLayer({
        id: 'admin-layer',
        type: 'line',
        source: 'admin-source',
        'source-layer': '3c8c7f4930e00c0fa339',
        paint: {
            'line-color': '#ffa200',
            'line-width': 2,
            'line-opacity': 1
        }
    });

    // toggle roads
    document.getElementById('roads-toggle').addEventListener('change', function () {
        map.setLayoutProperty(
            'roads-layer',
            'visibility',
            this.checked ? 'visible' : 'none'
        );
    });

    // toggle admin
    document.getElementById('admin-toggle').addEventListener('change', function () {
        map.setLayoutProperty(
            'admin-layer',
            'visibility',
            this.checked ? 'visible' : 'none'
        );
    });
});

// popup roads
map.on('click', 'roads-layer', (e) => {
    const feature = e.features[0];
    const props = feature.properties || {};

    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(`<pre>${JSON.stringify(props, null, 2)}</pre>`)
        .addTo(map);
});

// cursor
map.on('mouseenter', 'roads-layer', () => {
    map.getCanvas().style.cursor = 'pointer';
});

map.on('mouseleave', 'roads-layer', () => {
    map.getCanvas().style.cursor = '';
});

// debug
map.on('error', (e) => {
    console.error('Mapbox error:', e);
});
