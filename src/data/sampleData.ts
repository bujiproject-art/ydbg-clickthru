// ─── Building Blocks (BALANCE order) ────────────────────────────────────────

export const buildingBlocks = [
  { id: 'breath',    name: 'BREATH',    letter: 'B', color: '#7EC8E3', icon: 'air',              dimension: 'Fitness' },
  { id: 'anaerobic', name: 'ANAEROBIC', letter: 'A', color: '#E63946', icon: 'fitness-center',   dimension: 'Fitness' },
  { id: 'lengthen',  name: 'LENGTHEN',  letter: 'L', color: '#10B981', icon: 'self-improvement',  dimension: 'Fitness' },
  { id: 'aqueous',   name: 'AQUEOUS',   letter: 'A', color: '#4EA8DE', icon: 'water-drop',       dimension: 'Fitness' },
  { id: 'nutrition', name: 'NUTRITION', letter: 'N', color: '#22C55E', icon: 'restaurant',       dimension: 'Lifestyle' },
  { id: 'cleanse',   name: 'CLEANSE',   letter: 'C', color: '#8B5CF6', icon: 'spa',              dimension: 'Lifestyle' },
  { id: 'energize',  name: 'ENERGIZE',  letter: 'E', color: '#F59E0B', icon: 'bolt',             dimension: 'Consciousness' },
];

// ─── Current Player ─────────────────────────────────────────────────────────

export const currentPlayer = {
  name: 'Marcus Johnson',
  initials: 'MJ',
  level: 'Intermediate',
  trustJourneyLevel: 14,
  trustJourneyPhase: 'Expansion',
  trustScore: 78,
  pcScore: 72,
  sayDoRatio: 84.2,
  totalDeposits: 347,
  currentStreak: 12,
  longestStreak: 28,
  hoursPlayed: 412,
  trustCoins: 1240,
  tier: 'Player',
  memberSince: 'June 2024',
};

// ─── Balance Chart ──────────────────────────────────────────────────────────

export const balanceChart = [
  {
    bb: 'BREATH', color: '#7EC8E3', letter: 'B',
    habits: [
      { name: 'Box Breathing: 4 Rounds', freq: 5, done: 5, level: 'Beginner' },
      { name: 'Deep Breathing: 5 Minutes', freq: 3, done: 1, level: 'Beginner' },
    ],
  },
  {
    bb: 'ANAEROBIC', color: '#E63946', letter: 'A',
    habits: [
      { name: 'Push-ups: 10 Reps', freq: 4, done: 3, level: 'Beginner' },
      { name: 'Air Squats: 15 Reps', freq: 3, done: 3, level: 'Beginner' },
      { name: 'Plank Hold: 30 Seconds', freq: 5, done: 4, level: 'Beginner' },
    ],
  },
  {
    bb: 'LENGTHEN', color: '#10B981', letter: 'L',
    habits: [
      { name: 'Yoga: 20 Minutes', freq: 3, done: 2, level: 'Beginner' },
      { name: 'Foam Rolling: 10 Minutes', freq: 4, done: 3, level: 'Beginner' },
    ],
  },
  {
    bb: 'AQUEOUS', color: '#4EA8DE', letter: 'A',
    habits: [
      { name: 'Drink Half Body Weight in Ounces', freq: 7, done: 6, level: 'Beginner' },
      { name: 'Drink Loose Leaf Tea', freq: 3, done: 2, level: 'Beginner' },
    ],
  },
  {
    bb: 'NUTRITION', color: '#22C55E', letter: 'N',
    habits: [
      { name: 'Eat 5 Servings of Vegetables', freq: 7, done: 5, level: 'Beginner' },
      { name: 'Meal Prep: 1 Day', freq: 2, done: 1, level: 'Beginner' },
    ],
  },
  {
    bb: 'CLEANSE', color: '#8B5CF6', letter: 'C',
    habits: [
      { name: 'Cold Shower: 30 Seconds', freq: 3, done: 2, level: 'Beginner' },
      { name: 'Dry Brush Before Shower', freq: 4, done: 4, level: 'Beginner' },
    ],
  },
  {
    bb: 'ENERGIZE', color: '#F59E0B', letter: 'E',
    habits: [
      { name: 'Morning Sunlight: 10 Minutes', freq: 7, done: 5, level: 'Beginner' },
      { name: 'Walking: 30 Minutes', freq: 5, done: 4, level: 'Intermediate' },
    ],
  },
];

// ─── Discovery Feed ─────────────────────────────────────────────────────────

export const feedPosts = [
  {
    id: 1, player: 'Shonda Williams', initials: 'SW', time: '2h ago',
    type: 'habit_log', bb: 'LENGTHEN', bbColor: '#10B981',
    text: 'Morning yoga done! Day 15 of my streak. The consistency is building something real.',
    likes: 12, comments: 3,
  },
  {
    id: 2, player: 'Marcus Johnson', initials: 'MJ', time: '4h ago',
    type: 'magical_moment', momentType: 'Self', bb: '', bbColor: '',
    text: 'Magical Moment (Self): Chose the stairs today instead of the elevator — 12 flights. Didn\'t even think about it. That\'s the habit talking.',
    likes: 24, comments: 7,
  },
  {
    id: 3, player: 'Corbin Hayes', initials: 'CH', time: '6h ago',
    type: 'streak', bb: 'AQUEOUS', bbColor: '#4EA8DE',
    text: '21-Day Streak in AQUEOUS! Hydration is no longer something I have to think about — it\'s who I am.',
    likes: 18, comments: 5,
  },
  {
    id: 4, player: 'Sandy Mitchell', initials: 'SM', time: '8h ago',
    type: 'habit_log', bb: 'NUTRITION', bbColor: '#22C55E',
    text: 'Completed my weekly meal prep. Two hours on Sunday saves 10 hours during the week.',
    likes: 31, comments: 9,
  },
  {
    id: 5, player: 'Bill Torres', initials: 'BT', time: '1d ago',
    type: 'magical_moment', momentType: 'Others', bb: '', bbColor: '',
    text: 'Magical Moment (Others): My daughter asked if she could do yoga with me this morning. She said "Dad, you look so peaceful."',
    likes: 45, comments: 14,
  },
];

// ─── Agent BG Conversation ──────────────────────────────────────────────────

export const bgConversation = [
  { role: 'bg' as const, text: 'Good morning, Marcus! I see you\'re on a 12-day streak. That\'s Consistency building into Reliability. How are you feeling today?' },
  { role: 'player' as const, text: 'Pretty good! Slept well. Thinking about skipping my workout though — long day ahead.' },
  { role: 'bg' as const, text: 'I hear you — long days are real. But here\'s what I notice: your ANAEROBIC block is at 75% this week. One quick set of push-ups (10 reps, 2 minutes) keeps your streak alive AND protects that 84% Say/Do ratio. Want to try the 2-minute version?' },
  { role: 'player' as const, text: 'You know what, yeah. 2 minutes I can do.' },
  { role: 'bg' as const, text: 'That\'s the deposit mentality! Remember — it\'s not about the performance. It\'s about keeping your word to yourself. Every deposit counts. I\'ll check back after lunch to see how NUTRITION is going.' },
];

// ─── Trust Journey ──────────────────────────────────────────────────────────

export const trustJourney = {
  currentLevel: 14,
  totalLevels: 100,
  phase: 'Expansion',
  phaseTheme: '"I can rely on myself and others."',
  bricFocus: 'Reliability',
  vehiclePosition: 0.14,
  milestones: [
    { name: 'Register 300 Deposits', done: true, bric: 'Reliability', coins: 30 },
    { name: 'Achieve 12-Day Habit Streak', done: true, bric: 'Consistency', coins: 25 },
    { name: '80% Say/Do Ratio for 4 Weeks', done: true, bric: 'Integrity', coins: 40 },
    { name: 'Develop 25 Trust Tribe Connections', done: true, bric: 'Reliability', coins: 35 },
    { name: 'Capture 15 Magical Moments', done: true, bric: 'Believability', coins: 30 },
    { name: 'Complete 400 Hours Played', done: true, bric: 'Consistency', coins: 35 },
    { name: 'Reach Level 14 Trust Score', done: false, bric: 'Reliability', coins: 40 },
    { name: 'Inspire 50 Tribe Connections', done: false, bric: 'Believability', coins: 35 },
    { name: 'Achieve 85% Say/Do Ratio', done: false, bric: 'Integrity', coins: 45 },
  ],
  phases: [
    { name: 'Foundation', levels: '1-10', theme: 'I belong. I can start.', bric: 'Believability', current: false },
    { name: 'Expansion', levels: '11-30', theme: 'I can rely on myself and others.', bric: 'Reliability', current: true },
    { name: 'Alignment', levels: '31-60', theme: 'I live in alignment.', bric: 'Integrity', current: false },
    { name: 'Mastery', levels: '61-100', theme: 'I embody trust.', bric: 'All BRICs', current: false },
  ],
};

// ─── Video Library ──────────────────────────────────────────────────────────

export const habitVideos = [
  { bb: 'BREATH', bbColor: '#7EC8E3', name: 'Box Breathing: 4 Rounds', duration: '3:42' },
  { bb: 'BREATH', bbColor: '#7EC8E3', name: 'Deep Breathing: 5 Minutes', duration: '5:15' },
  { bb: 'ANAEROBIC', bbColor: '#E63946', name: 'Push-ups: 10 Reps', duration: '2:18' },
  { bb: 'ANAEROBIC', bbColor: '#E63946', name: 'Air Squats: 15 Reps', duration: '2:45' },
  { bb: 'ANAEROBIC', bbColor: '#E63946', name: 'Plank Hold: 30 Seconds', duration: '1:52' },
  { bb: 'LENGTHEN', bbColor: '#10B981', name: 'Yoga: 20 Minutes', duration: '20:10' },
  { bb: 'LENGTHEN', bbColor: '#10B981', name: 'Foam Rolling: 10 Minutes', duration: '10:05' },
  { bb: 'AQUEOUS', bbColor: '#4EA8DE', name: 'Drink Half Body Weight in Ounces', duration: '3:30' },
  { bb: 'AQUEOUS', bbColor: '#4EA8DE', name: 'Loose Leaf Tea Benefits', duration: '4:05' },
  { bb: 'NUTRITION', bbColor: '#22C55E', name: 'Eat 5 Servings of Vegetables', duration: '4:22' },
  { bb: 'NUTRITION', bbColor: '#22C55E', name: 'Meal Prep: 1 Day', duration: '6:30' },
  { bb: 'CLEANSE', bbColor: '#8B5CF6', name: 'Cold Shower: 30 Seconds', duration: '2:55' },
  { bb: 'CLEANSE', bbColor: '#8B5CF6', name: 'Dry Brush Before Shower', duration: '3:10' },
  { bb: 'ENERGIZE', bbColor: '#F59E0B', name: 'Morning Sunlight: 10 Minutes', duration: '3:48' },
  { bb: 'ENERGIZE', bbColor: '#F59E0B', name: 'Walking: 30 Minutes', duration: '2:12' },
];

// ─── Coach Dashboard ────────────────────────────────────────────────────────

export const coachData = {
  coachName: 'Day Adeogba',
  coachInitials: 'DA',
  activeGameDays: 3,
  totalPlayers: 18,
  players: [
    { name: 'Marcus Johnson', initials: 'MJ', sayDo: 84.2, streak: 12, trend: 'up' as const, level: 'Intermediate' },
    { name: 'Shonda Williams', initials: 'SW', sayDo: 91.5, streak: 22, trend: 'up' as const, level: 'Advanced' },
    { name: 'Corbin Hayes', initials: 'CH', sayDo: 72.1, streak: 5, trend: 'down' as const, level: 'Beginner' },
    { name: 'Sandy Mitchell', initials: 'SM', sayDo: 88.7, streak: 18, trend: 'up' as const, level: 'Intermediate' },
    { name: 'Bill Torres', initials: 'BT', sayDo: 67.3, streak: 3, trend: 'down' as const, level: 'Beginner' },
  ],
};

// ─── Events ─────────────────────────────────────────────────────────────────

export const events = [
  { id: 1, name: 'Morning Push-up Challenge', date: 'Tomorrow 7:00 AM', players: 4, bb: 'ANAEROBIC', bbColor: '#E63946' },
  { id: 2, name: 'Sunday Meal Prep Session', date: 'Sunday 10:00 AM', players: 6, bb: 'NUTRITION', bbColor: '#22C55E' },
  { id: 3, name: 'Trust Team Yoga Flow', date: 'Wednesday 6:00 PM', players: 3, bb: 'LENGTHEN', bbColor: '#10B981' },
];

// ─── Messages ───────────────────────────────────────────────────────────────

export const messages = [
  { id: 1, name: 'Trust Team Alpha', isGroup: true, preview: 'Sandy: Great workout today!', time: '2h ago', unread: 2 },
  { id: 2, name: 'Shonda Williams', isGroup: false, preview: 'Thanks for the encouragement!', time: '4h ago', unread: 0 },
  { id: 3, name: 'Coach Day', isGroup: false, preview: 'Let\'s review your Balance Chart this week.', time: '1d ago', unread: 1 },
];
