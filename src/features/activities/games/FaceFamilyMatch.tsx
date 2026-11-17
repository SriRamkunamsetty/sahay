import React, { useState, useEffect } from 'react';
import { Heart, Users, Check, Sparkles, RotateCcw } from 'lucide-react';
import { sandboxStorage, DEFAULT_FAMILY } from '../../../services/sandboxStorage';
import { generateFaceRounds, FaceRound, playGentleChime } from './faceFamilyUtils';

export interface FaceFamilyMatchProps {
  onSessionComplete?: (stats: { moves: number; accuracy: number }) => void;
  showToast: (msg: string, icon?: string) => void;
}

export const FaceFamilyMatch: React.FC<FaceFamilyMatchProps> = ({
  onSessionComplete,
  showToast,
}) => {
  const [rounds, setRounds] = useState<FaceRound[]>([]);
  const [currentRoundIdx, setCurrentRoundIdx] = useState<number>(0);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [moves, setMoves] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [hintMessage, setHintMessage] = useState<string | null>(null);
  const [imageError, setImageError] = useState<boolean>(false);

  const initGame = () => {
    const family = sandboxStorage.getFamily() || DEFAULT_FAMILY;
    const newRounds = generateFaceRounds(family, 3);
    setRounds(newRounds);
    setCurrentRoundIdx(0);
    setSelectedName(null);
    setIsCorrect(null);
    setIsShaking(false);
    setMoves(0);
    setIsComplete(false);
    setHintMessage(null);
    setImageError(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    setImageError(false);
  }, [currentRoundIdx]);

  const handleSelectName = (name: string) => {
    if (selectedName && isCorrect) return; // already answered correctly and advancing

    const newMoves = moves + 1;
    setMoves(newMoves);

    const correct = name === currentRound.target.name;
    setSelectedName(name);

    if (correct) {
      setIsCorrect(true);
      setHintMessage(null);
      showToast(`Yes! That's ${currentRound.target.name}.`, 'check');
      playGentleChime();

      setTimeout(() => {
        if (currentRoundIdx < rounds.length - 1) {
          setCurrentRoundIdx((prev) => prev + 1);
          setSelectedName(null);
          setIsCorrect(null);
          setHintMessage(null);
        } else {
          setIsComplete(true);
          const totalRounds = rounds.length || 3;
          const accuracy = Math.max(50, Math.min(100, Math.round((totalRounds / newMoves) * 100)));
          onSessionComplete?.({ moves: newMoves, accuracy });
        }
      }, 1000);
    } else {
      setIsCorrect(false);
      setIsShaking(true);
      setHintMessage('Not quite, give it another try!');
      showToast('Not quite, give it another try!', 'heart');

      setTimeout(() => {
        setIsShaking(false);
      }, 450);
    }
  };

  const currentRound = rounds[currentRoundIdx];

  if (!currentRound && !isComplete) {
    return (
      <div className="text-center py-12 text-[#665F51] font-baloo">
        Loading family activity...
      </div>
    );
  }

  const totalRounds = rounds.length || 3;
  const accuracy = Math.max(50, Math.min(100, Math.round((totalRounds / Math.max(moves, totalRounds)) * 100)));

  return (
    <div className="max-w-[640px] mx-auto text-center animate-rise">
      {/* Top Banner with Assamese Heritage Warmth */}
      <div className="relative overflow-hidden rounded-3xl bg-[#22403A] px-5 py-5 mb-6 text-left shadow-md">
        <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-[#E2A33D]/20 pointer-events-none" />
        <div className="absolute -bottom-10 left-1/4 h-24 w-24 rounded-full bg-[#BD5B3B]/15 pointer-events-none" />
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-[#F8E6C1] font-baloo text-xs font-bold uppercase tracking-wider mb-1">
              <Users className="w-3.5 h-3.5" />
              Family & Warm Memories
            </div>
            <h3 className="font-fraunces text-xl md:text-2xl text-[#FBF7EE]">
              Face & Family Match
            </h3>
            <p className="text-xs text-[#E4ECE7] mt-1">
              Take all the time you need. Every face is someone who loves you.
            </p>
          </div>
          <div className="shrink-0 rounded-2xl bg-white/10 p-2.5 text-[#F8E6C1]">
            <Heart className="w-6 h-6 fill-current text-[#E2A33D]" />
          </div>
        </div>
      </div>

      {!isComplete ? (
        <>
          {/* Progress Indicators */}
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="font-baloo text-sm font-bold text-[#665F51]">
              Round {currentRoundIdx + 1} of {totalRounds}
            </span>
            <span className="font-baloo text-xs font-medium text-[#22403A] bg-[#E4ECE7] px-3 py-1 rounded-full">
              No time limit · Gentle pace
            </span>
          </div>

          <div className="flex justify-center gap-2 mb-6" aria-label={`Round ${currentRoundIdx + 1} of 3`}>
            {rounds.map((_, idx) => (
              <span
                key={idx}
                className={`h-2.5 flex-1 max-w-28 rounded-full transition-all duration-300 ${
                  idx === currentRoundIdx
                    ? 'bg-[#E2A33D]'
                    : idx < currentRoundIdx
                    ? 'bg-[#22403A]'
                    : 'bg-[#E6DAB9]'
                }`}
              />
            ))}
          </div>

          {/* Main Round Card with Photo & Warm Clue */}
          {currentRound && (
            <div
              className={`bg-[#FBF7EE] border border-[#E6DAB9] rounded-3xl p-6 md:p-8 shadow-xs transition-transform ${
                isShaking ? 'animate-soft-shake' : ''
              }`}
            >
              {/* Warm Clue Header */}
              <div className="mb-6">
                <span className="text-xs font-baloo font-bold uppercase tracking-wider text-[#BD5B3B]">
                  Memory Clue
                </span>
                <h4 className="font-fraunces text-2xl md:text-3xl text-[#221F1B] mt-1 leading-snug">
                  &ldquo;{currentRound.clue}&rdquo;
                </h4>
                {hintMessage && (
                  <p
                    role="status"
                    aria-live="polite"
                    className="text-sm font-baloo font-semibold text-[#8A5D18] mt-2 bg-[#F8E6C1]/70 py-1.5 px-4 rounded-xl inline-block"
                  >
                    {hintMessage}
                  </p>
                )}
              </div>

              {/* Central Portrait Photo */}
              <div className="flex flex-col items-center justify-center my-6">
                <div className="relative group">
                  <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-[#E6DAB9] shadow-md bg-white flex items-center justify-center">
                    {currentRound.target.imageUrl && !imageError ? (
                      <img
                        src={currentRound.target.imageUrl}
                        alt={currentRound.target.name}
                        className="w-full h-full object-cover transition-opacity duration-300"
                        loading="eager"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center text-4xl font-baloo font-bold text-white select-none"
                        style={{ backgroundColor: currentRound.target.color || '#3E4F74' }}
                      >
                        {currentRound.target.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-2 bg-white/95 border border-[#E6DAB9] shadow-xs px-3.5 py-1 rounded-full text-xs font-baloo font-bold text-[#665F51]">
                    {currentRound.target.rel}
                  </div>
                </div>
              </div>

              {/* 3 Large Choice Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mt-8">
                {currentRound.options.map((name) => {
                  const isSelected = selectedName === name;
                  const isOptionCorrect = isSelected && isCorrect === true;
                  const isOptionWrong = isSelected && isCorrect === false;

                  let buttonStyle = 'bg-white border-[#E6DAB9] text-[#221F1B] hover:border-[#22403A] hover:bg-[#FBF7EE]';
                  if (isOptionCorrect) {
                    buttonStyle = 'bg-[#E4ECE7] border-[#3F7455] text-[#22403A] ring-2 ring-[#3F7455]/30 scale-102';
                  } else if (isOptionWrong) {
                    buttonStyle = 'bg-[#F5E1D6] border-[#BD5B3B] text-[#BD5B3B]';
                  }

                  return (
                    <button
                      key={name}
                      onClick={() => handleSelectName(name)}
                      disabled={Boolean(selectedName && isCorrect)}
                      aria-label={`Select ${name}`}
                      className={`min-h-18 px-5 py-4 rounded-2xl border-2 font-baloo font-bold text-lg md:text-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#22403A]/40 ${buttonStyle}`}
                    >
                      {isOptionCorrect && <Check className="w-5 h-5 text-[#3F7455]" />}
                      <span>{name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </>
      ) : (
        /* Celebration Card upon completing 3 rounds */
        <div className="bg-[#FBF7EE] border border-[#E6DAB9] rounded-3xl p-8 md:p-10 shadow-sm text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-[#F8E6C1] text-[#8A5D18] mb-4 shadow-xs">
            <Sparkles className="w-8 h-8" />
          </div>

          <h3 className="font-fraunces text-2xl md:text-3xl text-[#221F1B] mb-2">
            Wonderful! You remembered everyone today.
          </h3>
          <p className="text-sm text-[#665F51] max-w-md mx-auto mb-6">
            Every face is close to your heart. Remembering them keeps family bonds warm and vibrant.
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto mb-8">
            <div className="bg-white border border-[#E6DAB9] rounded-2xl p-4">
              <span className="block font-baloo text-xs font-bold text-[#948C7A] uppercase">Total Taps</span>
              <span className="font-baloo text-2xl font-bold text-[#22403A]">{moves}</span>
            </div>
            <div className="bg-white border border-[#E6DAB9] rounded-2xl p-4">
              <span className="block font-baloo text-xs font-bold text-[#948C7A] uppercase">Accuracy</span>
              <span className="font-baloo text-2xl font-bold text-[#BD5B3B]">{accuracy}%</span>
            </div>
          </div>

          <button
            onClick={initGame}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-[#22403A] text-[#FBF7EE] font-baloo font-bold text-base hover:bg-[#152B26] transition-all cursor-pointer shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#22403A]/40"
          >
            <RotateCcw className="w-5 h-5" />
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};
