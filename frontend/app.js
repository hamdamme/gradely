const main = document.querySelector('main');
const assignments = [
  { id: 1, title: 'Selenium Login Test', description: 'Build a reliable login test suite. Cover successful sign-in, invalid credentials, and input validation.', tags: ['Selenium', 'TestNG', 'Maven'], status: 'In progress', due: 'Oct 8', attempts: '1 of 3 attempts', action: 'Continue assignment', link: '#submit/1' },
  { id: 2, title: 'API Response Validation', description: 'Verify the details that matter. Test response codes, JSON schemas, and error handling.', tags: ['REST Assured', 'TestNG'], status: 'Not started', due: 'Oct 12', attempts: '0 of 3 attempts', action: 'Start assignment', link: '#submit/2' },
  { id: 3, title: 'Java Fundamentals', description: 'Put your foundations into practice with collections, exception handling, and unit tests.', tags: ['Java 17', 'TestNG'], status: 'Completed', due: 'Oct 2', attempts: '2 of 3 attempts', action: 'View feedback', link: '#results' }
];
let filter = 'All assignments';
let tab = 'Tests';
let hasSubmitted = false;
let submissionTimer;
const badge = status => `<span class="badge ${status === 'In progress' ? 'amber' : status === 'Not started' ? 'neutral' : ''}">${status}</span>`;
const heading = (eyebrow, title, detail) => `<div class="heading"><div><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p class="intro">${detail}</p></div><span class="semester">Fall 2026</span></div>`;
function assignmentPage() {
  const visible = assignments.filter(a => filter === 'All assignments' || (filter === 'Active' ? a.status !== 'Completed' : a.status === 'Completed'));
  main.innerHTML = heading('KEEP BUILDING', 'Your next step starts here.', 'Practice, submit, and turn feedback into progress.') + `
    <div class="stats"><div class="stat"><span class="stat-label">Assignments completed</span><strong>1 <small>/ 3</small></strong><span class="stat-note">Two opportunities ahead</span></div><div class="stat"><span class="stat-label">Best score</span><strong>86 <small>/ 100</small></strong><span class="stat-note positive">Java Fundamentals</span></div><div class="stat"><span class="stat-label">Next deadline</span><strong>Oct 8</strong><span class="stat-note">Selenium Login Test</span></div></div>
    <div class="section-heading"><h2>Your assignments</h2><div class="filters" aria-label="Filter assignments">${['All assignments', 'Active', 'Completed'].map(f => `<button data-filter="${f}" class="${filter === f ? 'selected' : ''}" aria-pressed="${filter === f}">${f}</button>`).join('')}</div></div>
    <div class="cards">${visible.map(a => `<article class="card"><div class="card-top"><span class="number">0${a.id} / ASSIGNMENT</span>${badge(a.status)}</div><h3>${a.title}</h3><p>${a.description}</p><div class="tags">${a.tags.map(t => `<span>${t}</span>`).join('')}</div><div class="meta"><span>Due ${a.due}</span><span>${a.attempts}</span></div><a class="button ${a.id !== 1 ? 'secondary' : ''}" href="${a.link}">${a.action}</a></article>`).join('')}</div>
    <div class="feedback"><span class="feedback-icon" aria-hidden="true">✧</span><div><h2>A little feedback. A better next attempt.</h2><p>Your latest review includes test results and one security finding to work through.</p></div><a href="#results">Review feedback</a></div>`;
  main.querySelectorAll('[data-filter]').forEach(b => b.onclick = () => { filter = b.dataset.filter; assignmentPage(); main.querySelector(`[data-filter="${filter}"]`).focus(); });
}
function submissionPage(id) {
  const a = assignments.find(x => x.id === Number(id));
  if (!a) { main.innerHTML = '<h1>Assignment not found</h1><a class="button" href="#assignments">Back to assignments</a>'; return; }
  main.innerHTML = `<a class="back" href="#assignments">‹ All assignments</a>` + heading('ASSIGNMENT / 0' + a.id, a.title, a.description) + `<section class="panel"><h2>Submit your project</h2><p class="muted">Package your Maven project as a ZIP, including pom.xml and the src folder.</p><div class="dropzone"><label for="project">Choose your project ZIP</label><p class="notice">ZIP only · Up to 50 MB</p><input type="file" id="project" accept=".zip,application/zip"></div><p class="notice">Demo only: the file stays on your device. This simulates grading with sample results.</p><button class="button" id="submit">Simulate submission</button><p role="status" aria-live="polite" class="message" id="submission-status"></p></section>`;
  document.querySelector('#submit').onclick = () => {
    const file = document.querySelector('#project').files[0];
    const status = document.querySelector('#submission-status');
    if (!file || !file.name.toLowerCase().endsWith('.zip') || file.size === 0 || file.size > 50 * 1024 * 1024) { status.textContent = 'Choose a nonempty ZIP file no larger than 50 MB to continue.'; status.classList.add('error'); return; }
    status.classList.remove('error');
    document.querySelector('#submit').disabled = true;
    status.textContent = 'Queued — preparing sample feedback…';
    submissionTimer = setTimeout(() => { status.textContent = 'Running — simulating test and security checks…'; submissionTimer = setTimeout(() => { hasSubmitted = true; location.hash = '#results'; }, 1100); }, 800);
  };
}
function resultsPage() {
  main.innerHTML = `<a class="back" href="#assignments">‹ All assignments</a>` + heading('SUBMISSION / DEMO-003', hasSubmitted ? 'Your sample results are ready.' : 'A stronger foundation.', 'Java Fundamentals · Demonstration report · Oct 2, 2026') + `<div class="panel score"><div class="score-ring">86</div><div><h2>Good work. Keep refining.</h2><p class="muted">9 of 10 tests passed · 80% line coverage · 1 security finding</p><span class="badge">Sample graded result</span></div></div><section class="panel"><div class="tabs" role="tablist" aria-label="Feedback sections">${['Tests', 'Security', 'Hints'].map(t => `<button role="tab" id="tab-${t}" aria-controls="feedback-content" aria-selected="${t === tab}" class="${t === tab ? 'selected' : ''}" data-tab="${t}">${t}${t === 'Security' ? ' (1)' : ''}</button>`).join('')}</div><div id="feedback-content" role="tabpanel" aria-labelledby="tab-${tab}"></div></section>`;
  main.querySelectorAll('[data-tab]').forEach(b => b.onclick = () => { tab = b.dataset.tab; resultsPage(); document.querySelector(`#tab-${tab}`).focus(); });
  const content = document.querySelector('#feedback-content');
  if (tab === 'Tests') content.innerHTML = `<div class="table-wrap"><table><thead><tr><th>Test case</th><th>Result</th><th>Duration</th></tr></thead><tbody>${['emptyCollectionReturnsZero', 'singleItemCount', 'multipleItemCount', 'duplicateItemsHandled', 'sortAscending', 'sortDescending', 'missingItemReturnsEmpty', 'validInputAccepted', 'exceptionsHaveMessage', 'nullInputRejected'].map((name, i) => `<tr><td><code>${name}</code>${i === 9 ? '<details><summary>See failure</summary><pre>AssertionError: expected IllegalArgumentException\nActual: NullPointerException\n at CollectionsTest.java:42</pre></details>' : ''}</td><td><span class="badge ${i === 9 ? 'amber' : ''}">${i === 9 ? 'Failed' : 'Passed'}</span></td><td>${12 + i * 3} ms</td></tr>`).join('')}</tbody></table></div>`;
  if (tab === 'Security') content.innerHTML = `<article class="finding"><span class="badge">CRITICAL · CWE-798</span><h3>Hardcoded credential</h3><code>src/test/java/Config.java:12</code><p>A password is stored directly in the source. Read sensitive configuration from an environment variable and keep local secrets out of Git.</p><a class="button secondary" href="https://cwe.mitre.org/data/definitions/798.html" target="_blank" rel="noopener noreferrer">Read about CWE-798</a></article>`;
  if (tab === 'Hints') { content.innerHTML = `<h2>A nudge in the right direction</h2><p class="muted">Use guidance to work through the issue yourself.</p><button class="button" id="hint">Show sample hint</button><div id="hint-content" aria-live="polite"></div>`; document.querySelector('#hint').onclick = e => { e.target.hidden = true; document.querySelector('#hint-content').innerHTML = '<p>Your method accesses the input before checking whether it is null.</p><ol><li>Check which exception the test expects.</li><li>Review the order of validation and collection access.</li><li>Add an explicit null-input test before changing the implementation.</li></ol><p class="notice">Written sample guidance. No AI service is connected.</p>'; }; }
}
function progressPage() { main.innerHTML = heading('YOUR LEARNING JOURNEY', 'Small steps. Measurable progress.', 'Java Fundamentals · Two sample attempts') + `<section class="panel"><h2>Score by attempt</h2>${[[1, 68], [2, 86]].map(([n, score]) => `<div class="chart-row"><span>Attempt ${n}</span><div class="bar"><span style="width:${score}%"></span></div><strong>${score}/100</strong></div>`).join('')}<p class="notice">Sample score uses 60% tests, 20% coverage, and 20% code quality.</p></section><div class="stats"><div class="stat"><span class="stat-label">Line coverage</span><strong>80%</strong><span class="stat-note">Up from 60% on attempt 1</span></div><div class="stat"><span class="stat-label">Security findings</span><strong>1</strong><span class="stat-note">Down from 3 on attempt 1</span></div><div class="stat"><span class="stat-label">Tests passing</span><strong>9 <small>/ 10</small></strong><span class="stat-note">One edge case to revisit</span></div></div>`; }
function render() {
  clearTimeout(submissionTimer);
  const [page, id] = (location.hash.slice(1) || 'assignments').split('/');
  document.querySelectorAll('[data-nav]').forEach(a => { const active = a.dataset.nav === (page === 'submit' ? 'assignments' : page); a.classList.toggle('active', active); if (active) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
  document.querySelector('#crumb').textContent = ({assignments: 'Assignments', submit: 'Submit project', results: 'Feedback', progress: 'My progress'})[page] || 'Not found';
  if (page === 'assignments') assignmentPage();
  else if (page === 'submit') submissionPage(id);
  else if (page === 'results') resultsPage();
  else if (page === 'progress') progressPage();
  else main.innerHTML = '<h1>Page not found</h1><a class="button" href="#assignments">Back to assignments</a>';
}
window.addEventListener('hashchange', () => { render(); main.focus(); });
render();
