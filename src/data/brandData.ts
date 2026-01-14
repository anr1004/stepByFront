import 스텝바이_로고 from "../assets/images/스텝바이.jpg";
import 스텝바이키즈_로고 from "../assets/images/스텝바이키즈.jpg";
import 스피드런_로고 from "../assets/images/스피드런.jpg";
import 올드스쿨_로고 from "../assets/images/올드스쿨.jpg";
import 워커월드_로고 from "../assets/images/워커월드.jpg";
import 소붐_로고 from "../assets/images/SOBOOM.jpg";

const brandData: IBrand[] = [
  {
    id: "brand-001",
    name: "스텝바이브랜드",
    logoUrl: 스텝바이_로고,
    bestProductIds: ["prod-1001", "prod-1005", "prod-1017", "prod-1035"], // 해당 브랜드의 상품 ID
  },
  {
    id: "brand-002",
    name: "SOBOOM 슈즈",
    logoUrl: 소붐_로고,
    bestProductIds: [
      "prod-1002",
      "prod-1009",
      "prod-1018",
      "prod-1027",
      "prod-1031",
    ],
  },
  {
    id: "brand-003",
    name: "워커월드",
    logoUrl: 워커월드_로고,
    bestProductIds: ["prod-1003", "prod-1014", "prod-1019", "prod-1030"],
  },
  {
    id: "brand-004",
    name: "스피드런",
    logoUrl: 스피드런_로고,
    bestProductIds: [
      "prod-1005",
      "prod-1010",
      "prod-1017",
      "prod-1023",
      "prod-1035",
    ],
  },
  {
    id: "brand-005",
    name: "스텝바이키즈",
    logoUrl: 스텝바이키즈_로고,
    bestProductIds: [
      "prod-1006",
      "prod-1011",
      "prod-1020",
      "prod-1024",
      "prod-1028",
      "prod-1033",
    ],
  },
  {
    id: "brand-006",
    name: "올드스쿨",
    logoUrl: 올드스쿨_로고,
    bestProductIds: ["prod-1012", "prod-1009", "prod-1001"],
  },
];

export default brandData;
