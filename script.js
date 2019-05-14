window.onload = function(){
    document.getElementById("weatherSubmit").addEventListener("click", async function(event) {
        event.preventDefault();
        const value = document.getElementById("weatherInput").value;
        if (value === "")
          return;
        console.log(value);

        const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" 
            + "&APPID=741e3ed0beec6ff184b30e4372f5716d";
        const newUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + value 
            + "&APPID=741e3ed0beec6ff184b30e4372f5716d";
        try {
            const response = await fetch(url);
            const newResponse = await fetch(newUrl);
            const json = await response.json();
            const newJson = await newResponse.json();
            console.log(json);
            console.log(newJson);
            let results = "";
            results += '<h2 id = "center">Weather in ' + json.name + "</h2>";
            for (let i=0; i < json.weather.length; i++) {
                results += '<img height = "85" src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
            }
            results += '<h2 id = "center">' + json.main.temp + " &deg;F</h2>"
            results += "<p id = 'center'>";
            for (let i=0; i < json.weather.length; i++) {
                results += json.weather[i].description
                if (i !== json.weather.length - 1)
                    results += ", "
            }
            results += "</p>";

            for (let i=0; i < json.weather.length; i++) {
                results += '<h2 id = "center">High:  ' + json.main.temp_max + ' &deg;F     Low:  ' + json.main.temp_min +' &deg;F</h2>'
            }
            
            let newResults = "";
            newResults += '<table><thead id = tableHead><tr><th>Date</th><th>Temperature</th><th>   </th><th>Humidity</th></tr></thead>'
            for (let i=0; i < newJson.list.length; i++) {
                let tempDate = newJson.list[i].dt_txt.split(' ');
                let dateSplit = tempDate[0].split('-');
                let timeSplit = tempDate[1].split(':');
                newResults += '<tr><td><h3>' + dateSplit[1] + "-" + dateSplit[2] + "<br/>" + timeSplit[0] + ':00</td></h3>' 
                    + '<td><h3 class = "temp" id = "center">' + ((newJson.list[i].main.temp - 273.15) * (9/5) + 32).toFixed(2) +" &deg;F</td></h3>"
                    + ' ' + '<td><img src="http://openweathermap.org/img/w/' + newJson.list[i].weather[0].icon + '.png"/>' + '</td>'
                    + '<td><h3 class = "humid" id = "center">' + newJson.list[i].main.humidity +'%</h3></td></tr>';
            }
            newResults += '</table>';
            document.getElementById("weatherResults").innerHTML = results + newResults;
        }
        catch (err) {
            console.log(err);
        }
      });
}
