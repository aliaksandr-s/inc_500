import Datamap from 'datamaps';
import dataset from './data.json';
import * as d3 from 'd3';

const root = document.getElementById('root');

const onlyValues = Object.values(dataset).map(val => val.revenueGrowth);

const minVal = Math.min(...onlyValues);
const maxVal = Math.max(...onlyValues);

const paletteScale = d3
  .scaleLinear()
  .domain([minVal, maxVal])
  .range(['#EFEFFF', '#02386F']); // blue color

Object.entries(dataset).forEach(([key, val]) => {
  val['fillColor'] = paletteScale(val.revenueGrowth);
});

console.log(minVal, maxVal);

const popupTemplate = (geo, data) => `
  <div class="hoverinfo">
    2018 revenue growth ${geo.properties.name}:
    <br/>
    <strong>
      ${data.revenueGrowth}
    </strong>
  </div>
`

new Datamap({
  element: root,
  scope: 'usa',
  data: dataset,
  geographyConfig: {
    popupTemplate
  }
});
