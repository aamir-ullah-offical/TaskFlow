/**
 * puterAI.js — Reusable Puter.js AI utility service
 *
 * All AI calls are client-side via puter.ai.chat().
 * No backend required. No API key required.
 * https://docs.puter.com/AI/chat/
 */
import puter from '@heyputer/puter.js';

// ─── Constants ────────────────────────────────────────────────────────────────

const VALID_PRIORITIES = ['high', 'medium', 'low'];
const VALID_CATEGORIES = [
  'Work', 'Personal', 'Health', 'Finance',
  'Learning', 'Shopping', 'General', 'Other',
];

// ─── Helper: Safe JSON Parser ─────────────────────────────────────────────────

/**
 * Safely extracts and parses JSON from an AI response string.
 * @param {string} raw - Raw AI response text
 * @param {RegExp} pattern - Regex to extract JSON (e.g. array or object)
 * @returns {any|null} Parsed JSON or null on failure
 */
const safeParseJSON = (raw, pattern) => {
  try {
    const stripped = raw
      .replace(/```json\s*/gi, '')
      .replace(/```/g, '')
      .trim();
    const match = stripped.match(pattern) || raw.match(pattern);
    return match ? JSON.parse(match[0]) : null;
  } catch {
    return null;
  }
};

// ─── Helper: Extract text content from Puter.js response ─────────────────────

/**
 * Normalizes Puter.js response to a plain string.
 * Handles both string responses and message-object responses.
 */
const extractText = (response) => {
  if (typeof response === 'string') return response.trim();
  if (response?.message?.content) {
    const content = response.message.content;
    if (typeof content === 'string') return content.trim();
    if (Array.isArray(content)) {
      return content.map((c) => (typeof c === 'string' ? c : c?.text || '')).join('').trim();
    }
  }
  if (response?.text) return response.text.trim();
  return String(response ?? '').trim();
};

// ─── AI Functions ─────────────────────────────────────────────────────────────

/**
 * Suggest 5 actionable tasks for a given topic.
 * @param {string} topic - User-provided goal or topic
 * @returns {Promise<Array<{title, description, priority, category}>>}
 */
export const suggestTasks = async (topic) => {
  const messages = [
    {
      role: 'system',
      content: `You are a productivity assistant. Given a topic or goal, suggest exactly 5 specific, actionable tasks.
Return ONLY a valid JSON array (no markdown fences, no extra text):
[{"title":"...","description":"...","priority":"high|medium|low","category":"Work|Personal|Health|Finance|Learning|Shopping|General|Other"}]
Rules: title max 80 chars, description max 150 chars, use only the listed priority and category values.`,
    },
    {
      role: 'user',
      content: String(topic).trim().slice(0, 500),
    },
  ];

  const response = await puter.ai.chat(messages);
  const raw = extractText(response);

  const tasks = safeParseJSON(raw, /\[[\s\S]*?\]/);
  if (!tasks || !Array.isArray(tasks) || tasks.length === 0) {
    throw new Error('AI returned an unexpected format. Please try again.');
  }

  return tasks.slice(0, 5).map((t) => ({
    title:       String(t.title || '').slice(0, 80),
    description: String(t.description || '').slice(0, 200),
    priority:    VALID_PRIORITIES.includes(t.priority) ? t.priority : 'medium',
    category:    VALID_CATEGORIES.includes(t.category) ? t.category : 'General',
  }));
};

/**
 * Generate a concise description for a task given its title.
 * @param {string} title - Task title
 * @returns {Promise<string>} Plain-text description (max 200 chars)
 */
export const generateDescription = async (title) => {
  const messages = [
    {
      role: 'system',
      content: `You are a productivity assistant. Given a task title, write a concise, helpful description in 1-2 sentences.
Return ONLY the plain description text — no quotes, no markdown, no extra text, max 200 characters.`,
    },
    {
      role: 'user',
      content: String(title).trim().slice(0, 200),
    },
  ];

  const response = await puter.ai.chat(messages);
  const description = extractText(response);

  if (!description || description.startsWith('{') || description.startsWith('[')) {
    throw new Error('AI returned unexpected format. Try again.');
  }

  return description.slice(0, 200);
};

/**
 * Predict the best priority and category for a task given its title.
 * @param {string} title - Task title
 * @returns {Promise<{priority: string, category: string, reason: string}>}
 */
export const predictTask = async (title) => {
  const messages = [
    {
      role: 'system',
      content: `You are a productivity assistant. Given a task title, predict the best priority and category.
Return ONLY a valid JSON object (no markdown, no extra text):
{"priority":"high|medium|low","category":"Work|Personal|Health|Finance|Learning|Shopping|General|Other","reason":"one short sentence, max 80 chars"}`,
    },
    {
      role: 'user',
      content: String(title).trim().slice(0, 200),
    },
  ];

  const response = await puter.ai.chat(messages);
  const raw = extractText(response);

  const result = safeParseJSON(raw, /\{[\s\S]*?\}/);
  if (!result) {
    throw new Error('AI returned unexpected format. Try again.');
  }

  return {
    priority: VALID_PRIORITIES.includes(result.priority) ? result.priority : 'medium',
    category: VALID_CATEGORIES.includes(result.category) ? result.category : 'General',
    reason:   String(result.reason || '').slice(0, 100),
  };
};

/**
 * Auto-fill tailored task details based on a rough topic or title.
 * @param {string} topic - The raw user input (e.g. "Plan a marketing strategy")
 * @returns {Promise<{title, description, priority, category, estimatedTime}>}
 */
export const autoFillTask = async (topic) => {
  const messages = [
    {
      role: 'system',
      content: `You are an expert project manager. Given a rough task topic, flesh it out into a complete task object.
Return ONLY valid JSON (no markdown):
{
  "title": "Clear, concise, professional title (max 80 chars)",
  "description": "Detailed, actionable description with specific steps (max 300 chars)",
  "priority": "high|medium|low",
  "category": "Work|Personal|Health|Finance|Learning|Shopping|General|Other",
  "estimatedTime": "e.g. 30 mins, 2 hours"
}
Infer the most logical priority and category based on the nature of the task.`,
    },
    {
      role: 'user',
      content: String(topic).trim().slice(0, 500),
    },
  ];

  const response = await puter.ai.chat(messages);
  const raw = extractText(response);
  const result = safeParseJSON(raw, /\{[\s\S]*?\}/);

  if (!result) throw new Error('AI could not draft the task. Try again.');

  return {
    title:       String(result.title || topic).slice(0, 80),
    description: String(result.description || '').slice(0, 300),
    priority:    VALID_PRIORITIES.includes(result.priority) ? result.priority : 'medium',
    category:    VALID_CATEGORIES.includes(result.category) ? result.category : 'General',
    estimatedTime: String(result.estimatedTime || ''),
  };
};

/**
 * Generate 3 tailored productivity insights/tips based on specific stats.
 * @param {object} stats
 * @returns {Promise<Array<{type: 'tip'|'warning'|'kudos', text: string}>>}
 */
export const getProductivityInsights = async (stats) => {
  const total      = parseInt(stats?.total) || 0;
  const completed  = parseInt(stats?.completed) || 0;
  const overdue    = parseInt(stats?.overdue) || 0;
  const completionRate = parseInt(stats?.completionRate) || 0;

  const messages = [
    {
      role: 'system',
      content: `Analyze the user's task stats and provide exactly 3 short, distinct insights.
Return ONLY valid JSON array:
[
  { "type": "warning|tip|kudos", "text": "Short insight (max 80 chars)" },
  { "type": "warning|tip|kudos", "text": "Short insight (max 80 chars)" },
  { "type": "warning|tip|kudos", "text": "Short insight (max 80 chars)" }
]
Logic:
- If overdue > 0, include a warning about clearing backlog.
- If completion rate > 80%, include kudos.
- Keep tone professional but friendly.`,
    },
    {
      role: 'user',
      content: `Total: ${total}, Completed: ${completed}, Overdue: ${overdue}, Rate: ${completionRate}%`,
    },
  ];

  const response = await puter.ai.chat(messages);
  const raw = extractText(response);
  const insights = safeParseJSON(raw, /\[[\s\S]*?\]/);

  return Array.isArray(insights) ? insights.slice(0, 3) : [];
};

export const breakDownTask = async (title) => {
  const messages = [
    {
      role: 'system',
      content: `You are an expert productivity coach. Break down the user's task into 3-5 small, actionable subtasks.
Return ONLY a valid JSON array of strings: ["Step 1", "Step 2", "Step 3"]`,
    },
    { role: 'user', content: `Task: ${title}` },
  ];

  const response = await puter.ai.chat(messages);
  const raw = extractText(response);
  const list = safeParseJSON(raw, /\\[[\\s\\S]*?\\]/);

  if (!Array.isArray(list)) return [];
  return list.map(item => ({ title: String(item), completed: false }));
};

/**
 * Generate a motivational daily summary based on the user's task stats.
 * @param {object} stats - { total, completed, pending, overdue, todayTasks, completionRate }
 * @returns {Promise<string>} Plain-text motivational summary (max 500 chars)
 */
export const dailySummary = async (stats) => {

  const total          = parseInt(stats?.total)          || 0;
  const completed      = parseInt(stats?.completed)      || 0;
  const pending        = parseInt(stats?.pending)        || 0;
  const overdue        = parseInt(stats?.overdue)        || 0;
  const todayTasks     = parseInt(stats?.todayTasks)     || 0;
  const completionRate = parseInt(stats?.completionRate) || 0;

  const messages = [
    {
      role: 'system',
      content: `You are a friendly productivity coach. Write a short motivational summary (2-3 sentences max) based on the user's task stats.
Be encouraging, specific, and end with one actionable tip. Plain text only — no markdown, no bullet points.`,
    },
    {
      role: 'user',
      content: `Total: ${total} tasks, Completed: ${completed}, Pending: ${pending}, Overdue: ${overdue}, Due today: ${todayTasks}, Completion rate: ${completionRate}%.`,
    },
  ];

  const response = await puter.ai.chat(messages);
  const summary = extractText(response);

  if (!summary) throw new Error('AI returned empty response.');
  return summary.slice(0, 500);
};
