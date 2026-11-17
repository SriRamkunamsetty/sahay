import { FamilyMemberItem } from '../../../types';
import { DEFAULT_FAMILY } from '../../../services/sandboxStorage';

export interface FaceRound {
  target: FamilyMemberItem;
  clue: string;
  options: string[];
}

/**
 * Curated warm clues for known default family members.
 * For any custom members added by the caregiver, we generate
 * a natural prompt based on their relationship or notes.
 */
const KNOWN_CLUES: Record<string, string> = {
  Ranjit: 'Who calls every evening at 7?',
  Priya: 'Who visits on Sundays with the grandchildren?',
  Mridul: 'Who wants you to teach him the card game again?',
  'Deuta (late)': 'Who planted the tea bushes by the gate with you in 1968?',
};

export const getClueForMember = (member: FamilyMemberItem): string => {
  if (KNOWN_CLUES[member.name]) {
    return KNOWN_CLUES[member.name];
  }

  if (member.fact && member.fact.trim().length > 0) {
    const cleanFact = member.fact.replace(/\.$/, '');
    // If the fact starts with a verb, e.g. "Calls every evening" -> "Who calls every evening?"
    if (/^[A-Z][a-z]+s\b/.test(cleanFact)) {
      return `Who ${cleanFact.charAt(0).toLowerCase() + cleanFact.slice(1)}?`;
    }
    return `Who is this? (${cleanFact})`;
  }

  if (member.rel && member.rel.trim().length > 0) {
    return `Can you find your ${member.rel}?`;
  }

  return `Which family member is this?`;
};

/**
 * Shuffles an array in place with Fisher-Yates.
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

/**
 * Builds 3 diverse rounds for the session from available family members.
 */
export const generateFaceRounds = (
  familyList: FamilyMemberItem[] = DEFAULT_FAMILY,
  roundCount = 3
): FaceRound[] => {
  const pool = familyList.length >= 3 ? familyList : DEFAULT_FAMILY;
  const shuffledPool = shuffleArray(pool);
  const selectedTargets = shuffledPool.slice(0, Math.min(roundCount, shuffledPool.length));

  return selectedTargets.map((target) => {
    const clue = getClueForMember(target);

    // Pick 2 other names from the pool
    const otherNames = pool
      .filter((m) => m.name !== target.name)
      .map((m) => m.name);

    const shuffledOthers = shuffleArray(otherNames);
    const distractors = shuffledOthers.slice(0, 2);

    const options = shuffleArray([target.name, ...distractors]);

    return {
      target,
      clue,
      options,
    };
  });
};

/**
 * Soft success chime synthesized via Web Audio API.
 * Uses gentle warm harmonics so there are no jarring frequencies for elders.
 */
export const playGentleChime = () => {
  if (typeof window === 'undefined' || !window.AudioContext) return;

  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();

    // Two warm sine tones (F4 and A4)
    const notes = [349.23, 440.0];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const startTime = ctx.currentTime + i * 0.08;
      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.exponentialRampToValueAtTime(0.08, startTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.5);
    });

    setTimeout(() => {
      ctx.close().catch(() => {});
    }, 800);
  } catch {
    // AudioContext blocked or unsupported
  }
};
