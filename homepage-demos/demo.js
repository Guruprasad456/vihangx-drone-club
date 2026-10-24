const themes = {
  skyforge: { name: 'Skyforge', accent: '#087eed', accent2: '#ff8828', accentSoft: '#dff2ff', ink: '#071a34', inkSoft: '#183b63', paper: '#f4f9fe', surface: '#ffffff', line: '#d7e5f1', muted: '#61758b', start: '#061b38', end: '#0b74bf', grid: 'rgba(186, 229, 255, .16)', glow: 'rgba(52, 180, 255, .54)' },
  ember: { name: 'Ember', accent: '#ef5d57', accent2: '#ffc56b', accentSoft: '#ffe9e5', ink: '#241931', inkSoft: '#49324f', paper: '#fff9f5', surface: '#ffffff', line: '#f0dcd8', muted: '#806870', start: '#21182f', end: '#a34356', grid: 'rgba(255, 222, 198, .15)', glow: 'rgba(255, 111, 90, .52)' },
  verdant: { name: 'Verdant', accent: '#158b6f', accent2: '#f2c96b', accentSoft: '#dff7ef', ink: '#102c2a', inkSoft: '#26534c', paper: '#f4faf6', surface: '#ffffff', line: '#d6e9df', muted: '#658178', start: '#092f2b', end: '#16836e', grid: 'rgba(193, 244, 224, .15)', glow: 'rgba(62, 220, 164, .5)' },
  violet: { name: 'Violet', accent: '#7056d8', accent2: '#ff9dca', accentSoft: '#eeeaff', ink: '#201b43', inkSoft: '#3f3974', paper: '#f8f7ff', surface: '#ffffff', line: '#e1def4', muted: '#716c91', start: '#1d1741', end: '#7452bb', grid: 'rgba(232, 220, 255, .17)', glow: 'rgba(161, 119, 255, .5)' },
  sunset: { name: 'Sunset', accent: '#eb652f', accent2: '#ffd36a', accentSoft: '#ffeadf', ink: '#3a2020', inkSoft: '#663d35', paper: '#fff8f2', surface: '#ffffff', line: '#f3dfd1', muted: '#866c60', start: '#512827', end: '#d66034', grid: 'rgba(255, 229, 187, .16)', glow: 'rgba(255, 135, 66, .5)' },
  arctic: { name: 'Arctic', accent: '#0e9fc7', accent2: '#7ee7f2', accentSoft: '#daf7fb', ink: '#0b2a3a', inkSoft: '#1d5268', paper: '#f4fbfd', surface: '#ffffff', line: '#d5eaf0', muted: '#5e7a86', start: '#082b42', end: '#147f9e', grid: 'rgba(205, 247, 255, .18)', glow: 'rgba(83, 225, 245, .5)' },
  graphite: { name: 'Graphite', accent: '#3a98ff', accent2: '#e9f2ff', accentSoft: '#e7f2ff', ink: '#151c26', inkSoft: '#303d4d', paper: '#f4f6f8', surface: '#ffffff', line: '#dce3e9', muted: '#687887', start: '#131a25', end: '#39495c', grid: 'rgba(221, 237, 255, .13)', glow: 'rgba(77, 166, 255, .48)' },
  rose: { name: 'Rose Gold', accent: '#c75a7b', accent2: '#e7b980', accentSoft: '#fae6ed', ink: '#38202b', inkSoft: '#67404e', paper: '#fff8fa', surface: '#ffffff', line: '#f0dce3', muted: '#876b76', start: '#3e1f2e', end: '#a64f6f', grid: 'rgba(255, 221, 232, .15)', glow: 'rgba(239, 130, 169, .5)' },
  indigo: { name: 'Indigo Mint', accent: '#5367db', accent2: '#7ce1c0', accentSoft: '#e7eaff', ink: '#172143', inkSoft: '#34406e', paper: '#f6f7ff', surface: '#ffffff', line: '#dcdef1', muted: '#697292', start: '#182247', end: '#5550a7', grid: 'rgba(216, 224, 255, .16)', glow: 'rgba(126, 225, 194, .45)' },
  forest: { name: 'Forest Amber', accent: '#347257', accent2: '#f4b93f', accentSoft: '#e2f1e7', ink: '#1b3026', inkSoft: '#405a4b', paper: '#f6faf4', surface: '#ffffff', line: '#dce9dc', muted: '#6d8173', start: '#19362a', end: '#57783a', grid: 'rgba(225, 245, 202, .14)', glow: 'rgba(214, 208, 91, .42)' }
};

const requestedTheme = new URLSearchParams(window.location.search).get('theme');
const activeTheme = Object.hasOwn(themes, requestedTheme) ? requestedTheme : 'skyforge';
const values = themes[activeTheme];
const root = document.documentElement;

Object.entries({
  '--accent': values.accent, '--accent-2': values.accent2, '--accent-soft': values.accentSoft,
  '--ink': values.ink, '--ink-soft': values.inkSoft, '--paper': values.paper, '--surface': values.surface,
  '--line': values.line, '--muted': values.muted, '--hero-start': values.start, '--hero-end': values.end,
  '--hero-grid': values.grid, '--glow': values.glow
}).forEach(([property, value]) => root.style.setProperty(property, value));

document.body.dataset.theme = activeTheme;
document.title = `VihangX ${values.name} Homepage Demo`;
document.getElementById('theme-name').textContent = values.name.toUpperCase();
document.querySelectorAll('[data-theme-link]').forEach(link => {
  const selected = link.dataset.themeLink === activeTheme;
  link.style.background = themes[link.dataset.themeLink].accent;
  if (selected) link.setAttribute('aria-current', 'page');
});

const shareButton = document.getElementById('share-demo');
const shareStatus = document.getElementById('share-status');
shareButton.addEventListener('click', async () => {
  const shareData = { title: document.title, text: `View the ${values.name} VihangX homepage colour demo`, url: window.location.href };
  try {
    if (navigator.share) {
      await navigator.share(shareData);
      shareStatus.textContent = 'Share options opened.';
    } else {
      await navigator.clipboard.writeText(window.location.href);
      shareStatus.textContent = 'Direct demo link copied — paste it into WhatsApp.';
    }
  } catch (error) {
    if (error.name !== 'AbortError') shareStatus.textContent = 'Copy this page URL from the browser to share the demo.';
  }
});
