// ============================================================
// SITE CONFIG — the single source of truth for all editable
// copy, contact info, and content. Change values here; nothing
// else in the codebase needs to be touched for a content update.
// ============================================================

export type GalleryCategory =
  | 'Nikkah & Engagement'
  | 'Mehndi'
  | 'Receptions'
  | 'Showers & Milestones'
  | 'Grazing Tables'
  | 'Garden Parties';

export interface GalleryImage {
  file: string;
  category: GalleryCategory;
  alt: string;
}

export interface Service {
  num: string;
  title: string;
  desc: string;
  image: string;
  alt: string;
}

export interface TeamMember {
  num: string;
  name: string;
  desc: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  event: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface HowWeWorkStep {
  num: string;
  title: string;
  desc: string;
  image: string;
  alt: string;
}

export interface SelectCardOption {
  value: string;
  label: string;
  image: string;
}

export const siteConfig = {
  business: {
    name: 'Bon Appétit',
    tagline: 'Event Design & Décor Studio',
    title: 'Bon Appétit — Event Design & Décor Studio | NYC & Long Island',
    description:
      'Bon Appétit designs and builds nikkah, mehndi, walima, reception and milestone décor across NYC and Long Island. Book a consultation.',
    url: 'https://www.bonappetitevents.com',
    phone: '+1 (516) 306-3002',
    // TODO: fill in a real contact email — used in the LocalBusiness schema and footer.
    email: '',
    // TODO: how many years the business has been running (feeds a stat counter).
    yearsInBusiness: '',
    // TODO: number of events completed (feeds a stat counter).
    eventsCompleted: '',
    // TODO: a short line describing exactly how far you'll travel / extra-mile pricing.
    serviceAreaDetail: '',
    areaServed: ['New York City', 'Long Island', 'Queens', 'Nassau County', 'Suffolk County'],
    instagramHandle: '@bonappetit_06',
    instagramUrl: 'https://www.instagram.com/bonappetit_06',
    socials: {
      instagram: 'https://www.instagram.com/bonappetit_06',
      tiktok: '',
      facebook: '',
      pinterest: ''
    },
    // TODO: your Formspree form ID (or swap formEndpoint for any POST-able endpoint).
    formEndpoint: 'https://formspree.io/f/REPLACE_WITH_FORM_ID'
  },

  hero: {
    eyebrow: 'NYC · Long Island',
    heading: ['We handle the prettiest details', 'so you hold the bigger picture.'],
    sub: 'Event design, décor and styling for nikkahs, mehndis, receptions and milestones across NYC and Long Island.',
    image: '/assets/stage-01.jpg',
    imageAlt:
      'Nikkah stage with a cascading blush and ivory floral arch around a tufted loveseat, gold-lettered monogram on the dance floor below'
  },

  marquee: [
    'Nikkah',
    'Mehndi',
    'Walima',
    'Baby Showers',
    'Graduations',
    'Birthdays',
    'Engagements',
    'Grazing Tables',
    'Garden Parties'
  ],

  about: {
    image: '/assets/stage-13.jpg',
    imageAlt: 'Blush and mauve rose wall above a cream sofa suite, styled for an intimate nikkah corner',
    paragraph:
      'Bon Appétit started in 2022, and the first year was not pretty. We were a small family based setup; building backdrops in a garage, hosting small parties, dealing with tough customer expectations with no experience, and saying yes to events we had no business saying yes to. We learned this job the hard way, on our knees at 2 am retying a canopy that would not hold, working out what actually happens when a tent floods or a delivery never shows, workers leave last second, and clients cancelling last minute. Today we design and host celebrations across New York City and Long Island and even out of state (but the rate slightly increases — not the output), from nikkah and walima to baby showers, birthdays and backyard parties.',
    closing: 'The difference now is that we have already been through it, so you do not have to. You pick the date. We carry the rest.'
  },

  team: [
    {
      num: '01',
      name: 'Mehwish Usman',
      desc: 'Meet Mehwish Usman, the founder of Bon Appétit. She majored in arts and home economics, and at a young age, shortly after getting married, she started hosting stalls, small events and parties — and it was not easy. She quickly learned the real challenges of running a business in this field: logistics, client expectations, workers leaving at the last minute, and taking on offers she had no business accepting, just to make ends meet. Seeing those challenges firsthand is what drove her to pursue her dream of revolutionizing the event hosting industry in the US, so that you can have the best events without any hassle or struggle. You pick the date and the details — she and the team handle the rest.'
    },
    {
      num: '02',
      name: 'Usman',
      desc: 'Meet Usman, the backbone of Bon Appétit and the Mr. of Mehwish. He is the one who uses his experience of 40+ years to bring our events to life. He ignores his challenges and struggles and always helps his wife day and night to make the best events possible. Without him Bon Appétit would not be what it is today.'
    },
    {
      num: '03',
      name: 'Rehman',
      desc: 'Meet Rehman, the son of Mehwish and Usman. He is the President of the junior lego federation in New York. At just the age of 16 he is an engineer of his own. He always happens to have a profound interest in drones. Hence he is the one who will capture the best drone shots for your event and capture the most sentimental and cinematic memories.'
    },
    {
      num: '04',
      name: 'Rida',
      desc: 'Meet Rida, studying in one of the top universities in the country. She is a passionate baker and artist since start. She makes the best desserts and baked items you will probably ever taste. She helps her mother execute these events day and night, taking time out of her studies even if she is away from home.'
    },
    {
      num: '05',
      name: 'Rania',
      desc: 'Meet Rania, similar to Rida she is studying in one of the most qualified universities in the US. She uses her arts and designing skills to help come up with the most beautiful designs for your event. She helps her mother setup and deal with the logistics, her brother with the photography and her sister with arts. A true all rounder in terms of helping around even when she isn’t around.'
    }
  ] satisfies TeamMember[],

  services: [
    { num: '01', title: 'Nikkah', desc: 'Stages, floral arches and seating for the ceremony.', image: '/assets/stage-11.jpg', alt: 'Red rose arch over a white tufted loveseat with a gold-lettered monogram backdrop' },
    { num: '02', title: 'Engagement', desc: 'Backdrops and seating thrones for the announcement.', image: '/assets/stage-05.jpg', alt: 'Engagement seating thrones flanked by dense floral columns in blush and cream' },
    { num: '03', title: 'Mehndi & Henna Night', desc: 'Takht builds, carpets, canopies, brass and copper.', image: '/assets/mehndi-08.jpg', alt: 'Red and gold mehndi lounge with a scalloped arch backdrop, chandelier and chiavari chairs' },
    { num: '04', title: 'Walima & Reception', desc: 'Draping, uplighting, head tables, dance-floor treatments.', image: '/assets/ballroom-01.jpg', alt: 'Red rose arch over a white tufted settee with a gold monogram lit backdrop' },
    { num: '05', title: 'Baby Shower', desc: 'Arch panels, plinth clusters, a styled dessert spread.', image: '/assets/celebration-07.jpg', alt: 'Baby shower display with arch panels, plinth clusters and a pastel dessert spread' },
    { num: '06', title: 'Gender Reveal', desc: 'A backdrop and a moment built around the reveal.', image: '/assets/celebration-06.jpg', alt: 'Gender-reveal arch in dusty blue with a baby clothing rack and ceramic plinths' },
    { num: '07', title: 'Graduation', desc: 'Balloon garlands, a photo backdrop, a dessert table.', image: '/assets/celebration-01.jpg', alt: 'Graduation backdrop in navy and gold with a balloon garland and cap installation' },
    { num: '08', title: 'Birthday', desc: 'Themed backdrops, sized to the celebration and the age.', image: '/assets/celebration-04.jpg', alt: 'Backyard birthday party backdrop themed around a video game world, with a balloon arch' },
    { num: '09', title: 'Anniversary', desc: 'A room dressed up again for the milestone.', image: '/assets/ballroom-04.jpg', alt: 'Reception room with blossom-tree installation and hanging crystal strands' },
    { num: '10', title: 'Corporate & Private Events', desc: 'Draping and styling for private and company bookings.', image: '/assets/ballroom-09.jpg', alt: 'Wide ballroom view of a draped stage backdrop and chandelier-lit dining tables' },
    { num: '11', title: 'Grazing & Dessert Tables', desc: 'Charcuterie, mousse cups, khancha and samovar service.', image: '/assets/grazing-03.jpg', alt: 'Tiered dessert stand with mango mousse and biscoff cups beside a poolside table' },
    { num: '12', title: 'Something Else', desc: 'Got something specific in mind? Tell us on the form below.', image: '/assets/stage-08.jpg', alt: 'Arched niche backdrop with a copper vessel, framed portrait and dried floral arrangement' }
  ] satisfies Service[],

  // Curated preview shown on the homepage before "View All Our Work".
  galleryPreview: [
    'assets/stage-11.jpg', 'assets/mehndi-11.jpg', 'assets/amalfi-17.jpg', 'assets/ballroom-05.jpg',
    'assets/celebration-01.jpg', 'assets/grazing-03.jpg', 'assets/stage-04.jpg', 'assets/mehndi-04.jpg',
    'assets/ballroom-01.jpg', 'assets/amalfi-02.jpg', 'assets/celebration-07.jpg', 'assets/stage-09.jpg'
  ],

  // Full gallery manifest — authoritative source for the "View All" modal + lightbox captions.
  gallery: [
    { file: 'assets/stage-02.jpg', category: 'Nikkah & Engagement', alt: 'Blush and ivory floral arch framing a tufted white loveseat, crystal chandelier at centre' },
    { file: 'assets/stage-03.jpg', category: 'Nikkah & Engagement', alt: 'Nikkah stage with cascading rose garland and warm sconce lighting either side' },
    { file: 'assets/stage-04.jpg', category: 'Nikkah & Engagement', alt: 'Crimson and gold reception stage with a scalloped Moorish arch and chiffon drapery' },
    { file: 'assets/stage-05.jpg', category: 'Nikkah & Engagement', alt: 'Engagement seating thrones flanked by dense floral columns in blush and cream' },
    { file: 'assets/stage-06.jpg', category: 'Nikkah & Engagement', alt: 'Walima backdrop with calligraphy panel lit from below and trailing greenery' },
    { file: 'assets/stage-07.jpg', category: 'Nikkah & Engagement', alt: 'Nikkah stage detail: hanging glass orbs and ivory rose clusters against black drape' },
    { file: 'assets/stage-08.jpg', category: 'Nikkah & Engagement', alt: 'Arched niche backdrop with a copper vessel, framed portrait and dried floral arrangement' },
    { file: 'assets/stage-09.jpg', category: 'Nikkah & Engagement', alt: 'Blush stage corner with a velvet settee and a low arrangement of garden roses' },
    { file: 'assets/stage-10.jpg', category: 'Nikkah & Engagement', alt: 'Reception stage with mirrored panels and a monogrammed dance floor edge' },
    { file: 'assets/stage-11.jpg', category: 'Nikkah & Engagement', alt: 'Red rose arch over a white tufted loveseat with a gold-lettered monogram backdrop' },
    { file: 'assets/stage-12.jpg', category: 'Nikkah & Engagement', alt: 'Nikkah seating thrones under a floral canopy with warm string lighting' },
    { file: 'assets/stage-13.jpg', category: 'Nikkah & Engagement', alt: 'Blush and mauve rose wall above a cream sofa suite with round velvet pillows' },
    { file: 'assets/stage-14.jpg', category: 'Nikkah & Engagement', alt: 'Engagement backdrop with panelled wainscoting and a hanging crystal chandelier' },
    { file: 'assets/stage-15.jpg', category: 'Nikkah & Engagement', alt: 'Walima stage with a floral drop ceiling and chiavari chairs set for the head table' },
    { file: 'assets/stage-16.jpg', category: 'Nikkah & Engagement', alt: 'Nikkah stage detail: rose garland cascading over a gilt frame' },
    { file: 'assets/stage-17.jpg', category: 'Nikkah & Engagement', alt: 'Reception stage with a Moorish arch silhouette lit in warm gold' },
    { file: 'assets/mehndi-01.jpg', category: 'Mehndi', alt: 'Outdoor mehndi takht with a hand-knotted carpet backdrop and a hanging kilim canopy' },
    { file: 'assets/mehndi-02.jpg', category: 'Mehndi', alt: 'Mehndi seating nook with velvet bolsters and a brass tray of henna cones' },
    { file: 'assets/mehndi-03.jpg', category: 'Mehndi', alt: 'Takht platform edged in marigold garlands under string lighting' },
    { file: 'assets/mehndi-04.jpg', category: 'Mehndi', alt: 'Mehndi lounge in deep red and gold with a Moroccan-arch carpet backdrop and brass lanterns' },
    { file: 'assets/mehndi-05.jpg', category: 'Mehndi', alt: 'Jali screen backdrop with peacock-motif cushions on a carved white bench' },
    { file: 'assets/mehndi-06.jpg', category: 'Mehndi', alt: 'Mehndi stage detail: copper vessels and a hand-painted drum on a velvet-draped table' },
    { file: 'assets/mehndi-07.jpg', category: 'Mehndi', alt: 'Hanging carpet canopy over a low takht with red velvet cushions' },
    { file: 'assets/mehndi-08.jpg', category: 'Mehndi', alt: 'Red and gold mehndi lounge with a scalloped arch backdrop, chandelier and chiavari chairs' },
    { file: 'assets/mehndi-09.jpg', category: 'Mehndi', alt: 'Mehndi entrance dressed with marigold strings and brass urns' },
    { file: 'assets/mehndi-10.jpg', category: 'Mehndi', alt: 'Painted pedestal in saturated colour beside a jali screen and mixed floral arrangement' },
    { file: 'assets/mehndi-11.jpg', category: 'Mehndi', alt: 'Jewel-tone mehndi lounge with a peacock backdrop, carved bench and colour-block Roman pedestals' },
    { file: 'assets/mehndi-12.jpg', category: 'Mehndi', alt: 'Mehndi carpet-lined aisle with hanging lanterns and marigold garlands' },
    { file: 'assets/mehndi-13.jpg', category: 'Mehndi', alt: 'Takht seating with hand-knotted rugs layered underfoot and brass lanterns overhead' },
    { file: 'assets/mehndi-14.jpg', category: 'Mehndi', alt: 'Mehndi backdrop detail: velvet bolsters stacked beside a carved wooden side table' },
    { file: 'assets/mehndi-15.jpg', category: 'Mehndi', alt: 'Outdoor mehndi stage with a hanging carpet canopy and string lights overhead' },
    { file: 'assets/mehndi-16.jpg', category: 'Mehndi', alt: 'Painted pedestal cluster in saturated colour with mixed marigold and rose florals' },
    { file: 'assets/mehndi-17.jpg', category: 'Mehndi', alt: 'Mehndi lounge corner with brass vessels and a jali screen catching the evening light' },
    { file: 'assets/mehndi-18.jpg', category: 'Mehndi', alt: 'Takht platform with velvet bolsters and a peacock-motif cushion arrangement' },
    { file: 'assets/mehndi-19.jpg', category: 'Mehndi', alt: 'Mehndi backdrop with hand-knotted carpet panels and a brass chandelier' },
    { file: 'assets/mehndi-20.jpg', category: 'Mehndi', alt: 'Carved white bench styled with jewel-tone cushions against a floral jali screen' },
    { file: 'assets/ballroom-01.jpg', category: 'Receptions', alt: 'Red rose arch over a white tufted settee with a gold monogram lit backdrop' },
    { file: 'assets/ballroom-02.jpg', category: 'Receptions', alt: 'Ballroom head table with full drape backdrop and warm uplighting' },
    { file: 'assets/ballroom-03.jpg', category: 'Receptions', alt: 'Chiavari chairs dressed in pastel sashes lining a reception dance floor' },
    { file: 'assets/ballroom-04.jpg', category: 'Receptions', alt: 'Reception room with blossom-tree installation and hanging crystal strands' },
    { file: 'assets/ballroom-05.jpg', category: 'Receptions', alt: 'Butterfly-lit ballroom backdrop beside a row of chiavari chairs in mixed pastel sashes' },
    { file: 'assets/ballroom-06.jpg', category: 'Receptions', alt: 'Tented lawn reception with full drape walls and chandelier installation' },
    { file: 'assets/ballroom-07.jpg', category: 'Receptions', alt: 'Ballroom uplighting washing a draped wall behind a floral head table arrangement' },
    { file: 'assets/ballroom-08.jpg', category: 'Receptions', alt: 'Reception dance floor edge with a monogram projection and chiavari seating' },
    { file: 'assets/ballroom-09.jpg', category: 'Receptions', alt: 'Wide ballroom view of a draped stage backdrop and chandelier-lit dining tables' },
    { file: 'assets/ballroom-10.jpg', category: 'Receptions', alt: 'Head table styled with a low floral runner and gold chiavari chairs' },
    { file: 'assets/ballroom-11.jpg', category: 'Receptions', alt: 'Ballroom chandelier installation above a dressed dining table' },
    { file: 'assets/ballroom-12.jpg', category: 'Receptions', alt: 'Reception backdrop with cascading drape and a crystal-strand centrepiece' },
    { file: 'assets/ballroom-13.jpg', category: 'Receptions', alt: 'Tented lawn build with string lighting and full-length table draping' },
    { file: 'assets/ballroom-14.jpg', category: 'Receptions', alt: 'Ballroom stage with a blossom-tree pair flanking the head table' },
    { file: 'assets/ballroom-15.jpg', category: 'Receptions', alt: 'Reception hall dressed in full drape with warm uplighting along the walls' },
    { file: 'assets/ballroom-16.jpg', category: 'Receptions', alt: 'Dance floor detail with a monogram design and chiavari chair line-up' },
    { file: 'assets/celebration-01.jpg', category: 'Showers & Milestones', alt: 'Graduation backdrop in navy and gold with a balloon garland and cap installation' },
    { file: 'assets/celebration-02.jpg', category: 'Showers & Milestones', alt: 'Graduation centrepiece styled as a stack of book-shaped boxes with a cap and florals' },
    { file: 'assets/celebration-03.jpg', category: 'Showers & Milestones', alt: 'Graduation dessert table in navy and gold with tiered trays and fresh florals' },
    { file: 'assets/celebration-04.jpg', category: 'Showers & Milestones', alt: 'Backyard birthday party backdrop themed around a video game world, with a balloon arch' },
    { file: 'assets/celebration-06.jpg', category: 'Showers & Milestones', alt: 'Gender-reveal arch in dusty blue with a baby clothing rack and ceramic plinths' },
    { file: 'assets/celebration-07.jpg', category: 'Showers & Milestones', alt: 'Baby shower display with arch panels, plinth clusters and a pastel dessert spread' },
    { file: 'assets/grazing-01.jpg', category: 'Grazing Tables', alt: 'Centrepiece detail on a grazing table: jewel-tone florals in a brass lantern arrangement' },
    { file: 'assets/grazing-02.jpg', category: 'Grazing Tables', alt: 'Long grazing table spread with charcuterie, olives and fresh fruit' },
    { file: 'assets/grazing-03.jpg', category: 'Grazing Tables', alt: 'Tiered dessert stand with mango mousse and biscoff cups beside a poolside table' },
    { file: 'assets/grazing-04.jpg', category: 'Grazing Tables', alt: 'Charcuterie board detail with crackers, cheese and a hand-written menu tag' },
    { file: 'assets/grazing-05.jpg', category: 'Grazing Tables', alt: 'Dessert cup wall with mousse parfaits topped in fresh raspberries' },
    { file: 'assets/grazing-06.jpg', category: 'Grazing Tables', alt: 'Grazing table styled with brass trays and a mixed floral runner' },
    { file: 'assets/grazing-07.jpg', category: 'Grazing Tables', alt: 'Khancha-style tray service with dried fruit and nuts for a mehndi night' },
    { file: 'assets/grazing-08.jpg', category: 'Grazing Tables', alt: 'Dessert bar detail with labelled chalkboard signage and layered parfait cups' },
    { file: 'assets/amalfi-01.jpg', category: 'Garden Parties', alt: 'Garden party dessert table with lemon branches and blue-and-white ceramic risers' },
    { file: 'assets/amalfi-03.jpg', category: 'Garden Parties', alt: 'Poolside cocktail table dressed in blue linen with a lemon topiary centrepiece' },
    { file: 'assets/amalfi-05.jpg', category: 'Garden Parties', alt: 'Lemon-and-blue floral arrangement beside a tray of mousse cups at a garden party' },
    { file: 'assets/amalfi-08.jpg', category: 'Garden Parties', alt: 'Blue-and-white tiled plinth cluster styled with lemon branches and yellow florals' },
    { file: 'assets/amalfi-09.jpg', category: 'Garden Parties', alt: 'Fruit table detail: citrus, kiwi and pineapple in a woven basket beside painted tile boxes' },
    { file: 'assets/amalfi-10.jpg', category: 'Garden Parties', alt: 'Garden party seating dressed in blue linen beneath string lighting' },
    { file: 'assets/amalfi-11.jpg', category: 'Garden Parties', alt: 'Lemon tree in a cobalt planter beside a tiled dessert riser' },
    { file: 'assets/amalfi-12.jpg', category: 'Garden Parties', alt: 'Poolside lounge seating styled in blue and white for a garden party' },
    { file: 'assets/amalfi-14.jpg', category: 'Garden Parties', alt: 'Tiled entrance detail with trailing greenery and a cluster of lemon branches' },
    { file: 'assets/amalfi-15.jpg', category: 'Garden Parties', alt: 'Garden party bar cart styled with citrus and blue-and-white ceramics' },
    { file: 'assets/amalfi-16.jpg', category: 'Garden Parties', alt: 'Blue-and-white table runner detail beneath a lemon-branch centrepiece' },
    { file: 'assets/amalfi-17.jpg', category: 'Garden Parties', alt: 'Tiled entrance arch with a vintage bicycle and lemon trees' },
    { file: 'assets/amalfi-02.jpg', category: 'Garden Parties', alt: 'Lemon topiary tablescape with hand-painted blue-and-white tile pedestals' },
    { file: 'assets/amalfi-13.jpg', category: 'Garden Parties', alt: 'Long grazing table under a tent with cheese, crackers and hummus' },
    { file: 'assets/amalfi-07.jpg', category: 'Garden Parties', alt: 'Poolside dessert table with a fruit fountain and a glass vase of lemons' },
    { file: 'assets/amalfi-04.jpg', category: 'Garden Parties', alt: 'Hand-lettered chalkboard menu framed in lemon branches' }
  ] satisfies GalleryImage[],

  // Testimonials are optional — add real quotes here to bring the slider back
  // onto the page (it renders nothing while this array is empty).
  testimonials: [] satisfies Testimonial[],

  howWeWork: [
    {
      num: '01',
      title: 'The Conversation',
      desc: 'We ask about the date, the guest count, and what the room needs to hold. You send photos of the space if you have them.',
      image: '/assets/stage-14.jpg',
      alt: 'Engagement backdrop with panelled wainscoting and a hanging crystal chandelier'
    },
    {
      num: '02',
      title: 'The Design',
      desc: 'We build a moodboard from your answers and our own stock. You approve colours, florals and layout before we order anything.',
      image: '/assets/mehndi-16.jpg',
      alt: 'Painted pedestal cluster in saturated colour with mixed marigold and rose florals'
    },
    {
      num: '03',
      title: 'The Build',
      desc: 'We source, build and label everything ahead of time. Install starts as early as the venue allows, often before sunrise.',
      image: '/assets/ballroom-13.jpg',
      alt: 'Tented lawn build with string lighting and full-length table draping'
    },
    {
      num: '04',
      title: 'The Day',
      desc: 'We’re on site through the event and handle breakdown after. You don’t touch a single chair.',
      image: '/assets/stage-15.jpg',
      alt: 'Walima stage with a floral drop ceiling and chiavari chairs set for the head table'
    }
  ],

  booking: {
    eventTypes: [
      { value: 'Nikkah', label: 'Nikkah', image: '/assets/stage-11.jpg' },
      { value: 'Engagement', label: 'Engagement', image: '/assets/stage-05.jpg' },
      { value: 'Mehndi / Henna Night', label: 'Mehndi / Henna Night', image: '/assets/mehndi-11.jpg' },
      { value: 'Walima / Reception', label: 'Walima / Reception', image: '/assets/ballroom-01.jpg' },
      { value: 'Baby Shower', label: 'Baby Shower', image: '/assets/celebration-07.jpg' },
      { value: 'Gender Reveal', label: 'Gender Reveal', image: '/assets/celebration-06.jpg' },
      { value: 'Graduation', label: 'Graduation', image: '/assets/celebration-01.jpg' },
      { value: 'Birthday', label: 'Birthday', image: '/assets/celebration-04.jpg' },
      { value: 'Anniversary', label: 'Anniversary', image: '/assets/ballroom-04.jpg' },
      { value: 'Corporate / Private Event', label: 'Corporate / Private', image: '/assets/ballroom-09.jpg' },
      { value: 'Something else', label: 'Something else', image: '/assets/grazing-02.jpg' }
    ] satisfies SelectCardOption[],
    styles: [
      { value: 'Blush & Classic', label: 'Blush & Classic', image: '/assets/stage-13.jpg' },
      { value: 'Bold & Traditional', label: 'Bold & Traditional', image: '/assets/stage-04.jpg' },
      { value: 'Afghan Heritage', label: 'Afghan Heritage', image: '/assets/mehndi-04.jpg' },
      { value: 'Garden & Fresh', label: 'Garden & Fresh', image: '/assets/amalfi-17.jpg' },
      { value: 'Modern Minimal', label: 'Modern Minimal', image: '/assets/celebration-07.jpg' },
      { value: 'Colour & Celebration', label: 'Colour & Celebration', image: '/assets/mehndi-11.jpg' }
    ] satisfies SelectCardOption[],
    guestBands: ['Under 50', '50–100', '100–200', '200–350', '350+'],
    budgetOptions: [
      'Under $5,000',
      '$5,000-10,000',
      '$10,000-20,000',
      '$20,000-40,000',
      '$40,000+',
      "I'd like guidance on this",
      'Priceless — just give me the best'
    ],
    howFoundOptions: ['Instagram', 'Referral', 'Google', 'Been to an event', 'Other']
  },

  faq: [
    { q: 'How far in advance should we book?', a: 'Most clients reach out three to six months ahead, a little earlier if the date falls in spring or fall. If yours is closer than that, get in touch anyway. We’ll tell you plainly whether it works.' },
    { q: 'Do you travel outside Long Island?', a: 'We travel throughout New York City and beyond. Depending on the distance, travel and lodging get added to your quote, and we’ll always walk you through that cost upfront.' },
    { q: 'Do you handle setup and breakdown?', a: 'Every time. We arrive before your first guest does and stay until the last chair is packed away, so you won’t lift a finger on either end.' },
    { q: 'Is there a minimum spend?', a: 'It comes down to the size of your event and what you want styled. Share your date and guest count in the form below and we’ll come back with a real number, not a guess.' },
    { q: 'Can you work with our venue’s other vendors?', a: 'Always. We speak directly with your caterer, photographer and venue team ahead of time, so nothing gets missed on the day itself.' },
    { q: 'How does the design process run?', a: 'We open with a conversation, then build a moodboard around what you’ve told us. From there we handle sourcing, install and breakdown ourselves, and you sign off on everything before a single order goes out.' }
  ] satisfies FaqItem[]
};

export type SiteConfig = typeof siteConfig;
