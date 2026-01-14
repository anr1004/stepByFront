interface IBrandProductOverview {
  id: string;
  mainImageUrl: string;
  name: string;
  price: number;
  discountPrice?: number;
}

interface IBrand {
  id: string;
  name: string;
  logoUrl: string;
  bestProductIds: string[];
}
