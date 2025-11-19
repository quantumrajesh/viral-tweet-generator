
export enum Tone {
  PROFESSIONAL = 'Professional',
  CONTROVERSIAL = 'Controversial',
  SARCASTIC = 'Sarcastic',
  MOTIVATIONAL = 'Motivational',
  STORYTELLING = 'Storytelling',
  SHITPOST = 'Shitpost',
  HUMOROUS = 'Humorous',
  WITTY = 'Witty',
  SATIRICAL = 'Satirical',
  SELF_DEPRECATING = 'Self-deprecating',
  ABSURDIST = 'Absurdist',
  UNHINGED = 'Unhinged',
  PASSIVE_AGGRESSIVE = 'Passive Aggressive',
  MEME = 'Meme / Gen Z',
}

export enum Style {
  MINIMALIST = 'Minimalist (Naval-style)',
  AGGRESSIVE = 'Aggressive Growth (Hormozi-style)',
  ANALYTICAL = 'Analytical (Thread-style)',
  CASUAL = 'Casual / Relatable',
  COMEDIC = 'Stand-up Comedian',
}

export interface TweetResult {
  content: string;
  hookType: string;
  hashtags: string[];
  characterCount: number;
}

export interface GeneratorConfig {
  topic: string;
  tone: Tone;
  style: Style;
}
