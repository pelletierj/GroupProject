/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};


app.initialize();

 // Wait for device API libraries to load
 //
document.addEventListener("deviceready", onDeviceReady, false);

 // device APIs are available
 //
function onDeviceReady() {
   // navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

/*
 // onSuccess Geolocation
 //
function onSuccess(position) {
    var element = document.getElementById('geolocation');
    var string = 'Latitude: ' + position.coords.latitude + '<br />' +
        'Longitude: ' + position.coords.longitude + '<br />';
    element.innerHTML = string;
    console.log(string);

    console.log('calling xhr');
    var request = XMLHttpRequest();
request.open("GET", 
    "http://open.mapquestapi.com/geocoding/v1/reverse?" + 
"key=Fmjtd|luur2hurn0%2Cbg%3Do5-9wasly&location=" +
position.coords.latitude + "," + position.coords.longitude, true);
request.onreadystatechange = function() {
    if (request.readyState == 4) {
        if (request.status == 200 || request.status == 0) {
            var city = JSON.parse(request.responseText);
            console.log(city.results[0].locations[0].adminArea5);

            var string = 'Latitude: ' + position.coords.latitude + '<br />' +
        'Longitude: ' + position.coords.longitude + '<br /> You are in: ' + city.results[0].locations[0].adminArea5;
            element.innerHTML = string;

        }
    }
};
request.send();
}

 // onError Callback receives a PositionError object
 //
function onError(error) {
    alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}

*/

/*var checkConnection = function() {    

    var networkState = navigator.connection.type;
    var states = {};    
    states[Connection.UNKNOWN]  = 'Unknown connection';    
    states[Connection.ETHERNET] = 'Ethernet connection';    
    states[Connection.WIFI]     = 'WiFi connection';    
    states[Connection.CELL_2G]  = 'Cell 2G connection';     
    states[Connection.CELL_3G]  = 'Cell 3G connection';    
    states[Connection.CELL_4G]  = 'Cell 4G connection';    
    states[Connection.CELL]     = 'Cell generic connection';     
    states[Connection.NONE]     = 'No network connection';

    alert('Connection type: ' + states[networkState]); 
}*/

document.addEventListener("offline", function() {  
    var element = document.getElementById('network');
    var string = "offline";

    element.innerHTML = string;
}, false);

document.addEventListener("online", function() {   
    var element = document.getElementById('network');
    var string = "online";
    //checkConnection();

    element.innerHTML = string;
    
    contactPull();
    
}, false);


function contactPull(){
    
    var request = new XMLHttpRequest();
	request.open("GET", "https://dl.dropboxusercontent.com/u/887989/MAD9135/contacts.json", true);
	request.onreadystatechange = function() {
	if (request.readyState === 4){
				if (request.status === 200 || request.status === 0) {
					console.log("response: " + request.responseText);
                    
                    var contact = navigator.contacts.create();
                    
                    contact.displayName = "Guy Incognito";
                    
                    var name = new ContactName();
                    name.givenName = "Guy";
                    name.familyName = "Incognito";
                    contact.name = name;
                    
                    contact.save(saveSuccess,saveError);
				}
			}
			else{
				console.log(request.readyState);
				console.log("connecting...");
			}
	};	
    
	request.send();
}

function saveSuccess(){
    alert("Worked!");
}

function saveError(){
    alert("Didnt work");
}