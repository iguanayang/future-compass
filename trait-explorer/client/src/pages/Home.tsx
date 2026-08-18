/**
 * Style reminder — Future Compass / Star Map Archive:
 * Preserve the deep navy, fine star maps, orbit motifs, Aurora Mint action state, and restrained amber reward cues.
 * The interaction is a one-axis personal navigation journey: one living coordinate, one choice, one clue at a time.
 */
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  Compass,
  Eye,
  Heart,
  List,
  Map,
  MessageCircle,
  Orbit,
  Rocket,
  Sparkles,
  Star,
  Telescope,
  TrendingUp,
  Wrench,
} from "lucide-react";
import {
  evaluateTraits,
  getAuroraObservation,
  traitCoordinates,
  type ExplorationAnswer,
  type AuroraObservation,
  type TraitDefinition,
  type TraitOption,
} from "@/data/traitExploration";

type Stage = "home" | "coordinate" | "clue" | "synthesis" | "traits" | "resonance" | "card";
type Resonance = "high" | "some" | "low";

type SavedProgress = {
  stage: Stage;
  coordinateIndex: number;
  answers: ExplorationAnswer[];
  resonance: Resonance | null;
};

const STORAGE_KEY = "future-compass-trait-exploration-v3";
const TOTAL_COORDINATES = traitCoordinates.length;

const resonanceCopy: Record<Resonance, string> = {
  high: "看來我們找到了一些重要線索。",
  some: "有些地方對上了，有些地方還值得繼續探索。",
  low: "這也是一條重要線索。認識自己，本來就不是一次找到答案。",
};

const iconMap = {
  compass: Compass,
  sparkles: Sparkles,
  eye: Eye,
  heart: Heart,
  rocket: Rocket,
  wrench: Wrench,
  list: List,
  growth: TrendingUp,
  message: MessageCircle,
  map: Map,
};

function PrimaryButton({ children, onClick, disabled = false }: { children: ReactNode; onClick: () => void; disabled?: boolean }) {
  return (
    <button className="primary-action" onClick={onClick} disabled={disabled}>
      <span>{children}</span>
      <ArrowRight size={19} strokeWidth={2.4} />
    </button>
  );
}

function StageHeader({ stage, coordinateIndex, onBack }: { stage: Exclude<Stage, "home">; coordinateIndex: number; onBack?: () => void }) {
  const completed = stage === "coordinate" || stage === "clue" ? coordinateIndex + 1 : TOTAL_COORDINATES;
  const label = stage === "coordinate" ? "探索中" : stage === "clue" ? "線索已記下" : stage === "synthesis" ? "整理訊號" : stage === "traits" || stage === "resonance" ? "航行紀錄" : "探索卡";

  return (
    <header className="stage-header">
      {onBack ? (
        <button className="icon-button" onClick={onBack} aria-label="返回上一步"><ArrowLeft size={18} /></button>
      ) : <span className="header-spacer" />}
      <div className="stage-progress" aria-label={`目前已完成 ${completed} 個探索座標，共 ${TOTAL_COORDINATES} 個`}>
        <span className="stage-progress-label">{label}</span>
        <span className="stage-progress-count">{String(completed).padStart(2, "0")} / {String(TOTAL_COORDINATES).padStart(2, "0")}</span>
      </div>
      <span className="mini-brand-mark" aria-label="未來羅盤" role="img"><span /></span>
      <div className="coordinate-track" aria-hidden="true">
        {traitCoordinates.map((coordinate, index) => <span key={coordinate.id} className={index < completed ? "is-recorded" : ""} />)}
      </div>
    </header>
  );
}

function TraitIcon({ trait, size = 19 }: { trait: TraitDefinition; size?: number }) {
  const Icon = iconMap[trait.icon];
  return <Icon size={size} strokeWidth={1.9} />;
}

function HomeView({ onStart, resume }: { onStart: () => void; resume: boolean }) {
  return (
    <section className="view home-view stage-enter">
      <div className="hero-photo" aria-hidden="true" />
      <header className="brand-lockup">
        <span className="brand-mark" aria-hidden="true"><span /></span>
        <div><span className="brand-cn">未來羅盤</span><span className="brand-en">FUTURE COMPASS</span></div>
      </header>

      <div className="home-content">
        <div className="home-archive-strip"><span>PERSONAL STAR ARCHIVE</span><span>FC-TRAIT / NODE 01</span></div>
        <div className="signal-kicker"><Compass size={15} /> 特質探索・航行座標</div>
        <h1>你的星圖，正在等你點亮。</h1>
        <p className="home-subtitle">從 10 個生活座標出發，慢慢看見一些關於自己的線索。</p>
        <div className="time-chip"><Telescope size={16} /> TIME WINDOW / ABOUT 03 MIN</div>

        <div className="orbit-intro" aria-hidden="true">
          <span className="orbit-node orbit-node-a" /><span className="orbit-node orbit-node-b" /><span className="orbit-node orbit-node-c" />
          <Orbit size={128} strokeWidth={0.8} /><div className="orbit-core"><Compass size={28} /></div>
        </div>

        <div className="reward-capsule">
          <p><span className="archive-stamp">STAR MAP SIGNAL</span> 這趟探索會帶你看見</p>
          <div className="reward-list">
            <span><Orbit size={13} /> 10 個生活座標</span>
            <span><Sparkles size={13} /> 3 條特質線索</span>
            <span><BadgeCheck size={13} /> 一張探索卡</span>
          </div>
        </div>
      </div>

      <div className="home-action-zone">
        <PrimaryButton onClick={onStart}>{resume ? "繼續探索" : "開始探索"}</PrimaryButton>
        <p className="action-helper">每次選擇，都會留下一點你的航行線索。</p>
      </div>
    </section>
  );
}

function CoordinateView({ coordinateIndex, onBack, onSelect }: { coordinateIndex: number; onBack: () => void; onSelect: (option: TraitOption) => void }) {
  const coordinate = traitCoordinates[coordinateIndex];

  return (
    <section className="view stage-enter">
      <StageHeader stage="coordinate" coordinateIndex={coordinateIndex} onBack={onBack} />
      <main className="screen-main coordinate-screen">
        <div className="coordinate-heading">
          <span className="eyebrow"><Compass size={14} /> 探索座標 {String(coordinateIndex + 1).padStart(2, "0")}</span>
          <p className="coordinate-name">{coordinate.title}</p>
          <h2>{coordinate.question}</h2>
          <p>選一個最接近你現在的答案就好。</p>
        </div>
        <div className="question-orbit" aria-hidden="true"><span /><span /><span /></div>
        <div className="choice-stack">
          {coordinate.options.map((option, index) => (
            <button className="choice-card" key={option.id} onClick={() => onSelect(option)}>
              <span className="choice-letter">{String.fromCharCode(65 + index)}</span>
              <span>{option.label}</span>
              <ArrowRight size={16} />
            </button>
          ))}
        </div>
      </main>
    </section>
  );
}

function ClueView({ coordinateIndex, option, onBack, onNext }: { coordinateIndex: number; option: TraitOption; onBack: () => void; onNext: () => void }) {
  return (
    <section className="view stage-enter">
      <StageHeader stage="clue" coordinateIndex={coordinateIndex} onBack={onBack} />
      <main className="screen-main clue-screen">
        <div className="clue-starfield" aria-hidden="true">
          <span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span />
        </div>
        <div className="clue-signal" aria-hidden="true"><span /><span /><span /><Star size={22} fill="currentColor" /></div>
        <div className="clue-ledger">
          <span className="eyebrow"><Check size={14} /> 航行訊號已接收</span>
          <p className="archive-code">COORDINATE {String(coordinateIndex + 1).padStart(2, "0")} / {traitCoordinates[coordinateIndex].title}</p>
          <h2>✨ 線索已記下</h2>
          <p className="clue-copy">{option.clue}</p>
          <div className="clue-score"><Sparkles size={15} /> ＋1 線索</div>
        </div>
      </main>
      <div className="bottom-action"><PrimaryButton onClick={onNext}>看看下一步</PrimaryButton></div>
    </section>
  );
}

function SynthesisView({ onBack }: { onBack?: () => void }) {
  return (
    <section className="view stage-enter">
      <StageHeader stage="synthesis" coordinateIndex={TOTAL_COORDINATES - 1} onBack={onBack} />
      <main className="screen-main synthesis-screen">
        <div className="synthesis-map" aria-hidden="true">
          {Array.from({ length: TOTAL_COORDINATES }).map((_, index) => <span key={index} style={{ "--node": index } as React.CSSProperties} />)}
          <svg viewBox="0 0 250 250"><path d="M30 170 L64 104 L105 142 L143 60 L179 128 L220 78" /></svg>
        </div>
        <span className="eyebrow"><Orbit size={14} /> 星圖正在連線</span>
        <h2>{TOTAL_COORDINATES} 個座標已記錄</h2>
        <p>Aurora 正在整理你的航行線索……</p>
      </main>
    </section>
  );
}

function TraitsView({ traits, observation, onBack, onContinue }: { traits: TraitDefinition[]; observation: AuroraObservation; onBack: () => void; onContinue: () => void }) {
  return (
    <section className="view stage-enter">
      <StageHeader stage="traits" coordinateIndex={TOTAL_COORDINATES - 1} onBack={onBack} />
      <main className="screen-main traits-screen">
        <div className="result-intro">
          <span className="eyebrow"><Sparkles size={14} /> AURORA／航行摘要</span>
          <h2>✨ Aurora 在你的<br />航行紀錄裡發現了……</h2>
          <p>從這次的選擇看起來，這三條線索特別明亮。</p>
        </div>
        <div className="trait-stack">
          {traits.map((trait, index) => <TraitCard trait={trait} index={index} key={trait.tag} />)}
        </div>
        <section className="aurora-observation">
          <span className="eyebrow"><Telescope size={14} /> AURORA／觀察</span>
          <h3>🔭 Aurora 觀察</h3>
          <p>{observation.full}</p>
          <small>這是這次選擇留下的線索，有些像、有些不像都很正常。</small>
        </section>
      </main>
      <div className="bottom-action"><PrimaryButton onClick={onContinue}>這個結果像你嗎？</PrimaryButton></div>
    </section>
  );
}

function TraitCard({ trait, index }: { trait: TraitDefinition; index: number }) {
  return (
    <article className="trait-card">
      <div className="trait-number">0{index + 1}</div>
      <div className="trait-icon"><TraitIcon trait={trait} /></div>
      <div><h3>{trait.tag}</h3><p>{trait.description}</p></div>
    </article>
  );
}

function ResonanceView({ resonance, onBack, onSelect, onContinue }: { resonance: Resonance | null; onBack: () => void; onSelect: (value: Resonance) => void; onContinue: () => void }) {
  const choices: { value: Resonance; label: string; descriptor: string }[] = [
    { value: "high", label: "很像我", descriptor: "這些線索有對上" },
    { value: "some", label: "有一點像", descriptor: "有些地方有感覺" },
    { value: "low", label: "不太像", descriptor: "還有更多想認識的地方" },
  ];

  return (
    <section className="view stage-enter">
      <StageHeader stage="resonance" coordinateIndex={TOTAL_COORDINATES - 1} onBack={onBack} />
      <main className="screen-main resonance-screen">
        <div className="resonance-orbit" aria-hidden="true"><span /><Compass size={42} /></div>
        <span className="eyebrow"><Compass size={14} /> 對照你的航行感覺</span>
        <h2>這個結果<br />像你嗎？</h2>
        <p>不用選最好的答案，選你現在最有感的就好。</p>
        <div className="resonance-options">
          {choices.map((choice) => (
            <button className={`resonance-option ${resonance === choice.value ? "is-selected" : ""}`} key={choice.value} onClick={() => onSelect(choice.value)}>
              <span>{choice.label}</span><small>{choice.descriptor}</small><Check size={17} />
            </button>
          ))}
        </div>
        {resonance && <div className="resonance-message stage-enter"><Sparkles size={17} /><p>{resonanceCopy[resonance]}</p></div>}
      </main>
      <div className="bottom-action"><PrimaryButton onClick={onContinue} disabled={!resonance}>建立我的探索卡</PrimaryButton></div>
    </section>
  );
}

function CardView({ traits, observation, onBack, onReturn }: { traits: TraitDefinition[]; observation: AuroraObservation; onBack: () => void; onReturn: () => void }) {
  return (
    <section className="view stage-enter card-view">
      <StageHeader stage="card" coordinateIndex={TOTAL_COORDINATES - 1} onBack={onBack} />
      <main className="screen-main card-screen">
        <div className="card-reveal-stars" aria-hidden="true">
          <span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span />
        </div>
        <article className="exploration-card card-reveal">
          <div className="profile-card-topline"><span>FC / TRAIT-{String(TOTAL_COORDINATES).padStart(2, "0")}</span><span>PERSONAL STAR MAP</span></div>
          <div className="profile-orbital-mark" aria-hidden="true"><span className="mark-seed">✦</span></div>
          <p className="card-overline">未來羅盤</p>
          <h2>🌱 特質探索完成</h2>
          <p className="card-lead">這次，我找到的三個特質</p>
          <div className="bright-signal" aria-label={`本次最亮線索：${traits[0].tag}`}>
            <span><Star size={11} fill="currentColor" /> 本次最亮線索</span>
            <strong>{traits[0].tag}</strong>
            <small>SIGNAL 01</small>
          </div>
          <div className="card-traits">
            {traits.map((trait, index) => (
              <div key={trait.tag}><span>0{index + 1}</span><TraitIcon trait={trait} size={16} /><strong>{trait.tag}</strong></div>
            ))}
          </div>
          <section className="aurora-note">
            <div className="aurora-note-icon"><Compass size={17} /></div>
            <div><p>🔭 Aurora 觀察</p><span>{observation.compact}</span></div>
          </section>
          <div className="profile-stats"><span>🏅 特質徽章</span><span>⭐ 探索積分 +10</span><span>🌌 星圖進度 +2%</span></div>
          <footer>Future Compass <span>｜未來羅盤</span></footer>
        </article>

        <section className="final-mission">
          <div className="final-mission-icon">📸</div>
          <div><p>最後一步</p><h3>截圖這張探索卡，回到 LINE 傳給 Aurora。</h3><span>再輸入<strong>【特質回報】</strong>，就完成任務了。</span></div>
        </section>
      </main>
      <div className="bottom-action result-action"><PrimaryButton onClick={onReturn}>回到 LINE</PrimaryButton></div>
    </section>
  );
}

export default function Home() {
  const [stage, setStage] = useState<Stage>("home");
  const [coordinateIndex, setCoordinateIndex] = useState(0);
  const [answers, setAnswers] = useState<ExplorationAnswer[]>([]);
  const [resonance, setResonance] = useState<Resonance | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (!saved) return;
      const progress = JSON.parse(saved) as SavedProgress;
      if (progress.answers?.length <= TOTAL_COORDINATES && progress.coordinateIndex >= 0 && progress.coordinateIndex < TOTAL_COORDINATES) {
        setStage(progress.stage);
        setCoordinateIndex(progress.coordinateIndex);
        setAnswers(progress.answers ?? []);
        setResonance(progress.resonance ?? null);
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ stage, coordinateIndex, answers, resonance } satisfies SavedProgress));
  }, [answers, coordinateIndex, isHydrated, resonance, stage]);

  useEffect(() => {
    if (stage !== "synthesis") return;
    const timer = window.setTimeout(() => setStage("traits"), 1650);
    return () => window.clearTimeout(timer);
  }, [stage]);

  const currentOption = useMemo(() => {
    const answer = answers.find((item) => item.questionId === traitCoordinates[coordinateIndex].id);
    return traitCoordinates[coordinateIndex].options.find((option) => option.id === answer?.optionId) ?? traitCoordinates[coordinateIndex].options[0];
  }, [answers, coordinateIndex]);

  const topTraits = useMemo(() => evaluateTraits(answers), [answers]);
  const auroraObservation = useMemo(() => getAuroraObservation(topTraits), [topTraits]);

  const selectOption = (option: TraitOption) => {
    const questionId = traitCoordinates[coordinateIndex].id;
    setAnswers((current) => [...current.filter((item) => item.questionId !== questionId), { questionId, optionId: option.id }]);
    setStage("clue");
  };

  const nextCoordinate = () => {
    if (coordinateIndex === TOTAL_COORDINATES - 1) {
      setStage("synthesis");
      return;
    }
    setCoordinateIndex((current) => current + 1);
    setStage("coordinate");
  };

  const goBack = () => {
    if (stage === "coordinate") {
      if (coordinateIndex === 0) { setStage("home"); return; }
      const previousIndex = coordinateIndex - 1;
      setCoordinateIndex(previousIndex);
      setAnswers((current) => current.filter((answer) => answer.questionId !== traitCoordinates[previousIndex].id));
      return;
    }
    if (stage === "clue") { setStage("coordinate"); return; }
    if (stage === "traits") { setCoordinateIndex(TOTAL_COORDINATES - 1); setStage("clue"); return; }
    if (stage === "resonance") { setStage("traits"); return; }
    if (stage === "card") { setStage("resonance"); }
  };

  const returnToLine = () => {
    toast.success("探索任務完成", { description: "截圖探索卡後，回到 LINE 傳給 Aurora，並輸入「特質回報」。" });
    window.setTimeout(() => { window.location.href = "line://"; }, 300);
  };

  const isResumeAvailable = answers.length > 0 && stage === "home";
  const beginExploration = () => setStage("coordinate");

  let content: ReactNode;
  switch (stage) {
    case "coordinate":
      content = <CoordinateView coordinateIndex={coordinateIndex} onBack={goBack} onSelect={selectOption} />;
      break;
    case "clue":
      content = <ClueView coordinateIndex={coordinateIndex} option={currentOption} onBack={goBack} onNext={nextCoordinate} />;
      break;
    case "synthesis":
      content = <SynthesisView onBack={() => setStage("clue")} />;
      break;
    case "traits":
      content = <TraitsView traits={topTraits} observation={auroraObservation} onBack={goBack} onContinue={() => setStage("resonance")} />;
      break;
    case "resonance":
      content = <ResonanceView resonance={resonance} onBack={goBack} onSelect={setResonance} onContinue={() => setStage("card")} />;
      break;
    case "card":
      content = <CardView traits={topTraits} observation={auroraObservation} onBack={goBack} onReturn={returnToLine} />;
      break;
    default:
      content = <HomeView onStart={beginExploration} resume={isResumeAvailable} />;
  }

  return <div className="future-compass-app">{content}</div>;
}
