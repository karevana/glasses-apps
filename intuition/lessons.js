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
