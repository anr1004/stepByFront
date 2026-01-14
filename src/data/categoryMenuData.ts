const categoryMenuData: MainCategory[] = [
  {
    id: "sneakers",
    name: "스니커즈",
    link: "/products?category=sneakers",
    subCategories: [
      {
        id: "sneakers_all",
        name: "스니커즈",
        items: [
          {
            id: "sneakers_low",
            name: "로우",
            link: "/products?category=sneakers&type=low",
          },
          {
            id: "sneakers_mid_hi",
            name: "미드/하이",
            link: "/products?category=sneakers&type=mid-hi",
          },
          {
            id: "sneakers_velcro",
            name: "벨크로",
            link: "/products?category=sneakers&type=velcro",
          },
        ],
      },
      {
        id: "leather",
        name: "천연/합성가죽",
        items: [
          {
            id: "leather_german",
            name: "독일군",
            link: "/products?category=sneakers&type=german",
          },
          {
            id: "leather_low",
            name: "로우",
            link: "/products?category=sneakers&type=low",
          },
          {
            id: "leather_velcro",
            name: "벨크로",
            link: "/products?category=sneakers&type=velcro",
          },
          {
            id: "leather_suede",
            name: "스웨이드",
            link: "/products?category=sneakers&type=suede",
          },
          {
            id: "leather_platform",
            name: "플랫폼",
            link: "/products?category=sneakers&type=platform",
          },
          {
            id: "leather_high",
            name: "하이",
            link: "/products?category=sneakers&type=high",
          },
        ],
      },
      {
        id: "ugly_shoes",
        name: "어글리슈즈",
        items: [
          {
            id: "ugly_main",
            name: "어글리슈즈",
            link: "/products?category=sneakers&type=ugly",
          },
        ],
      },
      {
        id: "slip_on",
        name: "슬립온",
        items: [
          {
            id: "slipon_leather",
            name: "가죽",
            link: "/products?category=sneakers&type=slipon_leather",
          },
          {
            id: "slipon_main",
            name: "슬립온",
            link: "/products?category=sneakers&type=slipon",
          },
        ],
      },
      {
        id: "mules",
        name: "뮬",
        items: [
          {
            id: "mules_canvas",
            name: "캔버스",
            link: "/products?category=sneakers&type=mules_canvas",
          },
          {
            id: "mules_synthetic_leather",
            name: "합성/가죽",
            link: "/products?category=sneakers&type=mules_synthetic_leather",
          },
        ],
      },
    ],
  },
  {
    id: "sports",
    name: "스포츠",
    link: "/products?category=sports",
    subCategories: [
      {
        id: "daily_walking",
        name: "데일리/워킹",
        items: [
          {
            id: "daily_walking_casual",
            name: "캐주얼",
            link: "/products?category=sports&type=casual",
          },
          {
            id: "daily_walking_walking",
            name: "워킹화",
            link: "/products?category=sports&type=walking",
          },
        ],
      },
      {
        id: "running",
        name: "러닝",
        items: [
          {
            id: "running_entry",
            name: "입문화",
            link: "/products?category=sports&type=running_entry",
          },
          {
            id: "running_cushion",
            name: "쿠션화",
            link: "/products?category=sports&type=running_cushion",
          },
          {
            id: "running_stable",
            name: "안정화",
            link: "/products?category=sports&type=running_stable",
          },
          {
            id: "running_trainer",
            name: "트레이너",
            link: "/products?category=sports&type=running_trainer",
          },
          {
            id: "running_trail",
            name: "트레일러닝",
            link: "/products?category=sports&type=running_trail",
          },
        ],
      },
      {
        id: "pro_sports",
        name: "전문스포츠",
        items: [
          {
            id: "pro_sports_hiking",
            name: "등산/트레킹화",
            link: "/products?category=sports&type=hiking",
          },
          {
            id: "pro_sports_soccer",
            name: "축구화",
            link: "/products?category=sports&type=soccer",
          },
          {
            id: "pro_sports_golf",
            name: "골프화",
            link: "/products?category=sports&type=golf",
          },
          {
            id: "pro_sports_indoor",
            name: "인도어화",
            link: "/products?category=sports&type=indoor",
          },
          {
            id: "pro_sports_crossfit",
            name: "크로스핏화",
            link: "/products?category=sports&type=crossfit",
          },
        ],
      },
      {
        id: "work_kitchen",
        name: "작업화/주방화",
        items: [
          {
            id: "work_kitchen_safety",
            name: "안전화",
            link: "/products?category=sports&type=safety",
          },
          {
            id: "work_kitchen_kitchen",
            name: "주방화",
            link: "/products?category=sports&type=kitchen",
          },
          {
            id: "work_kitchen_nurse",
            name: "간호화",
            link: "/products?category=sports&type=nurse",
          },
        ],
      },
    ],
  },
  {
    id: "boots",
    name: "부츠",
    link: "/products?category=boots",
    subCategories: [
      {
        id: "fur_boots",
        name: "털부츠",
        items: [
          {
            id: "fur_boots_main",
            name: "털부츠",
            link: "/products?category=boots&type=fur",
          },
        ],
      },
      {
        id: "padding_boots",
        name: "패딩부츠",
        items: [
          {
            id: "padding_boots_low",
            name: "로우",
            link: "/products?category=boots&type=padding_low",
          },
          {
            id: "padding_boots_high",
            name: "하이",
            link: "/products?category=boots&type=padding_high",
          },
        ],
      },
      {
        id: "rain_boots",
        name: "레인부츠",
        items: [
          {
            id: "rain_boots_main",
            name: "레인부츠",
            link: "/products?category=boots&type=rain",
          },
        ],
      },
      {
        id: "chelsea_boots",
        name: "첼시부츠",
        items: [
          {
            id: "chelsea_boots_main",
            name: "첼시부츠",
            link: "/products?category=boots&type=chelsea",
          },
        ],
      },
    ],
  },
  {
    id: "sandals",
    name: "샌들/슬리퍼",
    link: "/products?category=sandals",
    subCategories: [
      {
        id: "winter_products",
        name: "겨울상품",
        items: [
          {
            id: "winter_sandals",
            name: "방한샌들",
            link: "/products?category=sandals&type=winter_sandals",
          },
          {
            id: "winter_slippers",
            name: "방한슬리퍼",
            link: "/products?category=sandals&type=winter_slippers",
          },
        ],
      },
      {
        id: "sandals_main",
        name: "샌들",
        items: [
          {
            id: "sandals_sports",
            name: "스포츠",
            link: "/products?category=sandals&type=sports",
          },
          {
            id: "sandals_men_leather",
            name: "남성가죽",
            link: "/products?category=sandals&type=men_leather",
          },
          {
            id: "sandals_women_strap",
            name: "여성스트랩",
            link: "/products?category=sandals&type=women_strap",
          },
          {
            id: "sandals_platform",
            name: "플랫폼",
            link: "/products?category=sandals&type=platform",
          },
          {
            id: "sandals_mules",
            name: "샌들뮬",
            link: "/products?category=sandals&type=mules",
          },
          {
            id: "sandals_heels",
            name: "샌들힐",
            link: "/products?category=sandals&type=heels",
          },
        ],
      },
      {
        id: "slippers",
        name: "슬리퍼",
        items: [
          {
            id: "slippers_main",
            name: "슬리퍼",
            link: "/products?category=slippers&type=slippers",
          },
          {
            id: "slippers_leather",
            name: "가죽",
            link: "/products?category=slippers&type=leather",
          },
          {
            id: "slippers_flipflop",
            name: "플립플랍",
            link: "/products?category=slippers&type=flipflop",
          },
          {
            id: "slippers_character",
            name: "캐릭터",
            link: "/products?category=slippers&type=character",
          },
          {
            id: "slippers_indoor",
            name: "실내화",
            link: "/products?category=slippers&type=indoor",
          },
          {
            id: "slippers_platform",
            name: "플랫폼",
            link: "/products?category=slippers&type=platform",
          },
        ],
      },
      {
        id: "aqua_shoes",
        name: "아쿠아슈즈",
        items: [
          {
            id: "aqua_shoes_main",
            name: "아쿠아슈즈",
            link: "/products?category=sandals&type=aqua",
          },
        ],
      },
    ],
  },
  {
    id: "dress_shoes",
    name: "구두",
    link: "/products?category=dress_shoes",
    subCategories: [
      {
        id: "women_dress_shoes",
        name: "여성",
        items: [
          {
            id: "women_dress_shoes_flat",
            name: "플랫",
            link: "/products?category=dress_shoes&gender=women&type=flat",
          },
          {
            id: "women_dress_shoes_loafer",
            name: "로퍼",
            link: "/products?category=dress_shoes&gender=women&type=loafer",
          },
          {
            id: "women_dress_shoes_mules_bloafer",
            name: "뮬/블로퍼",
            link: "/products?category=dress_shoes&gender=women&type=mules_bloafer",
          },
          {
            id: "women_dress_shoes_boots_walker",
            name: "부츠/워커",
            link: "/products?category=dress_shoes&gender=women&type=boots_walker",
          },
          {
            id: "women_dress_shoes_stiletto",
            name: "스틸레토",
            link: "/products?category=dress_shoes&gender=women&type=stiletto",
          },
          {
            id: "women_dress_shoes_pumps",
            name: "펌프스",
            link: "/products?category=dress_shoes&gender=women&type=pumps",
          },
          {
            id: "women_dress_shoes_maryjane",
            name: "메리제인",
            link: "/products?category=dress_shoes&gender=women&type=maryjane",
          },
          {
            id: "women_dress_shoes_slingback",
            name: "슬링백",
            link: "/products?category=dress_shoes&gender=women&type=slingback",
          },
        ],
      },
      {
        id: "men_dress_shoes",
        name: "남성",
        items: [
          {
            id: "men_dress_shoes_derby",
            name: "더비",
            link: "/products?category=dress_shoes&gender=men&type=derby",
          },
          {
            id: "men_dress_shoes_loafer",
            name: "로퍼",
            link: "/products?category=dress_shoes&gender=men&type=loafer",
          },
          {
            id: "men_dress_shoes_mules_bloafer",
            name: "뮬/블로퍼",
            link: "/products?category=dress_shoes&gender=men&type=mules_bloafer",
          },
          {
            id: "men_dress_shoes_boots_walker",
            name: "부츠/워커",
            link: "/products?category=dress_shoes&gender=men&type=boots_walker",
          },
          {
            id: "men_dress_shoes_comfort",
            name: "컴포트",
            link: "/products?category=dress_shoes&gender=men&type=comfort",
          },
        ],
      },
    ],
  },
  {
    id: "kids",
    name: "키즈",
    link: "/products?category=kids",
    subCategories: [
      {
        id: "kids_sneakers",
        name: "스니커즈",
        items: [
          {
            id: "kids_sneakers_basic",
            name: "기본형",
            link: "/products?category=kids&type=sneakers_basic",
          },
          {
            id: "kids_sneakers_light",
            name: "라이트",
            link: "/products?category=kids&type=sneakers_light",
          },
          {
            id: "kids_sneakers_velcro",
            name: "벨크로",
            link: "/products?category=kids&type=sneakers_velcro",
          },
          {
            id: "kids_sneakers_integral",
            name: "일체형",
            link: "/products?category=kids&type=sneakers_integral",
          },
        ],
      },
      {
        id: "kids_sports",
        name: "스포츠",
        items: [
          {
            id: "kids_sports_light",
            name: "라이트",
            link: "/products?category=kids&type=sports_light",
          },
          {
            id: "kids_sports_integral_velcro",
            name: "일체형/벨크로",
            link: "/products?category=kids&type=sports_integral_velcro",
          },
          {
            id: "kids_sports_character",
            name: "캐릭터",
            link: "/products?category=kids&type=sports_character",
          },
          {
            id: "kids_sports_basic",
            name: "기본형",
            link: "/products?category=kids&type=sports_basic",
          },
          {
            id: "kids_sports_soccer",
            name: "축구화",
            link: "/products?category=kids&type=sports_soccer",
          },
        ],
      },
      {
        id: "kids_dress_shoes",
        name: "구두",
        items: [
          {
            id: "kids_dress_shoes_loafer",
            name: "로퍼",
            link: "/products?category=kids&type=dress_shoes_loafer",
          },
          {
            id: "kids_dress_shoes_character",
            name: "캐릭터",
            link: "/products?category=kids&type=dress_shoes_character",
          },
          {
            id: "kids_dress_shoes_velcro",
            name: "벨크로",
            link: "/products?category=kids&type=dress_shoes_velcro",
          },
        ],
      },
      {
        id: "kids_sandals_slides",
        name: "샌들/슬라이드",
        items: [
          {
            id: "kids_sandals",
            name: "샌들",
            link: "/products?category=kids&type=sandals",
          },
          {
            id: "kids_character_sandals",
            name: "캐릭터샌들",
            link: "/products?category=kids&type=character_sandals",
          },
          {
            id: "kids_character_slides",
            name: "캐릭터슬라이드",
            link: "/products?category=kids&type=character_slides",
          },
          {
            id: "kids_indoor_shoes",
            name: "실내화",
            link: "/products?category=kids&type=indoor_shoes",
          },
          {
            id: "kids_aqua_shoes",
            name: "아쿠아슈즈",
            link: "/products?category=kids&type=aqua_shoes",
          },
        ],
      },
      {
        id: "kids_boots_padding",
        name: "부츠/패딩",
        items: [
          {
            id: "kids_rain_boots",
            name: "레인부츠",
            link: "/products?category=kids&type=rain_boots",
          },
          {
            id: "kids_padding_shoes",
            name: "패딩슈즈",
            link: "/products?category=kids&type=padding_shoes",
          },
          {
            id: "kids_fur_shoes",
            name: "털슈즈",
            link: "/products?category=kids&type=fur_shoes",
          },
          {
            id: "kids_boots_main",
            name: "부츠",
            link: "/products?category=kids&type=boots_main",
          },
        ],
      },
    ],
  },
];

export default categoryMenuData;
