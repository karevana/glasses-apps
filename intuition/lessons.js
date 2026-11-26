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
