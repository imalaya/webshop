/**
 * Created by Lauren on 16.11.16.
 */
webShop.controller('MapController', function ($scope, $timeout) {

    $timeout(function () {
        var mapOptions = {
            zoom: 15,
            center: new google.maps.LatLng(52.512130,13.466260),
            mapTypeControlOptions: {
                mapTypeId: [google.maps.MapTypeId.ROADMAP, 'map_style']
            }
        };

        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        var marker = new google.maps.Marker ({
            position: new google.maps.LatLng(52.512130, 13.466260),
            map: $scope.map,
            icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
        });

        $scope.marker = new google.maps.Marker(marker);

        /*var styleArray = [
            {
                featureType: "all",
                stylers: [
                    { saturation: -80 }
                ]
            },{
                featureType: "road.arterial",
                elementType: "geometry",
                stylers: [
                    { hue: "#00ffee" },
                    { saturation: 50 }
                ]
            },{
                featureType: "poi.business",
                elementType: "labels",
                stylers: [
                    { visibility: "off" }
                ]
            }
        ];

        $scope.styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});

        map.mapTypes.set('map_style', styledMap);
        map.setMapTypeId('map_style');*/
    },100);
});
