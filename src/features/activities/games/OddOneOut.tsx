import React, { useState } from 'react';
import {
  Sparkles,
  Check,
  RefreshCw,
  HelpCircle,
  Leaf,
  Scissors,
  Utensils,
  Music,
  ShoppingBag,
  Shirt,
  Cookie,
  Fish,
} from 'lucide-react';

interface OddOneOutProps {
  onSessionComplete?: (stats: { moves: number; accuracy: number }) => void;
  showToast: (msg: string, icon?: string) => void;
}

interface ItemOption {
  id: string;
  name: string;
  subtext: string;
  isOdd: boolean;
  icon: React.ElementType;
}

interface RoundConfig {
  theme: string;
  clue: string;
  reason: string;
  items: ItemOption[];
}

const ROUNDS_DATA: RoundConfig[] = [
  {
    theme: 'Tea Garden & Harvesting',
    clue: 'Three items belong to tea garden work, but one belongs to the kitchen stove.',
    reason: 'Kadhai is for cooking over fire, while the others are for tea harvesting.',
    items: [
      { id: '1', name: 'Fresh Tea Leaves', subtext: 'Garden harvest', isOdd: false, icon: Leaf },
      { id: '2', name: 'Tea Basket (Khorahi)', subtext: 'Plucking basket', isOdd: false, icon: ShoppingBag },
      { id: '3', name: 'Pruning Shears', subtext: 'Bush maintenance', isOdd: false, icon: Scissors },
      { id: '4', name: 'Cast Iron Kadhai', subtext: 'Kitchen cooking', isOdd: true, icon: Utensils },
    ],
  },
  {
    theme: 'Traditional Handloom Textiles',
    clue: 'Three items are woven handloom garments, but one is a musical instrument.',
    reason: 'Dhol is a festival percussion instrument, while the others are woven cloths.',
    items: [
      { id: '1', name: 'Assamese Gamosa', subtext: 'Woven cotton', isOdd: false, icon: Shirt },
      { id: '2', name: 'Mekhela Chador', subtext: 'Traditional attire', isOdd: false, icon: Sparkles },
      { id: '3', name: 'Dhol (Bihu Drum)', subtext: 'Percussion instrument', isOdd: true, icon: Music },
      { id: '4', name: 'Eri Silk Shawl', subtext: 'Peace silk wrap', isOdd: false, icon: Shirt },
    ],
  },
  {
    theme: 'Festive Bihu Delicacies',
    clue: 'Three items are traditional sweet pithas, but one is a savory main dish.',
    reason: 'Maasor Tenga is a tangy fish curry, while the others are festive sweets.',
    items: [
      { id: '1', name: 'Til Pitha', subtext: 'Sesame & jaggery roll', isOdd: false, icon: Cookie },
      { id: '2', name: 'Maasor Tenga', subtext: 'Tangy fish curry', isOdd: true, icon: Fish },
      { id: '3', name: 'Ghila Pitha', subtext: 'Fried rice snack', isOdd: false, icon: Cookie },
      { id: '4', name: 'Narikol Laru', subtext: 'Coconut sweet ball', isOdd: false, icon: Cookie },
    ],
  },
];

export const OddOneOut: React.FC<OddOneOutProps> = ({ onSessionComplete, showToast }) => {
  const [currentRoundIdx, setCurrentRoundIdx] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [moves, setMoves] = useState(0);
  const [firstTrySuccesses, setFirstTrySuccesses] = useState(0);
  const [triedThisRound, setTriedThisRound] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);

  const currentRound = ROUNDS_DATA[currentRoundIdx];

  const handleSelect = (item: ItemOption) => {
    if (isAnswered || isGameFinished) return;

    setMoves((prev) => prev + 1);
    setSelectedId(item.id);

    if (item.isOdd) {
      if (!triedThisRound) {
        setFirstTrySuccesses((prev) => prev + 1);
      }
      setIsAnswered(true);
      showToast('Spot on! That is the odd one out.', 'check');

      setTimeout(() => {
        if (currentRoundIdx + 1 < ROUNDS_DATA.length) {
          setCurrentRoundIdx((prev) => prev + 1);
          setSelectedId(null);
          setIsAnswered(false);
          setTriedThisRound(false);
        } else {
          setIsGameFinished(true);
          const finalFirstTries = (!triedThisRound ? firstTrySuccesses + 1 : firstTrySuccesses);
          const calculatedAccuracy = Math.round((finalFirstTries / ROUNDS_DATA.length) * 100);
          showToast('All 3 rounds completed! Great categorization.', 'check');
          if (onSessionComplete) {
            onSessionComplete({
              moves: moves + 1,
              accuracy: Math.max(70, calculatedAccuracy),
            });
          }
        }
      }, 1200);
    } else {
      setTriedThisRound(true);
      setIsShaking(true);
      showToast('That item belongs to the group. Find the one that does not!', 'alert');
      setTimeout(() => {
        setIsShaking(false);
        setSelectedId(null);
      }, 700);
    }
  };

  const handleRestart = () => {
    setCurrentRoundIdx(0);
    setSelectedId(null);
    setIsAnswered(false);
    setIsShaking(false);
    setMoves(0);
    setFirstTrySuccesses(0);
    setTriedThisRound(false);
    setIsGameFinished(false);
  };

  if (isGameFinished) {
    return (
      <div className="max-w-[480px] mx-auto text-center py-6 animate-rise">
        <div className="w-16 h-16 rounded-2xl bg-[#E4ECE7] text-[#3F7455] flex items-center justify-center mx-auto mb-4 border border-[#3F7455]/20 shadow-xs">
          <Sparkles className="w-8 h-8" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F8E6C1] text-[#8A5D18] text-xs font-baloo font-bold uppercase tracking-wider mb-3">
          Categorization Mastered
        </div>

        <h3 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#221F1B] mb-2">
          Great Executive Sharpness!
        </h3>
        <p className="text-sm text-[#665F51] mb-6 max-w-[420px] mx-auto leading-relaxed">
          You accurately classified cultural items across tea tools, handloom garments, and festive sweets.
        </p>

        <div className="bg-[#FBF7EE] border border-[#E6DAB9] rounded-2xl p-4 mb-6 text-xs text-[#665F51] flex items-center justify-around">
          <div>
            <span className="font-bold text-[#948C7A] block">ROUNDS</span>
            <span className="font-fraunces text-lg text-[#221F1B]">3 of 3</span>
          </div>
          <div className="w-[1px] h-8 bg-[#E6DAB9]" />
          <div>
            <span className="font-bold text-[#948C7A] block">TOTAL TAPS</span>
            <span className="font-fraunces text-lg text-[#221F1B]">{moves}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleRestart}
          className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#22403A] text-[#FBF7EE] font-baloo font-bold text-sm hover:bg-[#152B26] transition-colors cursor-pointer mx-auto shadow-sm"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Play Again</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[500px] mx-auto text-center">
      {/* Top Header & Clue */}
      <div className="flex items-center justify-between mb-3 text-xs font-baloo font-bold text-[#665F51]">
        <span>Round {currentRoundIdx + 1} of 3</span>
        <span className="text-[#8A5D18] bg-[#F8E6C1] px-2.5 py-0.5 rounded-full">
          {currentRound.theme}
        </span>
      </div>

      <div className="bg-[#FBF7EE] border border-[#E6DAB9] rounded-2xl p-4 mb-5 text-left flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-[#E4ECE7] text-[#22403A] flex items-center justify-center shrink-0 mt-0.5">
          <HelpCircle className="w-4 h-4" />
        </div>
        <p className="text-xs sm:text-sm font-baloo font-semibold text-[#221F1B] leading-relaxed">
          {currentRound.clue}
        </p>
      </div>

      {/* 2x2 Choice Grid */}
      <div className="grid grid-cols-2 gap-3.5 mb-6">
        {currentRound.items.map((item) => {
          const Icon = item.icon;
          const isSelected = selectedId === item.id;
          const isCorrectOdd = isSelected && isAnswered;

          return (
            <button
              key={item.id}
              type="button"
              disabled={isAnswered}
              onClick={() => handleSelect(item)}
              className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 min-h-[120px] shadow-xs relative ${
                isCorrectOdd
                  ? 'bg-[#E4ECE7] border-[#3F7455] text-[#22403A] scale-[1.02]'
                  : isSelected && isShaking
                  ? 'bg-[#F5E1D6] border-[#BD5B3B] text-[#BD5B3B]'
                  : 'bg-white border-[#E6DAB9] text-[#221F1B] hover:border-[#22403A] hover:bg-[#FBF7EE]'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 transition-colors ${
                  isCorrectOdd
                    ? 'bg-[#3F7455] text-white'
                    : 'bg-[#F1E7CE] text-[#22403A]'
                }`}
              >
                {isCorrectOdd ? <Check className="w-6 h-6 stroke-[2.5]" /> : <Icon className="w-6 h-6" />}
              </div>

              <span className="font-baloo font-bold text-sm text-[#221F1B] leading-tight">
                {item.name}
              </span>
              <span className="text-[11px] text-[#665F51] mt-0.5">{item.subtext}</span>
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className="p-3 bg-[#E4ECE7] rounded-xl text-xs font-baloo font-bold text-[#22403A] animate-rise">
          {currentRound.reason}
        </div>
      )}
    </div>
  );
};