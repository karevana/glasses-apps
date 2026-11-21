# glasses-apps

Web apps for Meta Ray-Ban Display glasses (600×600 display), served with GitHub Pages.

| App | Address | What it does |
|---|---|---|
| Tube | https://karevana.github.io/glasses-apps/tube/ | Search YouTube (dictation or Meta AI voice), pick one of 5 results, watch with simple controls |
| HIIT 10 | https://karevana.github.io/glasses-apps/hiit/ | 10-minute standing interval workout: 10 moves, 40s work / 20s rest |
| Songbook | https://karevana.github.io/glasses-apps/songbook/ (needs Karen's private ?k= key) | Chords over lyrics from Drive › Songbook, scrolling at the song's tempo; head tilt = next/back line |
| Morning Brief | https://karevana.github.io/glasses-apps/brief/ (needs Karen's private ?k= key) | Muse's 6 AM brief (local news, events, national, stocks) as swipe-through cards, or read aloud |
| Edit Songbook | https://karevana.github.io/glasses-apps/songbook/edit.html | Computer/phone page to fix a song's chords, lyrics or tempo line and save it back to its Google Doc |
| Tilt Test | https://karevana.github.io/glasses-apps/tilt-test/ | Checks whether a deliberate head tilt can be detected, for hands-free song scrolling |

Tube's search runs on Karen's n8n (`/webhook/glasses-tube-search`), so the YouTube API key never appears in this public repo.

Songbook songs live privately in Karen's Google Drive and are served by n8n with a private key. No lyrics are stored in this public repo.
