export interface Drop {
  id: number
  title: string
  artist: string
  album: string
  image: string
  currentBid: string
  endsIn: { h: number; m: number; s: number }
  edition: string
  live: boolean
}

export interface UpcomingDrop {
  id: number
  title: string
  artist: string
  image: string
  dropsIn: string
  daysAway: number
  edition: string
}

export interface Artist {
  id: number
  name: string
  genre: string
  pieces: number
  sales: string
  avatar: string
}

export const LIVE_DROPS: Drop[] = [
  { id: 1, title: 'Invisible Cities', artist: 'SOLIS', album: 'Meridian', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&q=90', currentBid: '520,000', endsIn: { h: 3, m: 41, s: 22 }, edition: '1 of 1', live: true },
  { id: 2, title: 'Still Water', artist: 'Amara', album: 'Periphery', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=90', currentBid: '185,000', endsIn: { h: 7, m: 14, s: 55 }, edition: '1 of 1', live: true },
  { id: 3, title: 'Drift', artist: 'Kenn Ola', album: 'The Long Way', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=90', currentBid: '74,000', endsIn: { h: 14, m: 2, s: 8 }, edition: 'Ed. 2 / 5', live: true },
]

export const UPCOMING_DROPS: UpcomingDrop[] = [
  { id: 4, title: 'Afterglow', artist: 'SOLIS', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=90', dropsIn: '2 days', daysAway: 2, edition: '1 of 1' },
  { id: 5, title: 'Far Field', artist: 'Dessa M.', image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&q=90', dropsIn: '4 days', daysAway: 4, edition: 'Ed. 1 / 10' },
  { id: 6, title: 'Blue Noise', artist: 'Remi Arc', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=90', dropsIn: '6 days', daysAway: 6, edition: '1 of 1' },
  { id: 7, title: 'Topology', artist: 'NEON', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=90', dropsIn: '9 days', daysAway: 9, edition: 'Ed. 1 / 3' },
]

export const FEATURED_ARTISTS: Artist[] = [
  { id: 1, name: 'SOLIS', genre: 'Alternative R&B', pieces: 14, sales: '4.2M', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=500&q=90' },
  { id: 2, name: 'Amara', genre: 'Soul / Neo-folk', pieces: 9, sales: '2.8M', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&q=90' },
  { id: 3, name: 'Kenn Ola', genre: 'Afropiano', pieces: 22, sales: '6.1M', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=90' },
]

export const TICKER_ITEMS: string[] = [
  'Invisible Cities  Live Now  520K',
  'Still Water  Bidding Open',
  'Afterglow  Dropping in 2 Days',
  'COVR  Own the Art Behind the Music',
  'Blue Noise  Dropping in 6 Days',
  'Drift  Live Now  74K',
]
