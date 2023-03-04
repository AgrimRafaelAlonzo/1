var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
}).addTo(map);

function handleFileSelect(evt) {
  var files = evt.target.files; // FileList object

  // Loop through the files and read the data
  for (var i = 0, f; f = files[i]; i++) {
    var reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function(theFile) {
      return function(e) {
        var csvData = Papa.parse(e.target.result).data;

        // Loop through the data and create markers for each row
        for (var i = 1; i < csvData.length; i++) {
          var row = csvData[i];
          var lat = parseFloat(row[0]);
          var lng = parseFloat(row[1]);
          var name = row[2];

          var marker = L.marker([lat, lng]).addTo(map);
          marker.bindPopup(name);
        }
      };
    })(f);

    // Read in the CSV file as text
    reader.readAsText(f);
  }
}

// Add an event listener to the file upload input
$('#csv-file').on('change', handleFileSelect);