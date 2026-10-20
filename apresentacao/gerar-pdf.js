// Gera apresentacao/casas-eco-apresentacao.pdf a partir de apresentacao/index.html.
// Uso: sirva a pasta do site (python3 -m http.server 8765) e rode: node apresentacao/gerar-pdf.js
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
// link de cada vídeo no Instagram; vazio mantém o perfil @casasecomadeiras
const links = JSON.parse(fs.readFileSync(path.join(__dirname, 'links-videos.json'), 'utf8'));
(async () => {
  const b = await chromium.launch(process.env.CHROME_BIN ? { executablePath: process.env.CHROME_BIN, args: ['--no-sandbox'] } : {});
  const p = await b.newPage({ viewport: { width: 540, height: 960 } });
  await p.goto(process.env.URL || 'http://localhost:8765/apresentacao/', { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.evaluate((l) => document.querySelectorAll('[data-video]').forEach((a) => { if (l[a.dataset.video]) a.href = l[a.dataset.video]; }), links);
  await p.pdf({ path: path.join(__dirname, 'casas-eco-apresentacao.pdf'), width: '540px', height: '960px', printBackground: true, preferCSSPageSize: true });
  await b.close();
})();
