interface MenuItem {
  id: string;
  name: string;
  link: string;
}

interface SubCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

interface MainCategory {
  id: string;
  name: string;
  link: string;
  subCategories?: SubCategory[];
}
