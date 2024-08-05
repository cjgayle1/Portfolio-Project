import { fetchGAStats, updateGAStatsInDOM } from './GA.js';
import { fetchWebsiteMonitoringData, updateWebsiteMonitoringInDOM } from './websitemonitoring.js';




document.addEventListener('DOMContentLoaded', () => {
    // fetchGAStats()
    //   .then(updateGAStatsInDOM)
    //   .catch(error => console.error('Error loading GA stats:', error));

    const navbar = document.getElementById("navbar");

    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (lastScrollY < window.scrollY) {
            navbar.style.top = "-70px";
        } else {
            navbar.style.top = "0";
        }
        lastScrollY = window.scrollY;
    });

    const infoButton = document.getElementById('info-button');
    const popup = document.getElementById('popup');
    const closePopup = document.getElementById('close-popup');
  
    infoButton.addEventListener('click', function () {
      popup.style.display = 'block';
    });
  
    closePopup.addEventListener('click', function () {
      popup.style.display = 'none';
    });
  
    window.addEventListener('click', function (event) {
      if (event.target == popup) {
        popup.style.display = 'none';
      }
    });
  
    fetchWebsiteMonitoringData()
      .then(updateWebsiteMonitoringInDOM)
      .catch(error => console.error('Error loading website monitoring data:', error));

      fetchGAStats()
      .then(rawData => {
            console.log(rawData);
            const report1 = rawData.Report1;
            const report2 = rawData.Report2;
            const report4 = rawData.Report4;
            const report5 = rawData.Report5;
            const report3 = rawData.Report3;



        console.log(report1);


            // process the view metric data and render the line chart and seperate into 6 month chunks for dropdown menu
            const FullData = processViewMetricData(report1);
            const r1FullData = FullData[0];
            const sixMonthChunks = FullData[1];

            console.log(sixMonthChunks);
            populateDropdown(sixMonthChunks);
            console.log(sixMonthChunks[sixMonthChunks.length - 1]);
            renderR1LineChart(sixMonthChunks[sixMonthChunks.length - 1]);


            // Process the browser data
            const browserData = processBrowserData(report4);
            renderBrowserPieChart(browserData);

            // Process and render OS donut chart
            const osData = processOSData(report5);
            renderOSDonutChart(osData);


            // Process and render choropleth map
            const countryData = processCountryData(report3);
            console.log(countryData);
            renderChoroplethMap(countryData);

             // Render top performing dates widget
            renderTopPerformingDatesWidget(r1FullData);


            // Process and render total metrics summary
            const totalMetrics = processTotalMetrics(report2);
            renderTotalMetricsSummary(totalMetrics);

            const activeUsersBarGraphData = processActiveUsersByBrowser(report4);
            renderActiveUsersBarGraph(activeUsersBarGraphData);



          })

          
          .catch(error => console.error('Error loading GA stats:', error));
});

function processViewMetricData(report1) {
              // Flatten the report data into an array of objects
              const data = Object.entries(report1).map(([dateStr, metrics]) => ({
                date: parseDate(dateStr),
                ...metrics
                  
              }));
  
        
              const minDate = d3.min(data, d => d.date);
              const maxDate = d3.max(data, d => d.date);
          
              // Fill in the missing days
              const r1FullData = [];
              for (let date = new Date(minDate); date <= maxDate; date.setDate(date.getDate() + 1)) {
                  const dateString = date.toISOString().substring(0, 10).replace(/-/g, "");
                  const existingData = data.find(d => d.date.toISOString().substring(0, 10).replace(/-/g, "") === dateString);
                  r1FullData.push(existingData || { 
                      date: new Date(date),
                      screenPageViews: 0,
                      activeUsers: 0, 
                      newUsers: 0,
                      eventCount: 0,
                      sessions: 0,
                      averageSessionDuration: 0 
                  });
  
              }
              console.log("R1");
              console.log(r1FullData); 
              console.log("R1");

              const sixMonthChunks = segmentDataBySixMonths(r1FullData);

              return [r1FullData, sixMonthChunks];
};

function processBrowserData(report4) {
  return Object.entries(report4).map(([browser, metrics]) => ({
      browser,
      activeUsers: metrics.activeUsers
  }));
}

function processOSData(report5) {
  return Object.entries(report5).map(([os, metrics]) => ({
      os,
      activeUsers: metrics.activeUsers
  }));
}

function processCountryData(report3) {
    return Object.entries(report3).map(([country, metrics]) => ({
        country,
        activeUsers: metrics.activeUsers
    }));
}

function processActiveUsersByBrowser(report4) {
  return Object.entries(report4).map(([browser, metrics]) => ({
      browser,
      activeUsers: metrics.activeUsers
  }));
}



function segmentDataBySixMonths(data) {
  const sixMonthChunks = [];
  let chunk = [];
  let currentDate = new Date();
  let sixMonthsAgo = new Date(currentDate);
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  for (let i = data.length - 1; i >= 0; i--) {
      const date = new Date(data[i].date);
      if (date >= sixMonthsAgo) {
          chunk.push(data[i]);
      } else {
          if (chunk.length > 0) {
              sixMonthChunks.push(chunk.reverse());
              chunk = [];
          }
          sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
          if (date >= sixMonthsAgo) {
              chunk.push(data[i]);
          } else {
              sixMonthChunks.push([data[i]]);
          }
      }
  }
  if (chunk.length > 0) sixMonthChunks.push(chunk.reverse());

  return sixMonthChunks.reverse();
}

function processTotalMetrics(report2) {
  console.log(report2);
  console.log(report2.Totals.activeUsers);
  return {
      totalActiveUsers: report2.Totals.activeUsers,
      totalEventCount: report2.Totals.eventCount,
      totalScreenPageViews: report2.Totals.screenPageViews,
      totalSessions: report2.Totals.sessions,
  };
}

function renderTotalMetricsSummary(metrics) {
  console.log(metrics);
  document.getElementById('total-active-users').querySelector('.metric-value').textContent = metrics.totalActiveUsers;
  document.getElementById('total-event-count').querySelector('.metric-value').textContent = metrics.totalEventCount;
  document.getElementById('total-screen-page-views').querySelector('.metric-value').textContent = metrics.totalScreenPageViews;
  document.getElementById('total-sessions').querySelector('.metric-value').textContent = metrics.totalSessions;
}

function populateDropdown(sixMonthChunks) {
  const dropdown = document.getElementById('timePeriodDropdown');
  dropdown.innerHTML = "";
  sixMonthChunks.forEach((chunk, index) => {
      const startDate = new Date(chunk[0].date);
      const endDate = new Date(chunk[chunk.length - 1].date);
      const option = document.createElement('option');
      option.value = index;
      option.text = `${startDate.toISOString().split('T')[0]} - ${endDate.toISOString().split('T')[0]}`;
      dropdown.add(option);
  });
}

function updateChart() {
  const selectedIndex = document.getElementById('timePeriodDropdown').value;
  const selectedData = sixMonthChunks[selectedIndex];
  d3.select("#line-graph").html("");
  renderR1LineChart(selectedData);
}


function parseDate(dateString) {
  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);
  return new Date(`${year}-${month}-${day}`);
}

function getTopPerformingDates(data) {
  return data.sort((a, b) => {
      const eventCountDiff = b.eventCount - a.eventCount;
      if (eventCountDiff !== 0) return eventCountDiff;
      return b.screenPageViews - a.screenPageViews;
  }).slice(0, 5);
}



function renderR1LineChart(data) {
    const margin = {top: 30, right: 30, bottom: 30, left: 60},
          width = Math.min(window.innerWidth, 800) - margin.left - margin.right,
          height = Math.min(window.innerHeight, 500) - margin.top - margin.bottom;

    d3.select("#line-graph").html("");


    const svg = d3.select("#line-graph")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
      .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
  
  
    const x = d3.scaleTime()
    .domain(d3.extent(data, d => d.date))
    .range([0, width]);

    const gx = svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x).ticks(d3.timeMonth.every(1)).tickFormat(d3.timeFormat("%b"))) // Show only month names
    .call(g => g.select(".domain").remove());

    gx.selectAll(".tick text")
        .style("fill", "#777")
        .style("font-size", "14px")
        .attr("transform", "translate(0,0)")
        .style("text-anchor", "middle");


    gx.selectAll(".tick line")
        .style("stroke-opacity", 0); 


    gx.selectAll(".tick line")
        .attr("stroke", "#ddd")  
        .attr("stroke-opacity", 1) 
        .attr("stroke-dasharray", "2,2") 
        .attr("transform", `translate(0,-${height})`);
    


    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => Math.max(d.activeUsers, d.newUsers, d.sessions))])
        .range([height, 0]);

    const yAxis = d3.axisLeft(y)
        .tickSize(-width) 
        .tickPadding(10);

    const gy = svg.append("g")
        .call(yAxis);

    gy.select(".domain").remove();

    gy.selectAll(".tick line")
        .attr("stroke", "#ddd") 
        .attr("stroke-opacity", 1);

    gy.selectAll(".tick text")
        .style("fill", "#777")
        .style("font-size", "14px");

    gy.selectAll(".tick text")
        .style("visibility", (d, i, nodes) => i === 0 ? "hidden" : "visible");
        const createLine = metric => d3.line()
        .x(d => x(d.date))
        .y(d => y(d[metric]));


    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width / 2 + margin.left)
        .attr("y", height + margin.bottom - 10)
        .text("Date")
        .style("fill", "#FFF")
        .style("font-size", "16px");
    
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 20)
        .attr("x", -margin.top - height/2 + 20)
        .text("Metrics Value")
        .style("fill", "#FFF")
        .style("font-size", "16px");
    
    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .style("font-weight", "bold")
        .text("User Engagement Metrics")
        .style("fill", "#FFF");
  
    // Active Users line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#7547FF")
      .attr("stroke-width", 1.5)
      .attr("d", createLine('activeUsers')
      .curve(d3.curveMonotoneX));
  
    // New Users line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#A385FF") 
      .attr("stroke-width", 1.5)
      .attr("d", createLine('newUsers')
      .curve(d3.curveMonotoneX));
  
    // Sessions line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#470AFF") 
      .attr("stroke-width", 1.5)
      .attr("d", createLine('sessions')
      .curve(d3.curveMonotoneX));

    const focusLine = svg.append("line")
    .attr("stroke", "black")
    .attr("x1", 0)
    .attr("x2", 0)
    .attr("y1", 0)
    .attr("y2", height)
    .style("opacity", 0);

    const tooltip = d3.select("#tooltip");

    function tooltipHtml(d) {
        return `Date: ${d3.timeFormat("%b %d")(d.date)}<br>Active Users: ${d.activeUsers}<br>New Users: ${d.newUsers}<br>Sessions: ${d.sessions}`;
    }

    // Overlay to capture hover events
    svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .style("fill", "none")
    .style("pointer-events", "all")
    .on("mouseover", () => {
    focusLine.style("opacity", 1);
    tooltip.style("visibility", "visible");
    })
    .on("mouseout", () => {
    focusLine.style("opacity", 0);
    tooltip.style("visibility", "hidden");
    })
    .on("mousemove", function(event) {
    const x0 = d3.pointer(event, this)[0];
    const xDate = x.invert(x0);
    const bisectDate = d3.bisector(d => d.date).left;
    const idx = bisectDate(data, xDate, 1);
    const d0 = data[idx - 1];
    const d1 = data[idx];
    const d = xDate - d0.date > d1.date - xDate ? d1 : d0;

    focusLine.attr("transform", `translate(${x(d.date)},0)`);
    tooltip
        .html(tooltipHtml(d))
        // Update the tooltip style
        .style("color", "black") 
        .style("font-size", "14px")
        .style("background", "#fff")
        .style("border", "1px solid #ddd") 
        .style("border-radius", "5px") 
        .style("padding", "5px") 
        .style("pointer-events", "none")
        .html(tooltipHtml(d)) 
        .style("visibility", "visible") 
        .style("top", `${event.pageY + 15}px`)
        .style("left", `${event.pageX + 15}px`);
    });
}

// function multiLineChart(data) {
//     // Dimensions and margins of the chart.
//     const width = 900;
//     const height = 400;
//     const margin = { top: 20, right: 30, bottom: 30, left: 50 };
  
//     // Append the SVG object to the body of the page
//     const svg = d3.select('#line-graph')
//       .append('svg')
//       .attr('viewBox', [0, 0, width, height])
//       .attr('width', width)
//       .attr('height', height)
//       .append('g')
//       .attr('transform', `translate(${margin.left},${margin.top})`);
  
//     // Add X axis --> it is a date format
//     const x = d3.scaleTime()
//       .domain(d3.extent(data, d => d.date))
//       .range([0, d3.max(data, d => d.value)]);
    
//     svg.append('g')
//       .attr('transform', `translate(0,${height - margin.top - margin.bottom})`)
//       .call(d3.axisBottom(x));
  
//     // Add Y axis
//     const y = d3.scaleLinear()
//       .domain([0, d3.max(data, d => d.pageViews)])
//       .range([height - margin.top - margin.bottom, 0]);
    
//     svg.append('g')
//       .call(d3.axisLeft(y));
  
//     // Add the line
//     svg.append('path')
//       .datum(data)
//       .attr('fill', 'none')
//       .attr('stroke', 'steelblue')
//       .attr('stroke-width', 2)
//       .attr('d', d3.line()
//         .x(d => x(d.date))
//         .y(d => y(d.pageViews))
//       );
  
//     // If the background is dark, ensure the axes are a bright color.
//     svg.selectAll('.domain, .tick line, .tick text')
//       .attr('stroke', 'white')
//       .attr('fill', 'white');
//   }
  



// render the browser Pie Chart:
function renderBrowserPieChart(data) {
    const width = 450;
    const height = 450;
    const margin = 40;
  
    const radius = Math.min(width, height) / 2 - margin;
  
    const svg = d3.select("#browser-pie-chart")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);
  
    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.browser))
        .range(["#855CFF", "#470AFF" , "#A385FF", "#7547FF" ]);
  
    const pie = d3.pie()
        .value(d => d.activeUsers);
  
    const data_ready = pie(data);
  
    svg.selectAll('path')
        .data(data_ready)
        .join('path')
        .attr('d', d3.arc()
            .innerRadius(0)
            .outerRadius(radius)
        )
        .attr('fill', d => color(d.data.browser))
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 0.7);
  
    svg.selectAll('text')
        .data(data_ready)
        .join('text')
        .text(d => `${d.data.browser}: ${d.data.activeUsers}`)
        .attr("transform", d => `translate(${d3.arc()
            .innerRadius(0)
            .outerRadius(radius).centroid(d)})`)
        .style("text-anchor", "middle")
        .style("font-size", "16px")
        .style("fill", "#FFF");
  }
  
  
  function renderOSDonutChart(data) {
    const width = 450;
    const height = 450;
    const margin = 40;
  
    const radius = Math.min(width, height) / 2 - margin;
  
    const svg = d3.select("#os-donut-chart")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);
  
    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.os))
        .range(["#855CFF", "#470AFF" , "#A385FF", "#7547FF" ]);
  
    const pie = d3.pie()
        .value(d => d.activeUsers);
  
    const data_ready = pie(data);
  
    svg.selectAll('path')
        .data(data_ready)
        .join('path')
        .attr('d', d3.arc()
            .innerRadius(radius * 0.5 - radius * .1) // inner radius for the donut chart
            .outerRadius(radius + radius * .1)
        )
        .attr('fill', d => color(d.data.os))
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 0.7);
  
    svg.selectAll('text')
        .data(data_ready)
        .join('text')
        .text(d => `${d.data.os}: ${d.data.activeUsers}`)
        .attr("transform", d => `translate(${d3.arc()
            .innerRadius(radius * 0.5)
            .outerRadius(radius).centroid(d)})`)
        .style("text-anchor", "middle")
        .style("font-size", "16px")
        .style("fill", "#FFF");
  }
  


function renderChoroplethMap(data) {
    const width = 960;
    const height = 500;


  
    const svg = d3.select("#world-map")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet")


    const projection = d3.geoMercator()
        .scale(150)
        .translate([width / 2, height / 1.5]);
  
    const path = d3.geoPath().projection(projection);
  
    const color = d3.scaleSequential(d3.interpolateBlues)
        .domain([0, d3.max(data, d => d.activeUsers)]);
  
    d3.json("./assets/countries.geo.json").then(geojson => {
        svg.append("g")
            .selectAll("path")
            .data(geojson.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("fill", d => {
                const countryName = d.properties.name;
                const country = data.find(c => c.country === countryName);
                return country ? color(country.activeUsers) : "#ccc";
            })
            .attr("stroke", "#fff")
            .attr("stroke-width", 0.5);
  
        svg.selectAll("path")
            .on("mouseover", function(event, d) {
                const countryName = d.properties.name;
                const country = data.find(c => c.country === countryName);
                const tooltip = d3.select("#tooltip");
                tooltip
                    .html(`${d.properties.name}<br>Active Users: ${country ? country.activeUsers : 0}`)
                    .style("visibility", "visible")
                    .style("top", `${event.pageY + 15}px`)
                    .style("left", `${event.pageX + 15}px`);
            })
            .on("mouseout", () => {
                d3.select("#tooltip").style("visibility", "hidden");
            });
    });
  }
  


function renderTopPerformingDatesWidget(data) {
    const container = d3.select("#top-performing-dates");
    // container.html("");

    const topDates = getTopPerformingDates(data);

    const list = container.append("ul").attr("class", "top-dates-list");
    topDates.forEach(d => {
        const listItem = list.append("li").attr("class", "top-dates-item");
        listItem.append("div").attr("class", "date").text(d3.timeFormat("%Y-%m-%d")(d.date));
        listItem.append("div").attr("class", "event-count").text(`Event Count: ${d.eventCount}`);
        listItem.append("div").attr("class", "screen-page-views").text(`Screen Page Views: ${d.screenPageViews}`);
    });
}

function renderActiveUsersBarGraph(data) {
  const margin = { top: 30, right: 30, bottom: 70, left: 60 };
  const width = Math.min(window.innerWidth * 0.4, 500) - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  d3.select("#event-bar-graph").html("");

  const svg = d3.select("#event-bar-graph")
      .append("svg")
      .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleBand()
      .range([0, width])
      .domain(data.map(d => d.browser))
      .padding(0.2);

  const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.activeUsers)])
      .range([height, 0]);

  svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end")
      .style("fill", "#FFF"); 
  
  svg.append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .style("fill", "#FFF");

  svg.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.browser))
      .attr("width", x.bandwidth())
      .attr("y", d => y(d.activeUsers))
      .attr("height", d => height - y(d.activeUsers))
      .attr("fill", "#855CFF");

  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", -height / 2)
      .attr("y", -margin.left + 20)
      .attr("transform", "rotate(-90)")
      .text("Active Users")
      .style("fill", "#FFF");

  svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 10)
      .text("Browser")
      .style("fill", "#FFF");
}

