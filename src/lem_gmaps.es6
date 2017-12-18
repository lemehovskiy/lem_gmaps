class LemGmaps {

    constructor(element, options) {

        let self = this;

        self.$element = $(element);

        //extend by function call
        self.settings = $.extend(true, {
            // lat_shift: 0,
            map_options: {
                center: {lat: 42.877742, lng: -97.380979},
                zoom: 1,
                scrollwheel: false,
                maxZoom: 15,
                styles: []
            },
            marker_icon: {
                path: 'M10.9,0C4.9,0,0,4.9,0,10.9c0,7,9.8,24.7,10.9,24.7c1.2,0,10.9-17.5,10.9-24.7C21.8,4.9,16.9,0,10.9,0z M10.9,15.5c-2.5,0-4.6-2-4.6-4.6s2-4.6,4.6-4.6c2.5,0,4.6,2,4.6,4.6S13.4,15.5,10.9,15.5z',
                fillColor: '#882929',
                fillOpacity: 1,
                scale: 1.1,
                strokeWeight: 0,
                anchor: new google.maps.Point(20, 20)
            },
            markers: []
        }, options);


        //extend by data options
        self.data_options = self.$element.data('lem-gmap');
        self.settings = $.extend(true, self.settings, self.data_options);


        self.map;
        self.bounds;
        self.google_map_markers = [];


        self.init();

    }


    init() {

        let self = this;

        self.map = new google.maps.Map(self.$element[0], self.settings.map_options);

        self.add_markers(self.settings.markers);
        self.marker_bounds(self.google_map_markers);

    }


    marker_bounds(markers) {

        let self = this;

        let bounds = new google.maps.LatLngBounds();

        markers.forEach(function (markerObj) {
            bounds.extend(markerObj.marker.position);
        });

        // if (self.settings.lat_shift) {
        //     if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
        //         var extendPoint = new google.maps.LatLng(bounds.getNorthEast().lat() + self.settings.lat_shift, bounds.getNorthEast().lng());
        //         bounds.extend(extendPoint);
        //     }
        // }

        self.map.fitBounds(bounds);

    }


    add_markers(markers) {

        let self = this;

        markers.forEach(function (marker, i) {

            let marker_icon = self.settings.marker_icon;

            //extend individual marker options
            $.extend(true, marker_icon, marker.icon);

            let google_map_marker = new google.maps.Marker({
                position: new google.maps.LatLng(marker.lat, marker.lng),
                icon: marker_icon,
                map: self.map
            });

            // save all markers in array
            self.google_map_markers.push({
                marker: google_map_marker,
                lat: marker.lat,
                lng: marker.lng
            });
        });
    }
}


$.fn.lemGmaps = function () {
    let $this = this,
        opt = arguments[0],
        args = Array.prototype.slice.call(arguments, 1),
        length = $this.length,
        i,
        ret;
    for (i = 0; i < length; i++) {
        if (typeof opt == 'object' || typeof opt == 'undefined')
            $this[i].lem_gmaps = new LemGmaps($this[i], opt);
        else
            ret = $this[i].lem_gmaps[opt].apply($this[i].lem_gmaps, args);
        if (typeof ret != 'undefined') return ret;
    }
    return $this;
};