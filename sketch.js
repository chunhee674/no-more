
let planImg;
let planImgRotated;

let currentScreen = "home";
let homeDiv, planTopBar, foodDiv, rulesDiv, settingDiv;

const C = {
  bg: "#1a1614", // 따뜻한 먹색/숯색
  bgSoft: "#211c19",
  surface: "#262019", // 우드톤 서피스
  surface2: "#2f2820",
  line: "#3a322a",
  line2: "#4a3f34",
  text: "#f0e9df", // 한지 크림
  textDim: "#a99e8e",
  textFaint: "#7a7062",
  accent: "#c9a227", // 골드(간판 톳)
  accentSoft: "#332a16",
  hong: "#b5372e", // 주점 홍색 포인트
  hongSoft: "#331a17",
  food: "#c9962f",
  foodSoft: "#2c2517",
  foodBorder: "#4a3d22",
  active: "#e0483a",
  sauce: "#e8b53a", // 종지 소스 = 골드옐로
  plating: "#6ba3c9", // 음식 위 = 청록빛 파랑
  tools: "#9a8f7e", // 집기 = 우드 그레이
};
// 제목용 명조(서예 느낌) + 본문용 고딕
const SERIF = "'Nanum Myeongjo', 'Noto Serif KR', 'Apple SD Gothic Neo', serif";
const FONT = SERIF; // 앱 전체를 명조로 통일 (원래 고딕 자리도 전부 명조)

// 뿌리거나 올리는 재료 — 이 단어들이 텍스트에 있으면 굵게 강조
// 알바생이 직접 넣거나 올리거나 뿌리는 재료·소스 전부 강조
const HIGHLIGHT_WORDS = [
  "마요네즈",
  "마요",
  "케찹",
  "케첩",
  "머스타드",
  "양념치킨소스",
  "요거트소스",
  "요거트",
  "스리라차",
  "쌈장",
  "초장",
  "진간장",
  "쯔유간장",
  "칠리소스",
  "연겨자",
  "장아찌",
  "파김치",
  "쌈무",
  "깨",
  "참기름",
  "파슬리",
  "레드페퍼",
  "김가루",
  "후리가케",
  "미숫가루",
  "시즈닝",
  "소금후추",
  "노른자",
  "레몬칩",
  "연유",
  "얼음",
  "토닉",
  "우유",
  "시럽",
  "말차시럽",
  "우베파우더",
  "밀크티베이스",
  "엘더베이스",
  "코쿤",
  "만월",
  "유자사케",
  "고량주",
  "막걸리",
  "생맥주",
  "냉동과일",
  "물",
  "레몬",
];

const markerDefs = [
  // ── 음식 (먹는 것)
  {
    key: "sauce",
    label: "소스",
    kind: "food",
    points: [
      { x: 0.725, y: 0.469 },
      { x: 0.7, y: 0.287 },
    ],
  },
  {
    key: "leftoverliquor",
    label: "다찬술",
    kind: "food",
    points: [{ x: 0.953, y: 0.908 }],
  },
  {
    key: "draftbeer",
    label: "생맥주",
    kind: "food",
    points: [{ x: 0.877, y: 0.315 }],
  },
  {
    key: "shavedice",
    label: "빙수",
    kind: "food",
    points: [{ x: 0.841, y: 0.312 }],
  },
  {
    key: "beverage",
    label: "음료",
    kind: "food",
    points: [
      { x: 0.9, y: 0.373 },
      { x: 0.812, y: 0.464 },
    ],
  },
  {
    key: "snack",
    label: "과자",
    kind: "food",
    points: [{ x: 0.699, y: 0.292 }],
  },
  {
    key: "highball",
    label: "하이볼",
    kind: "food",
    points: [{ x: 0.748, y: 0.307 }],
  },
  {
    key: "water",
    label: "물",
    kind: "food",
    points: [
      { x: 0.725, y: 0.469 },
      { x: 0.79, y: 0.312 },
    ],
  },
  {
    key: "soju",
    label: "소주",
    kind: "food",
    points: [
      { x: 0.752, y: 0.468 },
      { x: 0.202, y: 0.314 },
    ],
  },
  {
    key: "liquor",
    label: "술",
    kind: "food",
    points: [{ x: 0.264, y: 0.318 }],
  },
  {
    key: "beer",
    label: "맥주",
    kind: "food",
    points: [
      { x: 0.783, y: 0.466 },
      { x: 0.14, y: 0.318 },
    ],
  },
  {
    key: "makgeolli",
    label: "막걸리",
    kind: "food",
    points: [{ x: 0.835, y: 0.467 }],
  },

  // ── 물건 · 집기
  {
    key: "trash",
    label: "쓰레기통",
    kind: "thing",
    points: [
      { x: 0.444, y: 0.125 },
      { x: 0.536, y: 0.051 },
      { x: 0.534, y: 0.249 },
    ],
  },
  {
    key: "tongs",
    label: "청소도구",
    kind: "thing",
    points: [
      { x: 0.527, y: 0.33 },
      { x: 0.484, y: 0.124 },
    ],
  },
  {
    key: "emptybottle",
    label: "빈술",
    kind: "thing",
    points: [{ x: 0.595, y: 0.446 }],
  },
  {
    key: "draftbeerglass",
    label: "생맥주잔",
    kind: "thing",
    points: [{ x: 0.835, y: 0.467 }],
  },
  { key: "bag", label: "봉투", kind: "thing", points: [{ x: 0.9, y: 0.373 }] },
  {
    key: "tableware",
    label: "식기",
    kind: "thing",
    points: [{ x: 0.567, y: 0.321 }],
  },
  {
    key: "cup",
    label: "컵",
    kind: "thing",
    points: [
      { x: 0.567, y: 0.321 },
      { x: 0.68, y: 0.287 },
    ],
  },
  {
    key: "extrabag",
    label: "여분봉투",
    kind: "thing",
    points: [{ x: 0.528, y: 0.216 }],
  },
  {
    key: "plate",
    label: "접시",
    kind: "thing",
    points: [{ x: 0.68, y: 0.287 }],
  },
  { key: "rag", label: "걸레", kind: "thing", points: [{ x: 0.74, y: 0.317 }] },
  {
    key: "recycle",
    label: "분리수거",
    kind: "thing",
    points: [{ x: 0.595, y: 0.404 }],
  },
  {
    key: "sojuglass",
    label: "소주잔",
    kind: "thing",
    points: [{ x: 0.752, y: 0.468 }],
  },
  {
    key: "beerglass",
    label: "맥주잔",
    kind: "thing",
    points: [{ x: 0.783, y: 0.466 }],
  },
  {
    key: "makgeolliglass",
    label: "막걸리잔",
    kind: "thing",
    points: [{ x: 0.835, y: 0.467 }],
  },
  {
    key: "apron",
    label: "앞치마",
    kind: "thing",
    points: [{ x: 0.67, y: 0.362 }],
  },
  {
    key: "burner",
    label: "버너",
    kind: "thing",
    points: [{ x: 0.655, y: 0.388 }],
  },
  {
    key: "ladle",
    label: "국자",
    kind: "thing",
    points: [{ x: 0.659, y: 0.286 }],
  },
  {
    key: "cooktong",
    label: "요리집게",
    kind: "thing",
    points: [{ x: 0.659, y: 0.286 }],
  },
  {
    key: "scissors",
    label: "가위",
    kind: "thing",
    points: [{ x: 0.659, y: 0.286 }],
  },
  {
    key: "blanket",
    label: "담요",
    kind: "thing",
    points: [{ x: 0.637, y: 0.288 }],
  },
  {
    key: "dish",
    label: "종지",
    kind: "thing",
    points: [{ x: 0.637, y: 0.288 }],
  },
  {
    key: "wetwipe",
    label: "물티슈",
    kind: "thing",
    points: [{ x: 0.699, y: 0.292 }],
  },
  {
    key: "napkin",
    label: "냅킨",
    kind: "thing",
    points: [{ x: 0.699, y: 0.292 }],
  },
  {
    key: "butane",
    label: "부탄가스",
    kind: "thing",
    points: [{ x: 0.68, y: 0.287 }],
  },
];

// 표시등 상세: 이미지 + 설명 (더블탭 시 상세창에 표시)
// img 파일명대로 사진을 같은 폴더에 올리면 자동으로 뜸. desc는 필요 시 채우기.
// 표시등 상세: 포인트(위치)별로 이미지+설명 배열.
// 표시등이 N개면 배열에 N개. 더블탭한 표시등의 순번(index)에 맞는 것이 표시됨.
const markerDetails = {
  // ── 음식
  sauce: [
    { img: "item_소스1.jpg", desc: "" },
    { img: "냉1.jpg", desc: "" },
  ],
  leftoverliquor: [{ img: "item_다찬술.jpg", desc: "" }],
draftbeer: [ { img: "item_생맥주.jpg", desc: "", video: "맥주 따르기.mp4" } ],  shavedice: [{ img: "item_빙수.jpg", desc: "" }],
  beverage: [
    { img: "item_음료1.jpg", desc: "" },
    { img: "item_음료2.jpg", desc: "" },
  ],
  snack: [{ img: "item_과자, 냅킨, 물티슈.jpg", desc: "" }],
  highball: [{ img: "item_하이볼.jpg", desc: "" }],
  water: [
    { img: "냉1.jpg", desc: "" },
    { img: "item_물2.jpg", desc: "" },
  ],
  soju: [
    { img: "냉4.jpg", desc: "" },
    { img: "item_소주2.jpg", desc: "" },
  ],
  liquor: [{ img: "item_소주2.jpg", desc: "" }],
  beer: [
    { img: "냉3.jpg", desc: "" },
    { img: "item_소주2.jpg", desc: "" },
  ],
  makgeolli: [{ img: "냉7.jpg", desc: "" }],

  // ── 물건 · 집기
  trash: [
    { img: "item_쓰레기통1.jpg", desc: "" },
    { img: "item_쓰레기통2.jpg", desc: "" },
    { img: "item_쓰레기통3.jpg", desc: "" },
  ],
  tongs: [
    { img: "item_청소도구.jpg", desc: "" },
    { img: "item_청소도구.jpg", desc: "" },
  ],
  emptybottle: [{ img: "item_빈술.jpg", desc: "" }],
  draftbeerglass: [{ img: "냉7.jpg", desc: "" }],
  bag: [{ img: "item_음료2.jpg", desc: "" }],
  tableware: [{ img: "item_식기, 컵.jpg", desc: "" }],
  cup: [
    { img: "item_컵, 그릇, 부탄가스.jpg", desc: "" },
    { img: "item_식기, 컵.jpg", desc: "" },
  ],
  extrabag: [{ img: "item_여분봉투.jpg", desc: "" }],
  plate: [{ img: "item_컵, 그릇, 부탄가스.jpg", desc: "" }],
  butane: [{ img: "item_컵, 그릇, 부탄가스.jpg", desc: "" }],
  rag: [
    { img: "item_걸레1.jpg", desc: "기본 걸레 위치" },
    { img: "item_걸레2.jpg", desc: "걸레가 싱크에 놓여있다면 세탁 후 원래 위치에 놓아주세요." },
  ],
  recycle: [{ img: "item_분리수거.jpg", desc: "" }],
  sojuglass: [{ img: "냉4.jpg", desc: "" }],
  beerglass: [{ img: "냉3.jpg", desc: "" }],
  makgeolliglass: [{ img: "냉7.jpg", desc: "" }],
  apron: [{ img: "item_앞치마.jpg", desc: "" }],
  burner: [{ img: "item_버너.jpg", desc: "" }],

  // ── 새로 추가한 물건
  ladle: [{ img: "item_집게, 가위, 국자.jpg", desc: "" }],
  scissors: [{ img: "item_집게, 가위, 국자.jpg" }],
  cooktong: [{ img: "item_집게, 가위, 국자.jpg", desc: "" }],
  blanket: [{ img: "item_종지, 담요.jpg", desc: "" }],
  dish: [{ img: "item_종지, 담요.jpg", desc: "" }],
  wetwipe: [{ img: "item_과자, 냅킨, 물티슈.jpg", desc: "" }],
  napkin: [{ img: "item_과자, 냅킨, 물티슈.jpg", desc: "" }],
};

const mergeGroups = [
  [
    { key: "water", idx: 0 },
    { key: "sauce", idx: 0 },
  ], // 물1 · 소스1
  [
    { key: "soju", idx: 0 },
    { key: "sojuglass", idx: 0 },
  ], // 소주1 · 소주잔
  [
    { key: "beer", idx: 0 },
    { key: "beerglass", idx: 0 },
  ], // 맥주1 · 맥주잔
  [
    { key: "makgeolli", idx: 0 },
    { key: "draftbeerglass", idx: 0 },
    { key: "makgeolliglass", idx: 0 },
  ], // 막걸리 · 생맥주잔 · 막걸리잔
  [
    { key: "bag", idx: 0 },
    { key: "beverage", idx: 0 },
  ], // 봉투 · 음료1
  [
    { key: "tableware", idx: 0 },
    { key: "cup", idx: 0 },
  ], // 식기 · 컵1
  [
    { key: "cup", idx: 1 },
    { key: "butane", idx: 0 },
    { key: "plate", idx: 0 },
  ], // 컵2 · 부탄가스 · 접시
  [
    { key: "snack", idx: 0 },
    { key: "napkin", idx: 0 },
    { key: "wetwipe", idx: 0 },
  ], // 과자 · 냅킨 · 물티슈
  [
    { key: "cooktong", idx: 0 },
    { key: "ladle", idx: 0 },
    { key: "scissors", idx: 0 },
  ], // 요리집게 · 국자 · 가위
  [
    { key: "dish", idx: 0 },
    { key: "blanket", idx: 0 },
  ], // 종지 · 담요
];

const rowGroups = [
  [[{ key: "recycle", idx: 0 }], [{ key: "emptybottle", idx: 0 }]],
  [
    [{ key: "plate", idx: 0 }],
    [{ key: "cup", idx: 1 }],
    [{ key: "snack", idx: 0 }],
    [{ key: "rag", idx: 0 }],
    [{ key: "highball", idx: 0 }],
    [{ key: "water", idx: 1 }],
    [{ key: "shavedice", idx: 0 }],
    [{ key: "draftbeer", idx: 0 }],
  ],
  [
    [
      { key: "water", idx: 0 },
      { key: "sauce", idx: 1 },
    ],
    [
      { key: "soju", idx: 1 },
      { key: "sojuglass", idx: 0 },
    ],
    [
      { key: "beer", idx: 0 },
      { key: "beerglass", idx: 0 },
    ],
    [{ key: "beverage", idx: 1 }],
    [
      { key: "makgeolli", idx: 0 },
      { key: "draftbeerglass", idx: 0 },
      { key: "makgeolliglass", idx: 0 },
    ],
  ],
];

//applyRowGroups(rowGroups);
function applyRowGroups(groups) {
  groups.forEach((units) => {
    const unitData = units.map((unitRefs) => {
      const pts = unitRefs.map(
        ({ key, idx }) => markerDefs.find((d) => d.key === key).points[idx]
      );
      const cx = pts.reduce((s, p) => s + p.x, 0) / pts.length;
      const cy = pts.reduce((s, p) => s + p.y, 0) / pts.length;
      return { pts, cx, cy };
    });
    const avgY = unitData.reduce((s, u) => s + u.cy, 0) / unitData.length;
    const sorted = [...unitData].sort((a, b) => a.cx - b.cx);
    const minX = sorted[0].cx,
      maxX = sorted[sorted.length - 1].cx;
    sorted.forEach((u, i) => {
      const newX =
        sorted.length === 1
          ? minX
          : minX + (maxX - minX) * (i / (sorted.length - 1));
      const dx = newX - u.cx,
        dy = avgY - u.cy;
      u.pts.forEach((p) => {
        p.x += dx;
        p.y += dy;
      });
    });
  });
}

let selectedPointIndex = 0; // activeClusters 중 방향키로 조정할 대상 인덱스
let activeKey = null;
let activeClusters = [];
let buttons = {};
let readoutEl;
let infoPanel, infoTitleEl, infoBodyEl, infoImgEl, infoCloseAndHideBtn;
let clusters = [];

const MOVE_STEP = 0.0004;
const MOVE_STEP_FAST = 0.0015;
const MARKER_FRAC = 0.013;
const MIN_MARKER_PX = 6;
const PLAN_AREA_RATIO = 0.68;
const PAD = 14;

const foodCategories = [
  {
    name: "하이볼",
    type: "drink",
    items: [
      {
        name: "망부석 하이볼",
        img: "food_망부석하이볼.jpg",
        recipe: "코쿤 30ml, 엘더베이스 30ml, 얼음, 토닉, 레몬칩, 빨대",
      },
      {
        name: "히비스커스 하이볼",
        img: "food_히비스커스하이볼.jpg",
        recipe: "만월 30ml, 시럽 3펌프, 얼음, 토닉, 레몬칩, 빨대",
      },
      {
        name: "유자히비스커스 하이볼",
        img: "food_유자히비스커스하이볼.jpg",
        recipe: "유자사케 30ml, 시럽 2펌프, 얼음, 토닉, 레몬칩, 빨대",
      },
      {
        name: "유자 하이볼",
        img: "food_유자하이볼.jpg",
        recipe: "유자사케 45ml, 얼음, 토닉, 레몬칩, 빨대",
      },
      {
        name: "파인애플 하이볼",
        img: "food_파인애플하이볼.jpg",
        recipe: "고량주 30ml, 얼음, 토닉, 레몬칩, 빨대",
      },
      {
        name: "밀크티 하이볼",
        img: "food_밀크티하이볼.jpg",
        recipe: "코쿤 30ml, 밀크티베이스 30ml, 얼음, 우유, 빨대",
      },
      {
        name: "밀크티",
        img: "food_밀크티.jpg",
        recipe: "밀크티베이스 30-40ml, 얼음, 우유, 빨대",
      },
      {
        name: "고량생맥주",
        img: "food_고량생맥주.jpg",
        recipe: "고량주 30ml 위에 생맥주 따라주기",
      },
    ],
  },
  {
    name: "막걸리",
    type: "drink",
    items: [
      {
        name: "말차 막걸리",
        img: "food_말차막걸리.jpg",
        recipe:
          "항아리에 얼음 한스쿱, 막걸리 280g, 우유 300g / 믹스잔에 우유 60g, 말차시럽 200g, 연유 20g / 손님 앞에서 섞어서 부어드리기",
      },
      {
        name: "우베 막걸리",
        img: "food_우베막걸리.jpg",
        recipe:
          "항아리에 얼음 2~3스쿱(가득), 막걸리 170g, 우유 170g / 믹스잔에 우유 120g, 우베파우더 120g / 손님 앞에서 섞어서 부어드리기",
      },
      {
        name: "망고 / 블루베리 막걸리",
        img: "food_망고막걸리.jpg",
        recipe:
          "얼음 150g, 시럽 110g, 막걸리 250g, 우유 250g, 냉동과일 50g, 연유 15g / 갈아서 항아리에 부어 나무국자 올려 잔과 함께 제공",
      },
    ],
  },
  {
    name: "탕",
    items: [
      {
        name: "닭도리·곱도리탕",
        img: "food_곱도리탕.jpg",
        plating: "부추 위 레드페퍼",
        tools: "국자",
      },
      {
        name: "로제곱도리탕",
        img: "food_로제곱도리탕.jpg",
        plating: "레드페퍼",
        tools: "국자",
      },
      {
        name: "닭한마리",
        img: "food_닭한마리.jpg",
        sauce: "작은 접시에 파김치, 깨",
        tools: "국자, 집게",
      },
      {
        name: "국물닭발",
        img: "food_국물닭발.jpg",
        plating: "숙주 위 레드페퍼",
        tools: "국자",
      },
      {
        name: "항정미소",
        img: "food_항정미소.jpg",
        plating: "부추 위 레드페퍼",
        sauce: "2구 종지: 칠리소스, 쯔유간장, 연겨자",
        tools: "국자",
      },
      {
        name: "모츠나베",
        img: "food_모츠나베.jpg",
        plating: "두부 위 깨",
        sauce: "2구 종지: 칠리소스, 쯔유간장, 연겨자",
        tools: "국자",
      },
      {
        name: "돼지김치찌개",
        img: "food_돼지김치찌개.jpg",
        plating: "두부 위 깨",
        tools: "국자",
      },
      {
        name: "골뱅이탕",
        img: "food_골뱅이탕.jpg",
        sauce: "1구 종지에 초장",
        tools: "국자",
      },
      {
        name: "짬뽕순두부찌개",
        img: "food_짬뽕순두부.jpg",
        plating: "순두부 위 레드페퍼",
        tools: "국자",
      },
      {
        name: "오뎅탕",
        img: "food_오뎅탕.jpg",
        sauce: "1구 종지에 진간장",
        tools: "국자",
      },
      {
        name: "라볶이",
        img: "food_라볶이.jpg",
        plating: "파슬리",
        tools: "국자",
      },
      {
        name: "우거지 순살감자탕",
        img: "food_감자탕.jpg",
        tools: "국자, 집게, 가위",
      },
      {
        name: "꽃게탕",
        img: "food_꽃게탕.jpg",
        plating: "두부, 깨",
        sauce: "다진 고추 간장(확인필요)",
        tools: "국자",
      },
    ],
  },
  {
    name: "마른안주·전",
    items: [
      {
        name: "먹태",
        img: "food_먹태.jpg",
        sauce: "마요네즈에 진간장 살짝 (주방-고추)",
      },
      {
        name: "김치전",
        img: "food_김치전.jpg",
        sauce: "1구 종지에 양파 장아찌",
      },
      {
        name: "치즈김치전",
        img: "food_치즈김치전.jpg",
        sauce: "1구 종지에 양파 장아찌",
      },
      {
        name: "새우파전",
        img: "food_새우파전.jpg",
        sauce: "1구 종지에 양파 장아찌",
      },
      {
        name: "반반전",
        img: "food_반반전.jpg",
        sauce: "2구 종지에 케찹, 요거트소스",
        tools: "집게, 가위",
      },
      {
        name: "치즈감자채전",
        img: "food_치즈감자채전.jpg",
        sauce: "전체 시즈닝-연유-파슬리",
      },
      {
        name: "콘치즈전",
        img: "food_콘치즈전.jpg",
        sauce: "전체 시즈닝-연유-파슬리",
      },
    ],
  },
  {
    name: "접시",
    items: [
      {
        name: "몽티기·사시미",
        img: "food_사시미.jpg",
        plating: "참기름 위 소금후추",
      },
      { name: "육회 칼비빔면", img: "food_육회비빔면.jpg", sauce: "쌈장" },
      {
        name: "항정수육",
        img: "food_항정수육.jpg",
        plating: "항정에 깨 일자, 겉절이 위 깨",
      },
      { name: "족뱅이·냉채족발", img: "food_냉채족발.jpg", plating: "깨" },
      {
        name: "물뱅이",
        img: "food_물뱅이.jpg",
        plating: "소스 가운데 깨",
        sauce: "스텐 종지: 쌈무, 머스타드",
      },
      { name: "훈제오리", img: "food_훈제오리.jpg", plating: "무침 위에 깨" },
      {
        name: "삼겹 비빔면",
        img: "food_삼겹비빔면.jpg",
        plating: "노른자 세로로, 깨 일자, 참기름",
      },
      {
        name: "삼겹두부김치",
        img: "food_삼겹두부김치.jpg",
        plating: "두부 위 깨, 참기름",
        sauce: "2구 종지에 쌈장",
      },
      {
        name: "명란구이",
        img: "food_명란구이.jpg",
        plating: "명란 위에 깨",
        sauce: "1구 종지에 마요네즈",
      },
      {
        name: "치즈제육계란말이",
        img: "food_계란말이.jpg",
        plating: "케찹-마요네즈-파슬리",
      },
      {
        name: "비빔골뱅이소면",
        img: "food_비빔골뱅이.jpg",
        plating: "무침 위 깨, 중면 위 깨 점",
      },
    ],
  },
  {
    name: "직화",
    items: [
      {
        name: "무뼈닭발",
        img: "food_무뼈닭발.jpg",
        plating: "깨",
        sauce: "종지에 쌈무, 마요네즈",
      },
      {
        name: "닭구이·닭목살",
        img: "food_닭목살.jpg",
        plating: "깨",
        sauce: "종지에 쌈무, 스리라차",
        tools: "나무 받침",
      },
      {
        name: "제육볶음",
        img: "food_제육볶음.jpg",
        plating: "깨",
        sauce: "참기름·소금후추",
        tools: "나무 받침",
      },
      { name: "닭똥집볶음", img: "food_닭똥집볶음.jpg", plating: "깨, 참기름" },
    ],
  },
  {
    name: "치킨·빙수",
    items: [
      {
        name: "후라이드치킨",
        img: "food_후라이드.jpg",
        plating: "양배추 위 케찹·마요, 치킨·샐러드 위 파슬리",
        sauce: "2구 종지: 머스타드, 양념치킨소스",
      },
      {
        name: "양념치킨",
        img: "food_양념치킨.jpg",
        plating: "양배추 위 케찹·마요, 치킨·샐러드 위 파슬리",
        sauce: "1구 종지에 머스타드",
      },
      {
        name: "파닭",
        img: "food_파닭.jpg",
        plating: "양배추 위 케찹·마요, 치킨 위 깨, 샐러드 파슬리",
        sauce: "1구 종지에 머스타드",
      },
      {
        name: "뿌링클치킨",
        img: "food_뿌링클.jpg",
        plating: "양배추 위 케찹·마요",
        sauce: "2구 종지: 머스타드, 양념치킨소스",
      },
      {
        name: "화이트어니언치킨",
        img: "food_화이트어니언.jpg",
        plating: "양배추 위 케찹·마요, 치킨 위 요거트소스·파슬리",
        sauce: "2구 종지: 양념치킨소스, 요거트소스",
      },
      {
        name: "닭똥집튀김",
        img: "food_닭똥집튀김.jpg",
        plating: "양배추 위 케찹·마요, 튀김·샐러드 위 파슬리",
        sauce: "2구 종지: 소금후추, 양념치킨소스",
      },
      { name: "닭목살 유린기", img: "food_유린기.jpg" },
      { name: "빙수(all)", img: "food_빙수.jpg", sauce: "연유" },
    ],
  },
  {
    name: "사이드",
    items: [
      {
        name: "들기름 막국수",
        img: "food_들기름막국수.jpg",
        plating: "김가루 위 일자로 깨",
      },
      {
        name: "김치말이국수",
        img: "food_김치말이국수.jpg",
        plating: "깨, 그릇에 연겨자",
      },
      {
        name: "순두부불개장라면",
        img: "food_불개장라면.jpg",
        plating: "순두부 위 레드페퍼",
        tools: "나무 받침",
      },
      { name: "김치볶음밥", img: "food_김치볶음밥.jpg", plating: "깨, 참기름" },
      {
        name: "짜계치와 파김치",
        img: "food_짜계치.jpg",
        plating: "빈공간에 파김치 위 깨, 계란 위 깨",
      },
      { name: "살얼음 묵사발", img: "food_묵사발.jpg", plating: "깨 일자로" },
      {
        name: "치즈스틱·감자튀김",
        img: "food_치즈스틱.jpg",
        plating: "양배추 위 케찹·마요, 전체 파슬리",
        sauce: "1구 종지에 케찹",
      },
      {
        name: "뿌링클감자튀김",
        img: "food_뿌링클감자.jpg",
        plating: "양배추 위 케찹·마요",
        sauce: "1구 종지에 양념치킨소스",
      },
      {
        name: "고향 비빔만두",
        img: "food_비빔만두.jpg",
        plating: "무침 위에 깨",
        sauce: "1구 종지에 장아찌",
      },
      {
        name: "콘치즈튀김",
        img: "food_콘치즈튀김.jpg",
        plating: "전체적으로 파슬리",
      },
      {
        name: "날치알 주먹밥",
        img: "food_주먹밥.jpg",
        plating: "참기름, 후리가케, 마요네즈",
        tools: "앞접시, 비닐장갑",
      },
      {
        name: "호떡아이스크림",
        img: "food_호떡아이스크림.jpg",
        plating: "미숫가루, 파슬리",
        sauce: "1구 종지에 연유",
        tools: "나무 받침",
      },
      {
        name: "설탕토스트·토마토",
        img: "food_설탕토스트.jpg",
        plating: "파슬리",
      },
      { name: "파인애플", img: "food_파인애플.jpg" },
    ],
  },
];

let foodCatListArea, foodContentArea, foodTitleEl;

function preload() {
  planImg = loadImage("도면도.png");
}

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.style("display", "block");
  canvas.style("position", "fixed");
  canvas.style("top", "0");
  canvas.style("left", "0");
  canvas.style("z-index", "0");
  imageMode(CORNER);
  rectMode(CENTER);
  textFont("sans-serif");
  document.body.style.background = C.bg;

  // 프로 디테일: 한지 질감 + 스크롤바 숨김 + 폰트 렌더링 + 애니메이션
  const styleTag = document.createElement("style");
  styleTag.innerHTML = `
    * { -webkit-tap-highlight-color: transparent; -webkit-font-smoothing: antialiased; }
    ::-webkit-scrollbar { width: 0; height: 0; }
    body {
      background-image: radial-gradient(rgba(255,255,255,0.015) 1px, transparent 1px);
      background-size: 3px 3px;
    }
    .card-shadow { box-shadow: 0 2px 10px rgba(0,0,0,0.28), 0 1px 2px rgba(0,0,0,0.35); }
    @keyframes fadeUp { from { opacity:0; transform: translateY(6px); } to { opacity:1; transform:none; } }
    .fade-up { animation: fadeUp .28s ease both; }
  `;
  document.head.appendChild(styleTag);

  planImgRotated = createGraphics(planImg.height, planImg.width);
  planImgRotated.push();
  planImgRotated.translate(planImgRotated.width, 0);
  planImgRotated.rotate(HALF_PI);
  planImgRotated.image(planImg, 0, 0, planImg.width, planImg.height);
  planImgRotated.pop();

  buildClusters();
  preloadDetailImages();
  createHomeScreen();
  createPlanScreen();
  createFoodScreen();
  createSettingScreen();
  createRulesScreen();
  createInfoPanel();
  updateReadout();
  showScreen("home");

  canvas.elt.setAttribute("tabindex", "0");
  let lastTapTime = 0,
    lastTapIdx = -1;
  canvas.mousePressed(() => {
    canvas.elt.focus();
    if (currentScreen !== "plan") return;
    if (activeClusters.length === 0) return;

    const { dw, dh, offsetX, offsetY } = computeLayout();
    let nearest = -1,
      nearD = 99999;
    activeClusters.forEach((c, i) => {
      const { rx, ry } = toRotatedFrac(c.cx, c.cy);
      const px = offsetX + rx * dw,
        py = offsetY + ry * dh;
      const d = dist(mouseX, mouseY, px, py);
      if (d < nearD) {
        nearD = d;
        nearest = i;
      }
    });
    const markerSize = Math.max(dw * MARKER_FRAC, MIN_MARKER_PX);
    if (nearest >= 0 && nearD < markerSize * 2.5) {
      selectedPointIndex = nearest;
      const now = millis();
      if (now - lastTapTime < 350 && lastTapIdx === nearest)
        openMarkerDetail(activeKey);
      lastTapTime = now;
      lastTapIdx = nearest;
    } else {
      deactivateMarker();
    }
  });
}

// 뿌리는 재료 굵게 처리
// 재료 단어를 굵게만 강조 (색은 그 줄 색 그대로 상속)
function highlightIngredients(text) {
  if (!text) return "";
  // 긴 단어부터 치환해야 부분 겹침 방지 (말차시럽 > 시럽)
  const words = [...HIGHLIGHT_WORDS].sort((a, b) => b.length - a.length);
  // 이미 강조된 부분 재치환 방지용 플레이스홀더
  let out = text;
  const marks = [];
  words.forEach((w) => {
    out = out.split(w).join(() => w); // no-op guard (아래서 처리)
  });
  // 간단하고 안전하게: 순차 치환하되 태그로 감싸 재매칭 방지
  out = text;
  words.forEach((w, i) => {
    const token = `\u0000${i}\u0000`;
    out = out.split(w).join(token);
    marks[i] = w;
  });
  marks.forEach((w, i) => {
    const token = `\u0000${i}\u0000`;
    out = out.split(token).join(`<b style="font-weight:800">${w}</b>`);
  });
  return out;
}

function styleTopBar(bar) {
  bar.style("display", "flex");
  bar.style("align-items", "center");
  bar.style("gap", "12px");
  bar.style("padding", "7px 16px");
  bar.style("box-sizing", "border-box");
  bar.style("border-bottom", `1px solid ${C.line}`);
  bar.style("background", C.bgSoft);
  bar.style("box-shadow", "0 2px 12px rgba(0,0,0,0.25)");
}

function makeTitle(parent, txt) {
  const t = createDiv(txt);
  t.parent(parent);
  t.style("color", C.text);
  t.style("font-family", SERIF);
  t.style("font-size", "18px");
  t.style("font-weight", "700");
  t.style("letter-spacing", "0.04em");
  return t;
}
function makeBackButton(parent, onClick) {
  const btn = createDiv();
  btn.parent(parent);
  btn.style("width", "40px");
  btn.style("height", "40px");
  btn.style("border-radius", "11px");
  btn.style("background", C.surface2);
  btn.style("border", `1px solid ${C.line2}`);
  btn.style("display", "flex");
  btn.style("align-items", "center");
  btn.style("justify-content", "center");
  btn.style("cursor", "pointer");
  btn.style("flex", "0 0 auto");
  btn.style("margin", "3px 0 0 -10px"); // 위쪽 여백 2px(아래로), 왼쪽 -2px(왼쪽으로)
  btn.html(
    `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="${C.text}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 14L4 9l5-5"/><path d="M4 9h11a5 5 0 0 1 5 5v1a5 5 0 0 1-5 5H9"/></svg>`
  );
  btn.mousePressed(onClick);
  return btn;
}

function showScreen(name) {
  currentScreen = name;
  if (name !== "plan") deactivateMarker();
  homeDiv.style("display", name === "home" ? "flex" : "none");
  planTopBar.style("display", name === "plan" ? "flex" : "none");
  select("#btn-wrap").style("display", name === "plan" ? "block" : "none");
  foodDiv.style("display", name === "food" ? "block" : "none");
  settingDiv.style("display", name === "setting" ? "flex" : "none");
  rulesDiv.style("display", name === "rules" ? "flex" : "none");
  if (name === "food") showFoodCategoryList();
}

function deactivateMarker() {
  if (activeKey)
    styleMarkerButton(
      buttons[activeKey],
      markerDefs.find((d) => d.key === activeKey).kind,
      false
    );
  activeKey = null;
  activeClusters = [];
  if (readoutEl) updateReadout();
}

function createHomeScreen() {
  homeDiv = createDiv();
  homeDiv.position(0, 0);
  homeDiv.size(windowWidth, windowHeight);
  homeDiv.style("display", "flex");
  homeDiv.style("flex-direction", "column");
  homeDiv.style("align-items", "center");
  homeDiv.style("justify-content", "center");
  homeDiv.style("z-index", "10");
  homeDiv.style("font-family", FONT);
  homeDiv.style("box-sizing", "border-box");
  homeDiv.style("padding", "0 24px");
  homeDiv.style("overflow-y", "auto");
  // 배경: 상단 골드빛 번짐 + 하단 먹색, 은은한 비네팅
  homeDiv.style(
    "background",
    `radial-gradient(70% 42% at 50% 12%, rgba(201,162,39,0.10) 0%, rgba(201,162,39,0.02) 40%, rgba(201,162,39,0) 60%),
     radial-gradient(120% 90% at 50% 8%, ${C.bgSoft} 0%, ${C.bg} 55%),
     radial-gradient(140% 100% at 50% 120%, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 55%)`
  );

  const inner = createDiv();
  inner.parent(homeDiv);
  inner.class("fade-up");
  inner.style("width", "100%");
  inner.style("max-width", "380px");
  inner.style("display", "flex");
  inner.style("flex-direction", "column");
  inner.style("align-items", "center");

  // ── 제목 블록
  const head = createDiv();
  head.parent(inner);
  head.style("text-align", "center");
  head.style("margin-bottom", "72px");

  const brand = createDiv("望夫石");
  brand.parent(head);
  brand.style("font-family", SERIF);
  brand.style("color", C.text);
  brand.style("font-size", "46px");
  brand.style("font-weight", "700");
  brand.style("letter-spacing", "0.16em");
  brand.style("line-height", "1");
  brand.style(
    "text-shadow",
    "0 3px 22px rgba(201,162,39,0.22), 0 1px 2px rgba(0,0,0,0.4)"
  );

  const ruleWrap = createDiv();
  ruleWrap.parent(head);
  ruleWrap.style("display", "flex");
  ruleWrap.style("align-items", "center");
  ruleWrap.style("justify-content", "center");
  ruleWrap.style("gap", "8px");
  ruleWrap.style("margin", "16px 0 12px 0");
  const seg1 = createDiv();
  seg1.parent(ruleWrap);
  seg1.style("width", "34px");
  seg1.style("height", "1px");
  seg1.style("background", `linear-gradient(90deg, transparent, ${C.accent})`);
  const diamond = createDiv();
  diamond.parent(ruleWrap);
  diamond.style("width", "5px");
  diamond.style("height", "5px");
  diamond.style("background", C.accent);
  diamond.style("transform", "rotate(45deg)");
  diamond.style("box-shadow", `0 0 8px rgba(201,162,39,0.6)`);
  const seg2 = createDiv();
  seg2.parent(ruleWrap);
  seg2.style("width", "34px");
  seg2.style("height", "1px");
  seg2.style("background", `linear-gradient(90deg, ${C.accent}, transparent)`);

  const kr = createDiv("망부석 · 방이점");
  kr.parent(head);
  kr.style("color", C.accent);
  kr.style("font-size", "12px");
  kr.style("font-weight", "600");
  kr.style("letter-spacing", "0.18em");
  const sub = createDiv("업무 매뉴얼");
  sub.parent(head);
  sub.style("color", C.textDim);
  sub.style("font-size", "12.5px");
  sub.style("margin-top", "5px");
  sub.style("letter-spacing", "0.07em");

  // ── 메뉴 리스트
  const list = createDiv();
  list.parent(inner);
  list.style("width", "100%");
  list.style("display", "flex");
  list.style("flex-direction", "column");
  list.style("gap", "11px");

  const items = [
    { n: "一", label: "도면도", sub: "술 · 집기 · 식자재 위치", go: "plan" },
    { n: "二", label: "음식", sub: "메뉴별 사진 · 소스 · 레시피", go: "food" },
    { n: "三", label: "세팅", sub: "식탁 세팅 방법", go: "setting" },
    { n: "四", label: "규칙", sub: "매장 운영 규칙", go: "rules" },
  ];
  items.forEach((it) => {
    const row = createDiv();
    row.parent(list);
    row.style("width", "100%");
    row.style("box-sizing", "border-box");
    row.style("position", "relative");
    // 그라데이션 + 강화된 그림자 + 상단 하이라이트 라인
    row.style(
      "background",
      `linear-gradient(158deg, ${C.surface2} 0%, ${C.surface} 42%, ${C.bgSoft} 100%)`
    );
    row.style("border", `1px solid ${C.line}`);
    row.style("border-radius", "14px");
    row.style("padding", "15px 17px");
    row.style("cursor", "pointer");
    row.style("display", "flex");
    row.style("align-items", "center");
    row.style("gap", "15px");
    row.style(
      "box-shadow",
      "0 6px 18px rgba(0,0,0,0.38), 0 1px 0 rgba(255,255,255,0.03) inset"
    );
    row.style(
      "transition",
      "border-color .18s, transform .12s, box-shadow .18s"
    );
    const rowOn = () => {
      row.style("border-color", C.accent);
      row.style("transform", "translateY(-2px)");
      row.style(
        "box-shadow",
        `0 10px 24px rgba(0,0,0,0.45), 0 0 0 1px ${C.accent}22`
      );
    };
    const rowOff = () => {
      row.style("border-color", C.line);
      row.style("transform", "none");
      row.style(
        "box-shadow",
        "0 6px 18px rgba(0,0,0,0.38), 0 1px 0 rgba(255,255,255,0.03) inset"
      );
    };
    row.elt.addEventListener("mouseenter", rowOn);
    row.elt.addEventListener("mouseleave", rowOff);
    row.elt.addEventListener("touchstart", rowOn, { passive: true });
    row.elt.addEventListener("touchend", rowOff);
    row.elt.addEventListener("touchcancel", rowOff);

    const num = createDiv(it.n);
    num.parent(row);
    num.style("font-family", SERIF);
    num.style("color", C.hong);
    num.style("font-size", "20px");
    num.style("font-weight", "700");
    num.style("min-width", "24px");
    num.style("text-align", "center");
    num.style("text-shadow", "0 1px 6px rgba(181,55,46,0.4)");

    const divv = createDiv();
    divv.parent(row);
    divv.style("width", "1px");
    divv.style("height", "32px");
    divv.style(
      "background",
      `linear-gradient(180deg, transparent, ${C.line2}, transparent)`
    );

    const txt = createDiv();
    txt.parent(row);
    txt.style("flex", "1");
    const l = createDiv(it.label);
    l.parent(txt);
    l.style("font-family", SERIF);
    l.style("color", C.text);
    l.style("font-size", "17px");
    l.style("font-weight", "700");
    l.style("letter-spacing", "0.03em");
    const s = createDiv(it.sub);
    s.parent(txt);
    s.style("color", C.textDim);
    s.style("font-size", "11.5px");
    s.style("margin-top", "3px");

    const chev = createDiv();
    chev.parent(row);
    chev.html(
      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${C.textFaint}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>`
    );
    row.mousePressed(() => showScreen(it.go));
  });
}

function buildClusters() {
  const refKey = (key, idx) => `${key}__${idx}`;
  const refToGroup = {};
  mergeGroups.forEach((group, gi) =>
    group.forEach(({ key, idx }) => {
      refToGroup[refKey(key, idx)] = gi;
    })
  );
  const groupClusters = mergeGroups.map((group) => {
    const members = group.map(({ key, idx }) => ({
      key,
      idx,
      pt: markerDefs.find((d) => d.key === key).points[idx],
    }));
    const cx = members.reduce((s, m) => s + m.pt.x, 0) / members.length;
    const cy = members.reduce((s, m) => s + m.pt.y, 0) / members.length;
    return { members, cx, cy };
  });
  const singleClusters = [];
  markerDefs.forEach((def) =>
    def.points.forEach((pt, idx) => {
      if (refToGroup[refKey(def.key, idx)] === undefined)
        singleClusters.push({
          members: [{ key: def.key, idx, pt }],
          cx: pt.x,
          cy: pt.y,
        });
    })
  );
  clusters = [...groupClusters, ...singleClusters];
}
function findAllClustersForKey(key) {
  return clusters.filter((c) => c.members.some((m) => m.key === key));
}

function createPlanScreen() {
  planTopBar = createDiv();
  planTopBar.position(0, 0);
  planTopBar.style("width", "100%");
  planTopBar.style("box-sizing", "border-box");
  planTopBar.style("display", "none");
  planTopBar.style("z-index", "20");
  planTopBar.style("font-family", FONT);
  styleTopBar(planTopBar);
  makeBackButton(planTopBar, () => showScreen("home"));
  makeTitle(planTopBar, "도면도");

  const barY = height * PLAN_AREA_RATIO;
  const barH = height - barY;

  const btnWrap = createDiv();
  btnWrap.position(0, barY);
  btnWrap.size(width, barH);
  btnWrap.style("display", "none");
  btnWrap.style("overflow-y", "auto");
  btnWrap.style("padding", "6px 14px 40px 14px");
  btnWrap.style("box-sizing", "border-box");
  btnWrap.style("background", C.bg);
  btnWrap.style("border-top", `1px solid ${C.line}`);
  btnWrap.style("z-index", "20");
  btnWrap.style("font-family", FONT);
  btnWrap.id("btn-wrap");
  btnWrap.elt.addEventListener("click", (e) => {
    if (e.target === btnWrap.elt) deactivateMarker();
  });

  const makeBtn = (def, parent) => {
    const btn = createDiv();
    btn.parent(parent);
    btn.html(def.label);
    btn.style("text-align", "center");
    btn.style("padding", "8px 4px");
    btn.style("border-radius", "9px");
    btn.style("font-size", "12px");
    btn.style("font-weight", "650");
    btn.style("cursor", "pointer");
    btn.style("white-space", "nowrap");
    btn.style("overflow", "hidden");
    btn.style("text-overflow", "ellipsis");
    styleMarkerButton(btn, def.kind, false);
    btn.mousePressed((e) => {
      if (e && e.stopPropagation) e.stopPropagation();
      if (activeKey !== def.key) {
        if (activeKey)
          styleMarkerButton(
            buttons[activeKey],
            markerDefs.find((d) => d.key === activeKey).kind,
            false
          );
        activeKey = def.key;
        activeClusters = findAllClustersForKey(def.key);
        selectedPointIndex = 0;
        styleMarkerButton(btn, def.kind, true);
        updateReadout();
      } else openInfoPanelForKey(def.key);
    });
    buttons[def.key] = btn;
  };

  const sections = [
    {
      title: "음식",
      kind: "food",
      keys: markerDefs.filter((d) => d.kind === "food").map((d) => d.key),
    },
    {
      title: "물건 · 집기",
      kind: "thing",
      keys: markerDefs.filter((d) => d.kind === "thing").map((d) => d.key),
    },
  ];
  sections.forEach((sec) => {
    const head = createDiv();
    head.parent(btnWrap);
    head.style("display", "flex");
    head.style("align-items", "center");
    head.style("gap", "7px");
    head.style("margin", "9px 2px 5px 2px");
    const dot = createDiv();
    dot.parent(head);
    dot.style("width", "7px");
    dot.style("height", "7px");
    dot.style("border-radius", "2px");
    dot.style("background", sec.kind === "food" ? C.food : C.textDim);
    const lbl = createDiv(sec.title);
    lbl.parent(head);
    lbl.style("color", C.textDim);
    lbl.style("font-size", "11.5px");
    lbl.style("font-weight", "700");
    lbl.style("letter-spacing", "0.04em");
    const grid = createDiv();
    grid.parent(btnWrap);
    grid.style("display", "grid");
    grid.style("grid-template-columns", "1fr 1fr 1fr 1fr");
    grid.style("gap", "6px");
    sec.keys.forEach((key) => {
      const def = markerDefs.find((d) => d.key === key);
      if (def) makeBtn(def, grid);
    });
  });

  readoutEl = createDiv("");
  readoutEl.parent(btnWrap);
  readoutEl.style("margin-top", "16px");
  readoutEl.style("background", "#111318");
  readoutEl.style("border", `1px solid ${C.line}`);
  readoutEl.style("border-radius", "8px");
  readoutEl.style("padding", "9px 10px");
  readoutEl.style("font-family", "monospace");
  readoutEl.style("font-size", "10.5px");
  readoutEl.style("color", C.textFaint);
  readoutEl.style("white-space", "pre");
}

function styleMarkerButton(btn, kind, active) {
  btn.style(
    "box-shadow",
    active
      ? "0 0 0 1px rgba(224,72,58,0.4), 0 2px 8px rgba(224,72,58,0.25)"
      : "0 1px 3px rgba(0,0,0,0.3)"
  );
  btn.style("transition", "transform .1s, box-shadow .15s");
  if (active) {
    btn.style("background", C.active);
    btn.style("color", "#fff");
    btn.style("border", `1px solid ${C.active}`);
  } else if (kind === "food") {
    btn.style("background", C.foodSoft);
    btn.style("color", "#e8c98a");
    btn.style("border", `1px solid ${C.foodBorder}`);
  } else {
    btn.style("background", C.surface2);
    btn.style("color", C.text);
    btn.style("border", `1px solid ${C.line2}`);
  }
}

function updateReadout() {
  if (!activeKey) {
    readoutEl.html(
      "항목 선택 후, 표시등을 탭하면 방향키로 이동 · 더블탭하면 상세"
    );
    return;
  }
  const def = markerDefs.find((d) => d.key === activeKey);
  let lines = [
    `${def.label} — ${activeClusters.length}곳${
      activeClusters.length > 1
        ? " · " + (selectedPointIndex + 1) + "번 선택"
        : ""
    } · 방향키 이동`,
  ];
  activeClusters.forEach((c, i) => {
    const mark =
      activeClusters.length > 1 && i === selectedPointIndex ? "▶ " : "   ";
    lines.push(`${mark}${i + 1}: x=${c.cx.toFixed(3)}, y=${c.cy.toFixed(3)}`);
  });
  readoutEl.html(lines.join("\n"));
}

function createInfoPanel() {
  infoPanel = createDiv();
  infoPanel.position(0, 0);
  infoPanel.size(width, height);
  infoPanel.style("background", "rgba(0,0,0,0.55)");
  infoPanel.style("display", "none");
  infoPanel.style("align-items", "flex-end");
  infoPanel.style("justify-content", "center");
  infoPanel.style("z-index", "1000");
  infoPanel.style("font-family", FONT);
  infoPanel.id("info-overlay");

  const card = createDiv();
  card.parent(infoPanel);
  card.style("width", "100%");
  card.style("max-width", "600px");
  card.style("background", C.surface);
  card.style("border-top-left-radius", "18px");
  card.style("border-top-right-radius", "18px");
  card.style("border-top", `1px solid ${C.line2}`);
  card.style("padding", "10px 18px 22px 18px");
  card.style("box-sizing", "border-box");
  card.style("max-height", "80%");
  card.style("overflow-y", "auto");

  const grip = createDiv();
  grip.parent(card);
  grip.style("width", "38px");
  grip.style("height", "4px");
  grip.style("border-radius", "2px");
  grip.style("background", C.line2);
  grip.style("margin", "0 auto 14px auto");

  const headerRow = createDiv();
  headerRow.parent(card);
  headerRow.style("display", "flex");
  headerRow.style("justify-content", "space-between");
  headerRow.style("align-items", "center");
  headerRow.style("margin-bottom", "12px");
  infoTitleEl = createDiv("");
  infoTitleEl.parent(headerRow);
  infoTitleEl.style("font-family", SERIF);
  infoTitleEl.style("font-size", "18px");
  infoTitleEl.style("font-weight", "700");
  infoTitleEl.style("color", C.text);
  const closeBtn = createDiv("닫기");
  closeBtn.parent(headerRow);
  closeBtn.style("color", C.textDim);
  closeBtn.style("font-size", "13px");
  closeBtn.style("cursor", "pointer");
  closeBtn.style("padding", "6px 10px");
  closeBtn.mousePressed(closeInfoPanel);

  // 이미지 영역
  infoImgEl = createDiv();
  infoImgEl.parent(card);
  infoImgEl.style("width", "100%");
  infoImgEl.style("height", "220px");
  infoImgEl.style("background", C.surface2);
  infoImgEl.style("border", `1px solid ${C.line}`);
  infoImgEl.style("border-radius", "12px");
  infoImgEl.style("overflow", "hidden");
  infoImgEl.style("display", "flex");
  infoImgEl.style("align-items", "center");
  infoImgEl.style("justify-content", "center");
  infoImgEl.style("margin-bottom", "12px");

  // 설명 영역
  infoBodyEl = createDiv("");
  infoBodyEl.parent(card);
  infoBodyEl.style("color", C.textDim);
  infoBodyEl.style("font-size", "13px");
  infoBodyEl.style("line-height", "1.6");
  infoBodyEl.style("min-height", "40px");
  infoBodyEl.style("margin-bottom", "16px");

  infoCloseAndHideBtn = createDiv("표시 끄기");
  infoCloseAndHideBtn.parent(card);
  infoCloseAndHideBtn.style("text-align", "center");
  infoCloseAndHideBtn.style("background", "transparent");
  infoCloseAndHideBtn.style("border", `1px solid ${C.line2}`);
  infoCloseAndHideBtn.style("color", C.textDim);
  infoCloseAndHideBtn.style("border-radius", "10px");
  infoCloseAndHideBtn.style("padding", "11px");
  infoCloseAndHideBtn.style("font-size", "13px");
  infoCloseAndHideBtn.style("cursor", "pointer");
  infoCloseAndHideBtn.mousePressed(() => {
    deactivateMarker();
    closeInfoPanel();
  });

  infoPanel.mousePressed((e) => {
    if (e.target === infoPanel.elt) closeInfoPanel();
  });
}

function openMarkerDetail(key) {
  const def = markerDefs.find((d) => d.key === key);
  const arr = markerDetails[key] || [];
  const total = def.points.length;

  // ★ 패널을 먼저 연다 (내용 채우기 전에 열려서 즉시 반응하는 느낌)
  infoPanel.style("display", "flex");
  infoTitleEl.html(def.label);

  infoImgEl.style("display", "block");
  infoImgEl.style("height", "auto");
  infoImgEl.style("background", "transparent");
  infoImgEl.style("border", "none");
  infoImgEl.html("");
  infoBodyEl.html("");

  const phSvg = `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="${C.textFaint}" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>`;
  const count = Math.max(total, arr.length, 1);

  for (let i = 0; i < count; i++) {
    const detail = arr[i] || {};

    // 이미지 위 설명
    if (detail.desc) {
      const cap = createDiv(detail.desc); cap.parent(infoImgEl);
      cap.style('color', C.text);
      cap.style('font-size', '13px'); cap.style('line-height', '1.55');
      cap.style('margin', i === 0 ? '0 0 7px 2px' : '16px 0 7px 2px');
    }

    // 이미지 박스
    const box = createDiv(); box.parent(infoImgEl);
    box.style('width', '100%');
    box.style('background', C.surface2); box.style('border', `1px solid ${C.line}`);
    box.style('border-radius', '12px'); box.style('overflow', 'hidden');
    box.style('display', 'flex'); box.style('align-items', 'center'); box.style('justify-content', 'center');
    if (i > 0 && !detail.desc) box.style('margin-top', '16px');

    if (detail.img) {
      // ★ preload로 받아둔 캐시 이미지를 재사용 (네트워크 요청 없음 → 즉시 표시)
      const cached = detailImgCache[detail.img];
      let imgEl;
      if (cached && cached.complete) {
        // 캐시된 걸 복제해서 붙임
        imgEl = cached.cloneNode();
        imgEl.style.position = 'static';
        imgEl.style.width = '100%'; imgEl.style.height = 'auto';
        imgEl.style.opacity = '1'; imgEl.style.left = 'auto';
        imgEl.style.pointerEvents = 'auto'; imgEl.style.display = 'block';
        box.elt.appendChild(imgEl);
      } else {
        // 아직 캐시 안 됐으면 새로 (async 디코딩으로 UI 안 멈춤)
        const im = new Image();
        im.src = detail.img;
        im.decoding = 'async'; im.loading = 'eager';
        im.style.width = '100%'; im.style.height = 'auto'; im.style.display = 'block';
        im.onerror = () => { im.style.display='none'; const ph=createDiv(); ph.parent(box); ph.html(phSvg); ph.style('padding','40px 0'); };
        box.elt.appendChild(im);
      }
    } else {
      const ph = createDiv(); ph.parent(box); ph.html(phSvg); ph.style('padding','40px 0');
    }

    // 영상
    if (detail.video) {
      const vwrap = createDiv(); vwrap.parent(infoImgEl);
      vwrap.style('margin-top', '8px');
      const vcap = createDiv('영상'); vcap.parent(vwrap);
      vcap.style('font-family', SERIF); vcap.style('color', C.text);
      vcap.style('font-size', '13px'); vcap.style('font-weight', '700'); vcap.style('margin', '0 0 6px 2px');

      const cached = detailVideoCache[detail.video];
      const vid = cached || document.createElement('video');
      vid.setAttribute('controls', ''); vid.setAttribute('playsinline', '');
      vid.muted = false;
      vid.style.position = 'static';
      vid.style.width = '100%'; vid.style.height = 'auto';
      vid.style.opacity = '1'; vid.style.pointerEvents = 'auto'; vid.style.left = 'auto';
      vid.style.borderRadius = '12px'; vid.style.background = '#000'; vid.style.display = 'block';
      vid.currentTime = 0;
      vwrap.elt.appendChild(vid);
    }
  }
}

function openInfoPanelForKey(key) { openMarkerDetail(key); }

function closeInfoPanel() {
  infoPanel.style('display', 'none');
  // 재생 중인 영상 모두 정지 + 처음으로 되감기
  Object.values(detailVideoCache).forEach(v => {
    try { v.pause(); v.currentTime = 0; } catch (e) {}
  });
}

function computeLayout() {
  const planAreaH = height * PLAN_AREA_RATIO;
  const availW = width - PAD * 2,
    availH = planAreaH - PAD * 2 - 52;
  const ir = planImgRotated.width / planImgRotated.height;
  let dw = availW,
    dh = availW / ir;
  if (dh > availH) {
    dh = availH;
    dw = availH * ir;
  }
  const offsetX = (width - dw) / 2,
    offsetY = 52 + (planAreaH - 52 - dh) / 2;
  return { dw, dh, offsetX, offsetY };
}
function toRotatedFrac(x, y) {
  return { rx: 1 - y, ry: x };
}

function draw() {
  background(26, 22, 20);
  if (currentScreen !== "plan" || !planImgRotated) return;
  const { dw, dh, offsetX, offsetY } = computeLayout();
  const markerSize = Math.max(dw * MARKER_FRAC, MIN_MARKER_PX);
  image(planImgRotated, offsetX, offsetY, dw, dh);
  handleHeldArrowKeys();
  const blink = 0.575 + 0.425 * sin(millis() * 0.0037);

  activeClusters.forEach((cluster, i) => {
    const { rx, ry } = toRotatedFrac(cluster.cx, cluster.cy);
    const px = offsetX + rx * dw,
      py = offsetY + ry * dh;
    drawGlowingMarker(px, py, markerSize, blink);
    // 여러 개 켜졌을 때, 방향키 조정 대상엔 흰 테두리 표시
    if (activeClusters.length > 1 && i === selectedPointIndex) {
      push();
      noFill();
      stroke(255, 255, 255, 200);
      strokeWeight(1.5);
      rectMode(CENTER);
      rect(px, py, markerSize * 1.9, markerSize * 1.9);
      pop();
    }
  });
}

// 진한 형광 빨강 표시등: 넓은 후광 + 진한 몸체 + 밝은 코어 + 흰 하이라이트
function drawGlowingMarker(px, py, size, blink) {
  const ctx = drawingContext;
  ctx.save();
  noStroke();

  // 1) 바깥 넓은 후광
  ctx.shadowColor = `rgba(255,10,30,${0.95 * blink})`;
  ctx.shadowBlur = size * 3.0 * blink;
  fill(255, 12, 32, 90 * blink);
  rect(px, py, size * 1.05, size * 1.05);

  // 2) 몸체 - 진한 형광 빨강
  ctx.shadowBlur = size * 1.5 * blink;
  fill(240, 20, 35, 180 * blink);
  rect(px, py, size, size);

  // 3) 코어 - 더 밝은 빨강
  ctx.shadowBlur = size * 0.6;
  fill(255, 45, 55, 230 * blink);
  rect(px, py, size * 0.72, size * 0.72);

  // 4) 중심 하이라이트 - 발광체 느낌
  ctx.shadowBlur = 0;
  fill(255, 190, 190, 210 * blink);
  rect(px, py, size * 0.28, size * 0.28);

  ctx.restore();
}

function handleHeldArrowKeys() {
  if (activeClusters.length === 0) return;
  let dx = 0,
    dy = 0;
  if (keyIsDown(LEFT_ARROW)) dx -= MOVE_STEP_FAST;
  if (keyIsDown(RIGHT_ARROW)) dx += MOVE_STEP_FAST;
  if (keyIsDown(UP_ARROW)) dy -= MOVE_STEP_FAST;
  if (keyIsDown(DOWN_ARROW)) dy += MOVE_STEP_FAST;
  if (dx !== 0 || dy !== 0) moveActiveClusters(dx, dy);
}
function keyPressed() {
  if (currentScreen !== "plan" || activeClusters.length === 0) return;
  let dx = 0,
    dy = 0;
  if (keyCode === LEFT_ARROW) dx = -MOVE_STEP;
  else if (keyCode === RIGHT_ARROW) dx = MOVE_STEP;
  else if (keyCode === UP_ARROW) dy = -MOVE_STEP;
  else if (keyCode === DOWN_ARROW) dy = MOVE_STEP;
  if (dx !== 0 || dy !== 0) {
    moveActiveClusters(dx, dy);
    return false;
  }
}
function moveActiveClusters(screenDx, screenDy) {
  const origDx = screenDy,
    origDy = -screenDx;
  const cluster = activeClusters[selectedPointIndex];
  if (!cluster) return;
  cluster.members.forEach((m) => {
    m.pt.x = constrain(m.pt.x + origDx, 0, 1);
    m.pt.y = constrain(m.pt.y + origDy, 0, 1);
  });
  cluster.cx = constrain(cluster.cx + origDx, 0, 1);
  cluster.cy = constrain(cluster.cy + origDy, 0, 1);
  updateReadout();
}

function createFoodScreen() {
  foodDiv = createDiv();
  foodDiv.position(0, 0);
  foodDiv.size(windowWidth, windowHeight);
  foodDiv.style("display", "none");
  foodDiv.style("background", C.bg);
  foodDiv.style("overflow-y", "auto");
  foodDiv.style("z-index", "10");
  foodDiv.style("box-sizing", "border-box");
  foodDiv.style("font-family", FONT);

  const topBar = createDiv();
  topBar.parent(foodDiv);
  topBar.style("position", "sticky");
  topBar.style("top", "0");
  topBar.style("z-index", "5");
  styleTopBar(topBar);
  makeBackButton(topBar, () => {
    if (foodContentArea.style("display") === "block") showFoodCategoryList();
    else showScreen("home");
  });
  foodTitleEl = makeTitle(topBar, "음식");

  const pad = createDiv();
  pad.parent(foodDiv);
  pad.style("padding", "14px 14px 40px 14px");

  foodCatListArea = createDiv();
  foodCatListArea.parent(pad);
  foodCatListArea.style("display", "grid");
  foodCatListArea.style("grid-template-columns", "1fr 1fr");
  foodCatListArea.style("gap", "11px");
  foodCategories.forEach((cat) => {
    const btn = createDiv();
    btn.parent(foodCatListArea);
    btn.class("card-shadow");
    btn.style("position", "relative");
    btn.style("overflow", "hidden");
    btn.style(
      "background",
      `linear-gradient(180deg, ${C.surface} 0%, ${C.bgSoft} 100%)`
    );
    btn.style("border", `1px solid ${C.line}`);
    btn.style("border-radius", "14px");
    btn.style("padding", "20px 14px");
    btn.style("cursor", "pointer");
    btn.style("transition", "border-color .18s, transform .12s");
    const bOn = () => {
      btn.style("border-color", C.accent);
      btn.style("transform", "translateY(-1px)");
    };
    const bOff = () => {
      btn.style("border-color", C.line);
      btn.style("transform", "none");
    };
    btn.elt.addEventListener("mouseenter", bOn);
    btn.elt.addEventListener("mouseleave", bOff);
    btn.elt.addEventListener("touchstart", bOn, { passive: true });
    btn.elt.addEventListener("touchend", bOff);
    btn.elt.addEventListener("touchcancel", bOff);

    // 상단 골드 라인 디테일
    const topLine = createDiv();
    topLine.parent(btn);
    topLine.style("position", "absolute");
    topLine.style("top", "0");
    topLine.style("left", "14px");
    topLine.style("right", "14px");
    topLine.style("height", "1px");
    topLine.style("background", C.accent);
    topLine.style("opacity", "0.22");
    topLine.style("border-radius", "0 0 2px 2px");

    const t = createDiv(cat.name);
    t.parent(btn);
    t.style("color", C.text);
    t.style("font-size", "16px");
    t.style("font-weight", "700");
    const c = createDiv(`${cat.items.length}개 메뉴`);
    c.parent(btn);
    c.style("color", C.textFaint);
    c.style("font-size", "11.5px");
    c.style("margin-top", "4px");
    if (cat.type === "drink") {
      const tag = createDiv("제조");
      tag.parent(btn);
      tag.style("display", "inline-block");
      tag.style("margin-top", "8px");
      tag.style("color", C.accent);
      tag.style("font-size", "10px");
      tag.style("font-weight", "700");
      tag.style("border", `1px solid ${C.accentSoft}`);
      tag.style("background", C.accentSoft);
      tag.style("border-radius", "5px");
      tag.style("padding", "2px 6px");
    }
    btn.mousePressed(() => showFoodCategoryDetail(cat));
  });

  foodContentArea = createDiv();
  foodContentArea.parent(pad);
  foodContentArea.style("display", "none");
}

function showFoodCategoryList() {
  if (foodTitleEl) foodTitleEl.html("음식");
  foodCatListArea.style("display", "grid");
  foodContentArea.style("display", "none");
  foodContentArea.html("");
}

function showFoodCategoryDetail(cat) {
  foodTitleEl.html(cat.name);
  foodCatListArea.style("display", "none");
  foodContentArea.style("display", "block");
  foodContentArea.html("");

  const isDrink = cat.type === "drink";
  const grid = createDiv();
  grid.parent(foodContentArea);
  grid.style("display", "grid");
  grid.style("grid-template-columns", isDrink ? "1fr 1fr" : "1fr 1fr 1fr");
  grid.style("gap", "10px");
  grid.style("align-items", "stretch");

  cat.items.forEach((item) => {
    const card = createDiv();
    card.parent(grid);
    card.class("card-shadow fade-up");
    card.style("position", "relative");
    card.style("display", "flex");
    card.style("flex-direction", "column");
    card.style("height", "100%");

    const imgBox = createDiv();
    imgBox.parent(card);
    imgBox.style("width", "100%");
    imgBox.style("aspect-ratio", isDrink ? "4 / 3" : "1 / 1");
    imgBox.style("flex", "0 0 auto");
    imgBox.style("box-sizing", "border-box");
    imgBox.style("background", C.surface2);
    imgBox.style("display", "flex");
    imgBox.style("align-items", "center");
    imgBox.style("justify-content", "center");
    imgBox.style("overflow", "hidden");
    imgBox.style("border", `1px solid ${C.line}`);
    imgBox.style("border-bottom", "none");
    imgBox.style("border-radius", "12px 12px 0 0");
    const phSvg = `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="${C.textFaint}" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>`;
    if (item.img) {
      const imgEl = createImg(item.img, item.name);
      imgEl.parent(imgBox);
      imgEl.style("width", "100%");
      imgEl.style("height", "100%");
      imgEl.style("object-fit", "cover");
      imgEl.elt.onerror = () => {
        imgEl.style("display", "none");
        const ph = createDiv();
        ph.parent(imgBox);
        ph.html(phSvg);
      };
    } else {
      const ph = createDiv();
      ph.parent(imgBox);
      ph.html(phSvg);
    }

    const bodyWrap = createDiv();
    bodyWrap.parent(card);
    bodyWrap.style("position", "relative");
    bodyWrap.style("flex", "1 1 auto");
    bodyWrap.style("box-sizing", "border-box");
    bodyWrap.style("background", C.surface);
    bodyWrap.style("border", `1px solid ${C.line}`);
    bodyWrap.style("border-top", "none");
    bodyWrap.style("border-radius", "0 0 12px 12px");
    bodyWrap.style("padding", isDrink ? "7px 11px 9px" : "6px 8px 8px");

    const nameBox = createDiv();
    nameBox.parent(bodyWrap);
    nameBox.html(item.name);
    nameBox.style("position", "absolute");
    nameBox.style("left", "0");
    nameBox.style("bottom", "100%");
    nameBox.style("margin", "0");
    nameBox.style("box-sizing", "border-box");
    nameBox.style("text-align", "left");
    nameBox.style("color", C.text);
    nameBox.style("font-family", SERIF);
    nameBox.style("font-size", isDrink ? "13px" : "11px");
    nameBox.style("font-weight", "700");
    nameBox.style("line-height", "1.15");
    nameBox.style("white-space", "nowrap");
    nameBox.style("background", C.surface2);
    nameBox.style("border", `1px solid ${C.line}`);
    nameBox.style("padding", "3px 7px");
    nameBox.style("border-radius", "5px 9px 0 0");

    const info = createDiv();
    info.parent(bodyWrap);

    const addLine = (value, color) => {
      if (!value) return;
      const line = createDiv();
      line.parent(info);
      line.html(highlightIngredients(value));
      line.style("color", color);
      line.style("font-size", isDrink ? "11px" : "9.5px");
      line.style("line-height", "1.35");
      line.style("margin-top", "1px");
    };

    if (isDrink) {
      parseDrinkRecipe(item.recipe).forEach((seg) => {
        addLine(seg.text, seg.kind === "tool" ? C.tools : C.sauce);
      });
    } else {
      addLine(item.plating, C.plating);
      addLine(item.sauce, C.sauce);
      addLine(item.tools, C.tools);
    }
  });
}

function createSettingScreen() {
  settingDiv = createDiv();
  settingDiv.position(0, 0);
  settingDiv.size(windowWidth, windowHeight);
  settingDiv.style("display", "none");
  settingDiv.style("flex-direction", "column");
  settingDiv.style("background", C.bg);
  settingDiv.style("z-index", "10");
  settingDiv.style("box-sizing", "border-box");
  settingDiv.style("font-family", FONT);
  settingDiv.style("overflow-y", "auto");

  const topBar = createDiv();
  topBar.parent(settingDiv);
  topBar.style("position", "sticky");
  topBar.style("top", "0");
  topBar.style("z-index", "5");
  styleTopBar(topBar);
  makeBackButton(topBar, () => showScreen("home"));
  makeTitle(topBar, "세팅");

  const pad = createDiv();
  pad.parent(settingDiv);
  pad.style("padding", "14px 14px 40px 14px");

  const phSvg = `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="${C.textFaint}" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>`;

  [
    { file: "세팅1.jpg", title: "세팅 1" },
    { file: "세팅2.jpg", title: "세팅 2" },
  ].forEach((it, i) => {
    // 제목
    const title = createDiv(it.title);
    title.parent(pad);
    title.style("font-family", SERIF);
    title.style("color", C.text);
    title.style("font-size", "15px");
    title.style("font-weight", "700");
    title.style("letter-spacing", "0.03em");
    title.style("margin", i === 0 ? "2px 2px 8px 2px" : "20px 2px 8px 2px");

    // 이미지
    const imgWrap = createDiv();
    imgWrap.parent(pad);
    imgWrap.class("card-shadow");
    imgWrap.style("width", "100%");
    imgWrap.style("height", "46vh");
    imgWrap.style("background", C.surface2);
    imgWrap.style("border", `1px solid ${C.line}`);
    imgWrap.style("border-radius", "14px");
    imgWrap.style("overflow", "hidden");
    imgWrap.style("display", "flex");
    imgWrap.style("align-items", "center");
    imgWrap.style("justify-content", "center");

    const imgEl = createImg(it.file, it.title);
    imgEl.parent(imgWrap);
    imgEl.style("width", "100%");
    imgEl.style("height", "100%");
    imgEl.style("object-fit", "cover");
    imgEl.elt.onerror = () => {
      imgEl.style("display", "none");
      const ph = createDiv();
      ph.parent(imgWrap);
      ph.html(phSvg);
    };
  });
}

function createRulesScreen() {
  rulesDiv = createDiv();
  rulesDiv.position(0, 0);
  rulesDiv.size(windowWidth, windowHeight);
  rulesDiv.style("display", "none");
  rulesDiv.style("flex-direction", "column");
  rulesDiv.style("background", C.bg);
  rulesDiv.style("z-index", "10");
  rulesDiv.style("box-sizing", "border-box");
  rulesDiv.style("font-family", FONT);
  const topBar = createDiv();
  topBar.parent(rulesDiv);
  styleTopBar(topBar);
  makeBackButton(topBar, () => showScreen("home"));
  makeTitle(topBar, "규칙");
  const placeholder = createDiv("내용 준비 중입니다.");
  placeholder.parent(rulesDiv);
  placeholder.style("color", C.textFaint);
  placeholder.style("font-size", "13px");
  placeholder.style("text-align", "center");
  placeholder.style("margin-top", "48px");
}
// 음료 레시피 문자열을 "표시할 줄 배열"로 변환
// - '/' 는 무조건 줄바꿈 (제조 단계 구분)
// - 정량 재료(숫자+단위 또는 '펌프/스쿱')가 콤마로 이어지면 콤마마다 줄바꿈
// - 정량 아닌 나열(얼음, 토닉, 레몬칩 등)은 한 줄 유지, 단 '빨대'만 분리
// 반환: [{text, kind}] kind: 'recipe'(노랑) | 'tool'(집기색)
function parseDrinkRecipe(recipe) {
  const out = [];
  const isQuant = (s) =>
    /\d+\s*(ml|g)|\d+\s*펌프|\d+\s*스쿱|\d+~\d+\s*스쿱|가득/.test(s);
  const isStraw = (s) => /빨대/.test(s);
  const isNote = (s) =>
    /부어|섞어|나간다|올려|따라|앞에서|제공/.test(s) && !isQuant(s);

  recipe.split("/").forEach((segRaw) => {
    const seg = segRaw.trim();
    if (!seg) return;
    const parts = seg
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    let buffer = []; // 연속된 비정량(빨대·노트 제외) 항목 모음
    const flush = () => {
      if (buffer.length) {
        out.push({ text: buffer.join(", "), kind: "recipe" });
        buffer = [];
      }
    };

    parts.forEach((p) => {
      if (isStraw(p)) {
        flush();
        out.push({ text: p, kind: "tool" });
      } else if (isNote(p)) {
        flush();
        out.push({ text: p, kind: "tool" });
      } else if (isQuant(p)) {
        flush();
        out.push({ text: p, kind: "recipe" });
      } // 정량은 각자 줄
      else {
        buffer.push(p);
      } // 비정량은 모아서 한 줄
    });
    flush();
  });
  return out;
}

let detailImgCache = {}; // 파일명 -> HTMLImageElement

let detailVideoCache = {};  // 파일명 -> video 요소

function preloadDetailImages() {
  Object.values(markerDetails).forEach(arr => {
    arr.forEach(d => {
      // 이미지 preload
      if (d.img && !detailImgCache[d.img]) {
        const im = new Image();
        im.src = d.img;
        im.style.position = 'absolute';
        im.style.width = '1px'; im.style.height = '1px';
        im.style.opacity = '0'; im.style.left = '-9999px';
        im.style.pointerEvents = 'none';
        document.body.appendChild(im);
        detailImgCache[d.img] = im;
      }
      // 영상 preload (이게 지워졌을 수 있음)
      if (d.video && !detailVideoCache[d.video]) {
        const v = document.createElement('video');
        v.src = d.video;
        v.preload = 'auto';
        v.muted = true;
        v.setAttribute('playsinline', '');
        v.load();
        v.style.position = 'absolute';
        v.style.width = '1px'; v.style.height = '1px';
        v.style.opacity = '0'; v.style.pointerEvents = 'none';
        v.style.left = '-9999px';
        document.body.appendChild(v);
        detailVideoCache[d.video] = v;
      }
    });
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  location.reload();
}
