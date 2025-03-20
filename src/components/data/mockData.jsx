// Mock data
const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1470&auto=format&fit=crop',
    subcategories: [
      { id: 'smartphones', name: 'Smartphones' },
      { id: 'laptops', name: 'Laptops' },
      { id: 'accessories', name: 'Accessories' }
    ]
  },
  {
    id: 'clothing',
    name: 'Clothing',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1470&auto=format&fit=crop',
    subcategories: [
      { id: 'men', name: 'Men' },
      { id: 'women', name: 'Women' },
      { id: 'kids', name: 'Kids' }
    ]
  },
  {
    id: 'home',
    name: 'Home & Kitchen',
    image: 'https://images.unsplash.com/photo-1556911220-bda9f7f37446?q=80&w=1470&auto=format&fit=crop',
    subcategories: [
      { id: 'furniture', name: 'Furniture' },
      { id: 'decor', name: 'Decor' },
      { id: 'appliances', name: 'Appliances' }
    ]
  },
  {
    id: 'beauty',
    name: 'Beauty & Personal Care',
    image: 'https://images.unsplash.com/photo-1585435557343-12378c09a832?q=80&w=1470&auto=format&fit=crop',
    subcategories: [
      { id: 'skincare', name: 'Skincare' },
      { id: 'haircare', name: 'Haircare' },
      { id: 'makeup', name: 'Makeup' }
    ]
  },
  {
    id: 'sports',
    name: 'Sports & Outdoors',
    image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=1470&auto=format&fit=crop',
    subcategories: [
      { id: 'fitness', name: 'Fitness' },
      { id: 'cycling', name: 'Cycling' },
      { id: 'camping', name: 'Camping' }
    ]
  },
  {
    id: 'automotive',
    name: 'Automotive',
    image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?q=80&w=1470&auto=format&fit=crop',
    subcategories: [
      { id: 'car-accessories', name: 'Car Accessories' },
      { id: 'motorcycles', name: 'Motorcycles' },
      { id: 'tools', name: 'Tools & Equipment' }
    ]
  },
  {
    id: 'toys',
    name: 'Toys & Games',
    image: 'https://images.unsplash.com/photo-1519748771502-59dea1cf29e2?q=80&w=1470&auto=format&fit=crop',
    subcategories: [
      { id: 'educational', name: 'Educational' },
      { id: 'board-games', name: 'Board Games' },
      { id: 'outdoor', name: 'Outdoor Play' }
    ]
  },
  {
    id: 'grocery',
    name: 'Grocery',
    image: 'https://images.unsplash.com/photo-1607925925324-019a9c68c56b?q=80&w=1470&auto=format&fit=crop',
    subcategories: [
      { id: 'vegetables', name: 'Vegetables' },
      { id: 'fruits', name: 'Fruits' },
      { id: 'beverages', name: 'Beverages' }
    ]
  },
  {
    id: 'books',
    name: 'Books & Stationery',
    image: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?q=80&w=1470&auto=format&fit=crop',
    subcategories: [
      { id: 'fiction', name: 'Fiction' },
      { id: 'non-fiction', name: 'Non-Fiction' },
      { id: 'stationery', name: 'Stationery' }
    ]
  },
  {
    id: 'health',
    name: 'Health & Wellness',
    image: 'https://images.unsplash.com/photo-1603398938378-9a414309b364?q=80&w=1470&auto=format&fit=crop',
    subcategories: [
      { id: 'vitamins', name: 'Vitamins' },
      { id: 'supplements', name: 'Supplements' },
      { id: 'medical-supplies', name: 'Medical Supplies' }
    ]
  }
];
  
  const products = [
    {
      id: 'phone1',
      name: 'Ultimate Smartphone',
      description: 'The latest smartphone with cutting-edge features. This device comes with a high-resolution display, powerful processor, and all-day battery life. Perfect for productivity and entertainment.',
      price: 899.99,
      images: [
        'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=1529&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1527&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1530&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1605236453806-6ff36851218e?q=80&w=1374&auto=format&fit=crop'
      ],
      categoryId: 'electronics',
      subcategoryId: 'smartphones',
      featured: true
    },
    {
      id: 'laptop1',
      name: 'Pro Laptop',
      description: 'Powerful laptop for professionals. Features a fast processor, ample storage, and a brilliant display. Designed for multitasking and creative work.',
      price: 1299.99,
      images: [
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1471&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1420&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=1470&auto=format&fit=crop'
      ],
      categoryId: 'electronics',
      subcategoryId: 'laptops',
      featured: true
    },
    {
      id: 'headphones1',
      name: 'Wireless Headphones',
      description: 'Premium noise-cancelling headphones with incredible sound quality. Experience music like never before with deep bass and crystal-clear highs.',
      price: 249.99,
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1470&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=1470&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1578319439584-104c94d37305?q=80&w=1470&auto=format&fit=crop'
      ],
      categoryId: 'electronics',
      subcategoryId: 'accessories'
    },
    {
      id: 'tshirt1',
      name: 'Classic T-Shirt',
      description: 'High-quality cotton t-shirt with a comfortable fit. Perfect for everyday wear. Available in multiple colors and sizes.',
      price: 24.99,
      images: [
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1480&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=1470&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1374&auto=format&fit=crop'
      ],
      categoryId: 'clothing',
      subcategoryId: 'men'
    },
    {
      id: 'dress1',
      name: 'Summer Dress',
      description: 'Light and elegant summer dress made from breathable fabric. Perfect for warm days and special occasions.',
      price: 59.99,
      images: [
        'https://images.unsplash.com/photo-1612336307429-8a898d10e223?q=80&w=1470&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1542295669297-4d352b042bca?q=80&w=1374&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1578982749274-df8e97b53e13?q=80&w=1374&auto=format&fit=crop'
      ],
      categoryId: 'clothing',
      subcategoryId: 'women',
      featured: true
    },
    {
      id: 'sofa1',
      name: 'Modern Sofa',
      description: 'Stylish and comfortable sofa for your living room. Features durable upholstery and solid wood frame. Available in multiple colors.',
      price: 899.99,
      images: [
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1470&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1470&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?q=80&w=1609&auto=format&fit=crop'
      ],
      categoryId: 'home',
      subcategoryId: 'furniture',
      featured: true
    },
    {
      id: 'lamp1',
      name: 'Designer Table Lamp',
      description: 'Elegant table lamp with modern design. Perfect for bedside tables, living rooms, or offices. Energy-efficient LED bulb included.',
      price: 79.99,
      images: [
        'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1374&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1374&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1470&auto=format&fit=crop'
      ],
      categoryId: 'home',
      subcategoryId: 'decor'
    }
  ];
  
  // Data management functions
  export const initializeData = () => {
    if (!localStorage.getItem('categories')) {
      localStorage.setItem('categories', JSON.stringify(categories));
    }
    
    if (!localStorage.getItem('products')) {
      localStorage.setItem('products', JSON.stringify(products));
    }
  };
  
  export const getCategories = () => {
    const data = categories;
    return data ? data : [];
  };
  
  export const getCategory = (id) => {
    const categories = getCategories();
    return categories.find(category => category.id === id);
  };
  
  export const getSubcategory = (categoryId, subcategoryId) => {
    const category = getCategory(categoryId);
    return category?.subcategories.find(sub => sub.id === subcategoryId);
  };
  
  export const getProducts = () => {
    const data = products;
    return data ? data: [];
  };
  
  export const getProduct = (id) => {
    const products = getProducts();
    return products.find(product => product.id === id);
  };
  
  export const getProductsByCategory = (categoryId) => {
    const products = getProducts();
    return products.filter(product => product.categoryId === categoryId);
  };
  
  export const getProductsBySubcategory = (categoryId, subcategoryId) => {
    const products = getProducts();
    return products.filter(
      product => product.categoryId === categoryId && product.subcategoryId === subcategoryId
    );
  };
  
  export const getFeaturedProducts = () => {
    const products = getProducts();
    console.log("getFeaturedProducts",products)
    return products.filter(product => product.featured);
  };
  