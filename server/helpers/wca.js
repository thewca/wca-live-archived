const wca = {};

wca.Events = [{
  id: '333',
  name: '3x3x3 Cube',
  format: 'time'
},{
  id: '222',
  name: '2x2x2 Cube',
  format: 'time'
},{
  id: '444',
  name: '4x4x4 Cube',
  format: 'time'
},{
  id: '555',
  name: '5x5x5 Cube',
  format: 'time'
},{
  id: '666',
  name: '6x6 Cube',
  format: 'time'
},{
  id: '777',
  name: '7x7 Cube',
  format: 'time'
},{
  id: '333bf',
  name: '3x3x3: Blindfolded',
  format: 'time'
},{
  id: '333fm',
  name: '3x3x3: Fewest moves',
  format: 'number'
},{
  id: '333oh',
  name: '3x3x3: One-handed',
  format: 'time'
},{
  id: '333ft',
  name: '3x3x3: With feet',
  format: 'time'
},{
  id: 'clock',
  name: 'Rubik\'s Clock',
  format: 'time'
},{
  id: 'minx',
  name: 'Megaminx',
  format: 'time'
},{
  id: 'pyram',
  name: 'Pyraminx',
  format: 'time'
},{
  id: 'skewb',
  name: 'Skewb',
  format: 'time'
},{
  id: 'sq1',
  name: 'Square-1',
  format: 'time'
},{
  id: '444bf',
  name: '4x4 Cube: Blindfolded',
  format: 'time'
},{
  id: '555bf',
  name: '5x5 Cube: Blindfolded',
  format: 'time'
},{
  id: '333mbf',
  name: 'Rubik\'s Cube: Multiple Blindfolded',
  format: 'multi'
}];

wca.RoundFormats = [{
  id: '1',
  name: 'Best of 1',
  shortName: 'Bo1',
  solveCount: 1,
  cutoffFormats: [],
  sortBy: 'best',
}, {
  id: '2',
  name: 'Best of 2',
  shortName: 'Bo2',
  solveCount: 2,
  cutoffFormats: [ '1' ],
  averageName: '',
  sortBy: 'best',
}, {
  id: '3',
  name: 'Best of 3',
  shortName: 'Bo3',
  solveCount: 3,
  cutoffFormats: [ '1', '2' ],

  // 333bf is a best of 3, but people do get a mean, even though we don't
  // sort by it.
  computeAverage: false,
  sortBy: 'best',
}, {
  id: 'a',
  name: 'Average of 5',
  shortName: 'Ao5',
  solveCount: 5,
  cutoffFormats: [ '1', '2', '3' ],

  computeAverage: true,
  sortBy: 'average',
}, {
  id: 'm',
  name: 'Mean of 3',
  shortName: 'Mo3',
  solveCount: 3,
  cutoffFormats: [ '1', '2' ],

  computeAverage: true,
  sortBy: 'average',
}];

wca.Rounds = [{
  id: 'd',
  name: 'Combined First round',
  combined: true,
}, {
  id: '1',
  name: 'First round',
  combined: false,
}, {
  id: '2',
  name: 'Second round',
  combined: false,
}, {
  id: 'e',
  name: 'Combined Second round',
  combined: true,
}, {
  id: 'g',
  name: 'Combined Third Round',
  combined: true,
}, {
  id: '3',
  name: 'Semi Final',
  combined: false,
}, {
  id: 'c',
  name: 'Combined Final',
  combined: true,
}, {
  id: 'f',
  name: 'Final',
  combined: false,
}];

wca.getEventById = (id) => wca.Events.find((e) => e.id === id);
wca.getFormatById = (id) => wca.Formats.find((f) => f.id === id);
wca.getRoundById = (id) => wca.Rounds.find((r) => r.id === id);

module.exports = wca;
