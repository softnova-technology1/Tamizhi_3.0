const fs = require('fs');
const fn = './src/Language/tam/kings.json';
const d = JSON.parse(fs.readFileSync(fn));
const cholaAdmin = d.chola.subTitle.find(s => s.title === 'நிர்வாகம்' && s.subHeading === 'வரலாறு');
if (cholaAdmin) {
  cholaAdmin.subHeading = 'நிர்வாகம்';
}

d.chera.subTitle.forEach(s => {
  if (!s.data && s.list && s.title) {
    const t = s.title;
    const l = s.list;
    delete s.title;
    delete s.list;
    s.subHeading = t;
    s.data = [{ title: t, list: l }];
  }
});

fs.writeFileSync(fn, JSON.stringify(d, null, 2) + '\n');
console.log('JSON fixed!');
