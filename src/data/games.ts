export type QuizQuestion = {
  prompt: string;
  options: string[];
  answerIndex: number;
  detail: string;
};

export type QuizLevel = {
  level: number;
  title: string;
  questions: QuizQuestion[];
};

export type CrosswordWord = {
  answer: string;
  clue: string;
  hint: string;
};

type QuizSeed = {
  title: string;
  place: string;
  region: string;
  category: string;
  symbol: string;
  traveler: string;
  habitat: string;
};

const quizSeeds: QuizSeed[] = [
  {
    title: 'Wall Street Power',
    place: 'Charging Bull',
    region: 'New York',
    category: 'Bull Statues & Monuments',
    symbol: 'financial confidence',
    traveler: 'public art explorer',
    habitat: 'urban financial district',
  },
  {
    title: 'Dallas Momentum',
    place: 'Dallas Bull Replica',
    region: 'Texas',
    category: 'Bull Statues & Monuments',
    symbol: 'business growth',
    traveler: 'downtown landmark hunter',
    habitat: 'business district',
  },
  {
    title: 'Rapid City Bronze',
    place: 'Bison Sculpture',
    region: 'South Dakota',
    category: 'Bull Statues & Monuments',
    symbol: 'Great Plains heritage',
    traveler: 'culture walk visitor',
    habitat: 'central public square',
  },
  {
    title: 'Oklahoma Plains',
    place: 'Oklahoma City Buffalo',
    region: 'Oklahoma',
    category: 'Bull Statues & Monuments',
    symbol: 'plainland endurance',
    traveler: 'regional history fan',
    habitat: 'civic landmark area',
  },
  {
    title: 'Denver Frontier',
    place: 'Denver Bison Monument',
    region: 'Colorado',
    category: 'Bull Statues & Monuments',
    symbol: 'frontier memory',
    traveler: 'museum day traveler',
    habitat: 'civic park route',
  },
  {
    title: 'Stockyards Tradition',
    place: 'Fort Worth Stockyards',
    region: 'Texas',
    category: 'Rodeo & Western Spots',
    symbol: 'living cowboy culture',
    traveler: 'western weekend visitor',
    habitat: 'historic cattle district',
  },
  {
    title: 'Cheyenne Rodeo',
    place: 'Cheyenne Frontier Days',
    region: 'Wyoming',
    category: 'Rodeo & Western Spots',
    symbol: 'rodeo celebration',
    traveler: 'festival planner',
    habitat: 'large rodeo arena',
  },
  {
    title: 'Pendleton Heritage',
    place: 'Pendleton Round-Up',
    region: 'Oregon',
    category: 'Rodeo & Western Spots',
    symbol: 'community rodeo ritual',
    traveler: 'event culture fan',
    habitat: 'historic rodeo grounds',
  },
  {
    title: 'Cody Night Show',
    place: 'Cody Nite Rodeo',
    region: 'Wyoming',
    category: 'Rodeo & Western Spots',
    symbol: 'summer night tradition',
    traveler: 'family rodeo visitor',
    habitat: 'night rodeo arena',
  },
  {
    title: 'Buffalo Bill Legacy',
    place: 'Buffalo Bill Center',
    region: 'Wyoming',
    category: 'Rodeo & Western Spots',
    symbol: 'western storytelling',
    traveler: 'museum explorer',
    habitat: 'heritage center',
  },
  {
    title: 'Custer Herds',
    place: 'Custer State Park',
    region: 'South Dakota',
    category: 'Ranch & Prairie Routes',
    symbol: 'free-roaming bison',
    traveler: 'wildlife road tripper',
    habitat: 'Black Hills prairie',
  },
  {
    title: 'Salt Lake Island',
    place: 'Antelope Island',
    region: 'Utah',
    category: 'Ranch & Prairie Routes',
    symbol: 'lake and prairie contrast',
    traveler: 'sunset wildlife viewer',
    habitat: 'Great Salt Lake island',
  },
  {
    title: 'Wichita Refuge',
    place: 'Wichita Mountains',
    region: 'Oklahoma',
    category: 'Ranch & Prairie Routes',
    symbol: 'rugged protected habitat',
    traveler: 'hiker and wildlife watcher',
    habitat: 'mountain grassland refuge',
  },
  {
    title: 'Montana Recovery',
    place: 'National Bison Range',
    region: 'Montana',
    category: 'Ranch & Prairie Routes',
    symbol: 'conservation recovery',
    traveler: 'scenic loop driver',
    habitat: 'protected bison range',
  },
  {
    title: 'Tallgrass Quiet',
    place: 'Tallgrass Prairie Preserve',
    region: 'Oklahoma',
    category: 'Ranch & Prairie Routes',
    symbol: 'native prairie preservation',
    traveler: 'slow travel observer',
    habitat: 'tallgrass ecosystem',
  },
  {
    title: 'Buffalo Bills Pride',
    place: 'Highmark Stadium',
    region: 'New York',
    category: 'Sports & Mascot Places',
    symbol: 'team loyalty',
    traveler: 'football culture fan',
    habitat: 'NFL stadium',
  },
  {
    title: 'Boulder Stadium',
    place: 'Folsom Field',
    region: 'Colorado',
    category: 'Sports & Mascot Places',
    symbol: 'college Buffaloes spirit',
    traveler: 'campus sports visitor',
    habitat: 'mountain-view stadium',
  },
  {
    title: 'Waterfront Legacy',
    place: 'Ralph Wilson Park',
    region: 'New York',
    category: 'Sports & Mascot Places',
    symbol: 'community recreation',
    traveler: 'waterfront walker',
    habitat: 'urban park',
  },
  {
    title: 'CU Identity',
    place: 'University of Colorado Campus',
    region: 'Colorado',
    category: 'Sports & Mascot Places',
    symbol: 'student Buffaloes pride',
    traveler: 'campus route explorer',
    habitat: 'university campus',
  },
  {
    title: 'Buffalo State',
    place: 'Buffalo State University',
    region: 'New York',
    category: 'Sports & Mascot Places',
    symbol: 'regional identity',
    traveler: 'city campus visitor',
    habitat: 'academic campus',
  },
  {
    title: 'Strength Symbol',
    place: 'American bison',
    region: 'Great Plains',
    category: 'Culture & Meaning',
    symbol: 'resilience',
    traveler: 'culture reader',
    habitat: 'open prairie memory',
  },
  {
    title: 'Prairie Trails',
    place: 'migration paths',
    region: 'American interior',
    category: 'Travel History',
    symbol: 'movement across land',
    traveler: 'road trip planner',
    habitat: 'wide plains',
  },
  {
    title: 'City Icons',
    place: 'urban animal sculptures',
    region: 'United States',
    category: 'Public Art',
    symbol: 'history in modern space',
    traveler: 'city walker',
    habitat: 'plazas and parks',
  },
  {
    title: 'Western Spirit',
    place: 'rodeo towns',
    region: 'American West',
    category: 'Living Traditions',
    symbol: 'land and skill',
    traveler: 'western culture visitor',
    habitat: 'arenas and ranch towns',
  },
  {
    title: 'Conservation Story',
    place: 'protected herds',
    region: 'North America',
    category: 'Wildlife Conservation',
    symbol: 'recovery after loss',
    traveler: 'responsible wildlife viewer',
    habitat: 'parks and reserves',
  },
  {
    title: 'Power in Motion',
    place: 'moving herd',
    region: 'open range',
    category: 'Wildlife Behavior',
    symbol: 'controlled power',
    traveler: 'patient observer',
    habitat: 'grassland horizon',
  },
  {
    title: 'Identity Landscape',
    place: 'buffalo country',
    region: 'Plains and foothills',
    category: 'Regional Character',
    symbol: 'land shaping culture',
    traveler: 'curious route maker',
    habitat: 'prairie and mountain edge',
  },
  {
    title: 'Quiet Travel',
    place: 'open preserves',
    region: 'rural routes',
    category: 'Reflective Travel',
    symbol: 'silence and distance',
    traveler: 'slow travel visitor',
    habitat: 'empty roads and overlooks',
  },
  {
    title: 'Ancient Meaning',
    place: 'modern road routes',
    region: 'historic corridors',
    category: 'Road Trip Context',
    symbol: 'old paths under new roads',
    traveler: 'history-minded driver',
    habitat: 'valleys, plains, and passes',
  },
  {
    title: 'Following Horizon',
    place: 'endless buffalo landscape',
    region: 'western open space',
    category: 'Exploration',
    symbol: 'curiosity over urgency',
    traveler: 'horizon follower',
    habitat: 'wide sky country',
  },
];

const wrongPlaces = ['Highmark Stadium', 'Custer State Park', 'Charging Bull', 'Fort Worth Stockyards'];
const wrongRegions = ['Florida', 'Alaska', 'Maine', 'Nevada'];
const wrongCategories = ['Food Market', 'Beach Route', 'Tech Campus', 'Botanical Garden'];
const wrongSymbols = ['ocean surfing', 'space travel', 'winter shopping', 'city subway lines'];
const wrongTravelers = ['ski-only visitor', 'deep sea diver', 'theme park rider', 'airport collector'];

function makeQuestion(
  prompt: string,
  answer: string,
  distractors: string[],
  detail: string,
  offset: number,
): QuizQuestion {
  const uniqueDistractors = distractors.filter(item => item !== answer).slice(0, 3);
  const options = [answer, ...uniqueDistractors];
  const rotation = offset % options.length;
  const rotated = [...options.slice(rotation), ...options.slice(0, rotation)];

  return {
    prompt,
    options: rotated,
    answerIndex: rotated.indexOf(answer),
    detail,
  };
}

export const quizLevels: QuizLevel[] = quizSeeds.map((seed, index) => ({
  level: index + 1,
  title: seed.title,
  questions: [
    makeQuestion(
      `Which stop or topic belongs to "${seed.title}"?`,
      seed.place,
      wrongPlaces,
      `${seed.place} is the focus of this level.`,
      index,
    ),
    makeQuestion(
      `Which region is connected with ${seed.place}?`,
      seed.region,
      wrongRegions,
      `${seed.region} is the route context for ${seed.place}.`,
      index + 1,
    ),
    makeQuestion(
      'Which route type best fits this level?',
      seed.category,
      wrongCategories,
      `${seed.category} is the strongest match here.`,
      index + 2,
    ),
    makeQuestion(
      'What does this stop mainly represent?',
      seed.symbol,
      wrongSymbols,
      `The key idea is ${seed.symbol}.`,
      index + 3,
    ),
    makeQuestion(
      'Who would most enjoy this trail moment?',
      seed.traveler,
      wrongTravelers,
      `This level is built for a ${seed.traveler}.`,
      index + 4,
    ),
  ],
}));

export const crosswordWords: CrosswordWord[] = [
  {answer: 'BISON', clue: 'Large North American animal often called buffalo.', hint: 'Wildlife symbol'},
  {answer: 'PRAIRIE', clue: 'Wide grassland landscape connected to historic herds.', hint: 'Open land'},
  {answer: 'RODEO', clue: 'Western event with riding and roping competitions.', hint: 'Arena tradition'},
  {answer: 'BRONZE', clue: 'Metal used in many public bull and bison sculptures.', hint: 'Statue material'},
  {answer: 'HERD', clue: 'A group of bison moving or grazing together.', hint: 'Animal group'},
  {answer: 'TRAIL', clue: 'A route followed by travelers through buffalo places.', hint: 'Path'},
  {answer: 'RANGE', clue: 'Open land where animals roam or are protected.', hint: 'Wild area'},
  {answer: 'CUSTER', clue: 'South Dakota state park known for bison herds.', hint: 'Park name'},
  {answer: 'DALLAS', clue: 'Texas city with a bull sculpture replica.', hint: 'Business city'},
  {answer: 'DENVER', clue: 'Colorado city with a civic bison monument.', hint: 'Mountain city'},
  {answer: 'CODY', clue: 'Wyoming town tied to rodeo and Buffalo Bill.', hint: 'Western town'},
  {answer: 'UTAH', clue: 'State where Antelope Island sits in the Great Salt Lake.', hint: 'Western state'},
  {answer: 'MONTANA', clue: 'State connected to the National Bison Range.', hint: 'Northern state'},
  {answer: 'WYOMING', clue: 'State with Cheyenne Frontier Days and Cody rodeo.', hint: 'Rodeo state'},
  {answer: 'OKLAHOMA', clue: 'State with Wichita Mountains and Tallgrass Prairie stops.', hint: 'Plains state'},
  {answer: 'BUFFALO', clue: 'Common cultural name used for the American bison.', hint: 'Symbol name'},
  {answer: 'FRONTIER', clue: 'Historic idea often linked with the American West.', hint: 'Western history'},
  {answer: 'STADIUM', clue: 'Sports place where fans gather for Buffalo identity.', hint: 'Game venue'},
  {answer: 'CAMPUS', clue: 'University setting tied to Buffaloes identity.', hint: 'College place'},
  {answer: 'MASCOT', clue: 'Animal symbol used by teams and schools.', hint: 'Team identity'},
  {answer: 'PLAINS', clue: 'Broad interior landscapes once crossed by bison.', hint: 'Geography'},
  {answer: 'REFUGE', clue: 'Protected land for wildlife and conservation.', hint: 'Safe habitat'},
  {answer: 'MONUMENT', clue: 'Public landmark honoring history or identity.', hint: 'Landmark'},
  {answer: 'SCULPTURE', clue: 'Three-dimensional artwork in public space.', hint: 'Art form'},
  {answer: 'STOCKYARDS', clue: 'Fort Worth historic district with cattle culture.', hint: 'Texas district'},
  {answer: 'CHEYENNE', clue: 'City famous for Frontier Days rodeo.', hint: 'Wyoming city'},
  {answer: 'PENDLETON', clue: 'Oregon rodeo grounds with long tradition.', hint: 'Round-Up city'},
  {answer: 'ANTELOPE', clue: 'Island state park known for bison and lake views.', hint: 'Island name'},
  {answer: 'TALLGRASS', clue: 'Prairie preserve type supporting bison habitat.', hint: 'Prairie kind'},
  {answer: 'WICHITA', clue: 'Oklahoma mountains wildlife refuge name.', hint: 'Refuge name'},
  {answer: 'CONSERVE', clue: 'To protect wildlife and habitat for the future.', hint: 'Protection verb'},
  {answer: 'RECOVERY', clue: 'The comeback story of protected bison herds.', hint: 'Conservation result'},
  {answer: 'HORIZON', clue: 'Distant line that defines open-road travel.', hint: 'Far view'},
  {answer: 'HERITAGE', clue: 'Cultural history preserved by places and traditions.', hint: 'Legacy'},
  {answer: 'CULTURE', clue: 'Shared meanings, traditions, and symbols.', hint: 'Community meaning'},
  {answer: 'WESTERN', clue: 'Style and region linked to rodeo and frontier towns.', hint: 'Regional mood'},
  {answer: 'WILDLIFE', clue: 'Animals living in natural or protected areas.', hint: 'Nature'},
  {answer: 'GRASSLAND', clue: 'Open habitat with grasses instead of dense forest.', hint: 'Habitat'},
  {answer: 'SYMBOL', clue: 'Image or animal carrying a larger meaning.', hint: 'Meaning marker'},
  {answer: 'RESILIENCE', clue: 'Ability to survive, recover, and continue.', hint: 'Strength trait'},
  {answer: 'MIGRATION', clue: 'Seasonal movement across land.', hint: 'Travel pattern'},
  {answer: 'LONGHORN', clue: 'Cattle often seen in Western heritage routes.', hint: 'Texas animal'},
  {answer: 'RANCH', clue: 'Working land connected with Western animal culture.', hint: 'Western land'},
  {answer: 'ARENA', clue: 'Venue where rodeo competitions happen.', hint: 'Event place'},
  {answer: 'PRESERVE', clue: 'Protected natural area kept for habitat.', hint: 'Protected place'},
  {answer: 'BOULDER', clue: 'Colorado city with Folsom Field and Buffaloes identity.', hint: 'College city'},
  {answer: 'BILLS', clue: 'Buffalo NFL team connected to Highmark Stadium.', hint: 'Team name'},
  {answer: 'MOMENTUM', clue: 'Forward energy represented by bull sculptures.', hint: 'Motion idea'},
  {answer: 'LANDMARK', clue: 'Recognizable place that helps define a route.', hint: 'Known stop'},
  {answer: 'JOURNEY', clue: 'The overall travel experience across routes.', hint: 'Trip'},
];
