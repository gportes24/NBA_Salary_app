// Create function for Data plotting (Bar, gauge, bubble)
function getdata(tm) {
  d3.json("Resources/basketball_table.json").then(function (nbaData) {
    // console.log(nbaData);
    // var trying = Object.values(nbaData);
    // // console.log(trying);
    // var code = nbaData.value();
    // console.log(code);

    var grouped = Object.fromEntries(
      Object.entries(nbaData).filter(([k, v]) => (v = "tm"))
    );
    // console.log(grouped);

    //this creates a list of unique teams
    let teamnames = new Set();
    let teamStats = new Set();
    for (var i = 0; i < nbaData.length - 1; i++) {
      console.log(nbaData[i]);
      teamnames.add(nbaData[i]["tm"]);
      teamStats.add(nbaData[i]);
    }
    console.log(teamnames);
    teamnames = [...teamnames];
    console.log(teamnames);
    teamStats = [...teamStats];
    console.log(teamStats);
    let tmlist = Array.from(teamnames);
    console.log(tmlist);

    var filtered = nbaData.filter((a) => a.tm == tm);
    console.log(filtered);

    var salary_test = filtered.filter(
      (s) => s.yr2019_20.toString() == s.yr2019_20
    );
    console.log(salary_test);
    var player_list = salary_test.map((data) => data.Player);
    console.log(player_list);
    var points = salary_test.map((data) => data.pts);
    console.log(points);

    var difTeam = nbaData.map((data) => data.tm)[1];
    console.log(difTeam);

    var per = salary_test.map((data) => data.PER);
    console.log(per);

    var salary = salary_test.map((data) => data.yr2019_20);
    // var salary = salary.toString();
    console.log(salary);

    var salary1 = [...new Set(salary)];
    console.log(salary1);
    var colors = {
      ATL: "#E03A3E",
      BRK: "Black",
      BOS: "#007A33",
      CHO: "#1D1160",
      CHI: "#CE1141",
      CLE: "#860038",
      DAL: "#00538C",
      DEN: "#0E2240",
      DET: "#C8102E",
      GSW: "#1D428A",
      HOU: "#CE1141",
      IND: "#002D62",
      LAC: "#C8102E",
      LAL: "#552583",
      MEM: "#5D76A9",
      MIA: "#98002E",
      MIL: "#00471B",
      MIN: "#0C2340",
      NOP: "#0C2340",
      NYK: "#006BB6",
      OKC: "#007AC1",
      ORL: "#0077C0",
      PHI: "#006BB6",
      PHO: "#1D1160",
      POR: "#E03A3E",
      SAC: "#5A2D81",
      SAS: "#C4CED4",
      TOR: "#CE1141",
      UTA: "#002B5C",
      WAS: "#002B5C",
    };
    var logos = {
      ATL: "Resources/NBA_Logos-master/atlanta.png",
      BRK: "Resources/NBA_Logos-master/brooklyn.png",
      BOS: "Resources/NBA_Logos-master/boston.pngGreen",
      CHO: "Resources/NBA_Logos-master/charlotte.png",
      CHI: "Resources/NBA_Logos-master/chicago.png",
      CLE: "Resources/NBA_Logos-master/cleveland.png",
      DAL: "Resources/NBA_Logos-master/dallas.png",
      DEN: "Resources/NBA_Logos-master/denver.png",
      DET: "Resources/NBA_Logos-master/detroit.png",
      GSW: "Resources/NBA_Logos-master/golden_state.png",
      HOU: "Resources/NBA_Logos-master/houston.png",
      IND: "Resources/NBA_Logos-master/indiana.png",
      LAC: "Resources/NBA_Logos-master/la_clippers.png",
      LAL: "Resources/NBA_Logos-master/la_lakers.png",
      MEM: "Resources/NBA_Logos-master/memphis.png",
      MIA: "Resources/NBA_Logos-master/miami.png",
      MIL: "Resources/NBA_Logos-master/milwaukee.png",
      MIN: "Resources/NBA_Logos-master/minnesota.png",
      NOP: "Resources/NBA_Logos-master/new_orleans.png",
      NYK: "Resources/NBA_Logos-master/new_york.png",
      OKC: "Resources/NBA_Logos-master/oklahoma_city.png",
      ORL: "Resources/NBA_Logos-master/orlando.png",
      PHI: "Resources/NBA_Logos-master/philadelphia.png",
      PHO: "Resources/NBA_Logos-master/phoenix.png",
      POR: "Resources/NBA_Logos-master/portland.png",
      SAC: "Resources/NBA_Logos-master/sacramento.png",
      SAS: "Resources/NBA_Logos-master/san_antonio.png",
      TOR: "Resources/NBA_Logos-master/toronto.png",
      UTA: "Resources/NBA_Logos-master/utah.png",
      WAS: "Resources/NBA_Logos-master/washington.png",
    };
    console.log(colors);
    var teamList = salary_test.map((data) => data.tm)[0];
    console.log(teamList);
    testing2 = colors[teamList];
    testing3 = logos[teamList];
    console.log(testing2);

    const domElement = d3.select(".atlanta-container");
    domElement.html("");
    domElement.append("img").attr("src", testing3);

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
        type: "category-unique",
      },
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100,
      },
    };

    Plotly.newPlot("bar", data, layout);

    let trace1 = {
      x: salary,
      y: points,
      text: player_list,
      mode: "markers",

      marker: {
        color: salary,
        size: per,
      },
    };
    let data1 = [trace1];
    var layout1 = {
      title: "NBA Salary",
    };
    Plotly.newPlot("bubble", data1, layout1);
  });
}

function getMoney(tm) {
  d3.json("Resources/salaries_prediction.json").then((data) => {
    console.log(data);
    let teamnames = new Set();
    let teamStats = new Set();
    for (var i = 0; i < data.length - 1; i++) {
      //console.log(data[i]);
      teamnames.add(data[i]["tm"]);
      teamStats.add(data[i]);
    }
    // console.log(teamnames);
    teamnames = [...teamnames];
    // console.log(teamnames)
    teamStats = [...teamStats];
    console.log(teamStats);

    var filtered_tm = data.filter((a) => a.tm === tm);
    console.log(filtered_tm);
    var salary_test = filtered_tm.filter(
      (s) => s.yr2019_20.toString() == s.yr2019_20
    );
    console.log(salary_test);
    var player_list = salary_test.map((data) => data.Player);
    console.log(player_list);
    var salary = salary_test.map((data) => data.yr2019_20);

    for (i = 1; i < player_list.length; i++) {
      if (player_list[0] == player_list[i]) {
        player_list = player_list.slice(0, i);
        salary = salary.slice(0, i);
        // console.log(player_list);
        // console.log(salary);
      }
    }
    var money = player_list.concat(salary);
    // console.log(money);

    //the function below removes duplicate player/salary values from array/object
    function uniquekeepFirst(data, key) {
      return [...new Map(data.map((x) => [key(x), x])).values()];
    }
    player_sals = uniquekeepFirst(filtered_tm, (it) => it.Player);
    // console.log(player_sals);
    for (var p = 0; p < player_sals.length; p++) {
      player_sals[p]["predicted_salary"] =
        // "$" +

        player_sals[p]["predicted_salary"]
      // .toFixed(2)
      // .replace(/\d(?=(\d{3})+\.)/g, "$&,");
    }

    var salaryInfo = d3.select("#salary-prediction");

    // empty player salary before getting new salary based on team selected
    salaryInfo.html("");

    //this portions groups players by PER and Position - see output in console log
    // var output = _.groupBy(player_sals, function (entry) {
    //   return entry.PER + "," + entry.pos;
    // });
    // console.log(output);

    //hina version of top5playersbyPERpos in TM
    //change from string to float
    player_sals.map((row) => {
      row["PER"] = parseFloat(row["PER"]);
      return row;
    });
    //orderby to get player's PER by position type in DESCENDING order
    var output = _.orderBy(player_sals, ["pos", "PER"], ["desc", "desc"]);
    // console.log("---output---");
    output.forEach((row) => {
      let info = {
        Player: row["Player"],
        PER: row["PER"],
        pos: row["pos"],
      };
      // console.log(info);
    });
    //forEach through rows to push only Top 5 PlayerName and PERbyPoistion in new variable
    let topFivePos = [output[0]];
    output.forEach((row) => {
      let lenTopFive = topFivePos.length;
      let tempRow = topFivePos[lenTopFive - 1];
      let tempRowPos = tempRow["pos"];
      if (row["pos"] != tempRowPos) {
        topFivePos.push(row);
      }
    });
    console.log(topFivePos)
    var optimal = d3.select(".card");

    // empty player salary before getting new salary based on team selected
    
    optimal.html("");

    for (var dude in topFivePos) {
      optimal
        .append("src")
        .html(topFivePos[dude].headshot)
        .append("h4")        
        .html(
          "Player: " + topFivePos[dude].Player + "\n")
        .append("p")
        .html(
          "</br> Position: "+ topFivePos[dude].pos + "<br> Efficiency:"  + topFivePos[dude].PER + "<br> Predicted Salary: " + topFivePos[dude].predicted_salary + "\n")
        
      console.log(topFivePos[dude].Player, topFivePos[dude].predicted_salary);
    }
    console.log(topFivePos[dude].headshot);
    // console.log(topFivePos);
    // var outputArray = Object.values(output).flat();

    // var sorted_array= outputArray.sort(function(a,b){
    //   return parseFloat(b.PER) - parseFloat(a.PER);
    // })

    // var positions = ["PG", "SG", "SF", "PF", "C"];
    // var startingFive = [];
    // positions.forEach (function(a){
    //   var x = sorted_array.find(function(b){
    //     return b.pos.toLowerCase()===a.toLocaleLowerCase();

    //   })

    //   startingFive.push(x);

    // })

    // console.log(startingFive);

    for (var prop in player_sals) {
      salaryInfo
        .append("h5")
        .text(
          player_sals[prop].Player + ": " + player_sals[prop].predicted_salary + "\n"
        );
      // console.log(player_sals[prop].Player, player_sals[prop].predicted_salary);
    }
  });
}
function getTeam(tm) {
  d3.json("Resources/team_profile.json").then((data) => {
    var profile = data
    console.log(profile);

    var team_profile = profile.filter((a) => a.tm ===tm)[0];
    console.log(team_profile);
    
    var teamInfo = d3.select("#team_name");
    teamInfo.html("");
    Object.keys(team_profile).forEach((key)=>{
      teamInfo.append("h5").text(key.toUpperCase() + ": " + team_profile[key] + "\n");
    });

  });
}


function optionChanged(tm) {
  getdata(tm);
  getMoney(tm);
  getTeam(tm);
}
function init() {
  let dropdown = d3.select("#selDataset");

  d3.json("Resources/basketball_table.json").then((data) => {
    console.log(data);
    let teamnames = new Set();
    let teamStats = new Set();
    for (var i = 0; i < data.length - 1; i++) {
      //console.log(data[i]);
      teamnames.add(data[i]["tm"]);
      teamStats.add(data[i]);
    }
    // console.log(teamnames);
    teamnames = [...teamnames];
    // console.log(teamnames)
    teamStats = [...teamStats];
    // console.log(teamStats);

    teamnames.forEach(function (team) {
      dropdown.append("option").text(team).property("value");
      console.log(team);
    });
    getdata(teamnames[0]);
    getMoney(teamnames[0]);
    getTeam(teamnames[0])
  });
}
init();
