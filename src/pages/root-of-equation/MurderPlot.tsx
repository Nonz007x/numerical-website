import Plot from 'react-plotly.js';
import { Point } from '../../function/utils';

interface MurderPlotProps {
  points: Point[] | undefined;
}
function MurderPlot({ points }: MurderPlotProps) {
  return (
    <>
      <Plot
        data={[{
          x: points?.map((obj)=> obj.x),
          y: points?.map((obj)=> obj.y),
          type: 'scatter',
          mode: 'lines+markers',
          line: { color: 'pink'},
          marker: { color: 'black' },
        }]}
        // layout={{ width: 320, height: 240, title: 'A Fancy Plot' }}
      />
    </>
  )
}

export default MurderPlot