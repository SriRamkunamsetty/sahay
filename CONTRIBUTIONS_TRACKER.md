# Sahay (সহায়) — Pull Request & Contribution Tracker

> **Contributor:** Sri Ram Kunamsetty  
> **GitHub Handle:** [@SriRamkunamsetty](https://github.com/SriRamkunamsetty)  
> **Email:** `mohansriramkunamsetty@gmail.com`  
> **Affiliation:** IEEE Open Source Week Contributor  
> **Upstream Repository:** [archangel2006/sahay](https://github.com/archangel2006/sahay)  
> **Fork Repository:** [SriRamkunamsetty/sahay](https://github.com/SriRamkunamsetty/sahay)  
> **Upstream Head:** `1665ad9` (Merged Face & Family Match cognitive activity)  
> **Active Assigned Issue:** 🎯 **Issue #6 (Officially Assigned to @SriRamkunamsetty)**  
> **Active Open PR:** 🟢 **[PR #40: Speech Synthesis Settings](https://github.com/archangel2006/sahay/pull/40)**  
> **Mergeability Status:** ✅ **100% CLEAN — ZERO CONFLICTS ACROSS ALL BRANCHES**  
> **Last Status Sync:** 18 November 2026, 05:25 AM IST  

---

## 1. Active Pull Request (Officially Assigned)

| PR # | Status | Target Issue | Branch Name | Mergeability | Actions & Next Steps |
|:---:|:---:|:---:|---|:---:|---|
| **[#40](https://github.com/archangel2006/sahay/pull/40)** | 🟢 **OPEN & MERGEABLE** | **[Issue #6](https://github.com/archangel2006/sahay/issues/6)** *(Assigned)* | `enhancement/speech-synthesis-settings` | ✅ `mergeable: true` (0 conflicts) | **Under Active Review**: Formatted to new template, rebased on `1665ad9`, passes `npm run build`. Ready for merge! |

---

## 2. Upstream Merge Audit & Conflict Verification (Against `1665ad9`)

All branches were tested with `git merge-tree` against the latest upstream commit `1665ad9`:

| Feature Branch | Original PR | Target Issue | Current Upstream Issue Status | Branch Mergeability | Strategic Position |
|---|:---:|:---:|---|:---:|---|
| `enhancement/speech-synthesis-settings` | **#20 ➔ #40** | **Issue #6** | 🎯 **Assigned to @SriRamkunamsetty** | ✅ **0 CONFLICTS** | 🟢 **ACTIVE PR #40 SUBMITTED** |
| `feat/browser-speech-recognition` | #21 | **Issue #4** | 🟢 **OPEN (UNASSIGNED)** | ✅ **0 CONFLICTS** | 🔵 Ready in fork. Claim immediately after PR #40 merges. |
| `api/context-aware-gemini-assistant` | #22 | **Issue #5** | 🟢 **OPEN (UNASSIGNED)** | ✅ **0 CONFLICTS** | 🔵 Ready in fork. Claim immediately after PR #40 merges. |
| `feat/interactive-safe-zone-map` | #27 | **Issue #8** | 🟢 **OPEN (UNASSIGNED)** | ✅ **0 CONFLICTS** | 🔵 Ready in fork. Claim immediately after PR #40 merges. |
| `feat/number-recall-digit-span` | #19 | Issue #3 | 🟡 Assigned to Sanjai-Gopal | ✅ **0 CONFLICTS** | 🟠 Monitored (Code ready in fork under 5-day rule). |
| `feat/memory-book-voice-recorder` | #24 | Issue #7 | 🟡 Assigned to Aditya8369 | ✅ **0 CONFLICTS** | 🟠 Monitored (Code ready in fork under 5-day rule). |
| `feat/multi-elder-switcher-pin` | #25 | Issue #9 | 🟡 Assigned to ahr1223 | ✅ **0 CONFLICTS** | 🟠 Monitored (Code ready in fork under 5-day rule). |
| `i18n/regional-language-dictionaries` | #23 | Issue #10 | 🟡 Assigned to nisha0115kumari | ✅ **0 CONFLICTS** | 🟠 Monitored (Code ready in fork under 5-day rule). |
| `feat/clinical-summary-pdf-export` | #26 | Issue #11 | 🟡 Assigned to Sanjai-Gopal | ✅ **0 CONFLICTS** | 🟠 Monitored (Code ready in fork under 5-day rule). |
| `feat/face-family-match` | #17 | Issue #1 | ⚪ **CLOSED (Merged Upstream)** | ✅ **0 CONFLICTS** | ⚪ Solved upstream in PR #28 (`1665ad9`). |
| `feat/odd-one-out` | #18 | Issue #2 | ⚪ **CLOSED (Merged Upstream)** | ✅ **0 CONFLICTS** | ⚪ Solved upstream in PR #15 (`14b4208`). |
| `fix/memory-match-duplicate-icons` | #16 | Issue #12 | ⚪ **CLOSED (Merged Upstream)** | ✅ **0 CONFLICTS** | ⚪ Solved upstream in commit `a5519d2`. |

---

## 3. Overnight Mentor Communications & Actions (@archangel2006)

1. **Official Assignment of Issue #6**:
   - Project mentor **@archangel2006** officially unassigned `@Shainaroyyy` and assigned **[Issue #6](https://github.com/archangel2006/sahay/issues/6)** to **@SriRamkunamsetty**.
2. **Clarification on PR #20 & PR #40**:
   - On PR #20, the mentor commented: *"Just attach a video of working of the feature as well, and new changes have been committed so make sure repo is up to date."*
   - The mentor attached a screenshot showing that GitHub prevented reopening PR #20 (*"I am unable to reopen this PR"*).
   - In response, we created fresh **[PR #40](https://github.com/archangel2006/sahay/pull/40)** on top of `1665ad9` adhering to the new PR template, and commented links on PR #20 and Issue #6.
3. **Merge of Issue #1 (Face & Family Match)**:
   - The mentor merged PR #28 (`1665ad9`), successfully closing Issue #1.

---

## 4. Evaluation of Mentor Recommendations: Are They Really Useful?

| Mentor Recommendation | Practical Utility | Verification Assessment |
|---|:---:|---|
| **1. "Ensure repo is up-to-date with new commits"** | **CRITICAL** | When `1665ad9` merged Face & Family Match, it changed `ActivityHost.tsx` and `activityRegistry.ts`. By pulling and rebasing immediately, we guaranteed PR #40 has **0 merge conflicts** and will merge cleanly with one click. |
| **2. "One PR at a time / Assigned issues only"** | **VERY HIGH** | By focusing exclusively on Issue #6, Sri Ram got officially assigned. This protects the work and guarantees review priority. |
| **3. "Attach a working video demonstration"** | **HIGH IMPACT** | Visual proof gives the maintainer instant verification of Web Speech API sliders and playback on `localhost:3000` without manual branch checkout. |

---

## 5. Next Strategic Action Plan

1. **Focus on PR #40**:
   - Run `npm run dev` and record a quick 10–15s clip demonstrating the Speech Settings sliders (rate, pitch) and the "Test Voice Sample" button.
   - Drag and drop the `.mp4` / `.webm` / `.gif` into **[PR #40's comment thread](https://github.com/archangel2006/sahay/pull/40)**.
2. **Next Issue Claim (Unassigned Queue)**:
   - As soon as PR #40 is merged, immediately claim one of the remaining **UNASSIGNED** issues where our code is already 100% complete:
     - **Issue #4**: Browser-Native Speech Recognition (`feat/browser-speech-recognition`)
     - **Issue #5**: Context-Aware Daily Schedule Injection (`api/context-aware-gemini-assistant`)
     - **Issue #8**: Interactive Safe-Zone Geofencing Map (`feat/interactive-safe-zone-map`)
