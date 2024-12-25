

const socket = io();

socket.emit('requestSignalData');
socket.emit('requestFFTData');

socket.on('signalData', data => {
    const signalData = d3.csvParse(data).map(d => ({ x: +d.x, y: +d.y }));
    updateSignalChart(signalData);
});

socket.on('fftData', data => {
    const fftData = d3.csvParse(data).map(d => ({ x: +d.frequency, y: +d.magnitude }));
    updateFFTChart(fftData);
});

function updateSignalChart(signalData) {
    const xScale = d3.scaleLinear().domain(d3.extent(signalData, d => d.x)).range([0, width]);
    const yScale = d3.scaleLinear().domain(d3.extent(signalData, d => d.y)).range([height, 0]);
    const line = d3.line().x(d => xScale(d.x)).y(d => yScale(d.y));
    const svg = d3.select("#signal svg g");

    svg.selectAll("*").remove();

    svg.append("g").attr("class", "x axis").attr("transform", `translate(0,${height})`).call(d3.axisBottom(xScale));
    svg.append("g").attr("class", "y axis").call(d3.axisLeft(yScale));
    svg.append("path").datum(signalData).attr("class", "line").attr("d", line).style("stroke", "blue");
}

function updateFFTChart(fftData) {
    const xScale = d3.scaleLinear().domain(d3.extent(fftData, d => d.x)).range([0, width]);
    const yScale = d3.scaleLinear().domain(d3.extent(fftData, d => d.y)).range([height, 0]);
    const line = d3.line().x(d => xScale(d.x)).y(d => yScale(d.y));
    const svg = d3.select("#fft svg g");

    svg.selectAll("*").remove();

    svg.append("g").attr("class", "x axis").attr("transform", `translate(0,${height})`).call(d3.axisBottom(xScale));
    svg.append("g").attr("class", "y axis").call(d3.axisLeft(yScale));
    svg.append("path").datum(fftData).attr("class", "line").attr("d", line).style("stroke", "red");
}


// Example data (replace with actual signal data)
//const signalData = Array.from({length: 100}, (_, i) => ({x: i, y: Math.sin(i * 0.1+3.14/2)}));
//const fftData = signalData.map(d => ({x: d.x, y: Math.abs(d.y)})); // Replace with actual FFT data

/*
function updateSignalChart(signalData) {
    const xScale = d3.scaleLinear().domain(d3.extent(signalData, d => d.x)).range([0, width]);
    const yScale = d3.scaleLinear().domain(d3.extent(signalData, d => d.y)).range([height, 0]);
    const line = d3.line().x(d => xScale(d.x)).y(d => yScale(d.y));
    const svg = d3.select("#signal svg g");

    svg.selectAll("*").remove();

    svg.append("g").attr("class", "x axis").attr("transform", `translate(0,${height})`).call(d3.axisBottom(xScale));
    svg.append("g").attr("class", "y axis").call(d3.axisLeft(yScale));
    svg.append("path").datum(signalData).attr("class", "line").attr("d", line).style("stroke", "blue");
}
*/

/*
function updateFFTChart(fftData) {
    const xScale = d3.scaleLinear().domain(d3.extent(fftData, d => d.x)).range([0, width]);
    const yScale = d3.scaleLinear().domain(d3.extent(fftData, d => d.y)).range([height, 0]);
    const line = d3.line().x(d => xScale(d.x)).y(d => yScale(d.y));
    const svg = d3.select("#fft svg g");

    svg.selectAll("*").remove();

    svg.append("g").attr("class", "x axis").attr("transform", `translate(0,${height})`).call(d3.axisBottom(xScale));
    svg.append("g").attr("class", "y axis").call(d3.axisLeft(yScale));
    svg.append("path").datum(fftData).attr("class", "line").attr("d", line).style("stroke", "red");
}
*/

// Set up SVG dimensions
const margin = {top: 20, right: 30, bottom: 30, left: 40};
const width = 500 - margin.left - margin.right;
const height = 300 - margin.top - margin.bottom;

// Create SVG for signal
const svgSignal = d3.select("#signal")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Create SVG for FFT
const svgFFT = d3.select("#fft")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Define scales
const xScale = d3.scaleLinear().domain(d3.extent(signalData, d => d.x)).range([0, width]);
const yScaleSignal = d3.scaleLinear().domain([d3.min(signalData, d => d.y), d3.max(signalData, d => d.y)]).range([height, 0]);
const yScaleFFT = d3.scaleLinear().domain([0, d3.max(fftData, d => d.y)]).range([height, 0]);

// Define line generators
const lineSignal = d3.line()
    .x(d => xScale(d.x))
    .y(d => yScaleSignal(d.y));

const lineFFT = d3.line()
    .x(d => xScale(d.x))
    .y(d => yScaleFFT(d.y));

// Add axes
svgSignal.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

svgSignal.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(yScaleSignal));

svgFFT.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

svgFFT.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(yScaleFFT));

// Add line paths
svgSignal.append("path")
    .datum(signalData)
    .attr("class", "line")
    .attr("d", lineSignal)
    .style("stroke", "blue");

svgFFT.append("path")
    .datum(fftData)
    .attr("class", "line")
    .attr("d", lineFFT)
    .style("stroke", "red");
/*
d3.text("signal_data.csv").then(data => {
    const signalData = d3.csvParseRows(data).map(row => ({x: +row[0], y: +row[1]}));
    alert(signalData.join("#"))
    updateSignalChart(signalData);
});

d3.text("fft_data.csv").then(data => {
    const fftData = d3.csvParseRows(data).map(row => ({x: +row[0], y: +row[1]}));
    alert(fftData.join("#"))
    updateFFTChart(fftData);
});
*/

