// Function to build interactive dashboard to explore Belly Button Biodiversity dataset
function buildDash(microbials) {
    // D3 to read in json file
    d3.json("samples.json").then((data) => {
        console.log(data)

        // Washing Frequency data for gauge chart
        var wfreq = data.metadata.map(d => d.wfreq)
        console.log(wfreq);

        // Filter samples by id
        var ids = data.samples.filter(i => i.id.toString() === microbials)[0];
        console.log(ids);

        // Top 10 sample values
        var sample_values = ids.sample_values.slice(0, 10).reverse();
        console.log(sample_values);

        // Labels for the bar chart
        var labels = ids.otu_labels.slice(0, 10).reverse();
        console.log(labels);

        // Top 10 OTU ids
        var otu_ids = ids.otu_ids.slice(0, 10).reverse();
        console.log(otu_ids);
        var otuAxisLabels = otu_ids.map(k => "OTU " + k);
        console.log(otuAxisLabels);

        // Trace for bar chart
        var trace1 = {
            x: sample_values,
            y: otuAxisLabels,
            text: labels,
            marker: {
                color: 'rgb(50, 168, 82)'
            },
            type: "bar",
            orientation: "h"
        };

        var data = [trace1];

        var layout = {
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 70
              }
        };

        Plotly.newPlot("bar", data, layout);

        // Bubble chart
        var trace2 = {
            x: otu_ids,
            y: sample_values,
            mode: 'markers',
            marker: {
                size: ids.sample_values,
                color: ids.otu_ids
            },
            text: labels
        };

        var data2 = [trace2];

        var layout2 = {
            showlegend: false,
            xaxis: {
                title: 'OTU ID'
            },
            height: 600,
            width: 1000
        };

        Plotly.newPlot('bubble', data2, layout2);

        // Gauge chart

        var trace3 = {
            domain: {
                x: [0, 1],
                y: [0, 1]
            },
            value: parseFloat(wfreq),
            title: {
                text: 'Belly Button Washing Frequency',
            },
            type: 'indicator',
            mode: 'gauge+number',
            colorscale: 'Electric',
            gauge: {
                axis: {range: [null, 9]},
                bar: {color: 'darkblue'},
                steps: [
                    {range: [0, 1], color: 'cyan'},
                    {range: [1, 2], color: 'royalblue'},
                    {range: [2, 3], color: 'royalblue'},
                    {range: [3, 4], color: 'royalblue'},
                    {range: [4, 5], color: 'royalblue'},
                    {range: [5, 6], color: 'royalblue'},
                    {range: [6, 7], color: 'white'},
                    {range: [7, 8], color: 'white'},
                    {range: [8, 9], color: 'white'}
                ],
                threshold: {
                    line: { 
                        color: "red", 
                        width: 4 
                    },
                    thickness: 0.85,
                    value: 490
                  }
            }
        };

        var data3 = [trace3];

        var layout3 = {
            width: 500,
            height: 400,
            margin: {t: 50, r: 50, l: 50, b: 50},
            font: {color: "darkblue"}
        };

        Plotly.newPlot('gauge', data3, layout3);
    });
}

// Obtain data for Demographic panel
function buildDemo(microbials) {
    // D3 to read in json file
    d3.json("samples.json").then((data) => {
        console.log(data)

        var metadata = data.metadata;
        // filter metadata to match sample ids in buildDash function
        var metaIDs = metadata.filter(j => j.id.toString() === microbials)[0];
        console.log(metaIDs);

        // Placing data in Demographic panel
        var demoInfo = d3.select("#sample-metadata");
        // Empty panel before adding new data
        demoInfo.html("");

        // obtains desired demographic data and appends to panel
        Object.entries(metaIDs).forEach((key) => {demoInfo
            .append("h5")
            .text(key[0]
            .toUpperCase() + ": " + key[1] + "\n");
        });
    });
}

// Change event function
function optionChanged(microbials) {
    buildDash(microbials);
    buildDemo(microbials);
}

// Displays default plot
function init() {
    // D3 to select the dropdown menu
    var dropdown = d3.select("#selDataset");
    // Assign dropdown menu ID to a variable
    // var dropdownID = dropdown.id;
    // // Assign dropdown menu option to a variable
    // var selectOption = dropdown.value;

    // console.log(dropdown);
    // console.log(selectOption);
    
    // D3 to read in json file
    d3.json("samples.json").then((data) => {
        console.log(data)

        // input data into dropdown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });
        // call script from buildDash function to display default plot
        buildDash(data.names[0]);
        buildDemo(data.names[0]);
    });
}

init();