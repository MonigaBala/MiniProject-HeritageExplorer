export interface HeritageSite {
  id: string;
  name: string;
  location: string;
  category: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  rating: number;
  visitingHours: string;
  entryFee: string;
  bestTimeToVisit: string;
  history: string;
  architecture: string;
  nearbyAttractions: string[];
  latitude: number;
  longitude: number;
  unesco: boolean;
  yearBuilt: string;
  isPopular: boolean;
  isFeatured: boolean;
}

const heritageSites: HeritageSite[] = [
  {
    id: '1',
    name: 'Meenakshi Amman Temple',
    location: 'Madurai',
    category: 'temples',
    description: 'The Meenakshi Amman Temple is a historic Hindu temple located in the city of Madurai, Tamil Nadu, India. It is dedicated to Meenakshi, a form of Parvati, and her consort, Sundareshwar, a form of Shiva. The temple is known for its stunning architecture and intricate carvings, with colorful gopurams (towers) adorned with thousands of stone figures.',
    shortDescription: 'A magnificent temple dedicated to Goddess Meenakshi, featuring stunning architecture and towering gopurams.',
    imageUrl: 'https://images.pexels.com/photos/6765136/pexels-photo-6765136.jpeg',
    rating: 4.8,
    visitingHours: '05:00 AM - 12:30 PM, 04:00 PM - 10:00 PM',
    entryFee: 'Free (Special darshan: ₹50)',
    bestTimeToVisit: 'October to March',
    history: 'According to legend, the temple was originally built by Lord Indra who established a shrine for the Swayambhu lingam he discovered. The present structure was designed in 1560 by Vishwanatha Nayak, the first Nayaka king of Madurai, and subsequently expanded by his successors. The temple has witnessed various dynasties including the Pandyas, Cholas, and Nayaks.',
    architecture: 'The temple complex spans 14 acres and features 14 gopurams (gateway towers), the tallest being the southern tower at 170 feet. There are an estimated 33,000 sculptures throughout the temple. The Thousand Pillar Hall contains 985 intricately carved pillars, and the temple also houses the famous Musical Pillars that produce different musical notes when tapped.',
    nearbyAttractions: ['Thirumalai Nayakkar Palace', 'Gandhi Museum', 'Vandiyur Mariamman Teppakulam'],
    latitude: 9.9195,
    longitude: 78.1193,
    unesco: false,
    yearBuilt: '1600 CE',
    isPopular: true,
    isFeatured: true
  },
  {
    id: '2',
    name: 'Brihadeeswarar Temple',
    location: 'Thanjavur',
    category: 'temples',
    description: 'The Brihadeeswarar Temple, also known as Peruvudaiyar Kovil, is a Hindu temple dedicated to Shiva located in Thanjavur, Tamil Nadu, India. Built by Raja Raja Chola I between 1003 and 1010 AD, the temple is a part of the UNESCO World Heritage Site known as the "Great Living Chola Temples". The temple stands amidst fortified walls that were added in the 16th century.',
    shortDescription: 'A UNESCO World Heritage Site, this magnificent Chola temple features one of the tallest vimanas in South India.',
    imageUrl: 'https://images.pexels.com/photos/10918752/pexels-photo-10918752.jpeg',
    rating: 4.9,
    visitingHours: '06:00 AM - 12:30 PM, 04:00 PM - 08:30 PM',
    entryFee: 'Free',
    bestTimeToVisit: 'November to February',
    history: 'Built by Raja Raja Chola I, the temple was completed around 1010 CE. It was constructed to display the emperor\'s vision of his power and his relationship to the universal order. The temple was part of a massive cultural flourishing under the Chola dynasty. In 2010, the temple celebrated its 1000th anniversary.',
    architecture: 'The temple stands within a fort-like enclosure with walls added during the 16th century. The vimana (temple tower) is 216 feet high and is among the tallest in South India. The temple\'s apex, the octagonal shikharam, is carved from a single piece of granite weighing an estimated 80 tons. The main sanctum houses a huge Shiva lingam.',
    nearbyAttractions: ['Thanjavur Royal Palace', 'Saraswathi Mahal Library', 'Schwartz Church'],
    latitude: 10.7828,
    longitude: 79.1318,
    unesco: true,
    yearBuilt: '1010 CE',
    isPopular: true,
    isFeatured: true
  },
  {
    id: '3',
    name: 'Shore Temple',
    location: 'Mahabalipuram',
    category: 'monuments',
    description: 'The Shore Temple is a complex of temples and shrines that overlooks the shore of the Bay of Bengal. Built during the reign of Narasimhavarman II, it is the oldest structural temple in South India and represents the final phase of Pallava art. The temple was designed to catch the first rays of the rising sun and to illuminate the waters after dark.',
    shortDescription: 'This UNESCO site features stunning 8th-century stone carvings overlooking the Bay of Bengal.',
    imageUrl: 'https://images.pexels.com/photos/5487170/pexels-photo-5487170.jpeg',
    rating: 4.7,
    visitingHours: '06:00 AM - 06:00 PM',
    entryFee: '₹40 for Indians, ₹600 for foreigners',
    bestTimeToVisit: 'October to March',
    history: 'The Shore Temple was built between 700-728 CE during the reign of Narasimhavarman II of the Pallava Dynasty. It is believed to be the last in a series of temples that once stood along the shore, the rest having been washed away by the sea. The temple was part of the Seven Pagodas described by early European travelers.',
    architecture: 'The Shore Temple complex consists of three temples - two dedicated to Lord Shiva and one to Lord Vishnu. The main shrine faces east so that the sun\'s rays illuminate the main deity. The temple features intricate stone carvings, including a remarkable bas-relief depicting Shiva as Kiratarjuna.',
    nearbyAttractions: ['Arjuna\'s Penance', 'Krishna\'s Butter Ball', 'Pancha Rathas'],
    latitude: 12.6169,
    longitude: 80.1917,
    unesco: true,
    yearBuilt: '725 CE',
    isPopular: true,
    isFeatured: true
  },
  {
    id: '4',
    name: 'Vellore Fort',
    location: 'Vellore',
    category: 'forts',
    description: 'Vellore Fort is a large 16th-century fort situated in the heart of Vellore city, Tamil Nadu. It houses the Jalakantesvara Temple, Vellore Christian Church, and the Regional Archaeological Museum. The fort is known for its grand ramparts, wide moat, and robust masonry, standing as an example of military architecture in South India.',
    shortDescription: 'A historical fort with impressive military architecture housing temples, museums, and historical sites.',
    imageUrl: 'https://images.pexels.com/photos/8139022/pexels-photo-8139022.jpeg',
    rating: 4.4,
    visitingHours: '09:00 AM - 05:00 PM',
    entryFee: 'Free (Museum: ₹15)',
    bestTimeToVisit: 'October to March',
    history: 'The fort was constructed in the 16th century by Chinna Bommi Nayak and Thimma Reddy Nayak, subordinates of Sadasiva Raya of the Vijayanagara Empire. It later came under the control of the Bijapur Sultans, Marathas, Carnatic Nawabs, and finally the British East India Company. It was the site of the Vellore Mutiny of 1806, considered the first instance of Indian sepoy rebellion against British East India Company forces.',
    architecture: 'The fort is surrounded by a deep moat and encloses an area of 133 acres. The fort walls are built of granite blocks and are flanked by bastions at regular intervals. The main attraction inside the fort is the Jalakantesvara Temple, known for its intricate stone carvings. The temple pillars demonstrate the architectural excellence of the Vijayanagara Empire.',
    nearbyAttractions: ['Srilakshmi Golden Temple', 'Government Museum', 'Science Park'],
    latitude: 12.9202,
    longitude: 79.1333,
    unesco: false,
    yearBuilt: '1566 CE',
    isPopular: true,
    isFeatured: false
  },
  {
    id: '5',
    name: 'Gangaikonda Cholapuram',
    location: 'Ariyalur District',
    category: 'temples',
    description: 'Gangaikonda Cholapuram was erected as the capital of the Cholas by Rajendra Chola I, the son and successor of Rajaraja Chola. The name means "The town of the Chola who took the Ganges". The temple is a UNESCO World Heritage Site, along with the Brihadeeswara Temple at Thanjavur and Airavatesvara temple at Darasuram.',
    shortDescription: 'A UNESCO World Heritage site representing the pinnacle of Chola architecture and art.',
    imageUrl: 'https://images.pexels.com/photos/17584268/pexels-photo-17584268/free-photo-of-stone-temple-in-sunlight.jpeg',
    rating: 4.6,
    visitingHours: '06:00 AM - 12:00 PM, 04:00 PM - 08:00 PM',
    entryFee: 'Free',
    bestTimeToVisit: 'November to February',
    history: 'The temple was built by Rajendra Chola I, who established Gangaikonda Cholapuram as his capital after his successful military expedition to the Ganges. The city served as the Chola capital for about 250 years. The temple was constructed between 1020 and 1035 CE as a reflection of the emperor\'s vision of creating a second Brihadeeswara Temple.',
    architecture: 'Though smaller than the Brihadeeswara Temple, the temple at Gangaikonda Cholapuram is more refined. The vimana stands at 182 feet and is shorter than the one at Thanjavur. The temple is known for its elegant sculptures including the Chandesha Anugraha Murthy, the Dancing Ganesh, and Saraswathi.',
    nearbyAttractions: ['Airavatesvara Temple', 'Darasuram', 'Swamimalai'],
    latitude: 11.2086,
    longitude: 79.4407,
    unesco: true,
    yearBuilt: '1035 CE',
    isPopular: false,
    isFeatured: true
  },
  {
    id: '6',
    name: 'Mamallapuram Group of Monuments',
    location: 'Mamallapuram',
    category: 'monuments',
    description: 'The Group of Monuments at Mahabalipuram is a collection of 7th and 8th century CE religious monuments in the coastal resort town of Mamallapuram, Tamil Nadu. The site includes the Shore Temple, Pancha Rathas, Descent of the Ganges (Arjuna\'s Penance), Krishna\'s Butter Ball, and other rock-cut sculptures.',
    shortDescription: 'A UNESCO World Heritage site featuring rock-cut sculptures, monolithic temples, and ancient artistry.',
    imageUrl: 'https://images.pexels.com/photos/17553183/pexels-photo-17553183/free-photo-of-ancient-ruins-of-panch-rathas-chariot-temples-in-mahabalipuram-india.jpeg',
    rating: 4.7,
    visitingHours: '06:00 AM - 06:00 PM',
    entryFee: '₹40 for Indians, ₹600 for foreigners',
    bestTimeToVisit: 'October to March',
    history: 'The monuments at Mahabalipuram were built by the Pallava kings in the 7th and 8th centuries. The town was a busy seaport during the Pallava period, and these monuments were designed to display the power and artistic achievements of the dynasty. The site gained UNESCO World Heritage status in 1984.',
    architecture: 'The monuments showcase different styles of architecture and art. The Pancha Rathas are five monolithic temples carved from a single rock. Arjuna\'s Penance is a massive open-air bas-relief. Krishna\'s Butter Ball is a giant natural rock perched on a hillside. Together, they demonstrate the evolution of Dravidian temple architecture.',
    nearbyAttractions: ['Crocodile Bank', 'Tiger Cave', 'Covelong Beach'],
    latitude: 12.6211,
    longitude: 80.1947,
    unesco: true,
    yearBuilt: '700 CE',
    isPopular: true,
    isFeatured: true
  },
  {
    id: '7',
    name: 'Madras War Cemetery',
    location: 'Chennai',
    category: 'monuments',
    description: 'The Madras War Cemetery is a memorial maintained by the Commonwealth War Graves Commission. It contains the graves of soldiers who died during World War II. The cemetery is a peaceful and well-maintained space that honors the memory of those who lost their lives in service.',
    shortDescription: 'A solemn memorial dedicated to soldiers who died during World War II, beautifully maintained.',
    imageUrl: 'https://images.pexels.com/photos/5563047/pexels-photo-5563047.jpeg',
    rating: 4.3,
    visitingHours: '09:00 AM - 05:00 PM',
    entryFee: 'Free',
    bestTimeToVisit: 'November to February',
    history: 'The cemetery was established by the British after World War II to honor and remember the soldiers who died during the conflict. It contains 855 Commonwealth burials of the Second World War, 1 being unidentified. There are also 25 Foreign National burials and 1 non-world war burial.',
    architecture: 'The cemetery is laid out according to typical Commonwealth War Graves Commission standards, with rows of headstones on a manicured lawn. The graves are marked with uniform headstones, regardless of military rank or civil status. The cemetery also features the Cross of Sacrifice, a standard feature in Commonwealth war cemeteries.',
    nearbyAttractions: ['Fort St. George', 'Marina Beach', 'Kapaleeshwarar Temple'],
    latitude: 13.0068,
    longitude: 80.2329,
    unesco: false,
    yearBuilt: '1945 CE',
    isPopular: false,
    isFeatured: false
  },
  {
    id: '8',
    name: 'Government Museum Chennai',
    location: 'Chennai',
    category: 'museums',
    description: 'The Government Museum Chennai, also known as the Madras Museum, is the second oldest museum in India, established in 1851. It houses a rich collection of artifacts including archaeology, numismatics, zoology, natural history, sculptures, palm-leaf manuscripts and Amravati paintings.',
    shortDescription: 'One of India\'s oldest museums with vast collections of art, archaeology, and natural history.',
    imageUrl: 'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg',
    rating: 4.2,
    visitingHours: '09:30 AM - 05:00 PM (Closed on Fridays)',
    entryFee: '₹15 for Indians, ₹250 for foreigners',
    bestTimeToVisit: 'Year-round',
    history: 'The museum was established in 1851 and is the second oldest museum in India after the Indian Museum in Kolkata. It began in a small building in Nungambakkam and was later shifted to its present site at Pantheon Road, Egmore. The main building of the museum was built in the Indo-Saracenic style.',
    architecture: 'The museum complex comprises several buildings in the Indo-Saracenic architectural style, a blend of Indian and European architectural elements. The main building, constructed in 1876, features decorative elements inspired by Hindu, Islamic, and Gothic styles. The museum campus includes the Museum Theatre, a rare example of Victorian theatrical architecture in India.',
    nearbyAttractions: ['National Art Gallery', 'Connemara Public Library', 'Marina Beach'],
    latitude: 13.0698,
    longitude: 80.2607,
    unesco: false,
    yearBuilt: '1851 CE',
    isPopular: true,
    isFeatured: false
  },
  {
    id: '9',
    name: 'Thiruvalluvar Statue',
    location: 'Kanyakumari',
    category: 'monuments',
    description: 'The Thiruvalluvar Statue is a 133-foot tall stone sculpture of the Tamil poet and philosopher Thiruvalluvar, author of the Thirukkural. The statue stands on a small island near Kanyakumari, at the southernmost tip of the Indian peninsula, where the Arabian Sea, the Bay of Bengal, and the Indian Ocean meet.',
    shortDescription: 'A massive stone statue honoring the Tamil poet Thiruvalluvar, situated at India\'s southernmost tip.',
    imageUrl: 'https://images.pexels.com/photos/13870995/pexels-photo-13870995.jpeg',
    rating: 4.6,
    visitingHours: '08:00 AM - 04:00 PM',
    entryFee: '₹34 for ferry',
    bestTimeToVisit: 'October to March',
    history: 'The statue was sculpted by Dr. V. Ganapati Sthapati and unveiled on January 1, 2000. The 133-foot height of the statue corresponds to the 133 chapters of the Thirukkural. The statue stands on a 38-foot pedestal, representing the 38 chapters of the first part of the Thirukkural.',
    architecture: 'The statue is made of stone and stands on a 38-foot pedestal. The height of the statue represents the 133 chapters of the Thirukkural. The pedestal is designed like a temple chariot and is sculpted with intricate details. The statue weighs 7000 tons and is built to withstand earthquakes and high winds.',
    nearbyAttractions: ['Vivekananda Rock Memorial', 'Kanyakumari Beach', 'Bhagavathy Amman Temple'],
    latitude: 8.0780,
    longitude: 77.5540,
    unesco: false,
    yearBuilt: '2000 CE',
    isPopular: true,
    isFeatured: false
  },
  {
    id: '10',
    name: 'Airavatesvara Temple',
    location: 'Darasuram',
    category: 'temples',
    description: 'The Airavatesvara Temple is a Hindu temple of Dravidian architecture located in Darasuram, Tamil Nadu. This temple, built by Rajaraja Chola II in the 12th century CE, is a UNESCO World Heritage Site, along with the Brihadeeswara Temple at Thanjavur and Gangaikonda Cholapuram Temple.',
    shortDescription: 'A UNESCO World Heritage site known for intricate stone carvings and Chola architectural excellence.',
    imageUrl: 'https://images.pexels.com/photos/4428290/pexels-photo-4428290.jpeg',
    rating: 4.5,
    visitingHours: '06:00 AM - 12:00 PM, 04:00 PM - 08:00 PM',
    entryFee: 'Free',
    bestTimeToVisit: 'November to February',
    history: 'The temple was built by Rajaraja Chola II in the 12th century CE. The name Airavatesvara comes from the story that Airavata, the white elephant of Indra, worshipped Shiva at this temple. The temple was severely damaged during the Anglo-French war and was later restored by the Archaeological Survey of India.',
    architecture: 'The temple has a unique design with the main shrine resembling a chariot drawn by horses. The temple\'s vimana (tower) stands 24 meters tall. The most notable architectural features include the pillared halls and intricate stone carvings. The temple is famous for its sculptures and reliefs, including depictions of Shiva as Nataraja.',
    nearbyAttractions: ['Brihadeeswara Temple', 'Gangaikonda Cholapuram', 'Schwartz Church'],
    latitude: 10.9447,
    longitude: 79.3539,
    unesco: true,
    yearBuilt: '1150 CE',
    isPopular: false,
    isFeatured: true
  },
  {
    id: '11',
    name: 'Ramanathaswamy Temple',
    location: 'Rameswaram',
    category: 'temples',
    description: 'The Ramanathaswamy Temple is a famous Hindu temple dedicated to the god Shiva located on Rameswaram island in Tamil Nadu. It is one of the twelve Jyotirlinga temples, where Shiva is worshipped in the form of a Jyotirlinga, and is considered one of the holiest Hindu sites in India.',
    shortDescription: 'A magnificent temple with the longest corridor in India and one of the 12 Jyotirlinga shrines.',
    imageUrl: 'https://images.pexels.com/photos/11081077/pexels-photo-11081077.jpeg',
    rating: 4.8,
    visitingHours: '05:00 AM - 01:00 PM, 03:00 PM - 09:00 PM',
    entryFee: 'Free',
    bestTimeToVisit: 'October to April',
    history: 'The temple in its current form was built during the 12th century by the Pandya Dynasty, with significant expansions made during the Nayak period in the 16th century. According to Hindu mythology, this is where Lord Rama, along with his wife Sita, worshipped Lord Shiva to cleanse the sin of killing Ravana, who was a Brahmin.',
    architecture: 'The temple is famous for its long corridors - the longest corridor in India, measuring 197 meters from east to west and 133 meters from south to north. The temple has 22 theerthams (wells) inside the complex, and each is said to have unique properties. The temple also features impressive gopurams (towers) in the Dravidian style.',
    nearbyAttractions: ['Dhanushkodi Beach', 'Pamban Bridge', 'APJ Abdul Kalam Memorial'],
    latitude: 9.2883,
    longitude: 79.3183,
    unesco: false,
    yearBuilt: '12th century CE',
    isPopular: true,
    isFeatured: true
  },
  {
    id: '12',
    name: 'Chettinad Palace',
    location: 'Karaikudi',
    category: 'architecture',
    description: 'Chettinad Palace, also known as the Chettinad Mansion, is a palatial house built by Dr. Annamalai Chettiar, the founder of Annamalai University. It is a stunning example of Chettinad architecture, which combines local craftsmanship with European and East Asian influences, and showcases the wealth and aesthetic sensibilities of the Nattukottai Chettiars.',
    shortDescription: 'A magnificent palace showcasing the unique Chettinad architectural style with ornate details.',
    imageUrl: 'https://images.pexels.com/photos/3243090/pexels-photo-3243090.jpeg',
    rating: 4.4,
    visitingHours: '09:00 AM - 05:00 PM',
    entryFee: '₹100',
    bestTimeToVisit: 'November to February',
    history: 'The Chettinad Palace was built by Dr. Annamalai Chettiar, a prominent businessman and philanthropist, in the early 20th century. The Nattukottai Chettiars were a prosperous mercantile community who amassed wealth through trade and banking in Southeast Asia during the British colonial period. The palace stands as a testament to their affluence and cultural exchanges with various parts of the world.',
    architecture: 'Chettinad architecture is characterized by the use of local materials along with imported elements. The palace features high ceilings, spacious courtyards, intricate woodwork, and ornate details. The mansion used materials from around the world - teak from Burma, marble from Italy, tiles from Japan, and chandeliers from Europe. The walls are made of a special plaster called "egg plaster," made from egg whites, lime, and other materials, giving them a smooth, glossy finish.',
    nearbyAttractions: ['Athangudi Palace', 'Pillayarpatti Temple', 'Kanadukathan'],
    latitude: 10.0735,
    longitude: 78.7732,
    unesco: false,
    yearBuilt: '1912 CE',
    isPopular: false,
    isFeatured: true
  }
];

// Utility functions to get sites by various criteria
export const getAllSites = () => heritageSites;

export const getSiteById = (id: string) => 
  heritageSites.find(site => site.id === id);

export const getSitesByCategory = (category: string) =>
  heritageSites.filter(site => site.category === category);

export const getFeaturedSites = () =>
  heritageSites.filter(site => site.isFeatured);

export const getPopularSites = () =>
  heritageSites.filter(site => site.isPopular);

export const getUNESCOSites = () =>
  heritageSites.filter(site => site.unesco);

export const searchSites = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return heritageSites.filter(
    site => 
      site.name.toLowerCase().includes(lowercaseQuery) ||
      site.location.toLowerCase().includes(lowercaseQuery) ||
      site.description.toLowerCase().includes(lowercaseQuery) ||
      site.category.toLowerCase().includes(lowercaseQuery)
  );
};