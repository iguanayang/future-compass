/**
 * Trait exploration content model.
 * Keep all coordinate copy, option tags, weights, and clue text together so facilitators can tune them safely.
 */
export const traitTags = [
  "好奇探索",
  "創意表達",
  "細膩觀察",
  "支持他人",
  "主動行動",
  "解決問題",
  "組織規劃",
  "持續成長",
  "人際連結",
  "自主選擇",
] as const;

export type TraitTag = (typeof traitTags)[number];

export type TraitDefinition = {
  tag: TraitTag;
  icon: "compass" | "sparkles" | "eye" | "heart" | "rocket" | "wrench" | "list" | "growth" | "message" | "map";
  description: string;
};

export type TraitOption = {
  id: string;
  label: string;
  clue: string;
  weights: Partial<Record<TraitTag, number>>;
};

export type TraitCoordinate = {
  id: string;
  title: string;
  question: string;
  options: TraitOption[];
};

export type ExplorationAnswer = { questionId: string; optionId: string };

export type TraitScore = {
  tag: TraitTag;
  score: number;
  strongSignalCount: number;
  coordinateCount: number;
  recencyScore: number;
  firstSignalPosition: number;
  fallbackPosition: number;
};

export type AuroraObservation = {
  signature: [TraitTag, TraitTag, TraitTag];
  combinationKey: string;
  full: string;
  compact: string;
};

export const traitDefinitions: Record<TraitTag, TraitDefinition> = {
  好奇探索: { tag: "好奇探索", icon: "compass", description: "新鮮景象與不同可能，常會讓你想靠近一點看看。" },
  創意表達: { tag: "創意表達", icon: "sparkles", description: "你可能會在把想法做成自己的樣子時，感到特別有能量。" },
  細膩觀察: { tag: "細膩觀察", icon: "eye", description: "你比較容易注意到正在發生的事，也願意先看清楚。" },
  支持他人: { tag: "支持他人", icon: "heart", description: "當身邊的人需要時，你可能自然會想給出一點幫忙。" },
  主動行動: { tag: "主動行動", icon: "rocket", description: "遇到需要處理的事時，你比較容易先跨出第一步。" },
  解決問題: { tag: "解決問題", icon: "wrench", description: "複雜或卡住的事，可能會讓你想找到一個可行的方法。" },
  組織規劃: { tag: "組織規劃", icon: "list", description: "把線索整理成順序，可能會讓你感到踏實。" },
  持續成長: { tag: "持續成長", icon: "growth", description: "學會、調整或比昨天更好，可能會成為你的前進動力。" },
  人際連結: { tag: "人際連結", icon: "message", description: "與人交換想法、一起經驗，可能會讓你感到充電。" },
  自主選擇: { tag: "自主選擇", icon: "map", description: "有空間照自己的節奏決定方向，可能對你很重要。" },
};

const observationAnchors: Record<TraitTag, string> = {
  好奇探索: "從這次選擇看起來，你好像不太能只停在「知道了」；新的可能常會讓你想再靠近一點。",
  創意表達: "從這次選擇看起來，你好像不太滿足於照著既有方式走，常會想把事情做出自己的版本。",
  細膩觀察: "從這次選擇看起來，你可能常先感覺到現場的細節與氣氛，再決定怎麼靠近。",
  支持他人: "從這次選擇看起來，當身邊有人需要時，你可能很自然會多留意一下。",
  主動行動: "從這次選擇看起來，遇到事情時，你好像傾向先讓自己動起來，而不是一直停在原地。",
  解決問題: "從這次選擇看起來，一件事卡住時，你可能會想找到它真正的問題，而不只是在表面繞過去。",
  組織規劃: "從這次選擇看起來，你好像會在混亂裡尋找一個比較順的安排，讓事情慢慢變清楚。",
  持續成長: "從這次選擇看起來，你可能很在意自己有沒有比上次多前進一點，即使只是很小的一步。",
  人際連結: "從這次選擇看起來，和人交換、一起經驗的感覺，可能對你很重要。",
  自主選擇: "從這次選擇看起來，你可能很在意事情能不能照自己的步調進行，也想保留選擇的空間。",
};

type PairBridge = { full: string; compact: string };

const pairBridges: Record<string, PairBridge> = {
  "好奇探索|創意表達": { full: "而「創意表達」和「好奇探索」一起出現時，你可能會先被新點子勾住，再想把它變成自己的樣子。", compact: "你可能會把新點子做成自己的版本。" },
  "好奇探索|細膩觀察": { full: "「好奇探索」和「細膩觀察」一起出現，像是你會想靠近新東西，也常先看清楚它到底怎麼回事。", compact: "你會想探索，也會先看清楚。" },
  "好奇探索|支持他人": { full: "你對新事物感到好奇時，也可能會想拉身邊的人一起看看，而不是只留給自己。", compact: "你常想把新鮮事帶給身邊的人。" },
  "好奇探索|主動行動": { full: "看見新的可能時，你可能很快就想試一點看看，讓好奇不只停在腦中。", compact: "好奇一出現，你可能就想試試看。" },
  "好奇探索|解決問題": { full: "陌生問題可能不只讓你困惑，還會讓你想拆開來研究，看看有沒有另一種解法。", compact: "陌生問題也會讓你想研究看看。" },
  "好奇探索|組織規劃": { full: "遇到新東西時，你可能會一邊探索，一邊想把看到的線索整理成比較清楚的樣子。", compact: "你會一邊探索，一邊整理線索。" },
  "好奇探索|持續成長": { full: "新挑戰對你來說，可能也像是讓自己多會一點的機會，所以不一定只看眼前做得好不好。", compact: "新挑戰也像讓自己多會一點的機會。" },
  "好奇探索|人際連結": { full: "你可能會因為和人交換新鮮想法，而更有動力靠近未知；有人一起聊，世界好像會再大一點。", compact: "和人交換新想法，可能會讓你更有動力。" },
  "好奇探索|自主選擇": { full: "你對新方向有興趣，也很在意能不能照自己的節奏靠近它，不想被太快定義。", compact: "你愛探索，也想照自己的節奏靠近未知。" },
  "創意表達|細膩觀察": { full: "你可能會從細節裡抓到靈感，再做成自己的版本；很多想法也許不是突然冒出來，而是你早就注意到了。", compact: "你可能會從細節裡抓到靈感。" },
  "創意表達|支持他人": { full: "你想到點子時，也可能會在意它能不能真的幫上誰，讓想法不只好玩，還能帶來一點用處。", compact: "你在意點子能不能真的幫上人。" },
  "創意表達|主動行動": { full: "有想法後，你可能更傾向先做出一個樣子，而不是只停在腦中反覆想像。", compact: "有想法後，你可能會想先做出來。" },
  "創意表達|解決問題": { full: "遇到卡關時，你可能會想換一個角度試試；原本的做法不行，也許還有別的路。", compact: "卡關時，你可能會想換個角度試試。" },
  "創意表達|組織規劃": { full: "你不只想得出點子，也可能會想把它整理到能真的完成，讓腦中的畫面慢慢有輪廓。", compact: "你會想把點子整理到真的能完成。" },
  "創意表達|持續成長": { full: "你可能喜歡在一次次修改裡，慢慢把作品磨成更想要的樣子，而不是一次就要完美。", compact: "你可能會在修改裡慢慢做成想要的樣子。" },
  "創意表達|人際連結": { full: "你可能很在意想法能不能和別人產生回應；有人看懂或一起玩，會讓它更有意思。", compact: "想法和人產生回應，可能讓你更有感。" },
  "創意表達|自主選擇": { full: "你會想把想法做成自己真正認同的樣子，不太想只是為了符合別人的期待而改掉感覺。", compact: "你想把想法做成自己真正認同的樣子。" },
  "細膩觀察|支持他人": { full: "你很可能先感覺到別人的狀態，再決定怎麼陪在旁邊；有時候只是多留意一下，就已經是支持。", compact: "你可能很快感覺到別人的狀態。" },
  "細膩觀察|主動行動": { full: "你不一定急著衝，但看清楚後，可能會知道哪一步比較值得先做，行動裡帶著自己的判斷。", compact: "看清楚後，你可能知道哪一步值得先做。" },
  "細膩觀察|解決問題": { full: "你可能會先把問題看仔細，再找真正卡住的地方；比起很快給答案，你更在意有沒有看對。", compact: "你可能會先找真正卡住的地方。" },
  "細膩觀察|組織規劃": { full: "你常會在看懂細節後，想讓事情變得更有條理；整理對你來說，也許是一種把不確定放穩的方式。", compact: "你會在看懂細節後，想讓事情更有條理。" },
  "細膩觀察|持續成長": { full: "你可能會從一次次回看裡，慢慢找到自己要調整的地方，不一定張揚，但會默默留下收穫。", compact: "你可能會從回看裡找到下一步。" },
  "細膩觀察|人際連結": { full: "和人相處時，你可能會留意氣氛和沒說出口的感覺；你在意的，常不只是表面上的熱鬧。", compact: "你可能會留意人與人之間沒說出口的感覺。" },
  "細膩觀察|自主選擇": { full: "你需要先感覺這件事合不合自己，再決定要怎麼走；有自己的判斷，可能會讓你比較安定。", compact: "你會先感覺合不合自己，再決定怎麼走。" },
  "支持他人|主動行動": { full: "有人需要時，你可能不只會關心，也會想真的做點什麼；你的在意常會變成一個具體的動作。", compact: "你的在意，常會變成一個具體動作。" },
  "支持他人|解決問題": { full: "遇到別人卡住時，你可能會想陪著一起把問題拆開，不一定代替對方，但會想找得到出口。", compact: "你可能會陪人一起把問題拆開。" },
  "支持他人|組織規劃": { full: "你可能會把照顧人和把事情安排好，放在同一件事裡；希望大家不只被顧到，也知道接下來怎麼走。", compact: "你常把照顧人和安排事情放在一起。" },
  "支持他人|持續成長": { full: "你會在陪別人或自己度過不順時，慢慢累積下一次的力量；關心不是一次就結束的事。", compact: "你可能會在陪伴裡慢慢累積力量。" },
  "支持他人|人際連結": { full: "你很可能把關係看得重要，也願意在需要時多留一點心；被信任這件事，可能對你有分量。", compact: "你在意關係，也願意多留一點心。" },
  "支持他人|自主選擇": { full: "即使在乎別人，你也可能需要保留自己的節奏和界線；這不是冷淡，而是讓關心走得更久。", compact: "在乎別人時，你也需要保留自己的節奏。" },
  "主動行動|解決問題": { full: "遇到卡關時，你可能會邊動手邊找答案；先讓事情有一點進展，再慢慢把方向修正出來。", compact: "卡關時，你可能會邊動手邊找答案。" },
  "主動行動|組織規劃": { full: "你很可能想先推動事情，再把下一步安排得更清楚；不是只求快，而是想讓它真的往前。", compact: "你會推動事情，也想讓下一步更清楚。" },
  "主動行動|持續成長": { full: "不順的時候，你可能會想先再試一次，而不是停在原地；很多前進感，也許就是這樣慢慢累積的。", compact: "不順時，你可能會想再試一次。" },
  "主動行動|人際連結": { full: "有些事你可能喜歡和人一起動起來，邊做邊有連結；一起開始，會比一直討論更有感。", compact: "你可能喜歡和人一起動起來。" },
  "主動行動|自主選擇": { full: "你喜歡自己決定何時開始，也會照自己的方式推進；主動對你來說，可能和自由感有關。", compact: "你想自己決定何時開始、怎麼推進。" },
  "解決問題|組織規劃": { full: "你可能會把混亂的事拆成能處理的步驟；當線索有了順序，心裡也比較知道從哪裡開始。", compact: "你可能會把混亂拆成能處理的步驟。" },
  "解決問題|持續成長": { full: "卡關時，你可能會把它當成找新方法的練習；不一定馬上成功，但會想從裡面帶走一點東西。", compact: "卡關也可能讓你想找一個新方法。" },
  "解決問題|人際連結": { full: "碰到問題時，你可能會透過討論，把想法變得更清楚；有人一起想，常能讓路線多一點。", compact: "你可能會透過討論，把問題想得更清楚。" },
  "解決問題|自主選擇": { full: "你可能習慣先用自己的方法想清楚，再決定要不要找人；有空間思考，可能會讓你比較有底。", compact: "你可能習慣先用自己的方法想清楚。" },
  "組織規劃|持續成長": { full: "你可能會把每次經驗整理成下一次更順的做法；一點一點調整，會讓你感覺自己真的在前進。", compact: "你會把經驗整理成下一次更順的做法。" },
  "組織規劃|人際連結": { full: "在團隊裡，你可能會自然想讓大家的想法和步調接起來；清楚的分工，也是一種讓人安心的方式。", compact: "你可能會想讓大家的步調接起來。" },
  "組織規劃|自主選擇": { full: "你可能會先排出自己的順序，再照適合的節奏完成；有計畫不是被綁住，而是讓自己更能選擇。", compact: "你會先排出順序，再照自己的節奏完成。" },
  "持續成長|人際連結": { full: "你可能會在和人交流或一起經驗裡，找到繼續往前的力量；有人分享，學到的事好像更留得住。", compact: "和人交流，可能讓你更有前進的力量。" },
  "持續成長|自主選擇": { full: "你很可能想用自己的方式，一點一點做到比昨天更熟練；不一定要很快，但希望是自己選的方向。", compact: "你想用自己的方式，一點一點變得更熟練。" },
  "人際連結|自主選擇": { full: "你在乎跟人的連結，也可能很知道自己需要留多少空間；舒服的關係，可能是能靠近也能做自己的關係。", compact: "你在乎連結，也知道自己需要多少空間。" },
};

function getPairKey(first: TraitTag, second: TraitTag) {
  return [first, second].sort((a, b) => traitTags.indexOf(a) - traitTags.indexOf(b)).join("|");
}

export function getAuroraObservation(traits: TraitDefinition[]): AuroraObservation {
  const [primary, secondary, tertiary] = traits;
  const fallback: [TraitTag, TraitTag, TraitTag] = ["好奇探索", "創意表達", "細膩觀察"];
  if (!primary || !secondary || !tertiary) {
    return {
      signature: fallback,
      combinationKey: fallback.join("__"),
      full: "從這次選擇看起來，你的回答留下了幾條不同方向的線索。它們不一定每一條都像你，但可以當成下一次更認識自己的起點。",
      compact: "這次的選擇留下了幾條不同方向的線索。",
    };
  }

  const bridge = pairBridges[getPairKey(secondary.tag, tertiary.tag)] ?? {
    full: `而「${secondary.tag}」和「${tertiary.tag}」也一起出現，表示你可能會在不同情況下切換這兩種做法。`,
    compact: `「${secondary.tag}」和「${tertiary.tag}」也一起出現。`,
  };

  return {
    signature: [primary.tag, secondary.tag, tertiary.tag],
    combinationKey: [primary.tag, secondary.tag, tertiary.tag].join("__"),
    full: `${observationAnchors[primary.tag]}${bridge.full}`,
    compact: `「${primary.tag}」是這次最亮的訊號；「${secondary.tag}」與「${tertiary.tag}」也一起出現。${bridge.compact}`,
  };
}

export const traitCoordinates: TraitCoordinate[] = [
  {
    id: "free-time",
    title: "自由時間",
    question: "如果今天突然多出 3 小時完全自由的時間，你比較可能拿來做什麼？",
    options: [
      { id: "a", label: "找朋友或跟人聊天", clue: "和人交換近況，可能很容易讓你感到有連結。", weights: { 人際連結: 2, 支持他人: 1 } },
      { id: "b", label: "看影片、追劇、滑喜歡的內容", clue: "你可能會先從喜歡的內容裡，收集一些新的感受與靈感。", weights: { 好奇探索: 1, 細膩觀察: 1 } },
      { id: "c", label: "玩遊戲或挑戰某件事", clue: "有一點難度的事，可能反而會讓你想試試看。", weights: { 主動行動: 1, 解決問題: 1 } },
      { id: "d", label: "做自己的興趣或作品", clue: "把時間留給自己的想法，可能對你很重要。", weights: { 創意表達: 1, 自主選擇: 1 } },
      { id: "e", label: "出門走走、看看不同地方", clue: "新鮮的地方與景象，可能很容易讓你感到好奇。", weights: { 好奇探索: 2 } },
      { id: "f", label: "睡覺休息，什麼都不做", clue: "懂得替自己留一點空白，也是一種航行節奏。", weights: { 細膩觀察: 1 } },
      { id: "g", label: "其他", clue: "你可能有一套自己的方式，來安排這段自由時間。", weights: { 自主選擇: 1 } },
    ],
  },
  {
    id: "teamwork",
    title: "一起做事",
    question: "一群人要一起完成一件事，你通常比較自然會做什麼？",
    options: [
      { id: "a", label: "先把大家聚起來，決定怎麼做", clue: "當方向還不清楚時，你可能會想先讓事情有個起點。", weights: { 組織規劃: 2, 主動行動: 1 } },
      { id: "b", label: "聽大家的想法，再幫忙整理", clue: "不同人的聲音，可能會讓你想先好好接住再整理。", weights: { 組織規劃: 2, 支持他人: 1 } },
      { id: "c", label: "找到自己能做的部分，直接開始", clue: "找到能出力的位置後，你可能就會想立刻動起來。", weights: { 主動行動: 2, 自主選擇: 1 } },
      { id: "d", label: "注意有沒有人需要幫忙", clue: "團隊裡誰需要一點支援，你可能比較容易先發現。", weights: { 支持他人: 2, 人際連結: 1 } },
      { id: "e", label: "想一些不一樣的方法", clue: "熟悉的路之外，你可能會想看看有沒有別的可能。", weights: { 創意表達: 2, 好奇探索: 1 } },
      { id: "f", label: "等別人分配給我", clue: "先看清楚大家怎麼分工，再找到適合的位置，也是一種方式。", weights: { 細膩觀察: 1, 支持他人: 1 } },
      { id: "g", label: "看情況，不一定", clue: "你可能習慣先讀懂現場，再決定自己的做法。", weights: { 細膩觀察: 2 } },
    ],
  },
  {
    id: "unknown-task",
    title: "遇到不會的事",
    question: "遇到一件完全不會、但又必須處理的事情，你第一個反應比較像？",
    options: [
      { id: "a", label: "自己先研究看看", clue: "碰到陌生的事，你可能會想先自己摸清楚一點。", weights: { 好奇探索: 1, 解決問題: 1 } },
      { id: "b", label: "找人問最快", clue: "知道什麼時候可以借力，可能是你的自然反應。", weights: { 人際連結: 1, 支持他人: 1 } },
      { id: "c", label: "直接試，做錯再改", clue: "先試著走出去，再一路修正，可能很符合你的節奏。", weights: { 主動行動: 2, 持續成長: 1 } },
      { id: "d", label: "先觀察別人怎麼做", clue: "先看懂周圍的做法，能幫你抓到一些關鍵線索。", weights: { 細膩觀察: 2 } },
      { id: "e", label: "找教學、資料或影片", clue: "找到可靠的線索後再前進，可能會讓你更安心。", weights: { 好奇探索: 1, 持續成長: 1 } },
      { id: "f", label: "會先放一下，晚點再處理", clue: "留一點時間讓想法沉澱，也可能是你的處理方式。", weights: { 自主選擇: 1, 細膩觀察: 1 } },
      { id: "g", label: "看事情而定", clue: "你可能會先看清楚情況，再決定最適合的路。", weights: { 細膩觀察: 1, 自主選擇: 1 } },
    ],
  },
  {
    id: "achievement",
    title: "成就感",
    question: "下面哪一種時刻，最容易讓你覺得「今天做得不錯」？",
    options: [
      { id: "a", label: "完成原本覺得很難的事情", clue: "跨過原本有點卡的地方，可能會讓你特別有感。", weights: { 主動行動: 1, 持續成長: 2 } },
      { id: "b", label: "有人因為我的幫忙變得更好", clue: "看見自己的幫忙真的派上用場，可能會讓你很踏實。", weights: { 支持他人: 2, 人際連結: 1 } },
      { id: "c", label: "做出一個自己滿意的東西", clue: "把腦中的畫面變成一個作品，可能會讓你很有成就感。", weights: { 創意表達: 2, 自主選擇: 1 } },
      { id: "d", label: "被別人肯定或稱讚", clue: "當別人看見你的投入，可能會讓你感到被理解。", weights: { 人際連結: 2 } },
      { id: "e", label: "終於把混亂的事情整理好", clue: "讓原本散亂的事變得清楚，可能會帶給你一種滿足。", weights: { 組織規劃: 2, 解決問題: 1 } },
      { id: "f", label: "學會一個以前不會的東西", clue: "多會了一件事，可能就會讓你想再往前一點。", weights: { 持續成長: 2, 好奇探索: 1 } },
      { id: "g", label: "完成自己想做的事就很好", clue: "朝自己選的方向完成一小步，可能就足夠讓你開心。", weights: { 自主選擇: 2, 主動行動: 1 } },
    ],
  },
  {
    id: "friends-find-you",
    title: "朋友找你",
    question: "朋友最有可能因為什麼事情來找你？",
    options: [
      { id: "a", label: "找我聊天、說心事", clue: "別人願意把心事交給你，可能是因為感到被好好接住。", weights: { 支持他人: 2, 人際連結: 2 } },
      { id: "b", label: "問我意見", clue: "你看事情的方式，可能常被身邊的人當成一種參考。", weights: { 支持他人: 1, 細膩觀察: 1 } },
      { id: "c", label: "請我幫忙想辦法", clue: "遇到卡關時，有人可能會想到找你一起拆解問題。", weights: { 解決問題: 2, 創意表達: 1 } },
      { id: "d", label: "找我一起出去或一起玩", clue: "和你一起經驗生活，可能會讓別人覺得很自在。", weights: { 人際連結: 2, 好奇探索: 1 } },
      { id: "e", label: "請我幫忙做某件事情", clue: "別人可能相信你會把能做的部分認真完成。", weights: { 支持他人: 2, 主動行動: 1 } },
      { id: "f", label: "分享有趣的東西給我", clue: "新奇有趣的訊號，可能常常會在你身邊流動。", weights: { 好奇探索: 2, 人際連結: 1 } },
      { id: "g", label: "好像沒有特別固定的原因", clue: "你和不同人相處的方式，可能會隨著情況長出不同樣子。", weights: { 自主選擇: 1, 細膩觀察: 1 } },
    ],
  },
  {
    id: "making-work",
    title: "做一個作品",
    question: "如果今天要做一個自己的作品，你最在意哪件事？",
    options: [
      { id: "a", label: "看起來好不好看", clue: "畫面和細節是否對味，可能會是你在意的訊號。", weights: { 創意表達: 2, 細膩觀察: 1 } },
      { id: "b", label: "有沒有自己的想法", clue: "作品能不能留下自己的聲音，可能對你很重要。", weights: { 創意表達: 2, 自主選擇: 1 } },
      { id: "c", label: "實不實用", clue: "一個想法能不能真的幫上忙，可能會吸引你的注意。", weights: { 解決問題: 2, 組織規劃: 1 } },
      { id: "d", label: "有沒有把它完成", clue: "把一件事走到最後，可能會讓你感到安心。", weights: { 主動行動: 2, 持續成長: 1 } },
      { id: "e", label: "別人會不會喜歡", clue: "看見作品和別人產生連結，可能會讓你很有感。", weights: { 人際連結: 2, 創意表達: 1 } },
      { id: "f", label: "能不能做到比上次更好", clue: "比昨天多前進一點，可能會是你想留住的感覺。", weights: { 持續成長: 2, 主動行動: 1 } },
      { id: "g", label: "做的過程開不開心", clue: "照自己的節奏享受過程，可能比標準答案更重要。", weights: { 自主選擇: 2, 好奇探索: 1 } },
    ],
  },
  {
    id: "trouble",
    title: "碰到麻煩",
    question: "事情突然出問題時，你通常比較像哪一種？",
    options: [
      { id: "a", label: "馬上想辦法處理", clue: "狀況一來，你可能很快就會把注意力放到下一步。", weights: { 主動行動: 2, 解決問題: 1 } },
      { id: "b", label: "先弄清楚到底發生什麼", clue: "把事情看清楚後再動，可能是你的自然節奏。", weights: { 細膩觀察: 2, 解決問題: 1 } },
      { id: "c", label: "找可以幫忙的人", clue: "知道何時一起處理，可能會讓你更快找到出口。", weights: { 人際連結: 1, 支持他人: 1 } },
      { id: "d", label: "先讓自己冷靜一下", clue: "先把自己的狀態放穩，可能幫你看見更多方向。", weights: { 細膩觀察: 2, 自主選擇: 1 } },
      { id: "e", label: "邊做邊調整", clue: "先前進一點、再慢慢修正，可能很符合你的方法。", weights: { 主動行動: 2, 持續成長: 1 } },
      { id: "f", label: "會有點煩，但最後還是會處理", clue: "就算一開始不想面對，你可能還是會把事情帶回軌道。", weights: { 持續成長: 1, 主動行動: 1 } },
      { id: "g", label: "每次都不太一樣", clue: "你可能習慣先讀取狀況，再找到當下適合的反應。", weights: { 細膩觀察: 1, 自主選擇: 1 } },
    ],
  },
  {
    id: "praise",
    title: "最有感的稱讚",
    question: "如果有人這樣稱讚你，哪一句最容易讓你真的開心？",
    options: [
      { id: "a", label: "跟你相處很舒服。", clue: "能讓人放鬆相處，可能是你帶給別人的一種感受。", weights: { 人際連結: 2, 支持他人: 1 } },
      { id: "b", label: "你真的很有想法。", clue: "自己的點子被看見，可能會讓你特別有感。", weights: { 創意表達: 2, 自主選擇: 1 } },
      { id: "c", label: "這件事交給你很放心。", clue: "被信任能穩穩完成一件事，可能會讓你很踏實。", weights: { 主動行動: 1, 組織規劃: 2 } },
      { id: "d", label: "你好厲害，這你也做得到。", clue: "做到原本不確定能不能做到的事，可能會讓你有力量。", weights: { 主動行動: 2, 持續成長: 1 } },
      { id: "e", label: "你很懂別人在想什麼。", clue: "看懂別人的心情和想法，可能是你常用的一種感受力。", weights: { 細膩觀察: 1, 支持他人: 2 } },
      { id: "f", label: "你學東西真的很快。", clue: "快速抓到新事物的脈絡，可能會讓你感到有成就。", weights: { 持續成長: 2, 好奇探索: 1 } },
      { id: "g", label: "你很有自己的風格。", clue: "保留自己的做法與感覺，可能對你來說很重要。", weights: { 創意表達: 2, 自主選擇: 1 } },
    ],
  },
  {
    id: "collaborating-differences",
    title: "團隊合作",
    question: "和一群人合作時，如果大家的想法不太一樣，你比較可能怎麼做？",
    options: [
      { id: "a", label: "先讓每個人都把想法說完", clue: "不同人的聲音，可能會讓你想先好好接住。", weights: { 支持他人: 2, 人際連結: 1 } },
      { id: "b", label: "整理出大家都有共識的部分", clue: "把散開的想法找到交集，可能是你自然會做的事。", weights: { 組織規劃: 2, 細膩觀察: 1 } },
      { id: "c", label: "提出一個新的折衷方法", clue: "卡住的時候，你可能會想找一條沒人走過的新路。", weights: { 創意表達: 2, 解決問題: 1 } },
      { id: "d", label: "先選一個做法，邊做邊調整", clue: "先讓事情前進，再一路修正，可能很符合你的節奏。", weights: { 主動行動: 2, 持續成長: 1 } },
      { id: "e", label: "找出最需要被處理的問題", clue: "在很多意見裡，你可能會先抓住最關鍵的那一點。", weights: { 解決問題: 2, 組織規劃: 1 } },
      { id: "f", label: "先聽聽看，等大家比較有方向", clue: "先讀懂團隊的狀態，再找到位置，也是一種合作方式。", weights: { 細膩觀察: 2, 人際連結: 1 } },
      { id: "g", label: "看當下誰最需要我幫忙", clue: "團隊需要一點支援時，你可能比較容易注意到。", weights: { 支持他人: 2, 主動行動: 1 } },
    ],
  },
  {
    id: "setback",
    title: "面對挫折",
    question: "如果你認真準備了一件事，結果卻沒有想像中好，你通常會怎麼做？",
    options: [
      { id: "a", label: "先難過一下，再看看哪裡能改", clue: "先承接自己的感受，再慢慢找方向，可能是你的節奏。", weights: { 細膩觀察: 1, 持續成長: 2 } },
      { id: "b", label: "立刻重來一次，試不同方法", clue: "沒成功的地方，可能會讓你想再試一個新的做法。", weights: { 主動行動: 2, 解決問題: 1 } },
      { id: "c", label: "找信任的人聊一聊", clue: "遇到不順時，和人交換感受可能會幫你找到新的力量。", weights: { 人際連結: 2, 支持他人: 1 } },
      { id: "d", label: "回頭整理自己學到了什麼", clue: "結果之外，你可能也會想把這次的收穫留下來。", weights: { 持續成長: 2, 組織規劃: 1 } },
      { id: "e", label: "先做別的事，晚點再回來看", clue: "留一點距離，可能會讓你重新看見事情的樣子。", weights: { 自主選擇: 1, 細膩觀察: 2 } },
      { id: "f", label: "想辦法把問題拆小一點處理", clue: "把大麻煩拆成能處理的小步驟，可能會讓你比較安心。", weights: { 解決問題: 2, 組織規劃: 1 } },
      { id: "g", label: "提醒自己下次還有機會", clue: "你可能願意把一次不順，當成下一段路的準備。", weights: { 持續成長: 2, 主動行動: 1 } },
    ],
  },
];

export function evaluateTraitScores(answers: ExplorationAnswer[]): TraitScore[] {
  const scores = Object.fromEntries(
    traitTags.map((tag, fallbackPosition) => [tag, {
      tag,
      score: 0,
      strongSignalCount: 0,
      coordinateCount: 0,
      recencyScore: 0,
      firstSignalPosition: Number.POSITIVE_INFINITY,
      fallbackPosition,
    }]),
  ) as Record<TraitTag, TraitScore>;

  answers.forEach((answer, answerPosition) => {
    const coordinate = traitCoordinates.find((item) => item.id === answer.questionId);
    const option = coordinate?.options.find((item) => item.id === answer.optionId);
    if (!option) return;

    Object.entries(option.weights).forEach(([tag, rawWeight]) => {
      const weight = rawWeight ?? 0;
      const traitScore = scores[tag as TraitTag];
      traitScore.score += weight;
      traitScore.coordinateCount += 1;
      traitScore.strongSignalCount += weight >= 2 ? 1 : 0;
      traitScore.recencyScore += weight * (answerPosition + 1);
      traitScore.firstSignalPosition = Math.min(traitScore.firstSignalPosition, answerPosition);
    });
  });

  return Object.values(scores).sort((a, b) =>
    b.score - a.score
    || b.strongSignalCount - a.strongSignalCount
    || b.coordinateCount - a.coordinateCount
    || b.recencyScore - a.recencyScore
    || a.firstSignalPosition - b.firstSignalPosition
    || a.fallbackPosition - b.fallbackPosition,
  );
}

export function evaluateTraits(answers: ExplorationAnswer[]) {
  return evaluateTraitScores(answers)
    .slice(0, 3)
    .map(({ tag }) => traitDefinitions[tag]);
}
