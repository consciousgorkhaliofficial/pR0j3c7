export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  fruit: string;
  alcohol_percentage: number;
  volume_ml: number;
  in_stock: boolean;
  featured: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Royal Plum Reserve',
    description: 'A rich, full-bodied fruit wine crafted from handpicked Nepali plums. Deep ruby color with notes of dark fruit and a velvety smooth finish. Aged in oak for 12 months.',
    price: 1200,
    category: 'red',
    image_url: '/images/plum-wine.jpg',
    fruit: 'Plum',
    alcohol_percentage: 12.5,
    volume_ml: 750,
    in_stock: true,
    featured: true,
  },
  {
    id: '2',
    name: 'Golden Apple Bliss',
    description: 'A crisp, refreshing wine made from golden apples of Mustang. Light straw color with bright acidity and hints of honey and citrus.',
    price: 950,
    category: 'white',
    image_url: '/images/apple-wine.jpg',
    fruit: 'Apple',
    alcohol_percentage: 10.0,
    volume_ml: 750,
    in_stock: true,
    featured: true,
  },
  {
    id: '3',
    name: 'Wild Berry Symphony',
    description: 'An enchanting blend of wild Himalayan berries. Bursting with vibrant berry flavors, gentle tannins, and a lingering sweet-tart finish.',
    price: 1500,
    category: 'red',
    image_url: '/images/berry-wine.jpg',
    fruit: 'Mixed Berries',
    alcohol_percentage: 13.0,
    volume_ml: 750,
    in_stock: true,
    featured: true,
  },
  {
    id: '4',
    name: 'Himalayan Peach Nectar',
    description: 'Delicate and aromatic, this peach wine captures the essence of sun-ripened Nepali peaches. Floral nose with a lusciously sweet palate.',
    price: 1100,
    category: 'rosé',
    image_url: '/images/peach-wine.jpg',
    fruit: 'Peach',
    alcohol_percentage: 9.5,
    volume_ml: 750,
    in_stock: true,
    featured: false,
  },
  {
    id: '5',
    name: 'Royal Mango Sunset',
    description: 'A tropical delight made from premium Nepali mangoes. Rich golden hue with exotic tropical flavors and a smooth, sweet finish.',
    price: 1300,
    category: 'white',
    image_url: '/images/mango-wine.jpg',
    fruit: 'Mango',
    alcohol_percentage: 11.0,
    volume_ml: 750,
    in_stock: true,
    featured: false,
  },
  {
    id: '6',
    name: 'Rhododendron Rouge',
    description: 'A uniquely Nepali wine crafted from rhododendron flowers. Floral and earthy with a beautiful crimson color and delicate sweetness.',
    price: 1800,
    category: 'red',
    image_url: '/images/rhodo-wine.jpg',
    fruit: 'Rhododendron',
    alcohol_percentage: 14.0,
    volume_ml: 750,
    in_stock: true,
    featured: true,
  },
  {
    id: '7',
    name: 'Lychee Garden',
    description: 'An elegant wine from fresh Nepali lychees. Crystal clear with perfumed aromas, juicy sweetness, and a clean refreshing finish.',
    price: 1050,
    category: 'white',
    image_url: '/images/lychee-wine.jpg',
    fruit: 'Lychee',
    alcohol_percentage: 10.5,
    volume_ml: 750,
    in_stock: true,
    featured: false,
  },
  {
    id: '8',
    name: 'Passion Fruit Elixir',
    description: 'Bold and exotic, this passion fruit wine delivers intense tropical flavors with bright acidity and an unforgettable aromatic profile.',
    price: 1400,
    category: 'rosé',
    image_url: '/images/passion-wine.jpg',
    fruit: 'Passion Fruit',
    alcohol_percentage: 12.0,
    volume_ml: 750,
    in_stock: true,
    featured: false,
  },
];

export const categories = [
  { value: 'all', label: 'All Wines' },
  { value: 'red', label: 'Red Wines' },
  { value: 'white', label: 'White Wines' },
  { value: 'rosé', label: 'Rosé Wines' },
];
