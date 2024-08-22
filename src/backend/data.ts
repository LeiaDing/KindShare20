// src/backend/data.ts

export type Product = {
    name: string;
    price: number;
    description: string;
    ratings: number;
    images: {
      public_id: string;
      url: string;
    }[];
    category: string;
    seller: string;
    stock: number;
    numOfReviews: number;
    reviews: any[];
  };
  
  let products: Product[] = [];
  
  const newProducts: Product[] = [
    {
      name: "SanDisk Ultra 128GB SDXC UHS-I Memory Card up to 80MB/s",
      price: 45.89,
      description: "Ultra-fast cards (2) to take better pictures and Full HD videos...",
      ratings: 4.5,
      images: [
        {
          public_id: "shopit/demo/nkkjkta63uiazppzkmjf",
          url: "http://res.cloudinary.com/udemy-courses/image/upload/v1698577488/shopit/demo/nkkjkta63uiazppzkmjf.jpg",
        },
      ],
      category: "Electronics",
      seller: "Ebay",
      stock: 50,
      numOfReviews: 32,
      reviews: [],
    },
    // 其他产品数据
  ];
  
  products.push(...newProducts);
  
  export function getProducts(): Product[] {
    return products;
  }
  
  export function initializeProducts(): void {
    products.push(...newProducts);
  }
  