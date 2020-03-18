// Function to build interactive dashboard to explore Belly Button Biodiversity dataset
function buildDash(microbials) {
    // D3 to read in json file
    d3.json("samples.json").then((data) => {
        console.log(data)
    
        var wfreq = data.metadata.map(d => d.wfreq)
        console.log(`Washing Frequency: ${wfreq}`);

        // Filter samples by id
        var ids = data.sample_test.filter(i => i.id.toString() === microbials)[0];
        console.log(ids);

        // Top 10 sample values
        var sample_values = sample_test.sample_values.slice(0, 10);
        console.log(samples);

        // Labels for the bar chart
        var labels = sample_test.otu_labels.slice(0, 10);
        console.log(labels);

        // Top 10 OTU ids
        var otu_ids = sample_test.otu_ids.slice(0, 10);
        console.log(otu_ids);

        // Trace for bar chart
        var trace = {
            x: otu_ids,
            y: sample_values,
            text: labels,
            marker: {
                color: 'rgb(50, 168, 82)'
            },
            type: "bar",
            orientation: "h"
        };

        var data = [trace];

        var layout = {
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 40
              }
        };

        Plotly.newPlot("bar", data, layout)
    });
}

buildDash()


// Change event function


// Displays default plot
function init() {

    var dropdown = d3.select("#selDataset");

    // D3 to read in json file
    d3.json("samples.json").then((data) => {
        console.log(data)


    var data = [{
        values: sample_values,
        labels: otu_ids,
        type: "bar"
    }];

    var layout = {
        height: 800,
        width: 600,
    };

    Plotly.newPlot("bar", data, layout);
}

