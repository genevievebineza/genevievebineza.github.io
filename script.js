// Define your data for different years
const dataByYear = {
  '1990': [
    { label: 'Demographic A', y: 30 },
    { label: 'Demographic B', y: 40 },
    { label: 'Demographic C', y: 20 },
    // Add more data points as needed
  ],
  // Add data for other years
  // ...
};

// Generate random data for the next 20 years
const startYear = 1990;
const endYear = new Date().getFullYear() + 20; // Update to current year + 20
for (let year = startYear + 1; year <= endYear; year++) {
  const dataPoints = [];
  const total = 100; // Total percentage for all demographics

  // Generate random percentages for each demographic
  const randomPercentA = Math.random() * total;
  const randomPercentB = Math.random() * (total - randomPercentA);
  const randomPercentC = total - randomPercentA - randomPercentB;

  // Add data points to the dataByYear object
  dataByYear[year.toString()] = [
    { label: 'Demographic A', y: randomPercentA },
    { label: 'Demographic B', y: randomPercentB },
    { label: 'Demographic C', y: randomPercentC }
  ];
}

// Create the initial pie chart
const initialYear = '1990';
let chart = new CanvasJS.Chart('chartContainer', {
  animationEnabled: true,
  data: [{
    type: 'pie',
    dataPoints: dataByYear[initialYear]
  }]
});
chart.render();

// Update the chart, year display, and timeline when the user scrolls
window.addEventListener('scroll', function() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const scrollHeight = document.documentElement.scrollHeight - windowHeight;
  const scrollPosition = (scrollTop + windowHeight / 2) / scrollHeight;

  // Calculate the year based on scroll position
  const totalYears = endYear - startYear + 1;
  const yearIndex = Math.floor(scrollPosition * totalYears);
  const currentYear = startYear + yearIndex;

  // Update the chart with data for the current year
  chart.options.data[0].dataPoints = dataByYear[currentYear.toString()];
  chart.render();

  // Update the year display
  const yearDisplay = document.getElementById('yearDisplay');
  yearDisplay.textContent = `Year: ${currentYear}`;

  // Scroll the timeline
  const timeline = document.getElementById('timeline');
  const timelineItems = timeline.getElementsByClassName('timeline-item');
  const timelineItemHeight = timelineItems[0].offsetHeight;
  const timelineScrollPosition = yearIndex * timelineItemHeight;
  timeline.scrollTop = timelineScrollPosition;

  // Highlight the current year on the timeline
  for (let i = 0; i < timelineItems.length; i++) {
    const timelineItem = timelineItems[i];
    if (i === yearIndex) {
      timelineItem.classList.add('active');
    } else {
      timelineItem.classList.remove('active');
    }
  }
});

// Create the timeline items dynamically
const timeline = document.getElementById('timeline');
for (let year = startYear + 1; year <= endYear; year++) {
  const timelineItem = document.createElement('div');
  timelineItem.classList.add('timeline-item');
  timelineItem.textContent = year.toString();
  timeline.appendChild(timelineItem);
}

  