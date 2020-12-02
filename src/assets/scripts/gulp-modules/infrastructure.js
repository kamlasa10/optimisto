@@include('./libs.js');

(function ($) {

    document.addEventListener('DOMContentLoaded', () => {
        function simulatePathDrawing(path,fillPercentage = 100, strokeWidth) {
            if (path.done) return;
            path.style.strokeDasharray = 0; 
            path.style.strokeDashoffset = 0;
            // var path = document.querySelector('.squiggle-animated path');
            var length = path.getTotalLength();
            path.style.transition = path.style.WebkitTransition =
            'none';
            path.style.fill = "none";
            path.style.strokeDashoffset = '0' ;
            path.style.transformOrigin = `center`;
            path.style.transition = path.style.WebkitTransition =
            'stroke-dashoffset 1.5s ease';
            // Set up the starting positions
            path.style.strokeDasharray = (length*(fillPercentage/100) + ' ' + length); 
            path.style.strokeDashoffset = length + (length*(fillPercentage/100));
            // Trigger a layout so styles are calculated & the browser
            // picks up the starting position before animating
            path.style.strokeWidth = strokeWidth;
            path.done = true;
        }
        
        Array.from(document.querySelectorAll('[data-percent]')).forEach(item => {
            const icon = item.querySelector('circle')
            const percent = $(item).attr('data-percent')
        
            simulatePathDrawing(icon, percent, '3')
        })

        let map = new google.maps.Map(document.querySelector(".infrastructure__right"), {
            center: { lat: 50.3614947, lng: 30.4100788 },
            zoom: 13,
            styles: [
              {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                  {
                    "hue": "#6600ff"
                  },
                  {
                    "saturation": -11
                  },
                  {
                    "visibility": "on"
                  }
                ]
              },
              {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                  {
                    "saturation": "33"
                  },
                  {
                    "hue": "#6600ff"
                  },
                  {
                    "lightness": "2"
                  },
                  {
                    "visibility": "simplified"
                  }
                ]
              },
              {
                "featureType": "poi.attraction",
                "elementType": "all",
                "stylers": [
                  {
                    "saturation": "-58"
                  },
                  {
                    "lightness": "28"
                  }
                ]
              },
              {
                "featureType": "poi.business",
                "elementType": "all",
                "stylers": [
                  {
                    "saturation": "-58"
                  },
                  {
                    "lightness": "28"
                  }
                ]
              },
              {
                "featureType": "poi.government",
                "elementType": "all",
                "stylers": [
                  {
                    "saturation": "-58"
                  },
                  {
                    "lightness": "28"
                  }
                ]
              },
              {
                "featureType": "poi.medical",
                "elementType": "all",
                "stylers": [
                  {
                    "saturation": "-58"
                  },
                  {
                    "lightness": "28"
                  }
                ]
              },
              {
                "featureType": "poi.park",
                "elementType": "all",
                "stylers": [
                  {
                    "visibility": "on"
                  },
                  {
                    "saturation": "-58"
                  },
                  {
                    "lightness": "28"
                  }
                ]
              },
              {
                "featureType": "poi.place_of_worship",
                "elementType": "all",
                "stylers": [
                  {
                    "saturation": "-58"
                  },
                  {
                    "lightness": "28"
                  }
                ]
              },
              {
                "featureType": "poi.school",
                "elementType": "all",
                "stylers": [
                  {
                    "saturation": "-58"
                  },
                  {
                    "lightness": "28"
                  }
                ]
              },
              {
                "featureType": "poi.sports_complex",
                "elementType": "all",
                "stylers": [
                  {
                    "saturation": "-58"
                  },
                  {
                    "lightness": "28"
                  }
                ]
              },
              {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                  {
                    "hue": "#5e00ff"
                  },
                  {
                    "saturation": -79
                  }
                ]
              },
              {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "road.local",
                "elementType": "all",
                "stylers": [
                  {
                    "lightness": 30
                  },
                  {
                    "weight": 1.3
                  }
                ]
              },
              {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                  {
                    "visibility": "simplified"
                  },
                  {
                    "hue": "#5e00ff"
                  },
                  {
                    "saturation": -16
                  }
                ]
              },
              {
                "featureType": "transit.line",
                "elementType": "all",
                "stylers": [
                  {
                    "saturation": -72
                  }
                ]
              },
              {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                  {
                    "saturation": -65
                  },
                  {
                    "hue": "#1900ff"
                  },
                  {
                    "lightness": 8
                  }
                ]
              }
            ],
            disableDefaultUI: false
          })

          function initMap() {
            markers.forEach(marker => {
                const item =  new google.maps.Marker({
                     position: marker.position,
                     map: map,
                     icon: marker.icon,
                     category: marker.category
                 })
     
                 markersInMap.push(item)
             })

            $('[data-infrastructure]').each(function() {

                if( $(this).attr('data-infrastructure') === 'metro'|| 
                    $(this).attr('data-infrastructure') === 'school') {
                    $(this).addClass('infrastructure__item--active-metro')
                } else {
                    $(this).addClass('infrastructure__item--active')
                }
                const value = $(this).attr('data-infrastructure')

                filteredMarkers.add(value)
            })
          }

          const filteredMarkers = new Set()
          const markersInMap = []

          function setMapOnAll(markers = []) {
            for (let i = 0; i < markers.length; i++) {
                markers[i].setMap(map);
            }
          }

          function clearMarkers() {
            setMapOnAll(null);
          }
          
          $('[data-infrastructure]').each(function() {
              $(this).on('click', () => {
                const itemValue = $(this).attr('data-infrastructure')

                if( itemValue === 'metro' ||
                  itemValue === 'school') {
                        $(this).toggleClass('infrastructure__item--active-metro')
                } else {
                    $(this).toggleClass('infrastructure__item--active')
                }
                  
                const value = $(this).attr('data-infrastructure')

                if(filteredMarkers.has(value)) {
                filteredMarkers.delete(value)
                } else {
                filteredMarkers.add(value)
                }

                markersInMap.forEach(marker => {
                    if(filteredMarkers.has(marker.category)) {
                        marker.setVisible(true)
                    } else {
                        marker.setVisible(false)
                    }
                })
              })
          })

        const markers = [
            {
                position: { lat: 50.3672207763209, lng: 30.454161155921167 },
                icon: "assets/images/maps/metro.svg",
                category: 'metro'
            },
            {
                position: { lat: 50.412151506377434, lng: 30.4432387540714 },
                icon: "assets/images/maps/airoport.svg",
                category: 'airport'
            },
            {
                position: { lat: 50.34852551340307, lng: 30.420153499984625 },
                icon: "assets/images/maps/mall.svg",
                category: 'mall'
            },
            {
                position: { lat: 50.343356660413285, lng: 30.421333684640462 },
                icon: "assets/images/maps/park.svg",
                category: 'park'
            },
            {
                position: { lat: 50.353111279451305, lng: 30.419520395838948 },
                icon: "assets/images/maps/park.svg",
                category: 'park'
            },
            {
                position: { lat: 50.38003052222808, lng: 30.506457486492952 },
                icon: "assets/images/maps/park.svg",
                category: 'park'
            },
            {
                position: { lat: 50.34036510111645, lng: 30.488933455804442 },
                icon: "assets/images/maps/park.svg",
                category: 'park'
            },
            {
                position: { lat: 50.34191398223005, lng: 30.422785182255193 },
                icon: "assets/images/maps/kinder-place.svg",
                category: 'kinder-place'
            },
            {
                position: { lat: 50.34233389392565, lng: 30.42483191347613 },
                icon: "assets/images/maps/kinder-place.svg",
                category: 'kinder-place'
            },
            {
                position: { lat: 50.35132242993742, lng: 30.418012587054953 },
                icon: "assets/images/maps/university.svg",
                category: 'school'
            },
            {
                position: { lat: 50.36649609066297, lng: 30.448800284641287 },
                icon: "assets/images/maps/university.svg",
                category: 'school'
            },
            {
                position: { lat: 50.36565075510266, lng: 30.45799189813349 },
                icon: "assets/images/maps/university.svg",
                category: 'school'
            },
            {
                position: { lat: 50.354034961278934, lng: 30.432007611625423 },
                icon: "assets/images/maps/sport.svg",
                category: 'sport'
            },
            {
                position: { lat: 50.34198984262731, lng: 30.42387779813273 },
                icon: "assets/images/maps/sport.svg",
                category: 'sport'
            },
        ]

        initMap()
    })
})(jQuery);