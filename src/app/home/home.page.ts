import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';


declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('map', {static: true}) mapElement: ElementRef;
  map: any;
  address: string;

  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private http: Http) {
  }

  ngInit() {
  }

  afterViewInit() {
    this.loadMap();
  }

  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      const latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      const mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.map.addListener('tilesloaded', () => {
        console.log('accuracy', this.map);
        this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng());
      });

    }).catch((error) => {
      console.log('Error getting location', error);
    });

    this.getMarkers();
  }

  getMarkers() {
    this.http.get('../../assets/data/markers.json')
    .pipe(map((res) => res.json()))
    .subscribe(data => {
      console.log('my data: ', data);
      this.addMarkersToMap(data.features);
    });
  }
  addMarkersToMap(markers) {
    for (const marker of markers) {
      const position = new google.maps.LatLng(marker.geometry.coordinates[1], marker.geometry.coordinates[0]);
      const icon = {
        url: '../../assets/icon/american_express.png', // image url
        scaledSize: new google.maps.Size(50, 50), // scaled size
      };
      const customMarker = new google.maps.Marker({
        position: position,
         title: marker.properties.name,
         map: this.map,
         icon: icon});
      const contentString = '<div id="content">' +
          '<div id="siteNotice">' +
          '</div>' +
          '<h1 id="firstHeading" class="firstHeading">' + marker.properties.name + '</h1>' +
          '<div id="bodyContent">' +
          '<img src="../../assets/icon/american_express.png" width="200">' +
          '<p>' + marker.properties.description + '</p>' +
          '<ion-button>Report</ion-button>' +
          '</div>' +
          '</div>';
      const infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 400
      });
      customMarker.addListener('click', function() {
          infowindow.open(map, customMarker);
          customMarker.setMap(this.map);
        //this.map.setZoom(8);
      });
      //google.maps.event.addListener(marker, 'click', (function(marker) {
//        return function(evt) {
  //        var content = marker.getTitle();
    //      infowindow.setContent(content);
      //    infowindow.open(map, marker);
       // }
      //})(marker));

     // marker.addListener('click', function() {
       // infowindow.open(map, marker);
     // locations.setMap(this.map);
    //});
  }
}

  getAddressFromCoords(lattitude, longitude) {
    console.log('getAddressFromCoords ' + lattitude + '' + longitude);
    const options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderReverseResult[]) => {
        this.address = '';
        const responseAddress = [];
        for (const [key, value] of Object.entries(result[0])) {
          if ( value.length > 0 ) {
            responseAddress.push(value);
          }
        }
        responseAddress.reverse();
        for (const value of responseAddress) {
          this.address += value + ', ';
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) => {
        this.address = 'Address Not Available!';
      });

  }
}
