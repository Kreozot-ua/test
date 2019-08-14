const fs = require('fs');

const authors = [
  'Mildred Purviss',
  'Stephannie Peers',
  'Rachele Oiller',
  'Moe Dudman',
  'Abby Lindsley',
  'Alexandra Bransby',
  'Shay Calver',
];

const genres = [
  'sci-fi',
  'fantasy',
  'educational',
  'horror',
  'biography',
  'criminal',
  'adventure',
  'action',
  'drama'
];

const Lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec orci nibh, dictum ac rutrum et, dictum ut odio. Pellentesque egestas commodo erat, in dictum orci tincidunt at. Mauris nisi ante, lobortis vitae congue ac, gravida sit amet nunc. Vestibulum justo libero, iaculis a metus at, pulvinar tempor est. Duis semper fermentum urna, eu pulvinar eros ullamcorper vitae. Donec fermentum tellus dapibus blandit efficitur. Nulla facilisi. Nullam pharetra, justo eu venenatis tristique, sem lectus pulvinar eros, at semper turpis diam vitae risus. Curabitur facilisis diam eu eros sollicitudin mattis. Sed vitae tellus vestibulum, dapibus nulla a, maximus neque. Ut eu leo vitae ligula luctus dignissim. Etiam cursus rhoncus est, vulputate porttitor mauris egestas id. Suspendisse ullamcorper felis eu arcu gravida fermentum. Quisque mattis, ante id vulputate pellentesque, est dolor porttitor odio, non lobortis elit erat id nulla.';

let data = JSON.parse(fs.readFileSync('books.json', 'utf8'));

data = data.map(item => {
  const author = authors[Math.floor(Math.random() * 7)];
  item.authors = [author];
  if(0 === Math.floor(Math.random() * 3)) {
    item.authors.push(authors.filter(item => item !== author)[Math.floor(Math.random() * 6)]);
  }
  item.genre = genres[Math.floor(Math.random() * 9)];
  item.description = `${item.title} ${item.genre} book by ${item.authors.join(' and ')} description. ${Lorem}`;
  return item;
});

fs.writeFileSync('books.json', JSON.stringify(data), 'utf8');