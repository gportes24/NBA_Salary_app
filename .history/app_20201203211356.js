// Create function for Data plotting (Bar, gauge, bubble)
function getdata(tm) {
  d3.json("Resources/basketball_table.json").then(function (nbaData) {
    // console.log(nbaData);
    // var trying = Object.values(nbaData);
    // // console.log(trying);
    // var code = nbaData.value();
    // console.log(code);

    var grouped = Object.fromEntries(Object.entries(nbaData).filter(([k, v]) => v = "tm"));
    // console.log(grouped);


    //this creates a list of unique teams
    let teamnames = new Set;
    let teamStats = new Set;
    for (var i = 0; i < nbaData.length - 1; i++) {
      console.log(nbaData[i]);
      teamnames.add(nbaData[i]['tm']);
      teamStats.add(nbaData[i]);
    }
    console.log(teamnames);
    teamnames = [...teamnames]
    console.log(teamnames)
    teamStats = [...teamStats];
    console.log(teamStats);
    let tmlist = Array.from(teamnames);
    console.log(tmlist);




    var filtered = nbaData.filter(a => a.tm == tm);
    console.log(filtered);

    var salary_test = filtered.filter(s => s.yr2019_20.toString() == s.yr2019_20);
    console.log(salary_test);
    var player_list = salary_test.map(data => data.Player);
    console.log(player_list);
    var points = salary_test.map(data => data.pts);
    console.log(points);

    var difTeam = nbaData.map(data => data.tm)[1];
    console.log(difTeam)

    var per = salary_test.map(data => data.PER);
    console.log(per);

    var salary = salary_test.map(data => data.yr2019_20);
    // var salary = salary.toString();
    console.log(salary);

    var salary1 = [... new Set(salary)];
    console.log(salary1);
    var colors = {
      "ATL": "Red", "BRK": "Black", "BOS": "Green", "CHO": "purple", "CHI": "red", "CLE": "maroon", "DAL": "blue", "DEN": "navy", "DET": "blue", "GSW": "yellow", "HOU": "red", "IND": "blue", "LAC": "Red", "LAL": "Purple", "MEM": "blue", "MIA": "maroon",
      "MIL": "green", "MIN": "navy", "NOP": "blue", "NYK": "FF7F03", "OKC": "light blue", "ORL": "blue", "PHI": "blue", "PHO": "FF7F03", "POR": "red", "SAC": "purple", "SAS": "gray", "TOR": "red", "UTA": "yellow", "WAS": "red"
    };
    console.log(colors);
    var teamList = salary_test.map(data => data.tm)[0];
    console.log(teamList);
    testing2 = colors[teamList];
    console.log(testing2);


    for (i = 1; i < player_list.length; i++) {
      if (player_list[0] == player_list[i]) {
        player_list = player_list.slice(0, i);
        salary = salary.slice(0, i);
        console.log(player_list);
        console.log(player_list);
      }
    }

    var trace = {
      x: salary,
      y: player_list,
      type: "bar",
      text: player_list,
      orientation: "h",
      marker: { color: testing2 },
    };
    var data = [trace];

    var layout = {
      title: "NBA Salary by Team",
      xaxis: {
        type: 'category-unique'
      },
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 10
      },
    };

    Plotly.newPlot("bar", data, layout);



    let trace1 = {
      x: salary,
      y: points,
      text: player_list,
      mode: 'markers',

      marker: {
        color: salary,
        size: per
      },
    }
    let data1 = [trace1];
    var layout1 = {
      title: "NBA Salary"
    }
    Plotly.newPlot("bubble", data1, layout1)

    var data2 = [{
      values: salary,
      labels: player_list,
      type: "pie"
    }];

    var layout1 = {
      height: 400,
      width: 500
    };

    Plotly.newPlot('gauge', data2, layout1);
  });

}

function getMoney(tm) {
  d3.json("Resources/basketball_table.json").then((data) => {
    console.log(data)
    let teamnames = new Set;
    let teamStats = new Set;
    for (var i = 0; i < data.length - 1; i++) {
      //console.log(data[i]);
      teamnames.add(data[i]['tm']);
      teamStats.add(data[i]);
    }
    // console.log(teamnames);
    teamnames = [...teamnames]
    // console.log(teamnames)
    teamStats = [...teamStats];
    console.log(teamStats);

    var filtered_tm = data.filter(a => a.tm === tm);
    console.log(filtered_tm);
    var salary_test = filtered_tm.filter(s => s.yr2019_20.toString() == s.yr2019_20);
    console.log(salary_test);
    var player_list = salary_test.map(data => data.Player);
    console.log(player_list)
    var salary = salary_test.map(data => data.yr2019_20);


    for (i = 1; i < player_list.length; i++) {
      if (player_list[0] == player_list[i]) {
        player_list = player_list.slice(0, i);
        salary = salary.slice(0, i);
        console.log(player_list);
        console.log(salary);
      }
    }
    var money = player_list.concat(salary);
    console.log(money);

    function uniquekeepFirst(data, key) {
      return [
        ...new Map(
          data.map(x => [key(x), x])
        ).values()
      ]
    }
    player_sals = uniquekeepFirst(filtered_tm, it=>it.Player)
    console.log(player_sals)
    for (var p=0; p<player_sals.length; p++){
      player_sals[p]["yr2019_20"] = "$" + player_sals[p]["yr2019_20"].toFixed(0);
  }
    

    
    var salaryInfo = d3.select("#salary-prediction");

    // empty player salary before getting new salary based on team selected
    salaryInfo.html("");

    for (var prop in player_sals) {
      salaryInfo.append("h5").text(player_sals[prop].Player + ": $" + player_sals[prop].yr2019_20);
      console.log(player_sals[prop].Player, player_sals[prop].yr2019_20);
    }
  });
}

function optionChanged(tm) {
  getdata(tm);
  getMoney(tm);
}
function init() {
  let dropdown = d3.select("#selDataset");

  d3.json("Resources/basketball_table.json").then((data) => {
    console.log(data)
    let teamnames = new Set;
    let teamStats = new Set;
    for (var i = 0; i < data.length - 1; i++) {
      //console.log(data[i]);
      teamnames.add(data[i]['tm']);
      teamStats.add(data[i]);
    }
    // console.log(teamnames);
    teamnames = [...teamnames]
    // console.log(teamnames)
    teamStats = [...teamStats];
    // console.log(teamStats);
    teamnames.forEach(function (team) {
      dropdown.append("option").text(team).property("value")
      console.log(team)
    })
    getdata(teamnames[0]);
    getMoney(teamnames[0]);
  })
}
init();

