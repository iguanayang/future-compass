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
  好奇探索: { tag: "好奇探索", icon: "compass", description: "對陌生事物、新資訊、新環境或不同可能，會想靠近、了解或試試看。" },
  創意表達: { tag: "創意表達", icon: "sparkles", description: "喜歡產生自己的想法，並用作品、做法或表達呈現個人觀點。" },
  細膩觀察: { tag: "細膩觀察", icon: "eye", description: "容易注意情境、細節、變化或人的反應，傾向先理解正在發生什麼。" },
  支持他人: { tag: "支持他人", icon: "heart", description: "當他人有需求、困難或情緒時，傾向提供協助、陪伴或回應。" },
  主動行動: { tag: "主動行動", icon: "rocket", description: "面對事情時，傾向開始做、採取行動或推動事情往前。" },
  解決問題: { tag: "解決問題", icon: "wrench", description: "面對困難時，傾向找原因、拆解問題、比較方法並找可行方案。" },
  組織規劃: { tag: "組織規劃", icon: "list", description: "傾向整理資訊、安排順序、分配步驟，讓事情更有結構、可執行。" },
  持續成長: { tag: "持續成長", icon: "growth", description: "願意從經驗、失敗與練習中學習，讓下一次比這一次更好。" },
  人際連結: { tag: "人際連結", icon: "message", description: "喜歡透過互動、分享、合作或陪伴與他人建立關係。" },
  自主選擇: { tag: "自主選擇", icon: "map", description: "重視自己的感受、想法與選擇，傾向依據真正想要什麼做決定。" },
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
    title: "突然有空",
    question: "如果今天突然多出 3 小時，而且完全沒事，你最可能做什麼？",
    options: [
      { id: "a", label: "找朋友聊天、見面或一起出去", clue: "你把空下來的時間拿去靠近朋友；和人一起做點什麼，可能會讓你更有精神。", weights: { 人際連結: 2 } },
      { id: "b", label: "找最近有興趣的東西來看", clue: "新資訊一出現，你可能就想點開看看，弄懂它到底有沒有意思。", weights: { 好奇探索: 2 } },
      { id: "c", label: "玩遊戲、運動或挑戰想做的事", clue: "想做的事一出現，你可能就會想動起來試試。", weights: { 主動行動: 2 } },
      { id: "d", label: "畫圖、拍片、寫東西或做自己的作品", clue: "你想把自己的想法做成看得見的東西，也想照自己的方式完成。", weights: { 創意表達: 2, 自主選擇: 1 } },
      { id: "e", label: "去沒去過的地方走走看看", clue: "沒去過的地方像一個新入口；你想自己決定怎麼靠近它。", weights: { 好奇探索: 2, 自主選擇: 1 } },
      { id: "f", label: "把一直想做但還沒做的事完成", clue: "你會想把自己真正想做的事情帶到完成。", weights: { 主動行動: 2, 自主選擇: 1 } },
      { id: "g", label: "耍廢休息，什麼都不安排", clue: "替自己留白也可以，這一題不會替你下任何結論。", weights: {} },
    ],
  },
  {
    id: "teamwork",
    title: "大家一起做",
    question: "班上或社團要一起完成一件事，你通常比較像哪一種？",
    options: [
      { id: "a", label: "跟大家確認要做什麼，順便排一下怎麼做", clue: "你會想先讓目標和順序清楚，也會主動和大家對齊。", weights: { 組織規劃: 2, 人際連結: 1 } },
      { id: "b", label: "看有什麼還沒人做，挑一個直接開始", clue: "看到還沒人做的事，你可能會自己挑一個開始，也願意選適合自己的位置。", weights: { 主動行動: 2, 自主選擇: 1 } },
      { id: "c", label: "先聽大家怎麼想，再幫忙整理一下", clue: "你先接住大家的想法，再把散開的資訊整理起來。", weights: { 組織規劃: 2, 細膩觀察: 1 } },
      { id: "d", label: "看看有沒有人卡住，需要幫忙", clue: "你注意到誰卡住時，可能會想先了解，再給點幫忙。", weights: { 支持他人: 2, 細膩觀察: 1 } },
      { id: "e", label: "想一個不一樣、比較有趣的做法", clue: "你會想把事情做得不一樣，也會留意新的可能。", weights: { 創意表達: 2, 好奇探索: 1 } },
      { id: "f", label: "先搞清楚現在到底卡在哪裡", clue: "比起急著開始，你可能先想找到真正卡住的地方。", weights: { 解決問題: 2 } },
      { id: "g", label: "先看看大家怎麼做，再決定我要做什麼", clue: "你習慣先讀懂現場，再決定自己的位置。", weights: { 細膩觀察: 2 } },
    ],
  },
  {
    id: "unknown-task",
    title: "沒玩過的東西",
    question: "看到一個以前完全沒碰過的東西，你通常會？",
    options: [
      { id: "a", label: "先看看這到底是什麼", clue: "陌生東西會讓你先想弄懂，也會先留意它的樣子。", weights: { 好奇探索: 2, 細膩觀察: 1 } },
      { id: "b", label: "有機會的話就自己玩玩看", clue: "你不只想知道，還想親自試一下。", weights: { 主動行動: 2, 好奇探索: 1 } },
      { id: "c", label: "問玩過的人「這到底在幹嘛？」", clue: "你會透過問人來接近新事物；重點是想弄懂它。", weights: { 好奇探索: 1, 人際連結: 1 } },
      { id: "d", label: "先看別人怎麼玩", clue: "你可能先從別人的玩法裡看出規則，再決定要不要靠近。", weights: { 細膩觀察: 2, 好奇探索: 1 } },
      { id: "e", label: "覺得有趣的話，會繼續查下去", clue: "有趣的事會讓你繼續查下去，也願意多學一點。", weights: { 好奇探索: 2, 持續成長: 1 } },
      { id: "f", label: "會想試試看能不能玩出自己的方法", clue: "你想試出自己的玩法，不只照著別人的方式。", weights: { 創意表達: 2, 好奇探索: 1 } },
      { id: "g", label: "沒興趣的話，我就先跳過", clue: "沒有興趣就跳過，代表你會把時間留給自己真的想要的東西。", weights: { 自主選擇: 1 } },
    ],
  },
  {
    id: "achievement",
    title: "今天做得不錯",
    question: "哪一種情況最容易讓你覺得：「今天的我還不錯！」",
    options: [
      { id: "a", label: "原本不會的東西，終於學會了", clue: "原本不會的事慢慢學會，可能會讓你很有感。", weights: { 持續成長: 2 } },
      { id: "b", label: "我幫了忙，對方真的有變輕鬆", clue: "看見自己的幫忙真的派上用場，可能會讓你很踏實。", weights: { 支持他人: 2 } },
      { id: "c", label: "做出一個自己很喜歡的東西", clue: "把想法做成一個自己喜歡的樣子，可能讓你很有成就感。", weights: { 創意表達: 2, 自主選擇: 1 } },
      { id: "d", label: "拖很久的事情終於被我做完", clue: "把拖很久的事真的做完，可能會讓你鬆一口氣。", weights: { 主動行動: 2 } },
      { id: "e", label: "原本超亂的東西終於整理好了", clue: "把原本散亂的事整理清楚，可能會帶給你一種滿足。", weights: { 組織規劃: 2 } },
      { id: "f", label: "卡很久的問題終於被我解掉", clue: "找到一個真的能解開卡點的方法，可能讓你很有感。", weights: { 解決問題: 2 } },
      { id: "g", label: "今天做的就是我自己想做的事", clue: "照著自己真心想做的方向過一天，可能就讓你覺得不錯。", weights: { 自主選擇: 2 } },
    ],
  },
  {
    id: "friends-find-you",
    title: "朋友找你",
    question: "朋友最有可能為了什麼事跑來找你？",
    options: [
      { id: "a", label: "想聊天、講最近發生的事", clue: "朋友願意找你分享生活，可能是因為和你互動很自在。", weights: { 人際連結: 2 } },
      { id: "b", label: "心情不好，想找我說說", clue: "朋友心情不好時願意找你，可能感覺得到你願意陪著聽。", weights: { 支持他人: 2, 人際連結: 1 } },
      { id: "c", label: "卡住了，問我有沒有辦法", clue: "遇到卡關時，有人可能會想到找你一起想出路。", weights: { 解決問題: 2 } },
      { id: "d", label: "東西很多很亂，找我一起理一理", clue: "把散亂的事理出順序，可能是朋友也會想到找你的地方。", weights: { 組織規劃: 2 } },
      { id: "e", label: "想問我有沒有什麼新點子", clue: "朋友可能會期待你帶來一個不一樣的想法。", weights: { 創意表達: 2 } },
      { id: "f", label: "揪我出去玩，或一起試沒玩過的東西", clue: "有人會想和你一起去玩、一起碰新東西。", weights: { 人際連結: 1, 好奇探索: 1 } },
      { id: "g", label: "好像沒有固定，什麼事都有可能", clue: "每段關係都有不同樣子，這一題不急著替你貼標籤。", weights: {} },
    ],
  },
  {
    id: "making-work",
    title: "做自己的東西",
    question: "如果要做一個完全屬於自己的作品，你最在意什麼？",
    options: [
      { id: "a", label: "有沒有把我的想法做出來", clue: "你最在意作品有沒有把自己的想法真的做出來。", weights: { 創意表達: 2 } },
      { id: "b", label: "小地方有沒有做到我滿意", clue: "你會留意小地方有沒有做到自己想要的樣子。", weights: { 細膩觀察: 2 } },
      { id: "c", label: "做出來到底有沒有用", clue: "你會想知道這個作品到底能不能解決什麼、派上什麼用場。", weights: { 解決問題: 2 } },
      { id: "d", label: "可以照我喜歡的方式做", clue: "照著自己喜歡的方式做，對你來說可能很重要。", weights: { 自主選擇: 2 } },
      { id: "e", label: "有沒有比我上次做得更好", clue: "你會拿這次和上次比較，想看看自己有沒有再前進一點。", weights: { 持續成長: 2 } },
      { id: "f", label: "我有沒有真的把它做完", clue: "你在意的不只開始，還想把作品真的帶到完成。", weights: { 主動行動: 2 } },
      { id: "g", label: "做完可以拿去跟別人分享", clue: "你期待作品完成後，能和別人分享這份心情或想法。", weights: { 人際連結: 2 } },
    ],
  },
  {
    id: "trouble",
    title: "突然卡住",
    question: "你正在做一件事，結果突然卡住了。你通常第一個會？",
    options: [
      { id: "a", label: "找找看到底是哪裡出問題", clue: "你會先想找到真正出問題的地方。", weights: { 解決問題: 2 } },
      { id: "b", label: "把現在要做的事情重新理一遍", clue: "把現在要做的事重新排一遍，可能幫你看見下一步。", weights: { 組織規劃: 2 } },
      { id: "c", label: "先試一個方法，不行再換", clue: "你會先讓事情動起來，不行就再換一個方法。", weights: { 主動行動: 2 } },
      { id: "d", label: "回頭看看是不是漏了什麼", clue: "你會回頭看細節，確認是不是漏掉了什麼。", weights: { 細膩觀察: 2 } },
      { id: "e", label: "找一個還沒試過的方法", clue: "你會想往還沒試過的方向看看。", weights: { 好奇探索: 2 } },
      { id: "f", label: "想想這次哪裡可以學起來，下次不要再卡", clue: "你想把這次卡住的經驗留成下一次可用的提醒。", weights: { 持續成長: 2 } },
      { id: "g", label: "換成一個比較適合我的做法", clue: "你會想換成一個自己做起來更順的方式。", weights: { 自主選擇: 2 } },
    ],
  },
  {
    id: "praise",
    title: "朋友卡住了",
    question: "你發現朋友正在為一件事情傷腦筋，你通常比較可能？",
    options: [
      { id: "a", label: "問他：「要不要幫忙？」", clue: "你會先讓對方知道：需要時可以找你。", weights: { 支持他人: 2 } },
      { id: "b", label: "先聽他講到底發生什麼事", clue: "你會先聽對方把事情講完，弄懂他正在煩什麼。", weights: { 細膩觀察: 2, 支持他人: 1 } },
      { id: "c", label: "陪他一起想有沒有其他辦法", clue: "你會陪對方一起找找看，還有沒有其他路可以走。", weights: { 解決問題: 2, 支持他人: 1 } },
      { id: "d", label: "如果我剛好會，就直接幫一點", clue: "如果剛好能出力，你可能會直接幫上一點。", weights: { 支持他人: 2, 主動行動: 1 } },
      { id: "e", label: "幫他把亂七八糟的事情理清楚", clue: "你會想先把亂掉的資訊整理好，讓對方比較知道下一步。", weights: { 組織規劃: 2, 支持他人: 1 } },
      { id: "f", label: "陪他聊一下，不要讓他自己煩", clue: "你願意陪對方聊一下，不讓他一個人悶著。", weights: { 支持他人: 2, 人際連結: 1 } },
      { id: "g", label: "他沒找我的話，我通常先不插手", clue: "你會尊重對方的空間，也照自己的界線決定何時靠近。", weights: { 自主選擇: 1 } },
    ],
  },
  {
    id: "collaborating-differences",
    title: "大家意見不一樣",
    question: "一起做事時，大家意見都不太一樣，你通常比較可能？",
    options: [
      { id: "a", label: "先聽聽每個人到底想怎樣", clue: "你會先聽懂每個人真正想要的是什麼。", weights: { 人際連結: 2, 細膩觀察: 1 } },
      { id: "b", label: "幫忙整理「我們現在到底有哪些選擇」", clue: "你會把眼前的選擇整理清楚，讓大家比較好往下想。", weights: { 組織規劃: 2 } },
      { id: "c", label: "想一個大家都還沒提過的新方法", clue: "你會想提出一個還沒出現過的新做法。", weights: { 創意表達: 2 } },
      { id: "d", label: "找出現在最需要先解決哪件事", clue: "你會先抓住最需要處理的問題，再想怎麼解。", weights: { 解決問題: 2 } },
      { id: "e", label: "先挑一個方法試試看，再說", clue: "你會想先選一個方向動起來，再一路調整。", weights: { 主動行動: 2 } },
      { id: "f", label: "注意一下比較沒說話的人", clue: "你會留意比較少說話的人，想讓他也有被看見。", weights: { 支持他人: 2, 細膩觀察: 1 } },
      { id: "g", label: "如果都可以，我會說我自己比較想選哪個", clue: "你會把自己真正比較想要的選擇說出來。", weights: { 自主選擇: 2 } },
    ],
  },
  {
    id: "setback",
    title: "結果不太 OK",
    question: "你很認真做了一件事，結果卻沒有想像中好。過一下之後，你比較可能？",
    options: [
      { id: "a", label: "回頭看看自己到底哪裡出了問題", clue: "你會回頭看發生了什麼，找找真正卡住的原因。", weights: { 解決問題: 2, 細膩觀察: 1 } },
      { id: "b", label: "想想這次學到了什麼，下次再調整", clue: "你會想把這次的經驗留下來，讓下一次做得更好。", weights: { 持續成長: 2 } },
      { id: "c", label: "換個方法，再試一次", clue: "你願意換一條路再試一次，不把這次當成結束。", weights: { 主動行動: 2, 持續成長: 1 } },
      { id: "d", label: "找信任的人聊聊", clue: "你會找信任的人聊聊，讓心裡的感覺有地方可以放。", weights: { 人際連結: 2 } },
      { id: "e", label: "把發生的事情整理一下，再想下一步", clue: "你會先把事情整理清楚，再想下一步怎麼走。", weights: { 組織規劃: 2 } },
      { id: "f", label: "覺得這方法不適合我，就換自己的方式", clue: "你會想換成更適合自己感覺與節奏的方式。", weights: { 自主選擇: 2 } },
      { id: "g", label: "先接受這次沒做好，不急著馬上做什麼", clue: "先接受這次沒有做好也沒關係；這一題不會替你下任何結論。", weights: {} },
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
