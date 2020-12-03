// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
var myMap = L.map("amber", {
  center: [41.0000, -99.1099],
  zoom: 5
});
// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer('https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
  attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  minZoom: 0,
  maxZoom: 22,
  subdomains: 'abcd',
  accessToken: access_token
}).addTo(myMap);


function markerSize(salary) {
  return salary / 800;
};


var locations = "/locations";


d3.json(locations, function (data) {
  console.log(data.result[2].coordinates);
  for (var i = 0; i < data.result.length; i++) {
    console.log(data.result[i].per_avg)
    var color = "";
    if (data.result[i].per_avg > 16) {
      color = "#1982C4";
    }
    else if (data.result[i].per_avg > 15) {
      color = "#8AC926";
    }
    else if (data.result[i].per_avg > 13) {
      color = "#FFCA3A";
    }
    else if (data.result[i].per_avg < 13) {
      color = "#FF595E";
    }
    L.circle(data.result[i].coordinates, {
      fillOpacity: 0.75,
      color: "black",
      fillColor: color,
      radius: markerSize(data.result[i].salary),
    }).bindPopup("<h2> " + data.result[i].team + "</h2> <hr> <h3>Total Salary: " + data.result[i].pretty + "<hr> Average PER: " + data.result[i].per_avg + "</h3>").addTo(myMap);
  };

});


var legend = L.control({ position: "bottomleft" });

legend.onAdd = function (map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Average Team </br> Efficency Rating<hr></h4>";
  div.innerHTML += '<i style="background: #1982C4"></i><span>Over 16</span><br>';
  div.innerHTML += '<i style="background: #8AC926"></i><span>15 - 15.99</span><br>';
  div.innerHTML += '<i style="background: #FFCA3A"></i><span>13 - 14.99</span><br>';
  div.innerHTML += '<i style="background: #FF595E"></i><span>Below 13</span><br>';
  div.innerHTML += '<h4><a href ="main.html">Return to Main Menu</a></h4>';
  
  return div;
};

legend.addTo(myMap);
