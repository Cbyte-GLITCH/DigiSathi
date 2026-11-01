import { ASSISTANT_INTENTS, DEFAULT_FALLBACK } from '../data/assistantResponses';

export const processAssistantQuery = (queryText, language = 'en') => {
  if (!queryText || !queryText.trim()) {
    return {
      text: language === 'hi' ? DEFAULT_FALLBACK.replyHi : DEFAULT_FALLBACK.replyEn,
      suggestions: DEFAULT_FALLBACK.suggestions,
      actionLink: null,
      actionText: null,
    };
  }

  const normalized = queryText.toLowerCase().trim();

  // Find matching intent by keyword score
  let bestIntent = null;
  let maxScore = 0;

  for (const intent of ASSISTANT_INTENTS) {
    let score = 0;
    for (const keyword of intent.keywords) {
      if (normalized.includes(keyword.toLowerCase())) {
        score += keyword.length; // weight longer specific keywords higher
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestIntent = intent;
    }
  }

  if (bestIntent && maxScore > 0) {
    return {
      text: language === 'hi' ? bestIntent.replyHi : bestIntent.replyEn,
      suggestions: bestIntent.suggestions || DEFAULT_FALLBACK.suggestions,
      actionLink: bestIntent.actionLink || null,
      actionText: bestIntent.actionText || null,
    };
  }

  return {
    text: language === 'hi' ? DEFAULT_FALLBACK.replyHi : DEFAULT_FALLBACK.replyEn,
    suggestions: DEFAULT_FALLBACK.suggestions,
    actionLink: null,
    actionText: null,
  };
};
