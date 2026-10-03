const main = document.querySelector("main");
// Keep the accessibility skip link independent of hash-based routing.
document.querySelector(".skip").addEventListener("click", (event) => {
  event.preventDefault();
  main.focus();
  main.scrollIntoView();
});
const assignments = [
  {
    id: 1,
    title: "Selenium Login Test",
    description:
      "Build a reliable login test suite. Cover successful sign-in, invalid credentials, and input validation.",
    tags: ["Selenium", "TestNG", "Maven"],
    status: "In progress",
    due: "Oct 8",
    attempts: "1 of 3 attempts",
    action: "Continue assignment",
    link: "#submit/1",
  },
  {
    id: 2,
    title: "API Response Validation",
    description:
      "Verify the details that matter. Test response codes, JSON schemas, and error handling.",
    tags: ["REST Assured", "TestNG"],
    status: "Not started",
    due: "Oct 12",
    attempts: "0 of 3 attempts",
    action: "Start assignment",
    link: "#submit/2",
  },
  {
    id: 3,
    title: "Java Fundamentals",
    description:
      "Put your foundations into practice with collections, exception handling, and unit tests.",
    tags: ["Java 17", "TestNG"],
    status: "Completed",
    due: "Oct 2",
    attempts: "2 of 3 attempts",
    action: "View feedback",
    link: "#results",
  },
];
let filter = "All assignments";
let tab = "Tests";
let hasSubmitted = false;
let submissionTimer;
const badge = (status) =>
  `<span class="badge ${status === "In progress" ? "amber" : status === "Not started" ? "neutral" : ""}">${status}</span>`;
const heading = (eyebrow, title, detail) =>
  `<div class="heading"><div><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p class="intro">${detail}</p></div><span class="semester">Fall 2026</span></div>`;
function assignmentPage() {
  const visible = assignments.filter(
    (a) =>
      filter === "All assignments" ||
      (filter === "Active"
        ? a.status !== "Completed"
        : a.status === "Completed"),
  );
  main.innerHTML =
    heading(
      "SDET–BATCH 16",
      "Assignments",
      "Manage your submissions and review automated feedback.",
    ) +
    `
    <div class="stats"><div class="stat"><span class="stat-label">Completed</span><strong>1 <small>/ 3 assignments</small></strong></div><div class="stat"><span class="stat-label">Best score</span><strong>86 <small>/ 100</small></strong></div><div class="stat"><span class="stat-label">Next deadline</span><strong>Oct 8 <small>Selenium Login Test</small></strong></div></div>
    <div class="workbench"><section class="assignment-section"><div class="section-heading"><div class="filters" aria-label="Filter assignments">${["All assignments", "Active", "Completed"].map((f) => `<button data-filter="${f}" class="${filter === f ? "selected" : ""}" aria-pressed="${filter === f}">${f}</button>`).join("")}</div><span class="count">${visible.length} ${visible.length === 1 ? "assignment" : "assignments"}</span></div>
    <div class="assignment-list">${visible.map((a) => `<article class="assignment-row"><div class="assignment-id">A–0${a.id}</div><div class="assignment-body"><div class="row-heading"><h2>${a.title}</h2>${badge(a.status)}</div><p>${a.description}</p><div class="tags">${a.tags.map((t) => `<span>${t}</span>`).join("")}</div><div class="row-meta"><span>Due ${a.due}, 2026</span><span>${a.attempts}</span><a href="${a.link}" class="button ${a.id !== 1 ? "secondary" : ""}">${a.action}</a></div></div></article>`).join("")}</div></section>
    <aside class="review-rail"><div class="rail-label">LATEST REVIEW <span>DEMO-003</span></div><h2>Java Fundamentals</h2><div class="review-score">86<span>/ 100</span></div><div class="score-track"><span></span></div><dl><div><dt>Tests passed</dt><dd>9 / 10</dd></div><div><dt>Line coverage</dt><dd>80%</dd></div><div><dt>Security findings</dt><dd class="error">1 critical</dd></div></dl><div class="rail-failure"><span class="failure-label">FAILING TEST</span><code>nullInputRejected</code><p>Expected IllegalArgumentException; received NullPointerException.</p></div><a class="button secondary" href="#results">Open full report</a><p class="notice">Sample feedback · Oct 2, 2026</p></aside></div>`;
  main.querySelectorAll("[data-filter]").forEach(
    (b) =>
      (b.onclick = () => {
        filter = b.dataset.filter;
        assignmentPage();
        main.querySelector(`[data-filter="${filter}"]`).focus();
      }),
  );
}
function submissionPage(id) {
  const a = assignments.find((x) => x.id === Number(id));
  if (!a) {
    main.innerHTML =
      '<h1>Assignment not found</h1><a class="button" href="#assignments">Back to assignments</a>';
    return;
  }
  main.innerHTML =
    `<a class="back" href="#assignments">‹ All assignments</a>` +
    heading("ASSIGNMENT / 0" + a.id, a.title, a.description) +
    `<section class="panel"><h2>Submit your project</h2><p class="muted">Package your Maven project as a ZIP, including pom.xml and the src folder.</p><div class="dropzone"><label for="project">Choose your project ZIP</label><p class="notice">ZIP only · Up to 50 MB</p><input type="file" id="project" accept=".zip,application/zip"></div><p class="notice">Demo only: the file stays on your device. This simulates grading with sample results.</p><button class="button" id="submit">Simulate submission</button><p role="status" aria-live="polite" class="message" id="submission-status"></p></section>`;
  document.querySelector("#submit").onclick = () => {
    const file = document.querySelector("#project").files[0];
    const status = document.querySelector("#submission-status");
    if (
      !file ||
      !file.name.toLowerCase().endsWith(".zip") ||
      file.size === 0 ||
      file.size > 50 * 1024 * 1024
    ) {
      status.textContent =
        "Choose a nonempty ZIP file no larger than 50 MB to continue.";
      status.classList.add("error");
      return;
    }
    status.classList.remove("error");
    document.querySelector("#submit").disabled = true;
    status.textContent = "Queued — preparing sample feedback…";
    submissionTimer = setTimeout(() => {
      status.textContent = "Running — simulating test and security checks…";
      submissionTimer = setTimeout(() => {
        hasSubmitted = true;
        location.hash = "#results";
      }, 1100);
    }, 800);
  };
}
function resultsPage() {
  main.innerHTML =
    `<a class="back" href="#assignments">‹ All assignments</a>` +
    heading(
      "SUBMISSION / DEMO-003",
      hasSubmitted ? "Simulation report" : "Submission report",
      hasSubmitted
        ? "Simulation complete · Showing the Java Fundamentals sample report"
        : "Java Fundamentals · Demonstration report · Oct 2, 2026",
    ) +
    `<div class="panel score"><div class="score-ring">86</div><div><h2>Java Fundamentals</h2><p class="muted">9 of 10 tests passed · 80% line coverage · 1 security finding</p><span class="badge">Sample graded result</span></div></div><section class="panel"><div class="tabs" role="tablist" aria-label="Feedback sections">${["Tests", "Security", "Hints"].map((t) => `<button role="tab" id="tab-${t}" aria-controls="feedback-content" aria-selected="${t === tab}" class="${t === tab ? "selected" : ""}" data-tab="${t}">${t}${t === "Security" ? " (1)" : ""}</button>`).join("")}</div><div id="feedback-content" role="tabpanel" aria-labelledby="tab-${tab}"></div></section>`;
  main.querySelectorAll("[data-tab]").forEach((button, index, buttons) => {
    button.tabIndex = button.dataset.tab === tab ? 0 : -1;
    button.onkeydown = (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key))
        return;
      event.preventDefault();
      const next =
        event.key === "Home"
          ? 0
          : event.key === "End"
            ? buttons.length - 1
            : (index + (event.key === "ArrowRight" ? 1 : -1) + buttons.length) %
              buttons.length;
      buttons[next].click();
    };
  });
  main.querySelectorAll("[data-tab]").forEach(
    (b) =>
      (b.onclick = () => {
        tab = b.dataset.tab;
        resultsPage();
        document.querySelector(`#tab-${tab}`).focus();
      }),
  );
  const content = document.querySelector("#feedback-content");
  if (tab === "Tests")
    content.innerHTML = `<div class="table-wrap"><table><thead><tr><th>Test case</th><th>Result</th><th>Duration</th></tr></thead><tbody>${["emptyCollectionReturnsZero", "singleItemCount", "multipleItemCount", "duplicateItemsHandled", "sortAscending", "sortDescending", "missingItemReturnsEmpty", "validInputAccepted", "exceptionsHaveMessage", "nullInputRejected"].map((name, i) => `<tr><td><code>${name}</code>${i === 9 ? "<details><summary>See failure</summary><pre>AssertionError: expected IllegalArgumentException\nActual: NullPointerException\n at CollectionsTest.java:42</pre></details>" : ""}</td><td><span class="badge ${i === 9 ? "amber" : ""}">${i === 9 ? "Failed" : "Passed"}</span></td><td>${12 + i * 3} ms</td></tr>`).join("")}</tbody></table></div>`;
  if (tab === "Security")
    content.innerHTML = `<article class="finding"><span class="badge">CRITICAL · CWE-798</span><h3>Hardcoded credential</h3><code>src/test/java/Config.java:12</code><p>A password is stored directly in the source. Read sensitive configuration from an environment variable and keep local secrets out of Git.</p><a class="button secondary" href="https://cwe.mitre.org/data/definitions/798.html" target="_blank" rel="noopener noreferrer">Read about CWE-798</a></article>`;
  if (tab === "Hints") {
    content.innerHTML = `<h2>A nudge in the right direction</h2><p class="muted">Use guidance to work through the issue yourself.</p><button class="button" id="hint">Show sample hint</button><div id="hint-content" aria-live="polite"></div>`;
    document.querySelector("#hint").onclick = (e) => {
      e.target.hidden = true;
      document.querySelector("#hint-content").innerHTML =
        '<p>Your method accesses the input before checking whether it is null.</p><ol><li>Check which exception the test expects.</li><li>Review the order of validation and collection access.</li><li>Add an explicit null-input test before changing the implementation.</li></ol><p class="notice">Written sample guidance. No AI service is connected.</p>';
    };
  }
}
function progressPage() {
  main.innerHTML =
    heading(
      "SDET–BATCH 16",
      "My progress",
      "Java Fundamentals · Two sample attempts",
    ) +
    `<section class="panel"><h2>Score by attempt</h2>${[
      [1, 68],
      [2, 86],
    ]
      .map(
        ([n, score]) =>
          `<div class="chart-row"><span>Attempt ${n}</span><div class="bar"><span style="width:${score}%"></span></div><strong>${score}/100</strong></div>`,
      )
      .join(
        "",
      )}<p class="notice">Sample score uses 60% tests, 20% coverage, and 20% code quality.</p></section><div class="stats"><div class="stat"><span class="stat-label">Line coverage</span><strong>80%</strong><span class="stat-note">Up from 60% on attempt 1</span></div><div class="stat"><span class="stat-label">Security findings</span><strong>1</strong><span class="stat-note">Down from 3 on attempt 1</span></div><div class="stat"><span class="stat-label">Tests passing</span><strong>9 <small>/ 10</small></strong><span class="stat-note">One edge case to revisit</span></div></div>`;
}
function render() {
  clearTimeout(submissionTimer);
  const [page, id] = (location.hash.slice(1) || "assignments").split("/");
  document.querySelectorAll("[data-nav]").forEach((a) => {
    const active = a.dataset.nav === (page === "submit" ? "assignments" : page);
    a.classList.toggle("active", active);
    if (active) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  document.querySelector("#crumb").textContent =
    {
      assignments: "Assignments",
      submit: "Submit project",
      results: "Feedback",
      progress: "My progress",
    }[page] || "Not found";
  if (page === "assignments") assignmentPage();
  else if (page === "submit") submissionPage(id);
  else if (page === "results") resultsPage();
  else if (page === "progress") progressPage();
  else
    main.innerHTML =
      '<h1>Page not found</h1><a class="button" href="#assignments">Back to assignments</a>';
}
window.addEventListener("hashchange", () => {
  render();
  main.focus();
});
render();
