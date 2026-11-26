/* Musical Intuition — curriculum data.
   One object per lesson, in the format from the product spec (lesson_id, week, day, title, objective,
   concert_key, scale, tempo_bpm, allowed_scale_degrees, duration_minutes, exercises).
   Add lessons here without touching the app code.

   Durations are for a 30-minute session. The app scales every duration_seconds, repetitions and trials
   to the session length Karen picks (10/20/30/45/60 min).

   Exercise types the engine understands (see index.html, "exercise runners"):
     warmup, drone_listening   timed prompts that rotate; optional drone
     find_note                 timed prompts + a "Found it" button; fingering shown
     rhythm_echo               app plays a one-bar rhythm on a degree, you echo it in the next bar
     listen_sing_play          home note, phrase, sing window, play window, then Got it / Again
     random_note_recognition   hidden notes over the drone; Reveal, then mark right or missed
     free_improvisation        timed creative prompts over a drone or a one-chord backing track
     reflection                how it felt + move on or repeat (never advances by calendar)

   Prompt fields: phase (LISTEN, SING, IMAGINE, PLAY, CREATE, REST, WARM UP), text, or guitar/sax versions,
   seconds (default prompt_seconds), play: [degrees to sound when the prompt starts].
   In text, {n1} {n3} {n5}… become the note name of that scale degree for the current instrument
   (concert for guitar, written for tenor sax). */

const RHYTHMS_BASIC = [
  [4], [2, 2], [1, 1, 2], [2, 1, 1], [1, 1, 1, 1], [3, 1],
  [1, -1, 1, -1], [0.5, 0.5, 1, 2], [1.5, 0.5, 2], [-1, 1, -1, 1], [0.5, 0.5, 0.5, 0.5, 2], [1, 0.5, 0.5, -2],
];   // beats in one 4/4 bar; a negative number is a rest

const REFLECTION = { type: 'reflection' };

window.LESSONS = [
  {
    lesson_id: 'W01D01', week: 1, day: 1, title: 'Finding home',
    objective: 'Feel the tonic as musical home, and make music with one note.',
    concert_key: 'C', scale: 'major', tempo_bpm: 65, allowed_scale_degrees: [1], duration_minutes: 30,
    exercises: [
      { type: 'warmup', duration_seconds: 180, prompt_seconds: 45, prompts: [
        { phase: 'WARM UP', guitar: 'Shake out your hands. Play slow single notes anywhere and let each one ring.', sax: 'Long tones. Hold a comfortable low note for 4 slow counts. Breathe between.' },
        { phase: 'WARM UP', guitar: "Check your tuning if you haven't today.", sax: 'Keep the air steady. Aim for an even, round sound.' },
        { phase: 'WARM UP', text: 'Loose shoulders. Easy breath. Nothing to get right yet.' },
        { phase: 'WARM UP', guitar: 'A few notes soft, then a few loud.', sax: 'Start soft, grow louder, fade away. One breath each.' },
      ] },
      { type: 'drone_listening', duration_seconds: 60, drone: true, prompt_seconds: 30, prompts: [
        { phase: 'LISTEN', text: 'Just listen. This sound is home.' },
        { phase: 'LISTEN', text: "Notice it doesn't want to go anywhere. It's settled." },
      ] },
      { type: 'drone_listening', duration_seconds: 180, drone: true, prompt_seconds: 15, prompts: [
        { phase: 'LISTEN', text: 'Listen to home.' },
        { phase: 'SING', text: 'Hum the same note with it.' },
        { phase: 'LISTEN', text: 'Stop. Listen again.' },
        { phase: 'SING', text: 'Hum it. Feel the buzz when you match.' },
      ] },
      { type: 'drone_listening', duration_seconds: 300, drone: true, prompt_seconds: 30, prompts: [
        { phase: 'SING', text: 'Hum home. When you match, the sound smooths out.' },
        { phase: 'SING', text: 'Wobbly? Slide slowly up or down until it settles.' },
        { phase: 'LISTEN', text: 'Stop. Hear the drone alone.' },
        { phase: 'IMAGINE', text: 'Hear the note in your head without humming.' },
        { phase: 'SING', text: 'Hum again. Did it match what you imagined?' },
        { phase: 'SING', text: "Try 'ooh', then 'aah', then 'mmm'." },
        { phase: 'SING', text: 'Soft… then fuller… then soft again.' },
        { phase: 'REST', text: 'Rest. Just listen.' },
        { phase: 'SING', text: 'Hum it high or low — any octave is still home.' },
        { phase: 'IMAGINE', text: 'Imagine it once more. Then let it go.' },
      ] },
      { type: 'find_note', duration_seconds: 120, drone: true, show_fingering: true, confirm: '✓ Found it', prompt_seconds: 30, prompts: [
        { phase: 'PLAY', guitar: 'Find {n1} on your guitar. When it blends with the drone, you are home.', sax: 'Find written {n1}. Play it long. When it blends with the drone, you are home.' },
        { phase: 'PLAY', text: 'Play it long. Let it ring with the drone.' },
        { phase: 'PLAY', guitar: 'Now find {n1} in a second place on the neck.', sax: 'Try {n1} with the octave key. Still home.' },
        { phase: 'PLAY', text: 'Listen for the beating to stop. That is a match.' },
      ] },
      { type: 'rhythm_echo', degree: 1, repetitions: 2, drone: true, drone_level: 0.1, patterns: RHYTHMS_BASIC },
      { type: 'drone_listening', duration_seconds: 180, drone: true, prompt_seconds: 15, prompts: [
        { phase: 'LISTEN', text: 'Listen.' },
        { phase: 'SING', text: 'Sing home.' },
        { phase: 'PLAY', text: 'Play {n1}. Long notes.' },
        { phase: 'REST', text: 'Silence. Let it breathe.' },
        { phase: 'SING', text: 'Sing home, short and bouncy.' },
        { phase: 'PLAY', text: 'Play {n1}. Short notes.' },
        { phase: 'REST', text: 'Silence.' },
        { phase: 'PLAY', text: 'Long, short, silence — mix them.' },
        { phase: 'IMAGINE', text: 'Hear it in your head.' },
        { phase: 'PLAY', text: 'Play what you heard.' },
        { phase: 'SING', text: 'Sing it once more.' },
        { phase: 'PLAY', text: 'Play it once more.' },
      ] },
      { type: 'free_improvisation', duration_seconds: 480, drone: true, degrees: [1], prompt_seconds: 60, prompts: [
        { phase: 'CREATE', text: 'One note, many ways. Make a little performance using only {n1}.' },
        { phase: 'CREATE', text: 'Long notes only. Make each one sing.' },
        { phase: 'CREATE', text: 'Short, bouncy notes. Play with rhythm.' },
        { phase: 'CREATE', text: 'Use silence. Let the gaps say something.' },
        { phase: 'CREATE', text: 'Very soft… then strong. Change the volume.' },
        { phase: 'CREATE', text: 'Repeat a little rhythm. Then change one thing.' },
        { phase: 'CREATE', text: 'Tell a tiny story: calm start, busy middle, quiet end.' },
        { phase: 'CREATE', text: 'Free. Anything goes — with one note.' },
      ] },
      REFLECTION,
    ],
  },

  {
    lesson_id: 'W01D02', week: 1, day: 2, title: 'Leaving home',
    objective: 'Hear how 5 leaves home and how 1 pulls you back.',
    concert_key: 'C', scale: 'major', tempo_bpm: 65, allowed_scale_degrees: [1, 5], duration_minutes: 30,
    exercises: [
      { type: 'warmup', duration_seconds: 180, prompt_seconds: 45, prompts: [
        { phase: 'WARM UP', guitar: 'Loosen up. Slow single notes, let them ring.', sax: 'Long tones on low notes, 4 counts each.' },
        { phase: 'WARM UP', guitar: 'Play {n1} a few times. Say hello to home.', sax: 'Play {n1} long. Say hello to home.' },
        { phase: 'WARM UP', text: 'Easy breath. Loose shoulders.' },
        { phase: 'WARM UP', guitar: 'Soft notes, then loud ones.', sax: 'Soft, grow, fade. One breath each.' },
      ] },
      { type: 'drone_listening', duration_seconds: 240, drone: true, prompt_seconds: 20, prompts: [
        { phase: 'LISTEN', text: 'Home. Settle into it.' },
        { phase: 'LISTEN', text: 'This is 5. Open, strong, a little away from home.', play: [5] },
        { phase: 'SING', text: 'Hum home.' },
        { phase: 'LISTEN', text: '5 again. Notice how it wants to come back.', play: [5, 1] },
        { phase: 'SING', text: 'Hum 5, then slide back to home.', play: [5] },
        { phase: 'IMAGINE', text: 'Imagine 5. Then imagine home.' },
      ] },
      { type: 'listen_sing_play', phrases: [[1, 5, 1], [5, 1], [1, 1, 5, 1]], repetitions: 3, response_seconds: 6, drone: true, drone_level: 0.1 },
      { type: 'random_note_recognition', allowed_degrees: [1, 5], trials: 10, hide_answer: true },
      { type: 'free_improvisation', duration_seconds: 480, drone: true, degrees: [1, 5], prompt_seconds: 60, prompts: [
        { phase: 'CREATE', text: 'A conversation between {n1} and {n5}. Home asks, 5 answers.' },
        { phase: 'CREATE', text: 'Stay on 5 for a while. Feel the pull. Then come home.' },
        { phase: 'CREATE', text: 'Short notes and silence.' },
        { phase: 'CREATE', text: 'Long, slow notes. Make each change count.' },
        { phase: 'CREATE', text: 'Repeat a rhythm. Change which note gets it.' },
        { phase: 'CREATE', text: 'Loud question, soft answer.' },
        { phase: 'CREATE', text: 'Tell a tiny story with two notes.' },
        { phase: 'CREATE', text: 'Free. End on home.' },
      ] },
      REFLECTION,
    ],
  },

  {
    lesson_id: 'W01D03', week: 1, day: 3, title: 'Discovering brightness',
    objective: 'Meet 3, the bright note, and make a three-note world.',
    concert_key: 'C', scale: 'major', tempo_bpm: 65, allowed_scale_degrees: [1, 3, 5], duration_minutes: 30,
    exercises: [
      { type: 'warmup', duration_seconds: 180, prompt_seconds: 45, prompts: [
        { phase: 'WARM UP', guitar: 'Slow single notes. Let them ring.', sax: 'Long tones, low notes, 4 counts each.' },
        { phase: 'WARM UP', text: 'Play {n1}, then {n5}. Home and away.' },
        { phase: 'WARM UP', text: 'Easy breath. Loose hands.' },
        { phase: 'WARM UP', guitar: 'Soft, then loud.', sax: 'Soft, grow, fade.' },
      ] },
      { type: 'drone_listening', duration_seconds: 240, drone: true, prompt_seconds: 20, prompts: [
        { phase: 'LISTEN', text: 'Home.' },
        { phase: 'LISTEN', text: 'This is 3. Bright, warm, happy.', play: [3] },
        { phase: 'SING', text: 'Hum 3 over the drone.', play: [3] },
        { phase: 'LISTEN', text: '1, 3, 5. A sunny chord, one note at a time.', play: [1, 3, 5] },
        { phase: 'SING', text: 'Sing 1, 3, 5 slowly.' },
        { phase: 'IMAGINE', text: 'Imagine 3. Is it brighter than 5?' },
      ] },
      { type: 'listen_sing_play', phrases: [[1, 3, 1], [3, 5, 1], [1, 3, 5, 3, 1]], repetitions: 3, response_seconds: 7, drone: true, drone_level: 0.1 },
      { type: 'random_note_recognition', allowed_degrees: [1, 3, 5], trials: 10, hide_answer: true },
      { type: 'free_improvisation', duration_seconds: 480, drone: true, degrees: [1, 3, 5], prompt_seconds: 60, prompts: [
        { phase: 'CREATE', text: 'Three notes: {n1} {n3} {n5}. Express happiness.' },
        { phase: 'CREATE', text: 'Now calm. Same notes, slower and softer.' },
        { phase: 'CREATE', text: 'Lean on 3. Let it glow.' },
        { phase: 'CREATE', text: 'Use silence between ideas.' },
        { phase: 'CREATE', text: 'Repeat one little idea, then answer it.' },
        { phase: 'CREATE', text: 'Bouncy rhythm on one note, then move.' },
        { phase: 'CREATE', text: 'A story: start low, rise, come home.' },
        { phase: 'CREATE', text: 'Free. End on home.' },
      ] },
      REFLECTION,
    ],
  },

  {
    lesson_id: 'W01D04', week: 1, day: 4, title: 'Recognizing notes by ear',
    objective: 'Name 1, 3 and 5 by sound alone.',
    concert_key: 'C', scale: 'major', tempo_bpm: 65, allowed_scale_degrees: [1, 3, 5], duration_minutes: 30,
    exercises: [
      { type: 'warmup', duration_seconds: 180, prompt_seconds: 45, prompts: [
        { phase: 'WARM UP', guitar: 'Slow single notes. Let them ring.', sax: 'Long tones, 4 counts each.' },
        { phase: 'WARM UP', text: 'Play {n1}, {n3}, {n5}. Slowly.' },
        { phase: 'WARM UP', text: 'Easy breath. Loose hands.' },
        { phase: 'WARM UP', text: 'Same three notes, eyes closed.' },
      ] },
      { type: 'drone_listening', duration_seconds: 120, drone: true, prompt_seconds: 20, prompts: [
        { phase: 'LISTEN', text: 'Home.' },
        { phase: 'LISTEN', text: '5: open and strong.', play: [5] },
        { phase: 'LISTEN', text: '3: bright and warm.', play: [3] },
        { phase: 'LISTEN', text: '1: home, at rest.', play: [1] },
        { phase: 'SING', text: 'Sing 1, 3, 5. Then 5, 3, 1.' },
        { phase: 'IMAGINE', text: 'Imagine each one. Feel the difference.' },
      ] },
      { type: 'random_note_recognition', allowed_degrees: [1, 3, 5], hide_answer: true, blocks: [{ length: 1, trials: 12 }, { length: 2, trials: 8 }] },
      { type: 'listen_sing_play', phrases: [[1, 3], [5, 3], [3, 1], [5, 1]], repetitions: 2, response_seconds: 5, drone: true, drone_level: 0.1, hide_answer: true },
      { type: 'free_improvisation', duration_seconds: 420, drone: true, degrees: [1, 3, 5], hide_degrees: true, prompt_seconds: 60, prompts: [
        { phase: 'CREATE', text: "Improvise without looking. The notes are hidden — use your ears." },
        { phase: 'CREATE', text: 'Play a note. Say its number in your head.' },
        { phase: 'CREATE', text: 'Short phrases. End each one on home.' },
        { phase: 'CREATE', text: 'Silence, then a single note. Which one was it?' },
        { phase: 'CREATE', text: 'Repeat an idea, change the last note.' },
        { phase: 'CREATE', text: 'Happy, then calm.' },
        { phase: 'CREATE', text: 'Free. Trust your ears.' },
      ] },
      REFLECTION,
    ],
  },

  {
    lesson_id: 'W01D05', week: 1, day: 5, title: 'My first improvisation',
    objective: 'Improvise with 1, 3 and 5 over a slow band.',
    concert_key: 'C', scale: 'major', tempo_bpm: 65, allowed_scale_degrees: [1, 3, 5], duration_minutes: 30,
    exercises: [
      { type: 'warmup', duration_seconds: 180, prompt_seconds: 45, prompts: [
        { phase: 'WARM UP', guitar: 'Slow single notes. Let them ring.', sax: 'Long tones, 4 counts each.' },
        { phase: 'WARM UP', text: 'Play {n1}, {n3}, {n5} up and down, slowly.' },
        { phase: 'WARM UP', text: 'Easy breath. Loose hands.' },
        { phase: 'WARM UP', text: 'Same notes, now with a little rhythm.' },
      ] },
      { type: 'drone_listening', duration_seconds: 120, drone: true, prompt_seconds: 20, prompts: [
        { phase: 'LISTEN', text: 'Home.' },
        { phase: 'SING', text: 'Sing 1, 3, 5.', play: [1, 3, 5] },
        { phase: 'IMAGINE', text: 'Imagine a short tune with these three notes.' },
        { phase: 'SING', text: 'Sing your imagined tune.' },
        { phase: 'PLAY', text: 'Play it.' },
        { phase: 'REST', text: 'Rest.' },
      ] },
      { type: 'rhythm_echo', degree: 1, repetitions: 1, drone: true, drone_level: 0.1, patterns: RHYTHMS_BASIC },
      { type: 'free_improvisation', duration_seconds: 300, backing: 'vamp', degrees: [1, 3, 5], prompt_seconds: 50, prompts: [
        { phase: 'CREATE', text: 'Get comfortable with the band. Play {n1} on beat one.' },
        { phase: 'CREATE', text: 'Add 3 and 5. Short phrases.' },
        { phase: 'CREATE', text: 'Leave space. Two bars play, two bars rest.' },
        { phase: 'CREATE', text: 'Repeat an idea with a new rhythm.' },
        { phase: 'CREATE', text: 'Louder and busier…' },
        { phase: 'CREATE', text: '…then calm again. End on home.' },
      ] },
      { type: 'free_improvisation', duration_seconds: 180, backing: 'vamp', degrees: [1, 3, 5], record_performance: true, prompt_seconds: 60, prompts: [
        { phase: 'CREATE', text: 'Performance time. Want a recording? Start your phone recorder now.' },
        { phase: 'CREATE', text: 'One minute. Beginning, middle, end.' },
        { phase: 'CREATE', text: 'Play for yourself. Finish on home.' },
      ] },
      REFLECTION,
    ],
  },
];

/* ---------------- Weeks 2–4 ----------------
   New in these weeks (see index.html):
     degree 0 = 7 below home, 8 = home an octave up (shown as 7▾ and 1▴)
     listen_sing_play: random {degrees, length, count, min_length, max_length, rhythmic, repeat_notes, end_home},
                       melody: 'm1' (from the lesson's "melodies", generated fresh each run), mode: 'imagine', fade_hints, inst
     question_answer   two-bar question from the app, two bars for your answer (over the band)
     play_rest         play N bars, rest N bars
     prompt play: 'm1' plays a lesson melody when the prompt starts */

window.WEEKS = {
  1: 'Discovering the tonal center', 2: 'The seven musical colours', 3: 'Connecting the ear to the instrument', 4: 'Musical conversations',
};

const warm = notes => ({ type: 'warmup', duration_seconds: 180, prompt_seconds: 45, prompts: [
  { phase: 'WARM UP', guitar: 'Slow single notes. Let each one ring.', sax: 'Long tones, low notes, 4 slow counts each.' },
  { phase: 'WARM UP', text: notes },
  { phase: 'WARM UP', text: 'Easy breath. Loose shoulders and hands.' },
  { phase: 'WARM UP', guitar: 'Same notes, soft then loud.', sax: 'Same notes: start soft, grow, fade.' },
] });
const improv = (degrees, prompts, extra) => Object.assign({ type: 'free_improvisation', duration_seconds: 480, drone: true, degrees, prompt_seconds: 60,
  prompts: prompts.map(t => typeof t === 'string' ? { phase: 'CREATE', text: t } : Object.assign({ phase: 'CREATE' }, t)) }, extra || {});
const ALL7 = [1, 2, 3, 4, 5, 6, 7];

window.LESSONS.push(
  /* ===== WEEK 2: the seven musical colours ===== */
  {
    lesson_id: 'W02D06', week: 2, day: 6, title: 'Scale degree 2',
    objective: 'Hear 2 as a restless step that wants to settle back home.',
    concert_key: 'C', scale: 'major', tempo_bpm: 65, allowed_scale_degrees: [1, 2, 3, 5], duration_minutes: 30,
    exercises: [
      warm('Play {n1} {n2} {n3}, slowly up and back.'),
      { type: 'drone_listening', duration_seconds: 240, drone: true, prompt_seconds: 20, prompts: [
        { phase: 'LISTEN', text: 'Home.' },
        { phase: 'LISTEN', text: 'This is 2. Close to home, but restless.', play: [2] },
        { phase: 'LISTEN', text: '2, then 1. Hear it settle.', play: [2, 1] },
        { phase: 'SING', text: 'Hum 2. Then slide down to home.', play: [2] },
        { phase: 'LISTEN', text: 'Compare: 2 is restless, 3 is bright.', play: [2, 3] },
        { phase: 'IMAGINE', text: 'Imagine 2 stepping down to 1.' },
      ] },
      { type: 'find_note', duration_seconds: 60, drone: true, degrees: [2], show_fingering: true, confirm: '✓ Found it', prompts: [
        { phase: 'PLAY', text: 'Find {n2}, one step above home. Play {n2} then {n1}.' }] },
      { type: 'listen_sing_play', phrases: [[1, 2, 1], [2, 3, 2, 1], [5, 3, 2, 1]], repetitions: 3, response_seconds: 6, drone: true },
      { type: 'random_note_recognition', allowed_degrees: [1, 2, 3, 5], trials: 10 },
      improv([1, 2, 3, 5], [
        'Use {n2} to create movement, then come home.',
        'Stay on 2 a moment. Feel it lean. Then resolve.',
        '3, 2, 1 — your own rhythm each time.',
        'Short phrases. Silence between them.',
        'A question that ends on 2. An answer that ends on 1.',
        'Soft and smooth, then bouncy.',
        'Tell a tiny story with four notes.',
        'Free. End on home.',
      ]),
      REFLECTION,
    ],
  },
  {
    lesson_id: 'W02D07', week: 2, day: 7, title: 'Scale degree 4',
    objective: 'Feel 4 leaning on 3: tension, then release.',
    concert_key: 'C', scale: 'major', tempo_bpm: 65, allowed_scale_degrees: [1, 3, 4, 5], duration_minutes: 30,
    exercises: [
      warm('Play {n1} {n2} {n3} {n4} {n5}, slowly.'),
      { type: 'drone_listening', duration_seconds: 240, drone: true, prompt_seconds: 20, prompts: [
        { phase: 'LISTEN', text: 'Home.' },
        { phase: 'LISTEN', text: 'This is 4. Heavy. It wants to fall.', play: [4] },
        { phase: 'LISTEN', text: '4 falls to 3. Release.', play: [4, 3] },
        { phase: 'SING', text: 'Hum 4. Hold it… then let it drop to 3.', play: [4] },
        { phase: 'LISTEN', text: '3, 4, 3. Tension and release.', play: [3, 4, 3] },
        { phase: 'IMAGINE', text: 'Imagine 4 longing for 3.' },
      ] },
      { type: 'find_note', duration_seconds: 60, drone: true, degrees: [4], show_fingering: true, confirm: '✓ Found it', prompts: [
        { phase: 'PLAY', text: 'Find {n4}. Play {n4}, then {n3}. Feel the release.' }] },
      { type: 'listen_sing_play', phrases: [[3, 4, 3], [1, 4, 3, 1], [5, 4, 3]], repetitions: 3, response_seconds: 6, drone: true },
      { type: 'random_note_recognition', allowed_degrees: [1, 3, 4, 5], trials: 10 },
      improv([1, 3, 4, 5], [
        'Tension and release: lean on {n4}, land on {n3}.',
        'Hold 4 longer than feels comfortable. Then release.',
        'Short tense notes, one long relaxed one.',
        'Use silence after each release.',
        'Climb up to 5, fall back through 4 to 3.',
        'Soft tension, loud release. Then the opposite.',
        'Repeat an idea. Change where it lands.',
        'Free. End on home.',
      ]),
      REFLECTION,
    ],
  },
  {
    lesson_id: 'W02D08', week: 2, day: 8, title: 'Scale degree 6',
    objective: 'Explore 6: tender, a little wistful, settling onto 5.',
    concert_key: 'C', scale: 'major', tempo_bpm: 65, allowed_scale_degrees: [1, 3, 5, 6], duration_minutes: 30,
    exercises: [
      warm('Play {n1} {n3} {n5} {n6}, slowly.'),
      { type: 'drone_listening', duration_seconds: 240, drone: true, prompt_seconds: 20, prompts: [
        { phase: 'LISTEN', text: 'Home.' },
        { phase: 'LISTEN', text: 'This is 6. Sweet, a little wistful.', play: [6] },
        { phase: 'LISTEN', text: '6 settles onto 5.', play: [6, 5] },
        { phase: 'SING', text: 'Hum 6, then 5.', play: [6] },
        { phase: 'LISTEN', text: '1, 3, 5, 6, 5.', play: [1, 3, 5, 6, 5] },
        { phase: 'IMAGINE', text: 'Imagine 6. What does it feel like to you?' },
      ] },
      { type: 'find_note', duration_seconds: 60, drone: true, degrees: [6], show_fingering: true, confirm: '✓ Found it', prompts: [
        { phase: 'PLAY', text: 'Find {n6}. Play {n6}, then {n5}.' }] },
      { type: 'listen_sing_play', phrases: [[5, 6, 5], [1, 3, 5, 6, 5], [6, 5, 3, 1]], repetitions: 3, response_seconds: 7, drone: true },
      { type: 'random_note_recognition', allowed_degrees: [1, 3, 5, 6], trials: 10 },
      improv([1, 3, 5, 6], [
        'Explore {n6}. Linger on it.',
        '6 to 5, slowly, many ways.',
        'Gentle and wistful. Soft dynamics.',
        'Leave gaps. Let 6 hang in the air.',
        'Bright 3, then tender 6. Contrast them.',
        'A rhythm you repeat, landing on 6, then on 5.',
        'A little song: up to 6, home by the end.',
        'Free. End on home.',
      ]),
      REFLECTION,
    ],
  },
  {
    lesson_id: 'W02D09', week: 2, day: 9, title: 'Scale degree 7',
    objective: 'Feel the leading tone: 7 pulls hard toward home.',
    concert_key: 'C', scale: 'major', tempo_bpm: 65, allowed_scale_degrees: ALL7, duration_minutes: 30,
    exercises: [
      warm('Play {n5} {n6} {n7} and up to home.'),
      { type: 'drone_listening', duration_seconds: 240, drone: true, prompt_seconds: 20, prompts: [
        { phase: 'LISTEN', text: 'Home.' },
        { phase: 'LISTEN', text: 'This is 7, just below home. Hear the pull.', play: [0] },
        { phase: 'LISTEN', text: '7 to 1. Arrived.', play: [0, 1] },
        { phase: 'SING', text: 'Hum 7… hold it… then home.', play: [0] },
        { phase: 'LISTEN', text: '5, 6, 7, and up to home.', play: [5, 6, 7, 8] },
        { phase: 'IMAGINE', text: 'Imagine 7. Feel how badly it wants to resolve.' },
      ] },
      { type: 'find_note', duration_seconds: 60, drone: true, degrees: [0], show_fingering: true, confirm: '✓ Found it', prompts: [
        { phase: 'PLAY', text: 'Find {n7} just below home. Play {n7}, then {n1}.' }] },
      { type: 'listen_sing_play', phrases: [[1, 0, 1], [5, 6, 7, 8], [3, 5, 7, 8]], repetitions: 3, response_seconds: 7, drone: true },
      { type: 'random_note_recognition', allowed_degrees: [1, 3, 5, 7], trials: 10 },
      improv([0, 1, 2, 3, 5, 6, 7, 8], [
        'Phrases that sound unfinished… until home arrives.',
        'End a phrase on 7. Wait. Then resolve.',
        'Climb 5, 6, 7 — make the last step special.',
        'Circle around home: 7, 1, 2, 1.',
        'Use silence before the final home note.',
        'Soft 7, strong home. Then try the opposite.',
        'Tell a story where home only comes at the very end.',
        'Free. End on home.',
      ]),
      REFLECTION,
    ],
  },
  {
    lesson_id: 'W02D10', week: 2, day: 10, title: 'The complete musical landscape',
    objective: 'All seven colours by ear, and improvise with the whole scale.',
    concert_key: 'C', scale: 'major', tempo_bpm: 65, allowed_scale_degrees: ALL7, duration_minutes: 30,
    exercises: [
      warm('Play the scale slowly: {n1} {n2} {n3} {n4} {n5} {n6} {n7} {n1}.'),
      { type: 'drone_listening', duration_seconds: 120, drone: true, prompt_seconds: 20, prompts: [
        { phase: 'LISTEN', text: 'All seven colours, one by one.', play: [1, 2, 3, 4, 5, 6, 7, 8] },
        { phase: 'SING', text: 'Sing them up slowly. Name each one in your head.' },
        { phase: 'LISTEN', text: 'And back down.', play: [8, 7, 6, 5, 4, 3, 2, 1] },
        { phase: 'IMAGINE', text: 'Which colour is your favourite today?' },
      ] },
      { type: 'random_note_recognition', allowed_degrees: ALL7, blocks: [{ length: 1, trials: 14 }, { length: 2, trials: 6 }] },
      improv(ALL7, [
        'The whole scale is yours. No running up and down — make phrases.',
        'Pick two colours you love. Build around them.',
        'Lean on 4 and 7. Resolve them.',
        'Short ideas, lots of silence.',
        'Wistful 6, bright 3, restless 2.',
        'Free.',
      ], { duration_seconds: 360 }),
      improv(ALL7, [
        { text: 'Two-minute performance. Want a recording? Start your phone recorder now.', seconds: 20 },
        { text: 'Play. Beginning, middle, end. Finish on home.', seconds: 100 },
      ], { duration_seconds: 120, record_performance: true }),
      REFLECTION,
    ],
  },

  /* ===== WEEK 3: connecting the ear to the instrument ===== */
  {
    lesson_id: 'W03D11', week: 3, day: 11, title: 'Two-note imitation',
    objective: 'Hear two notes, sing them, then find them.',
    concert_key: 'C', scale: 'major', tempo_bpm: 65, allowed_scale_degrees: [1, 3, 5], duration_minutes: 30,
    exercises: [
      warm('Play {n1} {n3} {n5}, slowly.'),
      { type: 'drone_listening', duration_seconds: 120, drone: true, prompt_seconds: 20, prompts: [
        { phase: 'LISTEN', text: '1, 3, 5.', play: [1, 3, 5] },
        { phase: 'SING', text: 'Sing them.' },
        { phase: 'LISTEN', text: '5, 3, 1.', play: [5, 3, 1] },
        { phase: 'SING', text: 'Sing them.' },
        { phase: 'IMAGINE', text: 'Imagine 3 then 5.' },
        { phase: 'PLAY', text: 'Play 3 then 5.' },
      ] },
      { type: 'listen_sing_play', random: { degrees: [1, 3, 5], length: 2, count: 10, min_length: 2, max_length: 3 }, response_seconds: 5, drone: true },
      { type: 'listen_sing_play', random: { degrees: [1, 3, 5, 8], length: 2, count: 8, min_length: 2, max_length: 3 }, response_seconds: 5, drone: true,
        play_text_single: 'Play it — try a different place on your instrument.' },
      { type: 'random_note_recognition', allowed_degrees: [1, 3, 5], blocks: [{ length: 2, trials: 8 }] },
      improv([1, 3, 5], [
        'Two-note ideas. Play one, then echo yourself.',
        'Two notes, many rhythms.',
        'A two-note question, a two-note answer.',
        'Silence between every pair.',
        'Sing a pair first, then play it.',
        'Free. End on home.',
      ], { duration_seconds: 360 }),
      REFLECTION,
    ],
  },
  {
    lesson_id: 'W03D12', week: 3, day: 12, title: 'Three-note imitation',
    objective: 'Three-note phrases with 2 and 4 added — with fewer and fewer hints.',
    concert_key: 'C', scale: 'major', tempo_bpm: 65, allowed_scale_degrees: [1, 2, 3, 4, 5], duration_minutes: 30,
    exercises: [
      warm('Play {n1} {n2} {n3} {n4} {n5}, up and back.'),
      { type: 'drone_listening', duration_seconds: 90, drone: true, prompt_seconds: 15, prompts: [
        { phase: 'LISTEN', text: '1 2 3 4 5.', play: [1, 2, 3, 4, 5] },
        { phase: 'SING', text: 'Sing it up.' },
        { phase: 'LISTEN', text: '5 4 3 2 1.', play: [5, 4, 3, 2, 1] },
        { phase: 'SING', text: 'Sing it down.' },
        { phase: 'IMAGINE', text: 'Imagine 1, 2, 3.' },
        { phase: 'PLAY', text: 'Play 1, 2, 3.' },
      ] },
      { type: 'listen_sing_play', random: { degrees: [1, 2, 3, 4, 5], length: 3, count: 12, min_length: 2, max_length: 4 }, fade_hints: true, response_seconds: 6, drone: true },
      { type: 'random_note_recognition', allowed_degrees: [1, 2, 3, 4, 5], trials: 10 },
      improv([1, 2, 3, 4, 5], [
        'Three-note ideas. Echo each one once.',
        'Start a phrase on 3. End it on 1.',
        'Steps only — no jumps.',
        'Now jumps: 1 to 4, 5 to 2.',
        'Repeat a three-note idea with a new rhythm.',
        'Eyes closed. Play what you hear inside.',
        'Free. End on home.',
      ], { duration_seconds: 420 }),
      REFLECTION,
    ],
  },
  {
    lesson_id: 'W03D13', week: 3, day: 13, title: 'Four-note melodies',
    objective: 'Four notes, all seven degrees, varied rhythms — listen, sing, reproduce.',
    concert_key: 'C', scale: 'major', tempo_bpm: 65, allowed_scale_degrees: ALL7, duration_minutes: 30,
    exercises: [
      warm('Play the scale slowly, then back down.'),
      { type: 'listen_sing_play', random: { degrees: [1, 2, 3, 4, 5], length: 4, count: 4, rhythmic: true, repeat_notes: true }, response_seconds: 7, drone: true },
      { type: 'listen_sing_play', random: { degrees: ALL7, length: 4, count: 12, min_length: 3, max_length: 5, rhythmic: true, repeat_notes: true },
        hide_answer: true, response_seconds: 7, drone: true },
      { type: 'random_note_recognition', allowed_degrees: ALL7, trials: 10 },
      improv(ALL7, [
        'Four-note melodies of your own. Play each one twice.',
        'Same four notes, three different rhythms.',
        'Repeat a note on purpose. Make it groove.',
        'A long note at the end of each phrase.',
        'Short-short-long. Long-short-short.',
        'Sing a four-note idea, then play it.',
        'Free. End on home.',
      ], { duration_seconds: 420 }),
      REFLECTION,
    ],
  },
  {
    lesson_id: 'W03D14', week: 3, day: 14, title: 'Musical imagination',
    objective: 'Read the numbers, imagine the sound, sing it — then hear it and compare.',
    concert_key: 'C', scale: 'major', tempo_bpm: 65, allowed_scale_degrees: ALL7, duration_minutes: 30,
    exercises: [
      warm('Play {n1} {n2} {n3} {n4} {n5}, slowly.'),
      { type: 'listen_sing_play', mode: 'imagine', phrases: [[1, 2, 3], [3, 2, 1], [1, 3, 5], [5, 4, 3, 2, 1], [1, 2, 3, 4, 5], [5, 3, 1]], repetitions: 1, response_seconds: 6, drone: true },
      { type: 'listen_sing_play', mode: 'imagine', random: { degrees: [1, 2, 3, 4, 5, 6], length: 4, count: 8, min_length: 3, max_length: 5 }, response_seconds: 6, drone: true },
      { type: 'drone_listening', duration_seconds: 180, drone: true, prompt_seconds: 15, prompts: [
        { phase: 'IMAGINE', text: 'Imagine a short phrase of your own.' },
        { phase: 'SING', text: 'Sing it.' },
        { phase: 'PLAY', text: 'Play it.' },
        { phase: 'REST', text: 'Rest.' },
      ] },
      improv(ALL7, [
        'Imagine before every phrase. Then play it.',
        'Hear it inside, then let it out.',
        'Imagine a happy idea. Play it.',
        'Imagine a calm one. Play it.',
        'Free. Imagine first, always.',
      ], { duration_seconds: 300 }),
      REFLECTION,
    ],
  },
  {
    lesson_id: 'W03D15', week: 3, day: 15, title: 'Transferring musical ideas',
    objective: 'Learn a melody by ear, carry it to another place, and make three variations.',
    concert_key: 'C', scale: 'major', tempo_bpm: 65, allowed_scale_degrees: [1, 2, 3, 4, 5, 6], duration_minutes: 30,
    melodies: { m1: { degrees: [1, 2, 3, 4, 5, 6], length: 5, max_leap: 2, end_home: true, rhythmic: true, beats: 7 } },
    exercises: [
      warm('Play {n1} to {n6} slowly, up and back.'),
      { type: 'drone_listening', duration_seconds: 90, drone: true, prompt_seconds: 15, prompts: [
        { phase: 'LISTEN', text: "Today's melody. Just listen.", play: 'm1' },
        { phase: 'LISTEN', text: 'Again. Where does it start?', play: 'm1' },
        { phase: 'SING', text: 'Hum along quietly.', play: 'm1' },
      ] },
      { type: 'listen_sing_play', melody: 'm1', repetitions: 4, hide_answer: true, response_seconds: 8, drone: true, inst: 'guitar',
        play_text: 'Find it on guitar — by ear.', play_text_single: 'Find it on your instrument — by ear.' },
      { type: 'listen_sing_play', melody: 'm1', repetitions: 3, hide_answer: true, response_seconds: 8, drone: true, inst: 'sax',
        play_text: 'Now carry it to sax. No notes — just ears.', play_text_single: 'Now play it starting somewhere new — an octave up or a new position.' },
      improv([1, 2, 3, 4, 5, 6], [
        { text: 'Variation 1: same notes, new rhythm.', play: 'm1' },
        { text: 'Keep shaping variation 1.' },
        { text: 'Variation 2: change the ending.', play: 'm1' },
        { text: 'Variation 3: add notes in between.', play: 'm1' },
        { text: 'Play your favourite variation twice.' },
        { text: 'Free — then finish with the original melody.', play: 'm1' },
      ], { duration_seconds: 420, prompt_seconds: 70 }),
      REFLECTION,
    ],
  },

  /* ===== WEEK 4: musical conversations (over a slow one-chord band) ===== */
  {
    lesson_id: 'W04D16', week: 4, day: 16, title: 'Questions and answers',
    objective: 'The band and you trade two-bar phrases: a question, then your answer.',
    concert_key: 'C', scale: 'major', tempo_bpm: 65, allowed_scale_degrees: ALL7, duration_minutes: 30,
    exercises: [
      warm('Play the scale slowly. Then {n5} {n3} {n1}.'),
      { type: 'drone_listening', duration_seconds: 90, drone: true, prompt_seconds: 15, prompts: [
        { phase: 'LISTEN', text: 'A question ends away from home…', play: [1, 2, 3, 2] },
        { phase: 'LISTEN', text: '…an answer comes home.', play: [3, 2, 1] },
        { phase: 'SING', text: 'Sing a question. End on 2 or 5.' },
        { phase: 'SING', text: 'Sing an answer. End on 1.' },
        { phase: 'PLAY', text: 'Play a question.' },
        { phase: 'PLAY', text: 'Play an answer.' },
      ] },
      { type: 'question_answer', backing: 'vamp', degrees: ALL7, duration_seconds: 420 },
      improv(ALL7, [
        'You ask and you answer. Question ends away, answer comes home.',
        'Short question, long answer.',
        'Long question, short answer.',
        'Answer with the same rhythm as the question.',
        'Answer with the opposite mood.',
        'Free conversation with yourself.',
      ], { duration_seconds: 360, drone: false, backing: 'vamp' }),
      REFLECTION,
    ],
  },
  {
    lesson_id: 'W04D17', week: 4, day: 17, title: 'Repetition',
    objective: 'Take one small motif and repeat it with new rhythms, dynamics and endings.',
    concert_key: 'C', scale: 'major', tempo_bpm: 65, allowed_scale_degrees: ALL7, duration_minutes: 30,
    melodies: { m1: { degrees: [1, 2, 3, 5], length: 4, rhythmic: true, beats: 3, repeat_notes: true, max_leap: 2 } },
    exercises: [
      warm('Play {n1} {n2} {n3} {n5}, slowly.'),
      { type: 'drone_listening', duration_seconds: 60, drone: true, prompt_seconds: 15, prompts: [
        { phase: 'LISTEN', text: "Today's motif.", play: 'm1' },
        { phase: 'LISTEN', text: 'Again.', play: 'm1' },
        { phase: 'SING', text: 'Sing it.', play: 'm1' },
        { phase: 'IMAGINE', text: 'Hear it in your head.' },
      ] },
      { type: 'listen_sing_play', melody: 'm1', repetitions: 3, response_seconds: 6, drone: true, play_text: 'Learn the motif on {inst}.' },
      improv(ALL7, [
        { text: 'Repeat the motif four times — exactly.', play: 'm1' },
        'Same notes, new rhythm.',
        'The motif soft… then loud.',
        { text: 'Change only the ending.', play: 'm1' },
        'Start it on a different note.',
        'Motif, your own answer, motif again.',
        'Free — but keep coming back to the motif.',
      ], { duration_seconds: 420, drone: false, backing: 'vamp' }),
      REFLECTION,
    ],
  },
  {
    lesson_id: 'W04D18', week: 4, day: 18, title: 'Silence',
    objective: 'Leave deliberate space: two bars playing, two bars resting.',
    concert_key: 'C', scale: 'major', tempo_bpm: 60, allowed_scale_degrees: ALL7, duration_minutes: 30,
    exercises: [
      warm('Play a few notes, then a few seconds of silence. Repeat.'),
      { type: 'drone_listening', duration_seconds: 60, drone: true, prompt_seconds: 15, prompts: [
        { phase: 'LISTEN', text: 'Silence is part of music.' },
        { phase: 'PLAY', text: 'Play one note. Let it ring out completely.' },
        { phase: 'REST', text: 'Now silence. Feel the space.' },
        { phase: 'PLAY', text: 'Another note — when it feels right.' },
      ] },
      { type: 'play_rest', backing: 'vamp', bars: 2, degrees: ALL7, duration_seconds: 300 },
      improv(ALL7, [
        'Make the gaps longer than the phrases.',
        'One note, then wait a whole bar.',
        'Let the band answer you in the silence.',
        'A phrase, a breath, the same phrase again.',
        'Fewer notes. More meaning.',
      ], { duration_seconds: 300, drone: false, backing: 'vamp' }),
      { type: 'play_rest', backing: 'vamp', bars: 1, degrees: ALL7, duration_seconds: 120 },
      REFLECTION,
    ],
  },
  {
    lesson_id: 'W04D19', week: 4, day: 19, title: 'Musical emotion',
    objective: 'Use rhythm, articulation, pitch and dynamics to express a feeling.',
    concert_key: 'C', scale: 'major', tempo_bpm: 65, allowed_scale_degrees: ALL7, duration_minutes: 30,
    exercises: [
      warm('Play one note five ways: soft, loud, short, long, bent or wavering.'),
      improv(ALL7, [
        'Happiness: bright 3 and 5, bouncy rhythm, medium-loud.',
        'Sadness: slow, soft, linger on 6 and 2, fall downward.',
        'Curiosity: end phrases on 2 or 7 — leave them open.',
        'Mystery: 4 and 7, long notes, long silences, very soft.',
        'Calmness: long notes on 1, 3, 5. Steady breath.',
      ], { duration_seconds: 400, prompt_seconds: 80 }),
      improv(ALL7, [
        'Happiness — with the band.',
        'Sadness — with the band.',
        'Curiosity — with the band.',
        'Mystery — with the band.',
        'Calmness — with the band.',
        'Your choice. Which feeling came most naturally?',
      ], { duration_seconds: 360, drone: false, backing: 'vamp' }),
      REFLECTION,
    ],
  },
  {
    lesson_id: 'W04D20', week: 4, day: 20, title: 'Musical storytelling',
    objective: 'An improvisation with a beginning, a middle that builds, and an ending.',
    concert_key: 'C', scale: 'major', tempo_bpm: 65, allowed_scale_degrees: ALL7, duration_minutes: 30,
    exercises: [
      warm('Play the scale slowly. Then a soft phrase and a loud one.'),
      { type: 'drone_listening', duration_seconds: 60, drone: true, prompt_seconds: 15, prompts: [
        { phase: 'IMAGINE', text: 'Plan your story: quiet start…' },
        { phase: 'IMAGINE', text: '…develop one idea…' },
        { phase: 'IMAGINE', text: '…build intensity…' },
        { phase: 'IMAGINE', text: '…come home with a simple ending.' },
      ] },
      improv(ALL7, [
        { text: 'Take 1. Beginning: quiet, few notes. One small idea.', seconds: 90 },
        { text: 'Middle: develop the idea. Repeat it, change it.', seconds: 90 },
        { text: 'Build: louder, busier, higher.', seconds: 90 },
        { text: 'Ending: a simple phrase that comes home.', seconds: 60 },
      ], { duration_seconds: 330, drone: false, backing: 'vamp' }),
      improv(ALL7, [
        { text: 'Take 2 — the keeper. Want a recording? Start your phone recorder. Quiet beginning.', seconds: 90 },
        { text: 'Develop your idea.', seconds: 90 },
        { text: 'Build the intensity.', seconds: 90 },
        { text: 'Come home. Compare with your Day 5 recording later.', seconds: 60 },
      ], { duration_seconds: 330, drone: false, backing: 'vamp', record_performance: true }),
      REFLECTION,
    ],
  },
);

/* ---------------- Weeks 5–8: hearing harmony ----------------
   New pieces (see index.html):
     backing: { progression: ['I','IV','V','I'] or [{sym, beats}], beats_per_chord, style: 'pop' | 'ballad' | 'shuffle' }
       Chords are Roman numerals relative to home (I ii iii IV V vi vii°, V7, I7…). In minor/blues lessons the roots come
       from the natural minor scale (i iv v III VI VII, V7 = the harmonic-minor dominant).
     chord_display: 'full' (now → next) | 'current' | 'fade' (full → current → hidden) | 'hidden'
     chord_tones: PromptRunner over the band; prompt/ex target: 'root' | 'third' | 'fifth' | 'tones' shows the note to aim for
     chord_recognition: chords (pool) + answer 'numeral' | 'quality', or progressions: [[…], …]
     prompt chord: 'IV' / chords: ['V7','I'] strums them (arp: true arpeggiates); {cIV} in text = that chord's name
     degrees with accidentals: 'b3', 'b5', 'b6', 'b7' (always counted against home's major scale)
     listen_sing_play phrases can be {degs, chord} to hear each phrase against its own chord; context_chord for all */

Object.assign(window.WEEKS, { 5: 'Discovering the seven chords', 6: 'Following chord changes', 7: 'Exploring minor keys', 8: 'Blues and expressive improvisation' });

const band = (progression, style, extra) => Object.assign({ progression, style: style || 'pop' }, extra || {});
const tones = (backing, prompts, extra) => Object.assign({ type: 'chord_tones', duration_seconds: 240, backing, prompt_seconds: 60,
  prompts: prompts.map(p => Object.assign({ phase: 'PLAY' }, p)) }, extra || {});
const bandImprov = (backing, prompts, extra) => Object.assign({ type: 'free_improvisation', duration_seconds: 420, backing, degrees: [1, 2, 3, 4, 5, 6, 7], prompt_seconds: 60,
  prompts: prompts.map(t => typeof t === 'string' ? { phase: 'CREATE', text: t } : Object.assign({ phase: 'CREATE' }, t)) }, extra || {});
const listen = (prompts, seconds) => ({ type: 'drone_listening', duration_seconds: seconds || 180, prompt_seconds: 20, prompts });
const MINOR = [1, 2, 'b3', 4, 5, 'b6', 'b7'], HARM = [1, 2, 'b3', 4, 5, 'b6', 7], PENTA = [1, 'b3', 4, 5, 'b7'], BLUES = [1, 'b3', 4, 'b5', 5, 'b7'];
const TWELVE = ['I7', 'I7', 'I7', 'I7', 'IV7', 'IV7', 'I7', 'I7', 'V7', 'IV7', 'I7', 'V7'];
const STORY = (take) => [
  { text: `${take} Beginning: quiet, a few notes, one small idea.`, seconds: 75 },
  { text: 'Middle: develop the idea. Repeat it, change it.', seconds: 75 },
  { text: 'Build: louder, busier, more tension.', seconds: 75 },
  { text: 'Ending: a simple phrase that comes home.', seconds: 55 },
];

window.LESSONS.push(
  /* ===== WEEK 5: discovering the seven chords (C major) ===== */
  {
    lesson_id: 'W05D21', week: 5, day: 21, title: 'The I chord',
    objective: 'Hear home as a chord — 1, 3, 5 — and play its notes one by one.',
    concert_key: 'C', scale: 'major', tempo_bpm: 66, allowed_scale_degrees: [1, 3, 5], duration_minutes: 30,
    exercises: [
      warm('Play {n1} {n3} {n5} slowly, up and down.'),
      listen([
        { phase: 'LISTEN', text: 'The I chord: {cI}. Home, as a chord.', chord: 'I', arp: true },
        { phase: 'SING', text: 'Sing its notes: 1, 3, 5.', degs: [1, 3, 5] },
        { phase: 'LISTEN', text: 'Again. Hear each tone inside it.', chord: 'I', arp: true },
        { phase: 'SING', text: 'Sing the top note, 5. Then the bottom, 1.', degs: [5, 1] },
        { phase: 'IMAGINE', text: 'Imagine the chord ringing.', degs: [1, 3, 5] },
        { phase: 'LISTEN', text: 'Solid. Settled. Home.', chord: 'I' },
      ]),
      { type: 'listen_sing_play', context_chord: 'I', phrases: [[1, 3, 5], [5, 3, 1], [1, 3, 5, 3, 1], [3, 5, 8]], repetitions: 2, response_seconds: 6 },
      tones(band(['I'], 'ballad'), [
        { text: 'Play the root, {n1}. Long notes with the band.', target: 'root' },
        { text: 'Now the 3rd, {n3} — the warm, bright one.', target: 'third' },
        { text: 'The 5th, {n5} — strong and open.', target: 'fifth' },
        { text: 'All three, any order, any rhythm.', target: 'tones' },
      ]),
      bandImprov(band(['I']), [
        'Improvise over the {cI} vamp. Land on 1, 3 or 5 at the end of each phrase.',
        'Short phrases. Leave space for the band.',
        'Use the whole scale, but rest on chord tones.',
        'A rhythm you repeat, ending on 3.',
        'Quiet, then busier, then quiet.',
        'Free. End on home.',
      ], { duration_seconds: 360 }),
      REFLECTION,
    ],
  },
  {
    lesson_id: 'W05D22', week: 5, day: 22, title: 'The IV chord',
    objective: 'Meet IV — 4, 6, 1 — and hear the change from I to IV.',
    concert_key: 'C', scale: 'major', tempo_bpm: 66, allowed_scale_degrees: [1, 3, 4, 5, 6], duration_minutes: 30,
    exercises: [
      warm('Play {n4} {n6} {n1}, then {n1} {n3} {n5}.'),
      listen([
        { phase: 'LISTEN', text: 'The IV chord: {cIV}. Tones 4, 6, 1.', chord: 'IV', arp: true },
        { phase: 'SING', text: 'Sing 4, 6, 1.', degs: [4, 6, 8] },
        { phase: 'LISTEN', text: 'Home chord, then IV. It lifts and opens.', chords: ['I', 'IV'] },
        { phase: 'LISTEN', text: 'IV back to I — the "amen" sound.', chords: ['IV', 'I'] },
        { phase: 'SING', text: 'Sing 1 3 5, then 4 6 1.', degs: [1, 3, 5, 4, 6, 8] },
        { phase: 'IMAGINE', text: 'Imagine the band moving from I to IV.' },
      ]),
      { type: 'listen_sing_play', context_chord: 'IV', phrases: [[4, 6, 8], [8, 6, 4], [4, 6, 8, 6, 4]], repetitions: 2, response_seconds: 6 },
      { type: 'chord_recognition', chords: ['I', 'IV'], trials: 10 },
      tones(band([{ sym: 'I', beats: 8 }, { sym: 'IV', beats: 8 }], 'ballad'), [
        { text: 'Play each chord’s root as it arrives.', target: 'root' },
        { text: 'Now each chord’s 3rd. Hear {n3} move to {n6}.', target: 'third' },
        { text: 'Any chord tone — change when the chord changes.', target: 'tones' },
      ], { duration_seconds: 180 }),
      bandImprov(band(['I', 'IV']), [
        'Hear the change. Land on a chord tone when it arrives.',
        'Lean on 6 over IV. Back to 3 over I.',
        'One phrase per chord.',
        'Rest on the change — let the band announce it.',
        'Free. Follow the harmony.',
      ], { duration_seconds: 360, chord_tones: true }),
      REFLECTION,
    ],
  },
  {
    lesson_id: 'W05D23', week: 5, day: 23, title: 'The V chord',
    objective: 'Feel V and V7 pull toward home — and the relief when it resolves.',
    concert_key: 'C', scale: 'major', tempo_bpm: 66, allowed_scale_degrees: [1, 2, 3, 4, 5, 7], duration_minutes: 30,
    exercises: [
      warm('Play {n5} {n7} {n2}, then {n1} {n3} {n5}.'),
      listen([
        { phase: 'LISTEN', text: 'The V chord: {cV}. Tones 5, 7, 2. Strong, unfinished.', chord: 'V', arp: true },
        { phase: 'LISTEN', text: 'V to I. Resolution.', chords: ['V', 'I'] },
        { phase: 'LISTEN', text: 'V7: {cV7}. Adds 4 — even more pull.', chord: 'V7', arp: true },
        { phase: 'LISTEN', text: 'V7 to I. Feel the release.', chords: ['V7', 'I'] },
        { phase: 'SING', text: 'Sing 7 rising to 1, and 4 falling to 3.', degs: [7, 8, 4, 3] },
        { phase: 'IMAGINE', text: 'Imagine V7 waiting… then home.' },
      ]),
      { type: 'listen_sing_play', context_chord: 'V7', phrases: [[5, 7, 9], [5, 7, 9, 11], [7, 8], [4, 3]], repetitions: 2, response_seconds: 6 },
      { type: 'chord_recognition', chords: ['I', 'IV', 'V'], trials: 10 },
      tones(band([{ sym: 'V7', beats: 4 }, { sym: 'I', beats: 4 }], 'ballad'), [
        { text: 'Roots: {n5} on V7, {n1} on I.', target: 'root' },
        { text: 'Each chord’s 3rd. Hear {n7} rise to… where?', target: 'third' },
        { text: 'Any chord tone. Make V7 sound tense, I sound relaxed.', target: 'tones' },
      ], { duration_seconds: 180 }),
      bandImprov(band(['I', 'IV', 'V7', 'I']), [
        'Over V7, build tension. Over I, let it go.',
        'End phrases on home when I arrives.',
        'Use 7 and 4 over V7.',
        'Fewer notes. Feel the pull.',
        'Free. Follow the harmony.',
      ], { duration_seconds: 360, chord_tones: true }),
      REFLECTION,
    ],
  },
  {
    lesson_id: 'W05D24', week: 5, day: 24, title: 'The minor chords',
    objective: 'ii, iii and vi: the softer, darker members of the family.',
    concert_key: 'C', scale: 'major', tempo_bpm: 66, allowed_scale_degrees: [1, 2, 3, 4, 5, 6, 7], duration_minutes: 30,
    exercises: [
      warm('Play {n6} {n1} {n3}, then {n2} {n4} {n6}.'),
      listen([
        { phase: 'LISTEN', text: 'vi: {cvi}. 6, 1, 3. Minor — softer, darker.', chord: 'vi', arp: true },
        { phase: 'LISTEN', text: 'I, then vi. Same family, different mood.', chords: ['I', 'vi'] },
        { phase: 'LISTEN', text: 'ii: {cii}. 2, 4, 6.', chord: 'ii', arp: true },
        { phase: 'LISTEN', text: 'iii: {ciii}. 3, 5, 7.', chord: 'iii', arp: true },
        { phase: 'SING', text: 'Sing a major chord, then a minor one.', degs: [1, 3, 5, 6, 8, 10] },
        { phase: 'IMAGINE', text: 'Imagine the difference between bright and soft.' },
      ], 200),
      { type: 'listen_sing_play', phrases: [{ degs: [6, 8, 10], chord: 'vi' }, { degs: [2, 4, 6], chord: 'ii' }, { degs: [3, 5, 7], chord: 'iii' }, { degs: [1, 3, 5], chord: 'I' }],
        repetitions: 2, response_seconds: 6 },
      { type: 'chord_recognition', answer: 'quality', chords: ['I', 'IV', 'V', 'ii', 'iii', 'vi'], trials: 12 },
      tones(band(['I', 'vi', 'ii', 'V']), [
        { text: 'Roots: 1, 6, 2, 5.', target: 'root' },
        { text: 'Each chord’s 3rd. Hear major and minor.', target: 'third' },
        { text: 'Any chord tone, on the change.', target: 'tones' },
      ], { duration_seconds: 180 }),
      bandImprov(band([{ sym: 'I', beats: 8 }, { sym: 'vi', beats: 8 }], 'ballad'), [
        'Bright over I, tender over vi.',
        'Same phrase over both chords. Hear it change colour.',
        'Lean on 6 over vi.',
        'Free. Follow the mood.',
      ], { duration_seconds: 300, chord_tones: true }),
      REFLECTION,
    ],
  },
  {
    lesson_id: 'W05D25', week: 5, day: 25, title: 'The complete harmonic landscape',
    objective: 'Add vii° and hear all seven chords of the key.',
    concert_key: 'C', scale: 'major', tempo_bpm: 66, allowed_scale_degrees: [1, 2, 3, 4, 5, 6, 7], duration_minutes: 30,
    exercises: [
      warm('Play the scale slowly. Then {n7} {n2} {n4}.'),
      listen([
        { phase: 'LISTEN', text: 'vii°: {cvii°}. 7, 2, 4. Tense and unstable.', chord: 'vii°', arp: true },
        { phase: 'LISTEN', text: 'vii° melts into home.', chords: ['vii°', 'I'] },
        { phase: 'LISTEN', text: 'All seven chords, up the scale.', chords: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°', 'I'], seconds: 30 },
        { phase: 'SING', text: 'Sing the roots: 1 to 7 and home.', degs: [1, 2, 3, 4, 5, 6, 7, 8] },
        { phase: 'IMAGINE', text: 'Which chord feels most like you?' },
      ], 160),
      { type: 'chord_recognition', answer: 'quality', chords: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'], trials: 10 },
      { type: 'chord_recognition', chords: ['I', 'ii', 'IV', 'V', 'vi'], trials: 10 },
      tones(band(['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°', 'I'], 'ballad'), [
        { text: 'Walk the roots with the band.', target: 'root' },
        { text: 'Each chord’s 3rd.', target: 'third' },
      ], { duration_seconds: 150, prompt_seconds: 75 }),
      bandImprov(band(['I', 'vi', 'ii', 'V']), [
        'Over the classic 1–6–2–5. Land on chord tones.',
        'Phrases that start on the change.',
        'Phrases that end on the change.',
        'Free. Follow the harmony.',
      ], { duration_seconds: 300, chord_tones: true }),
      REFLECTION,
    ],
  },

  /* ===== WEEK 6: following chord changes ===== */
  {
    lesson_id: 'W06D26', week: 6, day: 26, title: 'I to IV',
    objective: 'Land on a chord tone exactly when the harmony changes.',
    concert_key: 'C', scale: 'major', tempo_bpm: 70, allowed_scale_degrees: [1, 2, 3, 4, 5, 6, 7], duration_minutes: 30,
    exercises: [
      warm('Play {n1} {n3} {n5}, then {n4} {n6} {n1}.'),
      listen([
        { phase: 'LISTEN', text: 'I, IV, I, IV. Hear the moment it changes.', chords: ['I', 'IV', 'I', 'IV'] },
        { phase: 'SING', text: 'Sing the roots as it changes: 1… 4… 1… 4.', chords: ['I', 'IV', 'I', 'IV'] },
      ], 60),
      tones(band(['I', 'IV', 'I', 'IV']), [
        { text: 'Root of each chord, on beat 1.', target: 'root' },
        { text: 'The 3rd of each chord.', target: 'third' },
        { text: 'Any chord tone — right on the change.', target: 'tones' },
        { text: 'Same, with a rhythm leading into the change.', target: 'tones' },
        { text: 'Fewer notes. Just land well.', target: 'tones' },
      ], { duration_seconds: 300 }),
      { type: 'question_answer', backing: band(['I', 'IV']), degrees: [1, 2, 3, 4, 5, 6, 7], duration_seconds: 240 },
      bandImprov(band(['I', 'IV', 'I', 'IV']), [
        'Free over I–IV. The chord display fades as you go — trust your ears.',
        'Land on 3 over I, on 6 over IV.',
        'Start a phrase just before the change.',
        'Free.',
      ], { duration_seconds: 300, chord_tones: true, chord_display: 'fade' }),
      REFLECTION,
    ],
  },
  {
    lesson_id: 'W06D27', week: 6, day: 27, title: 'I to V',
    objective: 'Hear tension (V) and resolution (I) and shape phrases around them.',
    concert_key: 'C', scale: 'major', tempo_bpm: 70, allowed_scale_degrees: [1, 2, 3, 4, 5, 6, 7], duration_minutes: 30,
    exercises: [
      warm('Play {n1} {n3} {n5}, then {n5} {n7} {n2}.'),
      listen([
        { phase: 'LISTEN', text: 'I, V, I, V. Feel the lean and the release.', chords: ['I', 'V', 'I', 'V'] },
        { phase: 'SING', text: 'Sing the roots: 1… 5… 1… 5.', chords: ['I', 'V', 'I', 'V'] },
      ], 60),
      tones(band(['I', 'V', 'I', 'V']), [
        { text: 'Root of each chord.', target: 'root' },
        { text: 'The 3rd: {n3} over I, {n7} over V.', target: 'third' },
        { text: 'Any chord tone, on the change.', target: 'tones' },
        { text: 'Make V sound like a question.', target: 'tones' },
      ], { duration_seconds: 240 }),
      { type: 'question_answer', backing: band(['I', 'V']), degrees: [1, 2, 3, 4, 5, 6, 7], duration_seconds: 240 },
      bandImprov(band(['I', 'V', 'I', 'V']), [
        'Phrases that respond to the harmony: ask on V, answer on I.',
        'Hold 7 over V. Step up to home on I.',
        'Hold 2 over V. Step down to home.',
        'Free. The display fades — listen.',
      ], { duration_seconds: 360, chord_tones: true, chord_display: 'fade' }),
      REFLECTION,
    ],
  },
  {
    lesson_id: 'W06D28', week: 6, day: 28, title: 'I–IV–V–I',
    objective: 'Follow the classic progression: roots, then thirds and fifths, then freely.',
    concert_key: 'C', scale: 'major', tempo_bpm: 70, allowed_scale_degrees: [1, 2, 3, 4, 5, 6, 7], duration_minutes: 30,
    exercises: [
      warm('Play the roots {n1} {n4} {n5} {n1}, slowly.'),
      listen([
        { phase: 'LISTEN', text: 'I, IV, V, I.', chords: ['I', 'IV', 'V', 'I'] },
        { phase: 'SING', text: 'Sing the roots with it: 1, 4, 5, 1.', chords: ['I', 'IV', 'V', 'I'] },
      ], 60),
      tones(band(['I', 'IV', 'V', 'I']), [
        { text: 'Roots: 1, 4, 5, 1.', target: 'root', seconds: 90 },
        { text: 'Thirds: 3, 6, 7, 3.', target: 'third', seconds: 90 },
        { text: 'Fifths: 5, 1, 2, 5.', target: 'fifth', seconds: 90 },
        { text: 'Mix them — any chord tone.', target: 'tones', seconds: 60 },
      ], { duration_seconds: 330 }),
      bandImprov(band(['I', 'IV', 'V', 'I']), [
        'Free improvisation over I–IV–V–I.',
        'Start each phrase on a chord tone.',
        'Answer the band: one phrase per two chords.',
        'Steps between chord tones.',
        'Free.',
      ], { duration_seconds: 420, chord_tones: true, chord_display: 'current' }),
      REFLECTION,
    ],
  },
  {
    lesson_id: 'W06D29', week: 6, day: 29, title: 'I–V–vi–IV',
    objective: 'Improvise over the most common pop progression, with the chords fading from view.',
    concert_key: 'C', scale: 'major', tempo_bpm: 72, allowed_scale_degrees: [1, 2, 3, 4, 5, 6, 7], duration_minutes: 30,
    exercises: [
      warm('Play the roots {n1} {n5} {n6} {n4}, slowly.'),
      listen([
        { phase: 'LISTEN', text: 'I, V, vi, IV — you have heard this in a thousand songs.', chords: ['I', 'V', 'vi', 'IV'] },
        { phase: 'SING', text: 'Sing the roots: 1, 5, 6, 4.', chords: ['I', 'V', 'vi', 'IV'] },
      ], 60),
      tones(band(['I', 'V', 'vi', 'IV']), [
        { text: 'Roots with the band.', target: 'root' },
        { text: 'Thirds: 3, 7, 1, 6. A smooth little melody.', target: 'third' },
        { text: 'Any chord tone. Watch the next chord coming.', target: 'tones' },
      ], { duration_seconds: 240, prompt_seconds: 80 }),
      { type: 'question_answer', backing: band(['I', 'V', 'vi', 'IV']), degrees: [1, 2, 3, 4, 5, 6, 7], duration_seconds: 240 },
      bandImprov(band(['I', 'V', 'vi', 'IV']), [
        'Free over I–V–vi–IV. The chord display fades — keep following.',
        'Make up a hook and repeat it.',
        'Tender over vi.',
        'Free.',
      ], { duration_seconds: 420, chord_tones: true, chord_display: 'fade' }),
      REFLECTION,
    ],
  },
  {
    lesson_id: 'W06D30', week: 6, day: 30, title: 'Hearing chord changes',
    objective: 'Name familiar progressions by ear, then improvise with no chord display.',
    concert_key: 'C', scale: 'major', tempo_bpm: 70, allowed_scale_degrees: [1, 2, 3, 4, 5, 6, 7], duration_minutes: 30,
    exercises: [
      warm('Play the roots of I, IV, V and vi.'),
      { type: 'chord_recognition', chords: ['I', 'IV', 'V', 'vi'], trials: 8 },
      { type: 'chord_recognition', progressions: [['I', 'IV', 'V', 'I'], ['I', 'V', 'vi', 'IV'], ['I', 'vi', 'IV', 'V'], ['I', 'IV', 'I', 'V'], ['vi', 'IV', 'I', 'V'], ['I', 'V', 'IV', 'I']], trials: 10 },
      bandImprov(band(['I', 'vi', 'IV', 'V']), [
        'No chord display. Follow the band by ear.',
        'Land on chord tones when you hear the change.',
        'Free.',
      ], { duration_seconds: 300, chord_display: 'hidden' }),
      bandImprov(band(['I', 'V', 'vi', 'IV']), [
        { text: 'Performance. Want a recording? Start your phone recorder now.', seconds: 20 },
        { text: 'Play — follow the harmony. Finish on home.', seconds: 160 },
      ], { duration_seconds: 180, chord_display: 'hidden', record_performance: true }),
      REFLECTION,
    ],
  },

  /* ===== WEEK 7: exploring minor keys (concert A minor = written B minor on tenor sax) ===== */
  {
    lesson_id: 'W07D31', week: 7, day: 31, title: 'Finding minor home',
    objective: 'A as home: the natural minor scale and its darker colours.',
    concert_key: 'A', scale: 'minor', tempo_bpm: 66, allowed_scale_degrees: MINOR, duration_minutes: 30,
    exercises: [
      warm('Play {n1} {n2} {nb3} {n4} {n5} slowly.'),
      { type: 'drone_listening', duration_seconds: 240, drone: true, prompt_seconds: 20, prompts: [
        { phase: 'LISTEN', text: 'New home: {n1}. Settle in.' },
        { phase: 'LISTEN', text: 'The natural minor scale.', play: [1, 2, 'b3', 4, 5, 'b6', 'b7', 8] },
        { phase: 'LISTEN', text: 'Major 1 3 5, then minor 1 ♭3 5.', play: [1, 3, 5, 1, 'b3', 5] },
        { phase: 'SING', text: 'Sing 1, ♭3, 5.', degs: [1, 'b3', 5] },
        { phase: 'LISTEN', text: 'Same notes as C major — but home is A.', play: ['b3', 4, 5, 'b6', 'b7', 8, 9, 'b10'] },
        { phase: 'IMAGINE', text: 'Imagine ♭3. How does it feel compared to 3?' },
      ] },
      { type: 'find_note', duration_seconds: 60, drone: true, degrees: [1, 'b3', 5], show_fingering: true, confirm: '✓ Found it', prompts: [
        { phase: 'PLAY', text: 'Find {n1}, {nb3} and {n5}.' }] },
      { type: 'listen_sing_play', phrases: [[1, 'b3', 1], [1, 2, 'b3', 2, 1], [5, 'b6', 5], [8, 'b7', 'b6', 5]], repetitions: 2, response_seconds: 6, drone: true },
      { type: 'random_note_recognition', allowed_degrees: [1, 'b3', 5, 'b7'], trials: 10 },
      improv(MINOR, [
        'Explore minor home. Linger on ♭3.',
        'Slow and dark. ♭6 falling to 5.',
        'Short phrases, all ending on home.',
        '♭7 stepping up to home.',
        'Mysterious and quiet.',
        'Free.',
      ], { duration_seconds: 360 }),
      REFLECTION,
    ],
  },
  {
    lesson_id: 'W07D32', week: 7, day: 32, title: 'Minor chord tones',
    objective: '1, ♭3, 5: hear the minor third against the major third, and make minor melodies.',
    concert_key: 'A', scale: 'minor', tempo_bpm: 66, allowed_scale_degrees: MINOR, duration_minutes: 30,
    exercises: [
      warm('Play {n1} {nb3} {n5}, then {n1} {n3} {n5}.'),
      listen([
        { phase: 'LISTEN', text: 'The minor home chord: {ci}.', chord: 'i', arp: true },
        { phase: 'LISTEN', text: 'Major third, then minor third.', play: [1, 3, 1, 'b3'] },
        { phase: 'SING', text: 'Sing 1 3, then 1 ♭3. Feel the shade change.', degs: [1, 3, 1, 'b3'] },
        { phase: 'LISTEN', text: '{ci} again. 1, ♭3, 5.', chord: 'i', arp: true },
        { phase: 'IMAGINE', text: 'Imagine a minor melody.' },
      ], 150),
      { type: 'random_note_recognition', allowed_degrees: [3, 'b3'], trials: 12 },
      { type: 'listen_sing_play', context_chord: 'i', phrases: [[1, 'b3', 5], [5, 'b3', 1], [1, 'b3', 5, 'b3', 1], ['b3', 2, 1]], repetitions: 2, response_seconds: 6 },
      { type: 'listen_sing_play', random: { degrees: MINOR, length: 4, count: 6, end_home: true, max_leap: 2 }, response_seconds: 7, drone: true },
      bandImprov(band(['i'], 'ballad'), [
        'Short minor melodies over {ci}. Land on 1, ♭3 or 5.',
        'Lean on ♭3.',
        'Sad and slow.',
        'Then a little brighter — same notes.',
        'Free.',
      ], { duration_seconds: 360, degrees: MINOR }),
      REFLECTION,
    ],
  },
  {
    lesson_id: 'W07D33', week: 7, day: 33, title: 'Minor chord progressions',
    objective: 'Follow i–iv–v–i with chord tones.',
    concert_key: 'A', scale: 'minor', tempo_bpm: 68, allowed_scale_degrees: MINOR, duration_minutes: 30,
    exercises: [
      warm('Play the roots {n1} {n4} {n5} {n1}.'),
      listen([
        { phase: 'LISTEN', text: 'i, iv, v, i.', chords: ['i', 'iv', 'v', 'i'] },
        { phase: 'SING', text: 'Sing the roots: 1, 4, 5, 1.', chords: ['i', 'iv', 'v', 'i'] },
        { phase: 'LISTEN', text: 'iv: {civ}. 4, ♭6, 1.', chord: 'iv', arp: true },
        { phase: 'LISTEN', text: 'v: {cv}. 5, ♭7, 2.', chord: 'v', arp: true },
      ], 120),
      tones(band(['i', 'iv', 'v', 'i'], 'ballad'), [
        { text: 'Roots: 1, 4, 5, 1.', target: 'root' },
        { text: 'Thirds: ♭3, ♭6, ♭7, ♭3.', target: 'third' },
        { text: 'Fifths.', target: 'fifth' },
        { text: 'Any chord tone, on the change.', target: 'tones' },
      ], { duration_seconds: 300 }),
      { type: 'chord_recognition', answer: 'quality', chords: ['i', 'iv', 'v', 'III', 'VI', 'VII'], trials: 8 },
      bandImprov(band(['i', 'iv', 'v', 'i'], 'ballad'), [
        'Follow the changes with chord tones.',
        'A phrase for each chord.',
        'Dark and slow.',
        'Free. The display fades.',
      ], { duration_seconds: 360, degrees: MINOR, chord_tones: true, chord_display: 'fade' }),
      REFLECTION,
    ],
  },
  {
    lesson_id: 'W07D34', week: 7, day: 34, title: 'Harmonic minor',
    objective: 'Raise the 7th and hear the dominant chord resolve to minor home — pure drama.',
    concert_key: 'A', scale: 'minor', tempo_bpm: 66, allowed_scale_degrees: HARM, duration_minutes: 30,
    exercises: [
      warm('Play {n5} {nb6} {n7} {n1} — slowly.'),
      { type: 'drone_listening', duration_seconds: 200, drone: true, prompt_seconds: 20, prompts: [
        { phase: 'LISTEN', text: 'Natural minor: ♭7 to home.', play: [5, 'b6', 'b7', 8] },
        { phase: 'LISTEN', text: 'Harmonic minor: raised 7 to home. Hear the pull?', play: [5, 'b6', 7, 8] },
        { phase: 'LISTEN', text: '{cV7} to {ci}. Drama, then home.', chords: ['V7', 'i'] },
        { phase: 'SING', text: 'Sing ♭6, 7, 1. Feel the wide step.', degs: ['b6', 7, 8] },
        { phase: 'LISTEN', text: '{cV7}: 5, 7, 2, 4.', chord: 'V7', arp: true },
        { phase: 'IMAGINE', text: 'Imagine 7 leaning hard into home.' },
      ] },
      { type: 'random_note_recognition', allowed_degrees: ['b7', 7], trials: 10 },
      { type: 'listen_sing_play', phrases: [{ degs: [7, 8], chord: 'V7' }, { degs: [5, 'b6', 7, 8], chord: 'V7' }, { degs: [2, 7, 8], chord: 'V7' }, { degs: [1, 'b3', 5], chord: 'i' }],
        repetitions: 2, response_seconds: 6 },
      tones(band(['i', 'iv', 'V7', 'i'], 'ballad'), [
        { text: 'Roots.', target: 'root' },
        { text: 'Thirds — the raised 7 over {cV7}.', target: 'third' },
        { text: 'Any chord tone.', target: 'tones' },
      ], { duration_seconds: 180 }),
      bandImprov(band([{ sym: 'i', beats: 8 }, { sym: 'V7', beats: 8 }], 'ballad'), [
        'Over {cV7}, use the raised 7. Over {ci}, come home.',
        'Dramatic: long notes, then a quick run home.',
        'Exotic and mysterious.',
        'Free.',
      ], { duration_seconds: 360, degrees: HARM, chord_tones: true }),
      REFLECTION,
    ],
  },
  {
    lesson_id: 'W07D35', week: 7, day: 35, title: 'Minor musical storytelling',
    objective: 'An expressive minor improvisation: mystery, sadness, dramatic tension.',
    concert_key: 'A', scale: 'minor', tempo_bpm: 60, allowed_scale_degrees: HARM, duration_minutes: 30,
    exercises: [
      warm('Play the minor scale slowly, up and down.'),
      listen([
        { phase: 'IMAGINE', text: 'Plan a minor story: mystery…' },
        { phase: 'IMAGINE', text: '…sadness…' },
        { phase: 'IMAGINE', text: '…dramatic tension…' },
        { phase: 'IMAGINE', text: '…and a quiet ending.' },
      ], 60),
      bandImprov(band(['i', 'iv', 'V7', 'i'], 'ballad'), STORY('Take 1.'), { duration_seconds: 280, degrees: HARM, chord_display: 'current' }),
      bandImprov(band(['i', 'iv', 'V7', 'i'], 'ballad'), STORY('Take 2 — want a recording? Start your phone recorder.'), { duration_seconds: 280, degrees: HARM, chord_display: 'current', record_performance: true }),
      bandImprov(band(['i', 'VI', 'iv', 'V7'], 'ballad'), [
        'Bonus: a new minor progression. Explore.',
        'Free.',
      ], { duration_seconds: 240, degrees: HARM, chord_tones: true }),
      REFLECTION,
    ],
  },

  /* ===== WEEK 8: blues and expressive improvisation (concert A = written B on tenor sax) ===== */
  {
    lesson_id: 'W08D36', week: 8, day: 36, title: 'Minor pentatonic',
    objective: 'Five notes that make the blues sing — played as short phrases, not runs.',
    concert_key: 'A', scale: 'blues', tempo_bpm: 72, allowed_scale_degrees: PENTA, duration_minutes: 30,
    exercises: [
      warm('Play {n1} {nb3} {n4} {n5} {nb7} {n1}, slowly.'),
      { type: 'drone_listening', duration_seconds: 150, drone: true, prompt_seconds: 15, prompts: [
        { phase: 'LISTEN', text: 'The minor pentatonic: 1 ♭3 4 5 ♭7.', play: [1, 'b3', 4, 5, 'b7', 8] },
        { phase: 'SING', text: 'Sing it up.', degs: PENTA },
        { phase: 'LISTEN', text: 'A blues phrase.', play: ['b3', 1, 'b3', 4, 'b3', 1] },
        { phase: 'SING', text: 'Sing it back with attitude.' },
        { phase: 'LISTEN', text: 'Another.', play: [5, 'b7', 5, 4, 'b3', 1] },
        { phase: 'PLAY', text: 'Play anything from the five notes.' },
      ] },
      { type: 'find_note', duration_seconds: 60, drone: true, degrees: PENTA, show_fingering: true, confirm: '✓ Found them', prompts: [
        { phase: 'PLAY', text: 'Find all five: {n1} {nb3} {n4} {n5} {nb7}.' }] },
      { type: 'listen_sing_play', random: { degrees: [1, 'b3', 4, 5, 'b7', 8], length: 3, count: 10, min_length: 3, max_length: 5, rhythmic: true, repeat_notes: true, max_leap: 2 },
        response_seconds: 6, drone: true },
      { type: 'question_answer', backing: band(['I7'], 'shuffle'), degrees: [1, 'b3', 4, 5, 'b7', 8], swing: true, duration_seconds: 240 },
      bandImprov(band(['I7'], 'shuffle'), [
        'Short pentatonic phrases over the shuffle. Not scale runs.',
        'Repeat a little lick three times.',
        'Leave space — let the band breathe.',
        'Bend or slide into ♭3.',
        'Free.',
      ], { duration_seconds: 360, degrees: PENTA }),
      REFLECTION,
    ],
  },
  {
    lesson_id: 'W08D37', week: 8, day: 37, title: 'The blue note',
    objective: 'Add ♭5 — the tension that makes the blues cry — and resolve it.',
    concert_key: 'A', scale: 'blues', tempo_bpm: 72, allowed_scale_degrees: BLUES, duration_minutes: 30,
    exercises: [
      warm('Play {n4} {nb5} {n5}, slowly. Then back down.'),
      { type: 'drone_listening', duration_seconds: 150, drone: true, prompt_seconds: 15, prompts: [
        { phase: 'LISTEN', text: 'The blue note: ♭5, {nb5}.', play: [4, 'b5', 5] },
        { phase: 'LISTEN', text: 'It rubs… then resolves.', play: [5, 'b5', 4, 'b3', 1] },
        { phase: 'SING', text: 'Sing 4, ♭5, 5. Feel the squeeze.', degs: [4, 'b5', 5] },
        { phase: 'LISTEN', text: 'A classic blues lick.', play: [1, 'b3', 4, 'b5', 5, 'b3', 1] },
        { phase: 'SING', text: 'Sing it back.' },
        { phase: 'IMAGINE', text: 'Imagine ♭5 as a cry.' },
      ] },
      { type: 'find_note', duration_seconds: 45, drone: true, degrees: ['b5'], show_fingering: true, confirm: '✓ Found it', prompts: [
        { phase: 'PLAY', text: 'Find {nb5}, between {n4} and {n5}. Pass through it — don’t sit on it.' }] },
      { type: 'listen_sing_play', phrases: [[4, 'b5', 4], [5, 'b5', 4, 'b3', 1], [1, 'b3', 4, 'b5', 5], ['b3', 4, 'b5', 4, 'b3', 1]], repetitions: 2, response_seconds: 6, drone: true },
      { type: 'random_note_recognition', allowed_degrees: [4, 'b5', 5], trials: 10 },
      bandImprov(band(['I7'], 'shuffle'), [
        'Use the blue note as a passing tension. Resolve to 4 or 5.',
        'Slide up through ♭5 to 5.',
        'Slide down through ♭5 to 4.',
        'Hold ♭5 for a moment. Make it cry. Then resolve.',
        'Free.',
      ], { duration_seconds: 360, degrees: BLUES }),
      REFLECTION,
    ],
  },
  {
    lesson_id: 'W08D38', week: 8, day: 38, title: 'Twelve-bar blues',
    objective: 'Learn the 12-bar form by following it: roots, then chord tones, then freely.',
    concert_key: 'A', scale: 'blues', tempo_bpm: 60, allowed_scale_degrees: BLUES, duration_minutes: 30,
    exercises: [
      warm('Play the roots {n1} {n4} {n5}.'),
      listen([
        { phase: 'LISTEN', text: 'The three blues chords: {cI7}, {cIV7}, {cV7}.', chords: ['I7', 'IV7', 'I7', 'V7'] },
        { phase: 'LISTEN', text: '4 bars of I, 2 of IV, 2 of I, then V, IV, I, V.', chords: ['I7', 'IV7', 'V7', 'I7'] },
        { phase: 'SING', text: 'Sing the roots: 1… 4… 5… 1.', chords: ['I7', 'IV7', 'V7', 'I7'] },
      ], 90),
      tones(band(TWELVE, 'shuffle'), [
        { text: 'Roots of each chord — one note per bar. Watch the bar count.', target: 'root', seconds: 96 },
        { text: 'The 3rd of each chord — it moves with the chord.', target: 'third', seconds: 96 },
        { text: 'Any chord tone. Feel the form.', target: 'tones', seconds: 96 },
      ], { duration_seconds: 288 }),
      bandImprov(band(TWELVE, 'shuffle'), [
        'Improvise over the 12-bar blues. Use the pentatonic and the blue note.',
        'Mark the change to IV in bar 5.',
        'Build tension at V in bar 9.',
        'Free. Watch for bar 1 coming round.',
      ], { duration_seconds: 384, prompt_seconds: 96, degrees: BLUES, chord_display: 'full' }),
      REFLECTION,
    ],
  },
  {
    lesson_id: 'W08D39', week: 8, day: 39, title: 'Blues conversations',
    objective: 'Trade two-bar blues phrases with the band: swing, repetition, articulation, dynamics.',
    concert_key: 'A', scale: 'blues', tempo_bpm: 70, allowed_scale_degrees: BLUES, duration_minutes: 30,
    exercises: [
      warm('Play a blues lick you know, slowly, then with swing.'),
      listen([
        { phase: 'LISTEN', text: 'Swing: long-short, long-short.', play: [1, 1, 'b3', 'b3', 4, 4, 5] },
        { phase: 'SING', text: 'Sing "doo-ba doo-ba doo-ba doo".' },
        { phase: 'PLAY', text: 'Play it on one note with swing.' },
      ], 60),
      { type: 'question_answer', backing: band(TWELVE, 'shuffle'), degrees: [1, 'b3', 4, 'b5', 5, 'b7', 8], swing: true, duration_seconds: 480, chord_display: 'current' },
      bandImprov(band(TWELVE, 'shuffle'), [
        'Call and response with yourself: a two-bar lick, then an answer.',
        'Repeat a lick, louder each time.',
        'Short, punchy notes. Then long, smooth ones.',
        'Free.',
      ], { duration_seconds: 384, prompt_seconds: 96, degrees: BLUES, chord_display: 'current' }),
      REFLECTION,
    ],
  },
  {
    lesson_id: 'W08D40', week: 8, day: 40, title: 'My blues performance',
    objective: 'Record a complete 12-bar blues improvisation, then evaluate it honestly and kindly.',
    concert_key: 'A', scale: 'blues', tempo_bpm: 66, allowed_scale_degrees: BLUES, duration_minutes: 30,
    exercises: [
      warm('Play your favourite blues licks, slowly.'),
      bandImprov(band(TWELVE, 'shuffle'), [
        'Warm-up choruses. Find your groove.',
      ], { duration_seconds: 175, prompt_seconds: 175, degrees: BLUES, chord_display: 'current' }),
      bandImprov(band(TWELVE, 'shuffle'), [
        { text: 'Performance. Start your phone recorder now. Two choruses.', seconds: 12 },
        { text: 'Chorus 1: simple, with space.', seconds: 88 },
        { text: 'Chorus 2: build — then end on home.', seconds: 88 },
      ], { duration_seconds: 188, degrees: BLUES, chord_display: 'hidden', record_performance: true }),
      { type: 'drone_listening', duration_seconds: 100, prompt_seconds: 20, prompts: [
        { phase: 'REFLECT', text: 'Listen back to your recording.' },
        { phase: 'REFLECT', text: 'Phrasing: did your phrases breathe?' },
        { phase: 'REFLECT', text: 'Rhythm: did you feel the swing?' },
        { phase: 'REFLECT', text: 'Expression: where did it sound most like you?' },
        { phase: 'REFLECT', text: 'Continuity: did it tell one story? Say "save a reflection" to keep a note.' },
      ] },
      REFLECTION,
    ],
  },
);

/* ---------------- Weeks 9–12: musical freedom ----------------
   TUNES: public-domain melodies as scale degrees (key-free, so they play in any key and transpose for sax).
     Each phrase is 4 bars of 4/4: degs, durs (beats), start (pickup rest), chords ('I' = one bar, ['V','I'] = half each).
     Degree -2 = 5 below home, -1 = 6 below home; 'r' = rest.
   range: 'mid' puts home at F3–E4 so the low notes of these tunes stay on the tenor sax.
   tune exercise: order 'phrase' | 'whole' | 'listen' | 'play' (band only), reveal 'hide' (👁 Show on request), repeat, style, tempo.
   key on an exercise moves it to another key (Day 44). Week 12 lessons use concert_key/scale 'song' = the song you build. */

window.TUNES = {
  ode: { title: 'Ode to Joy', style: 'ballad', phrases: [
    { degs: [3, 3, 4, 5, 5, 4, 3, 2, 1, 1, 2, 3, 3, 2, 2], durs: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.5, 0.5, 2], chords: ['I', 'V', 'I', 'V'] },
    { degs: [3, 3, 4, 5, 5, 4, 3, 2, 1, 1, 2, 3, 2, 1, 1], durs: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.5, 0.5, 2], chords: ['I', 'V', 'I', ['V', 'I']] },
    { degs: [2, 2, 3, 1, 2, 3, 4, 3, 1, 2, 3, 4, 3, 2, 1, 2, -2], durs: [1, 1, 1, 1, 1, 0.5, 0.5, 1, 1, 1, 0.5, 0.5, 1, 1, 1, 1, 2], chords: ['V', ['V', 'I'], 'V', ['I', 'V']] },
    { degs: [3, 3, 4, 5, 5, 4, 3, 2, 1, 1, 2, 3, 2, 1, 1], durs: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.5, 0.5, 2], chords: ['I', 'V', 'I', ['V', 'I']] },
  ] },
  saints: { title: 'When the Saints Go Marching In', style: 'pop', phrases: [
    { start: 1, degs: [1, 3, 4, 5, 'r', 1, 3, 4, 5], durs: [1, 1, 1, 4, 1, 1, 1, 1, 4], chords: ['I', 'I', 'I', 'I'] },
    { start: 1, degs: [1, 3, 4, 5, 3, 1, 3, 2], durs: [1, 1, 1, 2, 2, 2, 2, 4], chords: ['I', 'I', 'I', 'V'] },
    { start: 1, degs: [3, 3, 2, 1, 1, 3, 5, 5, 4], durs: [1, 1, 1, 3, 1, 2, 2, 1, 3], chords: ['I', 'I7', 'I', 'IV'] },
    { start: 2, degs: [3, 4, 5, 3, 1, 2, 1], durs: [1, 1, 2, 2, 2, 2, 4], chords: ['I', 'I', 'V', 'I'] },
  ] },
  twinkle: { title: 'Twinkle, Twinkle, Little Star', style: 'pop', phrases: [
    { degs: [1, 1, 5, 5, 6, 6, 5, 4, 4, 3, 3, 2, 2, 1], durs: [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2], chords: ['I', ['IV', 'I'], ['IV', 'I'], ['V', 'I']] },
    { degs: [5, 5, 4, 4, 3, 3, 2, 5, 5, 4, 4, 3, 3, 2], durs: [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2], chords: [['I', 'IV'], ['I', 'V'], ['I', 'IV'], ['I', 'V']] },
    { degs: [1, 1, 5, 5, 6, 6, 5, 4, 4, 3, 3, 2, 2, 1], durs: [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2], chords: ['I', ['IV', 'I'], ['IV', 'I'], ['V', 'I']] },
  ] },
  // 3/4 time — used for learning by ear over the drone, not with the 4/4 band
  grace: { title: 'Amazing Grace', phrases: [
    { degs: [-2, 1, 3, 1, 3, 2, 1, -1, -2], durs: [1, 2, 0.5, 0.5, 2, 1, 2, 1, 2] },
    { degs: [-2, 1, 3, 1, 3, 2, 5], durs: [1, 2, 0.5, 0.5, 2, 1, 3] },
    { degs: [3, 5, 3, 5, 3, 1, -2, -1, 1], durs: [1, 2, 0.5, 0.5, 2, 1, 2, 1, 3] },
    { degs: [-1, -2, -2, 1, 3, 1, 3, 2, 1], durs: [1, 2, 1, 2, 0.5, 0.5, 2, 1, 3] },
  ] },
};
const T = window.TUNES;
const frag = (tune, p, from, to) => { const x = T[tune].phrases[p]; return { degs: x.degs.slice(from, to), durs: x.durs.slice(from, to) }; };

Object.assign(window.WEEKS, { 9: 'Learning songs by ear', 10: 'Introduction to jazz', 11: 'Developing my own musical voice', 12: 'Independent musical creativity' });
const swingBand = prog => band(prog || ['ii7', 'V7', 'Imaj7', 'Imaj7'], 'swing');
const IIVI = ['ii7', 'V7', 'Imaj7', 'Imaj7'];
const EVAL = [
  { phase: 'REFLECT', text: 'Hearing and reproducing notes: how sure did your ear feel?' },
  { phase: 'REFLECT', text: 'Following harmony: did you feel the chords change?' },
  { phase: 'REFLECT', text: 'Phrasing: did your ideas breathe?' },
  { phase: 'REFLECT', text: 'Rhythm: did it groove?' },
  { phase: 'REFLECT', text: 'Expression: where did it sound most like you?' },
  { phase: 'REFLECT', text: 'Confidence: how did it feel to perform?' },
  { phase: 'REFLECT', text: 'Moving ideas between guitar and sax: easier now?' },
];

window.LESSONS.push(
  /* ===== WEEK 9: learning songs by ear ===== */
  {
    lesson_id: 'W09D41', week: 9, day: 41, title: 'Short melodic fragments',
    objective: 'Two to four notes from real melodies — sing them, find them, maybe recognise the tune.',
    concert_key: 'C', scale: 'major', range: 'mid', tempo_bpm: 80, allowed_scale_degrees: [-2, 1, 2, 3, 4, 5, 6], duration_minutes: 30,
    exercises: [
      warm('Play {n5} below home up to {n6}, slowly: the range of today\'s tunes.'),
      { type: 'drone_listening', duration_seconds: 60, drone: true, prompt_seconds: 15, prompts: [
        { phase: 'LISTEN', text: 'Today: real melodies, a few notes at a time.' },
        { phase: 'LISTEN', text: '5 below home. Many tunes start here.', play: [-2, 1] },
        { phase: 'SING', text: 'Sing low 5, then home.', degs: [-2, 1] },
        { phase: 'IMAGINE', text: 'Hear a tune you love in your head. Where is home?' },
      ] },
      { type: 'listen_sing_play', hide_answer: true, response_seconds: 5, drone: true, check_text: 'Recognise the tune yet? Got it?',
        phrases: [frag('twinkle', 0, 0, 4), frag('twinkle', 0, 4, 7), frag('twinkle', 0, 7, 11), frag('twinkle', 0, 11, 14),
          frag('ode', 0, 0, 4), frag('ode', 0, 4, 8), frag('ode', 0, 8, 12), frag('ode', 0, 12, 15)], repetitions: 1 },
      { type: 'listen_sing_play', hide_answer: true, response_seconds: 5, drone: true, check_text: 'Got it?',
        phrases: [frag('grace', 0, 0, 2), frag('grace', 0, 2, 5), frag('grace', 0, 5, 7), frag('grace', 0, 7, 9), frag('saints', 0, 0, 4), frag('saints', 1, 4, 8)], repetitions: 1 },
      { type: 'random_note_recognition', allowed_degrees: [-2, 1, 3, 5], trials: 10 },
      improv([-2, 1, 2, 3, 4, 5, 6], [
        'Make up tiny three-note fragments. Repeat each one.',
        'A fragment that climbs, one that falls.',
        'Start on low 5, end on home.',
        'Join two fragments into a little tune.',
        'Free.',
      ], { duration_seconds: 300 }),
      REFLECTION,
    ],
  },
  {
    lesson_id: 'W09D42', week: 9, day: 42, title: 'Longer melodic phrases',
    objective: 'Five to eight notes: hold a whole phrase in your ear, and name where it starts and ends.',
    concert_key: 'C', scale: 'major', range: 'mid', tempo_bpm: 80, allowed_scale_degrees: [-2, -1, 1, 2, 3, 4, 5, 6], duration_minutes: 30,
    exercises: [
      warm('Play {n6} below home up to {n6} above, slowly.'),
      { type: 'listen_sing_play', hide_answer: true, response_seconds: 7, drone: true,
        sing_text: 'Sing it back. Which number does it START on? Which does it END on?', check_text: 'Start and end — were you right?',
        phrases: [frag('twinkle', 0, 0, 7), frag('twinkle', 0, 7, 14), frag('twinkle', 1, 0, 7)], repetitions: 2 },
      { type: 'listen_sing_play', hide_answer: true, response_seconds: 9, drone: true,
        sing_text: 'Sing it. Where does it start — below home? Where does it end?', check_text: 'Start and end — were you right?',
        phrases: T.grace.phrases, repetitions: 2 },
      { type: 'listen_sing_play', hide_answer: true, response_seconds: 8, drone: true,
        sing_text: 'Sing it. First number? Last number?', check_text: 'Start and end — right?',
        random: { degrees: [-2, -1, 1, 2, 3, 4, 5, 6], length: 6, count: 6, min_length: 5, max_length: 8, rhythmic: true, end_home: true, max_leap: 3 } },
      improv([-2, -1, 1, 2, 3, 4, 5, 6], [
        'Your own long phrases: five to eight notes, ending on home.',
        'Start below home. Rise. Come home.',
        'A phrase, a breath, the phrase again — changed.',
        'Free.',
      ], { duration_seconds: 300 }),
      REFLECTION,
    ],
  },
  {
    lesson_id: 'W09D43', week: 9, day: 43, title: 'Recognizing familiar melodies',
    objective: 'Learn Ode to Joy and When the Saints by ear — notes revealed only when you ask — then play them with the band.',
    concert_key: 'C', scale: 'major', range: 'mid', tempo_bpm: 84, allowed_scale_degrees: [-2, 1, 2, 3, 4, 5], duration_minutes: 30,
    exercises: [
      warm('Play {n1} {n2} {n3} {n4} {n5}, then down to {n5} below home.'),
      { type: 'listen_sing_play', hide_answer: true, response_seconds: 8, drone: true, check_text: 'Got the phrase? (👁 Show reveals it)',
        phrases: T.ode.phrases.slice(0, 3), repetitions: 2 },
      { type: 'tune', tune: 'ode', order: 'phrase', reveal: 'hide', repeat: 2, chord_display: 'current' },
      { type: 'tune', tune: 'ode', order: 'play', reveal: 'hide', repeat: 2, chord_display: 'current' },
      { type: 'listen_sing_play', hide_answer: true, response_seconds: 8, drone: true, check_text: 'Got the phrase? (👁 Show reveals it)',
        phrases: T.saints.phrases, repetitions: 1, tempo: 96 },
      { type: 'tune', tune: 'saints', order: 'phrase', reveal: 'hide', tempo: 96, chord_display: 'current' },
      { type: 'tune', tune: 'saints', order: 'play', reveal: 'hide', repeat: 2, tempo: 96, chord_display: 'current' },
      REFLECTION,
    ],
  },
  {
    lesson_id: 'W09D44', week: 9, day: 44, title: 'Changing the key',
    objective: 'Same tune, new home: play Ode to Joy in C, then G, then F. The numbers stay; the note names move.',
    concert_key: 'C', scale: 'major', range: 'mid', tempo_bpm: 84, allowed_scale_degrees: [-2, 1, 2, 3, 4, 5], duration_minutes: 30,
    exercises: [
      warm('Play {n1} to {n5} in C. Next you will move it.'),
      { type: 'tune', tune: 'ode', order: 'whole', chord_display: 'current' },
      { type: 'drone_listening', key: 'G', duration_seconds: 60, drone: true, prompt_seconds: 15, prompts: [
        { phase: 'LISTEN', text: 'New home: {n1}. Same numbers, new names.' },
        { phase: 'LISTEN', text: '1 2 3 4 5 in the new key.', play: [1, 2, 3, 4, 5] },
        { phase: 'PLAY', text: 'Find {n1} {n2} {n3} {n4} {n5}.', degs: [1, 2, 3, 4, 5] },
        { phase: 'PLAY', text: 'And low 5: {n-2}.', degs: [-2] },
      ] },
      { type: 'tune', key: 'G', tune: 'ode', order: 'phrase', reveal: 'hide', chord_display: 'current' },
      { type: 'tune', key: 'G', tune: 'ode', order: 'play', chord_display: 'current' },
      { type: 'drone_listening', key: 'F', duration_seconds: 60, drone: true, prompt_seconds: 15, prompts: [
        { phase: 'LISTEN', text: 'Now home is {n1}.' },
        { phase: 'LISTEN', text: '1 2 3 4 5.', play: [1, 2, 3, 4, 5] },
        { phase: 'PLAY', text: 'Find {n1} {n2} {n3} {n4} {n5}.', degs: [1, 2, 3, 4, 5] },
        { phase: 'PLAY', text: 'Low 5: {n-2}. Watch for the ♭ on 4.', degs: [-2, 4] },
      ] },
      { type: 'tune', key: 'F', tune: 'ode', order: 'phrase', reveal: 'hide', chord_display: 'current' },
      { type: 'tune', key: 'F', tune: 'ode', order: 'play', chord_display: 'current' },
      { type: 'tune', key: 'G', tune: 'saints', order: 'play', reveal: 'hide', tempo: 96, chord_display: 'current' },
      REFLECTION,
    ],
  },
  {
    lesson_id: 'W09D45', week: 9, day: 45, title: 'Making a melody my own',
    objective: 'Take When the Saints and change its rhythm, articulation and phrasing — then improvise from it.',
    concert_key: 'C', scale: 'major', range: 'mid', tempo_bpm: 100, allowed_scale_degrees: [1, 2, 3, 4, 5, 6, 7], duration_minutes: 30,
    exercises: [
      warm('Play the Saints melody once, slowly.'),
      { type: 'tune', tune: 'saints', order: 'whole', style: 'swing', chord_display: 'current' },
      { type: 'free_improvisation', backing: { tune: 'saints', style: 'swing' }, degrees: [1, 2, 3, 4, 5, 6, 7], chord_display: 'current', duration_bars: 96, prompts: [
        { phase: 'LISTEN', text: 'The melody with the band. Play along quietly.', bars: 16, play: 'tune:saints' },
        { phase: 'CREATE', text: 'Chorus 2: the melody, but change the rhythm.', bars: 16 },
        { phase: 'CREATE', text: 'Chorus 3: add your own notes between the phrases.', bars: 16 },
        { phase: 'CREATE', text: 'Chorus 4: change how it ends — every phrase.', bars: 16 },
        { phase: 'CREATE', text: 'Chorus 5: short and punchy, then long and smooth.', bars: 16 },
        { phase: 'CREATE', text: 'Chorus 6: your own version. The melody is just inspiration.', bars: 16 },
      ] },
      { type: 'free_improvisation', backing: { tune: 'saints', style: 'pop' }, degrees: [1, 2, 3, 4, 5, 6, 7], chord_display: 'current', duration_bars: 48, prompts: [
        { phase: 'CREATE', text: 'Straight feel now. Your version of the Saints. Start your phone recorder if you like.', bars: 16 },
        { phase: 'CREATE', text: 'Keep going — inspired by the melody, not stuck to it.', bars: 16 },
        { phase: 'CREATE', text: 'Last chorus: bring back the real melody at the end.', bars: 16 },
      ] },
      REFLECTION,
    ],
  },

  /* ===== WEEK 10: introduction to jazz (swing band) ===== */
  {
    lesson_id: 'W10D46', week: 10, day: 46, title: 'Seventh chords',
    objective: 'Major 7th, minor 7th, dominant 7th — hear the colour each fourth note adds.',
    concert_key: 'C', scale: 'major', range: 'mid', tempo_bpm: 72, allowed_scale_degrees: [1, 2, 3, 4, 5, 6, 7], duration_minutes: 30,
    exercises: [
      warm('Play {n1} {n3} {n5} {n7} — a major 7th chord, one note at a time.'),
      listen([
        { phase: 'LISTEN', text: 'Major 7th: {cImaj7}. Dreamy.', chord: 'Imaj7', arp: true },
        { phase: 'LISTEN', text: 'Minor 7th: {cii7}. Mellow.', chord: 'ii7', arp: true },
        { phase: 'LISTEN', text: 'Dominant 7th: {cV7}. Bluesy — it wants to move.', chord: 'V7', arp: true },
        { phase: 'LISTEN', text: 'Plain I, then Imaj7. Hear the 7th glow.', chords: ['I', 'Imaj7'] },
        { phase: 'SING', text: 'Sing 1 3 5 7.', degs: [1, 3, 5, 7] },
        { phase: 'SING', text: 'Sing 2 4 6 1.', degs: [2, 4, 6, 8] },
      ], 200),
      { type: 'listen_sing_play', phrases: [{ degs: [1, 3, 5, 7], chord: 'Imaj7' }, { degs: [2, 4, 6, 8], chord: 'ii7' }, { degs: [5, 7, 9, 11], chord: 'V7' }, { degs: [7, 5, 3, 1], chord: 'Imaj7' }],
        repetitions: 2, response_seconds: 6 },
      { type: 'chord_recognition', answer: 'quality', chords: ['Imaj7', 'IVmaj7', 'ii7', 'iii7', 'vi7', 'V7'], trials: 12 },
      tones(band([{ sym: 'Imaj7', beats: 8 }, { sym: 'IVmaj7', beats: 8 }], 'ballad'), [
        { text: 'The 7th of each chord: {n7}, then {n3}.', target: 'seventh' },
        { text: 'Root, then 7th — hear the stretch.', target: 'tones' },
        { text: 'Any chord tone. Land on 7ths often.', target: 'tones' },
      ], { duration_seconds: 180 }),
      bandImprov(band([{ sym: 'Imaj7', beats: 8 }, { sym: 'IVmaj7', beats: 8 }], 'ballad'), [
        'Dreamy improvisation over Imaj7–IVmaj7. Let 7ths ring.',
        'Long notes. Lots of space.',
        'Free.',
      ], { duration_seconds: 300, chord_tones: true }),
      REFLECTION,
    ],
  },
  {
    lesson_id: 'W10D47', week: 10, day: 47, title: 'The ii–V–I progression',
    objective: 'Dm7–G7–Cmaj7 with a swing band: roots, 3rds and 5ths first, then 7ths.',
    concert_key: 'C', scale: 'major', range: 'mid', tempo_bpm: 84, allowed_scale_degrees: [1, 2, 3, 4, 5, 6, 7], duration_minutes: 30,
    exercises: [
      warm('Play the roots {n2} {n5} {n1}, slowly.'),
      listen([
        { phase: 'LISTEN', text: 'ii–V–I: the sound of jazz.', chords: ['ii7', 'V7', 'Imaj7'] },
        { phase: 'SING', text: 'Sing the roots: 2, 5, 1.', chords: ['ii7', 'V7', 'Imaj7'], degs: [2, 5, 1] },
        { phase: 'LISTEN', text: 'Again. Feel the arrival on I.', chords: ['ii7', 'V7', 'Imaj7'] },
      ], 90),
      tones(swingBand(IIVI), [
        { text: 'Roots with the swing band: 2, 5, 1.', target: 'root', seconds: 70 },
        { text: '3rds: {n4}, {n7}, {n3}.', target: 'third', seconds: 70 },
        { text: '5ths.', target: 'fifth', seconds: 60 },
        { text: 'Now 7ths: {n1}, {n4}, {n7}.', target: 'seventh', seconds: 70 },
        { text: 'Any chord tone. Swing it.', target: 'tones', seconds: 70 },
      ], { duration_seconds: 340 }),
      { type: 'question_answer', backing: swingBand(IIVI), degrees: [1, 2, 3, 4, 5, 6, 7], swing: true, duration_seconds: 240, chord_display: 'current' },
      bandImprov(swingBand(IIVI), [
        'Free over ii–V–I. Land on chord tones.',
        'Short phrases. Swing the eighths.',
        'Free.',
      ], { duration_seconds: 300, chord_tones: true, chord_display: 'current' }),
      REFLECTION,
    ],
  },
  {
    lesson_id: 'W10D48', week: 10, day: 48, title: 'Guide tones',
    objective: '3rds and 7ths carry the harmony — move to the nearest one and hear how smooth it is.',
    concert_key: 'C', scale: 'major', range: 'mid', tempo_bpm: 80, allowed_scale_degrees: [1, 2, 3, 4, 5, 6, 7], duration_minutes: 30,
    exercises: [
      warm('Play {n4} {n4} {n3}, then {n1} {n7} {n7}.'),
      listen([
        { phase: 'LISTEN', text: 'A guide-tone line: {n4} → {n4} → {n3}. Tiny moves, big harmony.', chords: ['ii7', 'V7', 'Imaj7'], line: [4, 4, 3] },
        { phase: 'SING', text: 'Sing it: 4, 4, 3.', chords: ['ii7', 'V7', 'Imaj7'], line: [4, 4, 3] },
        { phase: 'LISTEN', text: 'Another line: {n1} → {n7} → {n7}.', chords: ['ii7', 'V7', 'Imaj7'], line: [8, 7, 7] },
        { phase: 'SING', text: 'Sing it: 1, 7, 7.', chords: ['ii7', 'V7', 'Imaj7'], line: [8, 7, 7] },
      ], 120),
      tones(swingBand(IIVI), [
        { text: 'The 3rd and 7th of each chord (the guide tones).', target: 'guide', seconds: 90 },
        { text: 'The guide-tone line: move to the nearest one each time.', target: 'guide_line', seconds: 90 },
        { text: 'Line again, now with a rhythm.', target: 'guide_line', seconds: 90 },
      ], { duration_seconds: 270 }),
      bandImprov(swingBand(IIVI), [
        { text: 'Improvise, landing on the guide tone shown on each chord change.', target: 'guide_line' },
        { text: 'Start phrases on a guide tone.', target: 'guide_line' },
        { text: 'Free — but keep the smooth line in your ear.', target: 'guide' },
      ], { duration_seconds: 300, chord_display: 'current' }),
      REFLECTION,
    ],
  },
  {
    lesson_id: 'W10D49', week: 10, day: 49, title: 'Swing and syncopation',
    objective: 'Straight vs swung eighths, offbeat accents, and imitating swinging rhythms.',
    concert_key: 'C', scale: 'major', range: 'mid', tempo_bpm: 100, allowed_scale_degrees: [1, 2, 3, 4, 5, 6, 7], duration_minutes: 30,
    exercises: [
      warm('Play {n1} {n2} {n3} {n4} {n5} as even eighth notes, then lazy and long-short.'),
      { type: 'listen_sing_play', response_seconds: 6, drone: true, listen_text: 'Listen to the feel…',
        sing_text: 'Sing it with the same feel: "doo-ba doo-ba".', check_text: 'Did you match the feel?',
        phrases: [{ degs: [1, 2, 3, 4, 5, 4, 3, 2, 1], durs: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 2] },
          { degs: [1, 2, 3, 4, 5, 4, 3, 2, 1], durs: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 2], swing: true },
          { degs: [5, 5, 3, 5, 6, 5, 3], durs: [0.5, 1, 0.5, 1, 0.5, 0.5, 2], swing: true },
          { degs: [3, 2, 1, 2, 3, 3, 3], durs: [1, 0.5, 1, 0.5, 0.5, 0.5, 2], swing: true, artic: 'accent' }], repetitions: 2 },
      { type: 'rhythm_echo', backing: swingBand(['ii7', 'V7']), swing: true, degree: 5, repetitions: 2, patterns: [
        [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 1], [-0.5, 0.5, -0.5, 0.5, -0.5, 0.5, -0.5, 0.5], [1, 0.5, 0.5, -0.5, 0.5, 1],
        [-0.5, 1, 1, 1, 0.5], [0.5, 1, 0.5, 2], [1.5, 0.5, 1.5, 0.5]] },
      { type: 'question_answer', backing: swingBand(IIVI), degrees: [1, 2, 3, 4, 5, 6, 7], swing: true, duration_seconds: 300, chord_display: 'current' },
      REFLECTION,
    ],
  },
  {
    lesson_id: 'W10D50', week: 10, day: 50, title: 'Jazz improvisation',
    objective: 'A slow ii–V–I: motifs, chord tones, passing notes and silence. Record three minutes.',
    concert_key: 'C', scale: 'major', range: 'mid', tempo_bpm: 80, allowed_scale_degrees: [1, 2, 3, 4, 5, 6, 7], duration_minutes: 30,
    exercises: [
      warm('Play the guide-tone line {n4} {n4} {n3} with a swing feel.'),
      bandImprov(swingBand(IIVI), [
        { text: 'A short motif. Repeat it on each chord.', target: 'tones' },
        { text: 'Chord tones on the beat, passing notes between.', target: 'tones' },
        { text: 'Leave silence. Let the band swing.', target: 'guide_line' },
        { text: 'Land on the guide tone at each change.', target: 'guide_line' },
        { text: 'Free.', target: 'tones' },
      ], { duration_seconds: 360, chord_display: 'current' }),
      bandImprov(swingBand(IIVI), [
        { text: 'Performance. Start your phone recorder now.', seconds: 15 },
        { text: 'Three minutes. Motifs, chord tones, passing notes, silence. Finish on home.', seconds: 180 },
      ], { duration_seconds: 195, chord_display: 'current', record_performance: true }),
      REFLECTION,
    ],
  },

  /* ===== WEEK 11: developing my own musical voice ===== */
  {
    lesson_id: 'W11D51', week: 11, day: 51, title: 'Dynamics',
    objective: 'The same phrase soft, loud, growing and fading — hear how volume changes its meaning.',
    concert_key: 'C', scale: 'major', range: 'mid', tempo_bpm: 72, allowed_scale_degrees: [1, 2, 3, 4, 5, 6, 7], duration_minutes: 30,
    exercises: [
      warm('Play one note as softly as you can, then as strongly as you can.'),
      { type: 'listen_sing_play', response_seconds: 7, drone: true, listen_text: 'Listen to the volume…', sing_text: 'Sing it with the same dynamics.',
        play_text: 'Play it with the same dynamics.', check_text: 'Did you match the dynamics?',
        phrases: [{ degs: [1, 3, 5, 6, 5], dyn: 'soft' }, { degs: [1, 3, 5, 6, 5], dyn: 'loud' }, { degs: [1, 2, 3, 4, 5, 6, 7, 8], dyn: 'cresc' }, { degs: [8, 7, 6, 5, 4, 3, 2, 1], dyn: 'dim' }],
        repetitions: 2 },
      bandImprov(band(['I', 'vi', 'IV', 'V'], 'ballad'), [
        'Whisper. As soft as you can, still clear.',
        'Strong and full.',
        'Grow through each phrase…',
        '…and fade at the end of each phrase.',
        'Contrast: one soft phrase, one strong answer.',
        'Free. Use dynamics on purpose.',
      ], { duration_seconds: 420, chord_tones: true }),
      REFLECTION,
    ],
  },
  {
    lesson_id: 'W11D52', week: 11, day: 52, title: 'Articulation',
    objective: 'How you start and connect notes: legato, staccato, accents — and your instrument’s own techniques.',
    concert_key: 'C', scale: 'major', range: 'mid', tempo_bpm: 84, allowed_scale_degrees: [1, 2, 3, 4, 5, 6, 7], duration_minutes: 30,
    exercises: [
      warm('Play {n1} to {n5} smoothly, then short and separated.'),
      { type: 'listen_sing_play', response_seconds: 6, drone: true, listen_text: 'Listen to how the notes connect…', sing_text: 'Sing it the same way.',
        play_text: 'Play it the same way.', check_text: 'Did you match the articulation?',
        phrases: [{ degs: [1, 2, 3, 4, 5], artic: 'legato' }, { degs: [1, 2, 3, 4, 5], artic: 'staccato' },
          { degs: [1, 2, 3, 4, 5, 4, 3, 2], durs: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5], artic: 'accent' }], repetitions: 2 },
      { type: 'free_improvisation', backing: band(['I', 'IV']), degrees: [1, 2, 3, 4, 5, 6, 7], duration_seconds: 360, prompt_seconds: 45, prompts: [
        { phase: 'PLAY', guitar: 'Alternate picking: down-up, even and clean.', sax: 'Legato: one breath, smooth air, no tonguing.' },
        { phase: 'PLAY', guitar: 'Hammer-ons: pick one note, hammer the next.', sax: 'Tonguing: "ta ta ta" — clear starts.' },
        { phase: 'PLAY', guitar: 'Pull-offs: let the finger flick the string.', sax: 'Accents: push the air on beat 1.' },
        { phase: 'PLAY', guitar: 'Slides: glide into the note from below.', sax: 'Vibrato: a gentle jaw wave on long notes.' },
        { phase: 'PLAY', guitar: 'Bends: push the string up to the next note.', sax: 'Pitch inflection: scoop up into a note, or fall off it.' },
        { phase: 'CREATE', text: 'Mix two techniques in one phrase.' },
        { phase: 'CREATE', text: 'Apply them to a simple melody — try Twinkle or the Saints.' },
        { phase: 'CREATE', text: 'Free. Articulation is your accent.' },
      ] },
      REFLECTION,
    ],
  },
  {
    lesson_id: 'W11D53', week: 11, day: 53, title: 'Rhythm and groove',
    objective: 'The same notes, many rhythms — over straight, swing and syncopated grooves.',
    concert_key: 'C', scale: 'major', range: 'mid', tempo_bpm: 92, allowed_scale_degrees: [1, 2, 3, 4, 5, 6, 7], duration_minutes: 30,
    exercises: [
      warm('Play {n1} {n3} {n5} in three different rhythms.'),
      { type: 'rhythm_echo', backing: 'vamp', degree: 3, repetitions: 1, patterns: [[1, 1, 2], [0.5, 0.5, 1, 2], [1.5, 0.5, 2], [-1, 1, -1, 1], [0.5, 0.5, 0.5, 0.5, 2], [3, 1]] },
      { type: 'rhythm_echo', backing: swingBand(['ii7', 'V7']), swing: true, degree: 5, repetitions: 1, patterns: [[0.5, 0.5, 0.5, 0.5, 1, 1], [-0.5, 0.5, -0.5, 0.5, 2], [1, 0.5, 0.5, 2], [0.5, 1, 0.5, 2]] },
      { type: 'rhythm_echo', backing: band(['I7'], 'funk'), degree: 1, repetitions: 2, patterns: [[0.75, 0.75, 0.5, 2], [-0.5, 0.5, -0.5, 0.5, -0.5, 1.5], [0.75, 0.25, 1, 0.75, 0.25, 1], [1.5, 0.5, -1, 1]] },
      bandImprov(band(['I7'], 'funk'), ['Same three notes — {n1} {n3} {n5} — in a funk groove.', 'Short, tight, rhythmic.', 'Free.'], { duration_seconds: 150, degrees: [1, 3, 5] }),
      bandImprov(swingBand(['ii7', 'V7']), ['Same three notes, swung.', 'Lazy, behind the beat.'], { duration_seconds: 120, degrees: [1, 3, 5] }),
      bandImprov(band(['I', 'IV']), ['Same three notes, straight pop.', 'Which groove felt most like you?'], { duration_seconds: 120, degrees: [1, 3, 5] }),
      REFLECTION,
    ],
  },
  {
    lesson_id: 'W11D54', week: 11, day: 54, title: 'Playing across instruments',
    objective: 'A conversation between guitar and sax: one asks, the other answers.',
    concert_key: 'C', scale: 'major', range: 'mid', tempo_bpm: 80, allowed_scale_degrees: [1, 2, 3, 4, 5, 6, 7], duration_minutes: 30,
    exercises: [
      warm('Play {n1} {n3} {n5} on each instrument you have.'),
      { type: 'free_improvisation', backing: band(['I', 'vi', 'IV', 'V']), chord_tones: true, duration_bars: 32, prompts: [
        { phase: 'PLAY', inst: 'guitar', text: 'Guitar: play a two-bar phrase.', single: 'Play a two-bar question, low on your instrument.', bars: 2 },
        { phase: 'PLAY', inst: 'sax', text: 'Sax: answer it.', single: 'Answer it, higher up.', bars: 2 },
      ] },
      { type: 'free_improvisation', backing: band(['I', 'vi', 'IV', 'V']), chord_tones: true, duration_bars: 32, prompts: [
        { phase: 'PLAY', inst: 'sax', text: 'Sax asks first now.', single: 'Ask high.', bars: 2 },
        { phase: 'PLAY', inst: 'guitar', text: 'Guitar answers.', single: 'Answer low.', bars: 2 },
      ] },
      { type: 'drone_listening', duration_seconds: 240, drone: true, prompt_seconds: 40, prompts: [
        { phase: 'PLAY', text: 'Record a short guitar phrase on your phone.', single: 'Record a short phrase on your phone.' },
        { phase: 'LISTEN', text: 'Play it back. Listen closely.' },
        { phase: 'PLAY', text: 'Answer it on sax.', single: 'Answer it — new register, new rhythm.' },
        { phase: 'PLAY', text: 'Now record a sax phrase.', single: 'Record another phrase.' },
        { phase: 'LISTEN', text: 'Play it back.' },
        { phase: 'PLAY', text: 'Answer on guitar.', single: 'Answer it.' },
      ] },
      bandImprov(band(['I', 'vi', 'IV', 'V']), [
        'A conversation with yourself: question, answer, question, answer.',
        'Copy your own question exactly, then change it.',
        'Free.',
      ], { duration_seconds: 240, chord_tones: true }),
      REFLECTION,
    ],
  },
  {
    lesson_id: 'W11D55', week: 11, day: 55, title: 'Finding my sound',
    objective: 'Improvise in three worlds — ambient, blues, jazz — and notice which feels most like you.',
    concert_key: 'C', scale: 'major', range: 'mid', tempo_bpm: 80, allowed_scale_degrees: [1, 2, 3, 4, 5, 6, 7], duration_minutes: 30,
    exercises: [
      warm('Play your favourite few notes, three different ways.'),
      bandImprov(band([{ sym: 'Imaj7', beats: 8 }, { sym: 'IVmaj7', beats: 8 }], 'ambient'), [
        { text: 'Ambient. Start your phone recorder if you like. Long notes, space, atmosphere.', seconds: 60 },
        { text: 'Let notes ring into the pad. Breathe.', seconds: 60 },
        { text: 'Free.', seconds: 60 },
      ], { duration_seconds: 180, tempo: 60, chord_tones: true }),
      bandImprov(band(['I7', 'I7', 'I7', 'I7', 'IV7', 'IV7', 'I7', 'I7', 'V7', 'IV7', 'I7', 'V7'], 'shuffle'), [
        'Blues in A. Pentatonic and the blue note.',
        'Licks, repetition, attitude.',
        'Free.',
      ], { key: 'A', duration_seconds: 180, tempo: 72, degrees: [1, 'b3', 4, 'b5', 5, 'b7'], chord_display: 'current' }),
      bandImprov(swingBand(IIVI), [
        'Jazz. Swing, chord tones, guide tones.',
        'Motifs and space.',
        'Free.',
      ], { duration_seconds: 180, tempo: 88, chord_tones: true, chord_display: 'current' }),
      { type: 'choice', choice: 'environment', question: 'Which world felt most natural to you today?' },
      { type: 'drone_listening', duration_seconds: 60, prompt_seconds: 20, prompts: [
        { phase: 'REFLECT', text: 'What did you love about it?' },
        { phase: 'REFLECT', text: 'Which notes or rhythms kept coming back?' },
        { phase: 'REFLECT', text: 'Say "save a reflection" to keep a note about your sound.' },
      ] },
      REFLECTION,
    ],
  },

  /* ===== WEEK 12: independent musical creativity — your own song ===== */
  {
    lesson_id: 'W12D56', week: 12, day: 56, title: 'Creating a harmonic foundation',
    objective: 'Choose a key, build a four-chord progression and a style — the app becomes your band.',
    concert_key: 'song', scale: 'song', range: 'mid', tempo_bpm: 84, allowed_scale_degrees: [1, 2, 3, 4, 5, 6, 7], duration_minutes: 30,
    exercises: [
      { type: 'choice', choice: 'key', question: 'Choose a key for your song. (Guitar-friendly; sax key shown.)' },
      { type: 'choice', choice: 'progression', question: 'Pick a four-chord progression — or build your own.' },
      { type: 'choice', choice: 'chord', slot: 0, only_if: 'song.custom', question: 'Chord 1 of 4 — most songs start on I.' },
      { type: 'choice', choice: 'chord', slot: 1, only_if: 'song.custom', question: 'Chord 2 of 4.' },
      { type: 'choice', choice: 'chord', slot: 2, only_if: 'song.custom', question: 'Chord 3 of 4.' },
      { type: 'choice', choice: 'chord', slot: 3, only_if: 'song.custom', question: 'Chord 4 of 4 — V pulls back to the start.' },
      { type: 'choice', choice: 'style', question: 'Choose a style for your band.' },
      { type: 'free_improvisation', backing: { song: 'A' }, chord_display: 'full', duration_seconds: 120, prompt_seconds: 30, prompts: [
        { phase: 'LISTEN', text: 'Your song: {song}. Just listen.' },
        { phase: 'LISTEN', text: 'Hear where it feels like home, and where it pulls.' },
        { phase: 'SING', text: 'Hum the root of each chord.' },
        { phase: 'IMAGINE', text: 'Imagine a melody floating over it.' },
      ] },
      tones({ song: 'A' }, [
        { text: 'Guitar: strum the chords along with the band.', sax: 'Play the root of each chord.', single: 'Play the root of each chord.', target: 'root' },
        { text: 'Now the 3rd of each chord.', target: 'third' },
        { text: 'Any chord tone. Learn your harmony by heart.', target: 'tones' },
      ], { duration_seconds: 240, chord_display: 'full' }),
      bandImprov({ song: 'A' }, [
        'Improvise over your own progression.',
        'Record the band and your guitar on your phone, if you want a backing track to keep.',
        'Free.',
      ], { duration_seconds: 240, chord_tones: true, chord_display: 'current' }),
      REFLECTION,
    ],
  },
  {
    lesson_id: 'W12D57', week: 12, day: 57, title: 'Creating a melody',
    objective: 'Sing an original melody over your progression, find it on both instruments, record the best version.',
    concert_key: 'song', scale: 'song', range: 'mid', tempo_bpm: 84, allowed_scale_degrees: [1, 2, 3, 4, 5, 6, 7], duration_minutes: 30,
    exercises: [
      { type: 'free_improvisation', backing: { song: 'A' }, chord_display: 'current', duration_bars: 48, prompts: [
        { phase: 'LISTEN', text: 'Your chords: {song}. Listen.', bars: 4 },
        { phase: 'SING', text: 'Hum along. Let a melody appear — no wrong notes.', bars: 4 },
        { phase: 'SING', text: 'Again. Keep what you like.', bars: 4 },
        { phase: 'SING', text: 'Again. Make it a little more definite.', bars: 4 },
        { phase: 'IMAGINE', text: 'Silently: hear your melody in your head.', bars: 4 },
        { phase: 'SING', text: 'Sing it out — your melody.', bars: 4 },
      ] },
      { type: 'free_improvisation', backing: { song: 'A' }, chord_tones: true, chord_display: 'current', duration_bars: 48, prompts: [
        { phase: 'SING', text: 'Sing it once more.', bars: 4 },
        { phase: 'PLAY', inst: 'guitar', text: 'Find it on guitar, a phrase at a time.', single: 'Find it on your instrument, a phrase at a time.', bars: 8 },
        { phase: 'PLAY', inst: 'guitar', text: 'Play it on guitar.', single: 'Play it through.', bars: 4 },
        { phase: 'SING', text: 'Sing it.', bars: 4 },
        { phase: 'PLAY', inst: 'sax', text: 'Find it on sax — by ear, not by note names.', single: 'Play it starting higher.', bars: 8 },
      ] },
      { type: 'free_improvisation', backing: { song: 'A' }, chord_tones: true, chord_display: 'current', duration_bars: 32, prompts: [
        { phase: 'CREATE', text: 'Strongest version. Start your phone recorder now.', bars: 4 },
        { phase: 'CREATE', text: 'Play your melody. Twice through.', bars: 8 },
        { phase: 'CREATE', text: 'Once more — with feeling.', bars: 8 },
        { phase: 'CREATE', text: 'And again, sax this time if you have it.', single: 'Again, your best take.', bars: 8 },
        { phase: 'REFLECT', text: 'Save it. That melody is yours.', bars: 4 },
      ] },
      REFLECTION,
    ],
  },
  {
    lesson_id: 'W12D58', week: 12, day: 58, title: 'Developing the composition',
    objective: 'Add a contrasting B section and develop your motif: AABA form.',
    concert_key: 'song', scale: 'song', range: 'mid', tempo_bpm: 84, allowed_scale_degrees: [1, 2, 3, 4, 5, 6, 7], duration_minutes: 30,
    exercises: [
      { type: 'choice', choice: 'bsection', question: 'Choose chords for a contrasting B section. Your A is {song}.' },
      { type: 'free_improvisation', backing: { song: 'AABA' }, chord_display: 'full', duration_bars: 16, prompts: [
        { phase: 'LISTEN', text: 'A: your verse.', bars: 4 },
        { phase: 'LISTEN', text: 'A again.', bars: 4 },
        { phase: 'LISTEN', text: 'B: something new — {songB}.', bars: 4 },
        { phase: 'LISTEN', text: 'A: home again.', bars: 4 },
      ] },
      { type: 'free_improvisation', backing: { song: 'AABA' }, chord_tones: true, chord_display: 'current', duration_bars: 48, prompts: [
        { phase: 'PLAY', text: 'A: your melody.', bars: 4 },
        { phase: 'PLAY', text: 'A: your melody with one small change.', bars: 4 },
        { phase: 'CREATE', text: 'B: contrast! Higher or lower, new rhythm, new mood.', bars: 4 },
        { phase: 'PLAY', text: 'A: back to your melody.', bars: 4 },
      ] },
      { type: 'free_improvisation', backing: { song: 'AABA' }, chord_tones: true, chord_display: 'current', duration_bars: 48, prompts: [
        { phase: 'CREATE', text: 'A: develop the motif — repeat it, then change one note.', bars: 4 },
        { phase: 'CREATE', text: 'A: soft this time.', bars: 4 },
        { phase: 'CREATE', text: 'B: build — louder, busier.', bars: 4 },
        { phase: 'CREATE', text: 'A: resolve — strong and clear.', bars: 4 },
      ] },
      REFLECTION,
    ],
  },
  {
    lesson_id: 'W12D59', week: 12, day: 59, title: 'Rehearsal',
    objective: 'Put it together: composed A sections, an improvised B, guitar accompaniment and sax melody.',
    concert_key: 'song', scale: 'song', range: 'mid', tempo_bpm: 84, allowed_scale_degrees: [1, 2, 3, 4, 5, 6, 7], duration_minutes: 30,
    exercises: [
      { type: 'free_improvisation', backing: { song: 'AABA' }, chord_display: 'full', duration_bars: 32, prompts: [
        { phase: 'PLAY', inst: 'guitar', text: 'Record your guitar part on your phone: strum the whole form with the band.', single: 'Run the whole form: melody on A, improvise on B.', bars: 16 },
        { phase: 'PLAY', inst: 'guitar', text: 'Once more, keep recording — a second take.', single: 'Again.', bars: 16 },
      ] },
      { type: 'drone_listening', duration_seconds: 240, prompt_seconds: 40, prompts: [
        { phase: 'PLAY', text: 'Play back your guitar recording. Play your sax melody over it.', single: 'Play your song from memory, no band.' },
        { phase: 'PLAY', text: 'A sections: your melody.', single: 'A: melody.' },
        { phase: 'CREATE', text: 'B section: improvise.', single: 'B: improvise.' },
        { phase: 'PLAY', text: 'Last A: melody, and end it beautifully.', single: 'Last A: end it beautifully.' },
        { phase: 'REFLECT', text: 'Which part needs work? Play just that part again.' },
        { phase: 'PLAY', text: 'Whole song again.' },
      ] },
      { type: 'free_improvisation', backing: { song: 'AABA' }, chord_tones: true, chord_display: 'current', duration_bars: 64, prompts: [
        { phase: 'PLAY', text: 'A: composed melody.', bars: 4 },
        { phase: 'PLAY', text: 'A: composed melody.', bars: 4 },
        { phase: 'CREATE', text: 'B: free improvisation.', bars: 4 },
        { phase: 'PLAY', text: 'A: composed melody.', bars: 4 },
      ] },
      REFLECTION,
    ],
  },
  {
    lesson_id: 'W12D60', week: 12, day: 60, title: 'Final performance',
    objective: 'Perform and record your original piece, compare it with Days 5 and 20, and get your personal next steps.',
    concert_key: 'song', scale: 'song', range: 'mid', tempo_bpm: 76, allowed_scale_degrees: [1, 2, 3, 4, 5, 6, 7], duration_minutes: 30,
    exercises: [
      warm('Play your melody once, slowly and calmly.'),
      { type: 'free_improvisation', backing: { song: 'AABA' }, chord_tones: true, chord_display: 'current', duration_bars: 64, record_performance: true, prompts: [
        { phase: 'CREATE', text: 'Start your phone recorder. Chorus 1 — A: your melody, simply.', bars: 4 },
        { phase: 'CREATE', text: 'A: your melody.', bars: 4 },
        { phase: 'CREATE', text: 'B: contrast.', bars: 4 },
        { phase: 'CREATE', text: 'A: home.', bars: 4 },
        { phase: 'CREATE', text: 'Chorus 2 — A: melody with a new rhythm.', bars: 4 },
        { phase: 'CREATE', text: 'A: add notes, add feeling.', bars: 4 },
        { phase: 'CREATE', text: 'B: improvise freely.', bars: 4 },
        { phase: 'CREATE', text: 'A: back to the melody.', bars: 4 },
        { phase: 'CREATE', text: 'Chorus 3 — A: build.', bars: 4 },
        { phase: 'CREATE', text: 'A: strongest version.', bars: 4 },
        { phase: 'CREATE', text: 'B: peak — your boldest playing.', bars: 4 },
        { phase: 'CREATE', text: 'A: come down.', bars: 4 },
        { phase: 'CREATE', text: 'Chorus 4 — A: soft and simple.', bars: 4 },
        { phase: 'CREATE', text: 'A: your melody, one last time.', bars: 4 },
        { phase: 'CREATE', text: 'B: a gentle memory of everything.', bars: 4 },
        { phase: 'CREATE', text: 'A: end on home. Let it ring. Stop the recorder.', bars: 4 },
      ] },
      { type: 'drone_listening', duration_seconds: 60, prompt_seconds: 20, prompts: [
        { phase: 'LISTEN', text: 'Listen to today’s recording.' },
        { phase: 'LISTEN', text: 'Now your Day 5 recording — your first improvisation.' },
        { phase: 'LISTEN', text: 'And Day 20 — your first story.' },
      ] },
      { type: 'drone_listening', duration_seconds: 140, prompt_seconds: 20, prompts: EVAL },
      { type: 'report' },
      REFLECTION,
    ],
  },
);
