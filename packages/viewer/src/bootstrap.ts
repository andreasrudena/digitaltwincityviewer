import { Viewer } from './Viewer';
import { RootStore } from './Store';

// todo: make proper city entities (multi-language support, ids, metadata, stat props)
const cities = [
  {
    cityLngLat: [12.6945, 56.0465] as [number, number],
    cityExtentRadius: 5000, // in meters, to determine extent
    name: 'Helsingborg',
  },
  {
    cityLngLat: [11.9746, 57.7089] as [number, number],
    cityExtentRadius: 10000, // in meters, to determine extent
    name: 'Göteborg',
  },
  {
    //cityLngLat: [13.0038, 55.605] as [number, number],
    cityLngLat: [12.965601, 55.591741] as [number, number],
    cityExtentRadius: 5000,
    name: 'Malmö',
  },
];

function bootstrap() {
  const store = new RootStore();
}

export default bootstrap;
