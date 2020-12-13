// Create function for Data plotting (Bar, gauge, bubble)
function bubbles() {
    d3.json("Resources/PER_prediction.json").then(function (nbaData) {
        console.log(nbaData);

        var grouped = Object.fromEntries(
            Object.entries(nbaData).filter(([k, v]) => (v = "tm"))
        );
        //this creates a list of unique teams
        let teamnames = new Set();
        let teamStats = new Set();
        for (var i = 0; i < nbaData.length - 1; i++) {
            console.log(nbaData[i]);
            teamnames.add(nbaData[i]["tm"]);
            teamStats.add(nbaData[i]);
        }
        console.log(teamnames);
        // teamnames = [...teamnames];
        // console.log(teamnames);
        teamStats = [...teamStats];
        console.log(teamStats);
        let tmlist = Array.from(teamnames);
        console.log(tmlist);

        // var filtered = nbaData.filter((a) => a.tm == teamnames);
        // console.log(filtered);

        var salary_test = nbaData.filter(
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

        //Read the data
        // d3.csv("Resources/PER_predict.csv", function (data) {

        // Add X axis
        var x = d3.scaleLinear()
            .domain([0, 100])
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).ticks(3));

        // Add X axis label:
        svg.append("text")
            .attr("text-anchor", "end")
            .attr("x", width)
            .attr("y", height + 50)
            .text("PER");

        // Add Y axis
        var y = d3.scaleLinear()
            .domain([35, 90])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));

        // Add Y axis label:
        svg.append("text")
            .attr("text-anchor", "end")
            .attr("x", 0)
            .attr("y", -20)
            .text("Player")
            .attr("text-anchor", "start")

        // Add a scale for bubble size
        var z = d3.scaleSqrt()
            .domain([1, 5])
            .range([2, 30]);

        // Add a scale for bubble color
        var myColor = d3.scaleOrdinal()
            .domain([tmlist])
            .range(d3.schemeSet1);

        // -1- Create a tooltip div that is hidden by default:
        var tooltip = d3.select("#new_bubble")
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "black")
            .style("border-radius", "5px")
            .style("padding", "10px")
            .style("color", "white")

        // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
        var showTooltip = function (d) {
            tooltip
                .transition()
                .duration(200)
            tooltip
                .style("opacity", 1)
                .html("PER: " + d.PER)
                .style("left", (d3.mouse(this)[0] + 30) + "px")
                .style("top", (d3.mouse(this)[1] + 30) + "px")
        }
        var moveTooltip = function (d) {
            tooltip
                .style("left", (d3.mouse(this)[0] + 30) + "px")
                .style("top", (d3.mouse(this)[1] + 30) + "px")
        }
        var hideTooltip = function (d) {
            tooltip
                .transition()
                .duration(200)
                .style("opacity", 0)
        }

        // What to do when one group is hovered
        var highlight = function (d) {
            // reduce opacity of all groups
            d3.selectAll(".bubbles").style("opacity", .05)
            // expect the one that is hovered
            d3.selectAll("." + d).style("opacity", 1)
        }

        // And when it is not hovered anymore
        var noHighlight = function (d) {
            d3.selectAll(".bubbles").style("opacity", 1)
        }

        // Add dots
        svg.append('g')
            .selectAll("dot")
            .data(nbaData)
            .enter()
            .append("circle")
            .attr("class", function (d) { return "bubbles " + d.Player })
            .attr("cx", function (d) { return x(d.PER); })
            .attr("cy", function (d) { return y(d.tm); })
            .attr("r", function (d) { return z(d.avg_cost_per_pt); })
            .style("fill", function (d) { return myColor(d.myColor); })
            // -3- Trigger the functions for hover
            .on("mouseover", showTooltip)
            .on("mousemove", moveTooltip)
            .on("mouseleave", hideTooltip)

        // Add legend: circles
        var valuesToShow = [5, 10, 30]
        var xCircle = 390
        var xLabel = 440
        svg
            .selectAll("legend")
            .data(valuesToShow)
            .enter()
            .append("circle")
            .attr("cx", xCircle)
            .attr("cy", function (d) { return height - 100 - z(d) })
            .attr("r", function (d) { return z(d) })
            .style("fill", "none")
            .attr("stroke", "black")

        // Add legend: segments
        svg
            .selectAll("legend")
            .data(valuesToShow)
            .enter()
            .append("line")
            .attr('x1', function (d) { return xCircle + z(d) })
            .attr('x2', xLabel)
            .attr('y1', function (d) { return height - 100 - z(d) })
            .attr('y2', function (d) { return height - 100 - z(d) })
            .attr('stroke', 'black')
            .style('stroke-dasharray', ('2,2'))

        // Add legend: labels
        svg
            .selectAll("legend")
            .data(valuesToShow)
            .enter()
            .append("text")
            .attr('x', xLabel)
            .attr('y', function (d) { return height - 100 - z(d) })
            .text(function (d) { return d / 1000000 })
            .style("font-size", 10)
            .attr('alignment-baseline', 'middle')

        // Legend title
        svg.append("text")
            .attr('x', xCircle)
            .attr("y", height - 100 + 30)
            .text("Population (M)")
            .attr("text-anchor", "middle")

        // Add one dot in the legend for each name.
        var size = 20
        svg.selectAll("myrect")
            .data(nbaData)
            .enter()
            .append("circle")
            .attr("cx", 390)
            .attr("cy", function (d, i) { return 10 + i * (size + 5) })
            .attr("r", 7)
            .style("fill", function (d) { return myColor(d) })
            .on("mouseover", highlight)
            .on("mouseleave", noHighlight)

        // Add labels beside legend dots
        svg.selectAll("mylabels")
            .data(player_list)
            .enter()
            .append("text")
            .attr("x", 390 + size * .8)
            .attr("y", function (d, i) { return i * (size + 5) + (size / 2) }) // 100 is where the first dot appears. 25 is the distance between dots
            .style("fill", function (d) { return myColor(d) })
            .text(function (d) { return d })
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")
            .on("mouseover", highlight)
            .on("mouseleave", noHighlight)
    });
}

bubbles()

// function init() {
//     let dropdown = d3.select("#setDataset");

//         d3.json("/Resources/PER_prediction.json").then((data) => {
//             console.log(data);
//             let teamnames1 = new Set();
//             let teamStats1 = new Set();
//             for (var i = 0; i < data.length - 1; i++) {
//                 //console.log(data[i]);
//                 teamnames1.add(data[i]["tm"]);
//                 teamStats1.add(data[i]);
//             }
//             // console.log(teamnames);
//             teamnames1 = [...teamnames];
//             // console.log(teamnames)
//             teamStats1 = [...teamStats];
//             // console.log(teamStats);

//             teamnames1.forEach(function (team) {
//                 dropdown.append("option").text(team).property("value");
//                 console.log(team);
//             });
//             getdata(teamnames1[0]);
//             getMoney(teamnames1[0]);
//         });
//     }
// init();

