export interface Artwork {
  id: number;
  title: string;
  year: string;
  description: string;
  image: string;
  tags: string[];
  fullDescription: string;
  medium: string;
  dimensions: string;
  orientation: "portrait" | "landscape"; // 手動設定: portrait=縦長, landscape=横長
}

export const artworks: Artwork[] = [
  {
    id: 1,
    title: "静物1",
    year: "2022-10",
    description: "りんごと洋梨とレンガブロック",
    image: "/2022-10_F6.jpg",
    tags: ["静物"],
    fullDescription:
      "油彩に初めて挑戦したときの作品です。下地はローアンバーで処理し、仕上げにコーパルペインティングオイルでツヤを付けています。",
    medium: "油彩／カンヴァス",
    dimensions: "F6",
    orientation: "landscape",
  },
  {
    id: 2,
    title: "静物2",
    year: "2023-02",
    description: "パンとぶどうとワイングラス",
    image: "/2023-02_F6.jpg",
    tags: ["静物"],
    fullDescription:
      "下地はウルトラマリンで処理し、仕上げにコーパルペインティングオイルでツヤを付けています。",
    medium: "油彩／カンヴァス",
    dimensions: "F6",
    orientation: "landscape",
  },
  {
    id: 3,
    title: "都庁",
    year: "2023-07",
    description: "南西方向から見た都庁",
    image: "/2023-07_F6.jpg",
    tags: ["風景", "夕方"],
    fullDescription:
      "風景に挑戦したくなり身近な都庁を選択しました。下地はローアンバーで処理し、仕上げにコーパルペインティングオイルでツヤを付けています。",
    medium: "油彩／カンヴァス",
    dimensions: "F6",
    orientation: "landscape",
  },
  {
    id: 4,
    title: "新宿",
    year: "2023-10",
    description: "歩道橋から見た新宿の夜景",
    image: "/2023-10_F8.jpg",
    tags: ["風景", "夜景"],
    fullDescription:
      "夜景に挑戦したくなり、西から東へ移動する際に見かける景色を選択しました。下地は紫系の色を使い、マットペインティングオイルを使いツヤが出ない画面に挑戦しました。",
    medium: "油彩／カンヴァス",
    dimensions: "F8",
    orientation: "portrait",
  },
  {
    id: 5,
    title: "模写『スミレ色のチュニックを着た少女』",
    year: "2024-03",
    description:
      "ジャン=バティスト・グルーズ作『スミレ色のチュニックを着た少女』の模写",
    image: "/2024-03_F6.jpg",
    tags: ["模写", "人物", "肖像"],
    fullDescription:
      "人物画に挑戦したくなり、難易度を考慮してグルーズの本作を模写することにしました。",
    medium: "油彩／カンヴァス",
    dimensions: "F6",
    orientation: "portrait",
  },
  {
    id: 6,
    title:
      "模写『エカチェリーナ・ヴァシリエヴナ・スカヴロンスキー伯爵夫人の肖像』",
    year: "2024-05",
    description: "エリザベート・ルイーズ・ヴィジェ・ル・ブラン作の模写",
    image: "/2024-05_Le_Brun_F8.jpg",
    tags: ["模写", "人物", "肖像"],
    fullDescription:
      "ルブランの作品の模写に挑戦しました。本作から下地にジェッソを塗り始めました。",
    medium: "油彩／カンヴァス",
    dimensions: "F8",
    orientation: "portrait",
  },
  {
    id: 7,
    title: "模写『ラ・シャトル伯爵夫人』",
    year: "2024-11",
    description: "エリザベート・ルイーズ・ヴィジェ・ル・ブラン作の模写",
    image: "/2024-11_Le_Brun_F10.jpg",
    tags: ["模写", "人物", "肖像"],
    fullDescription:
      "前作に続きルブランの作品の模写になります。3層程度ジェッソを塗ってから、やすりで削り下地の層で引っかからないよう工夫をしました。",
    medium: "油彩／カンヴァス",
    dimensions: "F10",
    orientation: "portrait",
  },
  {
    id: 8,
    title: "模写『バルコニーの女性と子ども』",
    year: "2025-01",
    description: "ベルト・モリゾ作の模写",
    image: "/2025-01_morizo_F10.jpg",
    tags: ["模写", "人物", "屋外"],
    fullDescription:
      "印象派時代の作品の模写に挑戦したくて、ベルトモリゾの作品を選びました。",
    medium: "油彩／カンヴァス",
    dimensions: "F10",
    orientation: "portrait",
  },
  {
    id: 9,
    title: "模写『赤い絨毯』",
    year: "2025-02",
    description: "レッサー・ユリィ作の模写",
    image: "/2025-02_red_carpet_M12.jpg",
    tags: ["模写", "人物", "屋内"],
    fullDescription:
      "前作で印象派に近い作品の要点理解が少し進んだので、挑戦したかったレッサー・ユリィの作品を模写しました。ペインティングナイフも使いながら厚塗りを意識しました。",
    medium: "油彩／カンヴァス",
    dimensions: "M12",
    orientation: "portrait",
  },
  {
    id: 10,
    title: "模写『夜のポツダム広場』",
    year: "2025-04",
    description: "レッサー・ユリィ作の模写",
    image: "/2025-04_potsdam_F12.jpg",
    tags: ["模写", "風景", "夜景"],
    fullDescription: "前作に引き続きレッサーユリィ作品の模写になります。",
    medium: "油彩／カンヴァス",
    dimensions: "F12",
    orientation: "landscape",
  },
  {
    id: 11,
    title: "模写『春――リッピヒ・イロナの肖像』",
    year: "2025-08",
    description: "ロツ・カーロイ作の模写",
    image: "/2025-08_Spring_Portrait_of_Ilona_Lippich_P15.jpg",
    tags: ["模写", "人物", "肖像"],
    fullDescription:
      "以前からロツ・カーロイのこの作品に挑戦してみたっかたので模写しました。",
    medium: "油彩／カンヴァス",
    dimensions: "P15",
    orientation: "portrait",
  },
  {
    id: 12,
    title: "模写『コリウール』",
    year: "2025-11",
    description: "アンリ・マルタン作の模写",
    image: "/2025-11_F8.jpg",
    tags: ["模写", "風景"],
    fullDescription:
      "後期印象派に近い作品に挑戦してみたく、アンリ・マルタンの本作を模写しました。",
    medium: "油彩／カンヴァス",
    dimensions: "F8",
    orientation: "landscape",
  },
];
