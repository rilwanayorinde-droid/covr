export interface Drop {
  id: number
  title: string
  artist: string
  album: string
  image: string
  currentBid: string
  topBidder: string
  endsIn: { h: number; m: number; s: number }
  edition: string
  live: boolean
  bids: number
  genre: string
  artistType: 'independent' | 'label'
  reservePrice: string
  spotifyUrl?: string
  story: string
}

export interface UpcomingDrop {
  id: number
  title: string
  artist: string
  image: string
  dropsIn: string
  daysAway: number
  edition: string
  genre: string
  artistType: 'independent' | 'label'
  releaseDate: string
}

export interface Artist {
  id: number
  name: string
  genre: string
  pieces: number
  sales: string
  avatar: string
  verified: boolean
  artistType: 'independent' | 'label'
  followers: string
  monthlyListeners: string
  bio: string
  instagram: string
  drops: number
}

export interface Collector {
  id: number
  name: string
  avatar: string
  totalSpent: string
  pieces: number
  rank: number
}

export const LIVE_DROPS: Drop[] = [
  { id: 1, title: 'Invisible Cities', artist: 'SOLIS', album: 'Meridian', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&q=90', currentBid: '₦520,000', topBidder: 'collector_44', endsIn: { h: 3, m: 41, s: 22 }, edition: '1 of 1', live: true, bids: 14, genre: 'Alternative R&B', artistType: 'independent', reservePrice: '₦200,000', spotifyUrl: 'https://spotify.com', story: 'Created over three sleepless nights during a power outage in Lagos. The darkness became the palette.' },
  { id: 2, title: 'Still Water', artist: 'Amara', album: 'Periphery', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=90', currentBid: '₦185,000', topBidder: 'dr_yusuf', endsIn: { h: 7, m: 14, s: 55 }, edition: '1 of 1', live: true, bids: 6, genre: 'Soul', artistType: 'independent', reservePrice: '₦80,000', story: 'Painted on a single A2 sheet using only three colours. The restriction became the freedom.' },
  { id: 3, title: 'Drift', artist: 'Kenn Ola', album: 'The Long Way', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=90', currentBid: '₦74,000', topBidder: 'music_collector_1', endsIn: { h: 14, m: 2, s: 8 }, edition: 'Ed. 2 / 5', live: true, bids: 3, genre: 'Afropiano', artistType: 'label', reservePrice: '₦40,000', story: 'A collaboration between the artist and a photographer in Accra. Shot at 5am during golden hour.' },
]

export const UPCOMING_DROPS: UpcomingDrop[] = [
  { id: 4, title: 'Afterglow', artist: 'SOLIS', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=90', dropsIn: '2 days', daysAway: 2, edition: '1 of 1', genre: 'Alternative R&B', artistType: 'independent', releaseDate: 'May 1, 2025' },
  { id: 5, title: 'Far Field', artist: 'Dessa M.', image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&q=90', dropsIn: '4 days', daysAway: 4, edition: 'Ed. 1 / 10', genre: 'Neo-soul', artistType: 'independent', releaseDate: 'May 3, 2025' },
  { id: 6, title: 'Blue Noise', artist: 'Remi Arc', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=90', dropsIn: '6 days', daysAway: 6, edition: '1 of 1', genre: 'Electronic', artistType: 'label', releaseDate: 'May 5, 2025' },
  { id: 7, title: 'Topology', artist: 'NEON', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=90', dropsIn: '9 days', daysAway: 9, edition: 'Ed. 1 / 3', genre: 'Amapiano', artistType: 'independent', releaseDate: 'May 8, 2025' },
]

export const FEATURED_ARTISTS: Artist[] = [
  { id: 1, name: 'SOLIS', genre: 'Alternative R&B', pieces: 14, sales: '₦4.2M', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=500&q=90', verified: true, artistType: 'independent', followers: '124K', monthlyListeners: '340K', bio: 'Lagos-born, London-raised. SOLIS creates at the intersection of Afrobeats and experimental R&B. Known for deeply personal cover art that mirrors the emotional weight of each release.', instagram: '@solis_music', drops: 14 },
  { id: 2, name: 'Amara', genre: 'Soul / Neo-folk', pieces: 9, sales: '₦2.8M', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&q=90', verified: true, artistType: 'independent', followers: '89K', monthlyListeners: '210K', bio: 'Amara blends acoustic soul with spoken word traditions from the Niger Delta. Every cover is hand-painted, making each piece a genuine original.', instagram: '@amara.sings', drops: 9 },
  { id: 3, name: 'Kenn Ola', genre: 'Afropiano', pieces: 22, sales: '₦6.1M', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=90', verified: true, artistType: 'label', followers: '280K', monthlyListeners: '890K', bio: 'One of Afropiano\'s most consistent voices. Kenn Ola\'s artwork is produced in collaboration with emerging visual artists across West Africa, giving collectors a piece of two careers at once.', instagram: '@kennola', drops: 22 },
]

export const TOP_COLLECTORS: Collector[] = [
  { id: 1, name: 'Dr Yusuf', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80', totalSpent: '₦2.4M', pieces: 8, rank: 1 },
  { id: 2, name: 'Adaeze C.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80', totalSpent: '₦1.9M', pieces: 6, rank: 2 },
  { id: 3, name: 'Tunde B.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80', totalSpent: '₦1.2M', pieces: 5, rank: 3 },
  { id: 4, name: 'music_collector_1', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80', totalSpent: '₦880K', pieces: 4, rank: 4 },
  { id: 5, name: 'collector_44', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80', totalSpent: '₦640K', pieces: 3, rank: 5 },
]

export const TICKER_ITEMS: string[] = [
  'Invisible Cities — Live Now — ₦520K',
  'Still Water — Bidding Open — 6 bids',
  'Afterglow — Dropping in 2 Days',
  'COVR — Own the Art Behind the Music',
  'Blue Noise — Dropping in 6 Days',
  'Drift — Live Now — ₦74K',
  '1,284 Collectors — ₦47M+ in Artwork Sold',
]

export const PAST_DROPS = [
  { id: 101, title: 'Neon Residue', artist: 'SOLIS', image: 'https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?w=600&q=80', soldFor: '₦640,000', edition: '1 of 1', date: 'Apr 10, 2025', buyer: 'Dr Yusuf' },
  { id: 102, title: 'Coastal Static', artist: 'Amara', image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=600&q=80', soldFor: '₦210,000', edition: 'Ed. 1/5', date: 'Apr 3, 2025', buyer: 'Adaeze C.' },
  { id: 103, title: 'Pale Signal', artist: 'Kenn Ola', image: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=600&q=80', soldFor: '₦88,000', edition: '1 of 1', date: 'Mar 28, 2025', buyer: 'Tunde B.' },
]