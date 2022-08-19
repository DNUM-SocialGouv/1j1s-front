/* eslint-disable no-console */
const PR = require('../pr.json'); //eslint-disable-line
const moment = require('moment-business-days'); //eslint-disable-line
const percentile = require('stats-percentile') //eslint-disable-line
const Axios = require('axios'); //eslint-disable-line

const REPO = 'DNUM-SocialGouv/1j1s-front';
const label = process.argv[2] || 'violet';
const since = process.argv[3] ? moment(process.argv[3]) : moment().subtract({ weeks: 2 }).subtract({ day: 1 });

async function main () {
  const { data } = await Axios.get(`https://api.github.com/repos/${REPO}/pulls?state=closed&sort=created&direction=desc&per_page=100`);
  const prs = data
    .filter((pr) => pr.merged_at && pr.merged_at > since.format())
    .filter((pr) => pr.labels.find((l) => l.name === label))
    .map((pr) => ({
      duration: moment(pr.merged_at).businessDiff(moment(pr.created_at)),
      end: moment(pr.merged_at),
      start: moment(pr.created_at),
      title: pr.title,
    }));


  const durations = prs.map((pr) => pr.duration);
  const avg = durations.reduce((total, duration) => duration+total, 0) / prs.length;
  const median = percentile(durations, 50);
  const p80 = percentile(durations, 80);

  console.log(`=== stats for PR with label "${label}" since ${since.add({ day: 1 }).format().substr(0, 10)} ===`);
  console.log('    (in business days)\n');
  console.log('count', prs.length);
  console.log('average', avg.toPrecision(3));
  console.log('median', median);
  console.log('80%', p80);

}


main();
