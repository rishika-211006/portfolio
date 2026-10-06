"use strict";

const PH = "[ADD YOUR INFORMATION]";

/* ===== EDIT YOUR DATA HERE (the only place content lives) ===== */

const portfolioData = {
  personal: {
    name: "Rishika Giri",
    role: "Aspiring ML/AI Engineer",
    location: "Ahmedabad, Gujarat, India",
    status: "Student",
    focus: "AI & Machine Learning | Python | Data Science | Building Intelligent Solutions",
    tagline: "Learning AI. Building the Future.",
    email: "rhxz990@gmail.com",
    github: "https://github.com/rishika-211006",
    linkedin: "https://www.linkedin.com/in/rishika-goswami-b37001305/",
    image: "assets/profile.jpg",
    resume: "assets/resume.pdf",
    about: {
      who: "I’m a Computer Science Engineering student with a strong interest in Artificial Intelligence, Machine Learning, and software development. I enjoy learning new technologies, solving problems, and turning ideas into practical projects.",
      build: "I’m currently pursuing Computer Science Engineering and focusing on strengthening my programming and problem-solving skills. Alongside my academics, I’m exploring Python, AI/ML concepts, and developing practical projects.",
      learning: "Python, Machine Learning, data handling, AI concepts, programming fundamentals, and problem-solving.",
      looking: "I want to pursue a career in AI/ML and software development, where I can build intelligent and useful applications. I’m particularly interested in working on real-world problems using machine learning and emerging AI technologies."
    }
  },

  projects: [],

  skills: [
    { id: "skill-01", name: "Python", category: "Programming", description: "Programming, problem solving, and AI/ML development." },
    { id: "skill-02", name: "C", category: "Programming", description: "Programming fundamentals and problem solving." },
    { id: "skill-03", name: "C++", category: "Programming", description: "Programming and problem solving." },
    { id: "skill-04", name: "SQL", category: "Database", description: "Working with structured data and databases." },
    { id: "skill-05", name: "Full-Stack Development", category: "Development", description: "Building practical web applications across the stack." },
    { id: "skill-06", name: "Machine Learning", category: "AI / Data", description: "Learning and applying machine learning concepts to practical problems." },
    { id: "skill-07", name: "Scikit-learn", category: "AI / Data", description: "Machine learning experimentation and implementation." },
    { id: "skill-08", name: "Data Science", category: "AI / Data", description: "Exploring data, extracting insights, and building data-driven solutions." },
    { id: "skill-09", name: "Git", category: "Tools", description: "Version control and project workflow." },
    { id: "skill-10", name: "GitHub", category: "Tools", description: "Code hosting, project collaboration, and version control." }
  ],

  experience: [],

  education: [
    {
      id: "edu-01",
      degree: "Computer Science Engineering",
      institution: "Indus University",
      field: "Computer Science Engineering",
      dates: "2024–2028",
      description: "Computer Science Engineering student focusing on programming, Python, AI/ML, and problem solving.",
      skills: ["Python", "Programming"]
    }
  ],

  achievements: [
    {
      id: "ach-01",
      title: "Hackathon Participation",
      type: "Hackathon",
      date: "Multiple hackathons",
      description: "Participated in multiple hackathons as a Computer Science Engineering student.",
      link: "",
      projects: []
    }
  ]
};

/* ================================================================ */

const D = portfolioData, P = D.personal;

const $ = (s, r = document) => r.querySelector(s);

const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;

const MOB = () => innerWidth <= 700;

const SECT = { projects: "Projects", skills: "Skills", experience: "Experience", education: "Education", achievements: "Achievements" };

const HUB = { about: [0, -520], projects: [-680, -330], skills: [680, -330], experience: [-720, 420], education: [720, 420], achievements: [0, 640], resume: [-380, 880], contact: [380, 880] };

const ents = [], byId = {};

const add = (e) => { ents.push(e); byId[e.id] = e; return e; };



/* ---- build entities from data ---- */

Object.keys(SECT).forEach(t => {

  const [hx, hy] = HUB[t], arr = D[t], n = arr.length;

  arr.forEach((it, i) => {

    let x, y;

    if (t === "experience") { x = hx + (i - (n - 1) / 2) * 200; y = hy + (i % 2 ? 36 : -36); }

    else if (t === "skills") { const cats = [...new Set(arr.map(s => s.category))], c = cats.indexOf(it.category), ins = arr.filter(s => s.category === it.category), k = ins.indexOf(it); const a = (c / cats.length) * 6.283 - 1.57 + k * 0.5; x = hx + Math.cos(a) * (130 + k * 55); y = hy + Math.sin(a) * (130 + k * 55); }

    else { const a = (i / n) * 6.283 - 1.57, r = 140 + n * 14; x = hx + Math.cos(a) * r; y = hy + Math.sin(a) * r; }

    add({ id: it.id, type: t, name: it.name || it.role || it.degree || it.title, sub: it.technologies?.join(" · ") || it.org || it.institution || it.category || it.type || "", x, y, d: it });

  });

});

["about", "resume", "contact"].forEach(t => add({ id: t, type: t, name: { about: "About me", resume: "Resume", contact: "Contact" }[t], sub: "", x: HUB[t][0], y: HUB[t][1], doc: true }));



/* ---- relations (only from real data) ---- */

const skillByName = n => D.skills.find(s => s.name.toLowerCase() === String(n).toLowerCase());

const links = [];

D.projects.forEach(p => p.technologies.forEach(t => { const s = skillByName(t); if (s) links.push([p.id, s.id]); }));

D.experience.forEach(e => e.skills.forEach(t => { const s = skillByName(t); if (s) links.push([e.id, s.id]); }));

D.education.forEach(e => e.skills.forEach(t => { const s = skillByName(t); if (s) links.push([e.id, s.id]); }));

D.achievements.forEach(a => a.projects.forEach(p => byId[p] && links.push([a.id, p])));

const usedIn = sid => D.projects.filter(p => p.technologies.some(t => t.toLowerCase() === byId[sid].d.name.toLowerCase()));



/* ---- DOM ---- */

const stage = $("#stage"), world = $("#world"), fg = $("#fg"), mid = $("#mid"), svg = $("#lines");

const GROUP = { about: 1, projects: 2, skills: 3, experience: 4, education: 5, achievements: 6, resume: 7, contact: 7 };

const html = [];

document.title = (P.name.startsWith("[") ? "Portfolio" : P.name) + " – " + P.role;

$("#brand").textContent = P.name;

fg.insertAdjacentHTML("beforeend", `<button id="me" data-g="0" aria-label="${esc(P.name)}, ${esc(P.role)}. Center on me"><img class="ph" src="${esc(P.image)}" alt="Portrait of ${esc(P.name)}" onerror="this.style.visibility='hidden'"><h2>${esc(P.name)}</h2><div class="r">${esc(P.role)}</div><div class="tl">${esc(P.tagline)}</div><div class="meta"><span>${esc(P.location)}</span><span>${esc(P.status)}</span><span>${esc(P.focus)}</span></div></button>`);

Object.entries({ ...SECT }).forEach(([t, l]) => { const [x, y] = HUB[t]; mid.insertAdjacentHTML("beforeend", `<button class="hub" data-g="${GROUP[t]}" data-hub="${t}" style="left:${x}px;top:${y}px" aria-label="Zoom to ${l}">${l}</button>`); });

ents.forEach(e => {

  if (e.doc) fg.insertAdjacentHTML("beforeend", `<button class="hub doc node-el" data-g="${GROUP[e.type]}" data-id="${e.id}" style="left:${e.x}px;top:${e.y}px">${e.name}</button>`);

  else fg.insertAdjacentHTML("beforeend", `<button class="node node-el t-${e.type}" data-g="${GROUP[e.type]}" data-id="${e.id}" style="left:${e.x}px;top:${e.y}px;animation-delay:${(e.x % 5)}s" aria-label="${esc(e.name)}, ${SECT[e.type] || e.name}"><span class="dot"></span><span class="nm">${esc(e.name)}</span><span class="tg">${esc(e.sub)}</span></button>`);

});

const ln = (a, b, c) => `<path class="${c}" ${c === "base" ? 'pathLength="1" data-g="' + (GROUP[a.type] ?? 1) + '"' : ""} data-a="${a.id}" data-b="${b.id}" d="M${a.x} ${a.y} Q${(a.x + b.x) / 2 + 30} ${(a.y + b.y) / 2 - 30} ${b.x} ${b.y}"/>`;

const me = { id: "me", x: 0, y: 0, type: "me" };

let sv = "";

Object.keys(SECT).concat(["about", "resume", "contact"]).forEach(t => { sv += ln(me, { id: t, x: HUB[t][0], y: HUB[t][1], type: t }, "base"); });

ents.filter(e => !e.doc).forEach(e => { sv += ln({ id: e.type, x: HUB[e.type][0], y: HUB[e.type][1], type: e.type }, e, "base"); });

links.forEach(([a, b]) => { sv += ln(byId[a], byId[b], "conn"); });

svg.innerHTML = sv;



/* ---- camera ---- */

const cam = { x: 0, y: 0, k: 0.6 }, KMIN = 0.22, KMAX = 2.6, BOUND = 1500;

let px = 0, py = 0, panelOpen = false;

const clampCam = () => { cam.k = Math.min(KMAX, Math.max(KMIN, cam.k)); const vw = innerWidth, vh = innerHeight; ["x", "y"].forEach((a, i) => { const v = i ? vh : vw, c = v / 2 - cam[a], lim = BOUND * cam.k; cam[a] = v / 2 - Math.max(-lim, Math.min(lim + 400 * cam.k, c)); }); };

function draw() {

  clampCam();

  world.style.transform = `translate(${cam.x}px,${cam.y}px) scale(${cam.k})`;

  mid.style.transform = `translate(${px * .15}px,${py * .15}px)`; fg.style.transform = `translate(${px * .3}px,${py * .3}px)`;

  $("#stars").style.transform = `translate(${px * .05}px,${py * .05}px)`;

  document.body.classList.toggle("far", cam.k < 0.5);

  fg.querySelectorAll(".node").forEach(n => n.style.fontSize = cam.k < 0.45 ? "0" : "");

  fg.querySelectorAll(".node .tg").forEach(n => n.style.display = cam.k < 0.8 ? "none" : "");

  drawMap();

}

const vOff = () => (panelOpen && !MOB() ? -230 : 0);

let anim = 0;

function flyTo(wx, wy, k, ms = 600) {

  const tx = innerWidth / 2 + vOff() - wx * k, ty = innerHeight / 2 - wy * k, s = { ...cam }, t0 = performance.now();

  cancelAnimationFrame(anim);

  if (RM || ms === 0) { Object.assign(cam, { x: tx, y: ty, k }); draw(); return; }

  const ease = t => 1 - Math.pow(1 - t, 3);

  (function step(now) { const t = Math.min(1, (now - t0) / ms), e = ease(t); cam.k = s.k + (k - s.k) * e; cam.x = s.x + (tx - s.x) * e; cam.y = s.y + (ty - s.y) * e; draw(); if (t < 1) anim = requestAnimationFrame(step); })(t0);

}

const home = () => flyTo(0, 40, Math.min(innerWidth / 1700, innerHeight / 1500, 0.75) < .3 ? .3 : Math.min(innerWidth / 1700, innerHeight / 1500, 0.75) + .15, 700);

const zoomBy = (f, cx = innerWidth / 2, cy = innerHeight / 2) => { const k = Math.min(KMAX, Math.max(KMIN, cam.k * f)), r = k / cam.k; cam.x = cx - (cx - cam.x) * r; cam.y = cy - (cy - cam.y) * r; cam.k = k; draw(); };



/* ---- pointer: pan, wheel, pinch ---- */

const ptrs = new Map(); let lastD = 0, moved = 0;

stage.addEventListener("pointerdown", e => { ptrs.set(e.pointerId, [e.clientX, e.clientY]); moved = 0; cancelAnimationFrame(anim); if (ptrs.size === 2) { const [a, b] = [...ptrs.values()]; lastD = Math.hypot(a[0] - b[0], a[1] - b[1]); } });

stage.addEventListener("pointermove", e => {

  px = (e.clientX / innerWidth - .5) * -24; py = (e.clientY / innerHeight - .5) * -24;

  const p = ptrs.get(e.pointerId);

  if (!p) { if (!RM) draw(); return; }

  if (ptrs.size === 1) { const dx = e.clientX - p[0], dy = e.clientY - p[1]; moved += Math.abs(dx) + Math.abs(dy); if (moved > 6) { stage.classList.add("drag"); cam.x += dx; cam.y += dy; } }

  ptrs.set(e.pointerId, [e.clientX, e.clientY]);

  if (ptrs.size === 2) { const [a, b] = [...ptrs.values()], d = Math.hypot(a[0] - b[0], a[1] - b[1]); if (lastD) zoomBy(d / lastD, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2); lastD = d; moved = 99; }

  draw();

});

const up = e => { ptrs.delete(e.pointerId); lastD = 0; stage.classList.remove("drag"); $("#hint").style.opacity = 0; };

stage.addEventListener("pointerup", up); stage.addEventListener("pointercancel", up);

stage.addEventListener("wheel", e => { e.preventDefault(); zoomBy(Math.exp(-e.deltaY * 0.0015), e.clientX, e.clientY); }, { passive: false });

stage.addEventListener("dblclick", e => { if (!e.target.closest(".node-el,.hub,#me")) zoomBy(1.6, e.clientX, e.clientY); });

// click vs drag guard

stage.addEventListener("click", e => { if (moved > 6) { e.stopPropagation(); e.preventDefault(); } }, true);



/* ---- interactions ---- */

let clicks = 0, ct;

fg.addEventListener("click", e => {

  const b = e.target.closest("button"); if (!b) return;

  if (b.id === "me") { clicks++; clearTimeout(ct); ct = setTimeout(() => clicks = 0, 1500); if (clicks >= 5) { clicks = 0; openPanel(`<h2 id="ptitle">You found the core.</h2><p>Nice. Everything here is generated from one data object, so you can change this page without touching the layout.</p>`); } else { closePanel(); home(); } return; }

  openEntity(b.dataset.id);

});

mid.addEventListener("click", e => { const h = e.target.closest(".hub"); if (h) { const [x, y] = HUB[h.dataset.hub]; flyTo(x, y, 1, 700); } });



function openEntity(id, fromSearch) {

  const e = byId[id]; if (!e) return;

  if (MOB()) { openPanel(render(e)); return; }

  panelOpen = true; flyTo(e.x, e.y, e.doc ? .9 : 1.35, 600); openPanel(render(e));

}

function openPanel(h) {

  const p = $("#panel"); $("#pbody").innerHTML = h; p.hidden = false; panelOpen = true; document.body.classList.add("dim"); p.scrollTop = 0; p.focus({ preventScroll: true });

  $("#pbody").querySelectorAll("[data-tech]").forEach(b => b.onclick = () => highlight(b.dataset.tech));

  $("#pbody").querySelectorAll("[data-go]").forEach(b => b.onclick = () => openEntity(b.dataset.go));

  const f = $("#cform"); if (f) f.onsubmit = sendMsg;

}

function closePanel() { $("#panel").hidden = true; panelOpen = false; document.body.classList.remove("dim"); }

$("#pclose").onclick = closePanel;



const sec = (h, v) => v && v !== "" ? `<h3>${h}</h3><p>${esc(v)}</p>` : "";

const chips = (arr, go) => (arr || []).map(x => `<button class="chip" ${go ? `data-go="${x.id}"` : `data-tech="${esc(x)}"`}>${esc(go ? x.name : x)}</button>`).join("") || "<p>" + PH + "</p>";

const lnk = (u, t) => u ? `<a class="lnk" href="${esc(u)}" target="_blank" rel="noopener">${t}</a>` : "";

function render(e) {

  const d = e.d || {};

  if (e.type === "projects") return `<h2 id="ptitle">${esc(d.name)}</h2><p class="sub">Project</p>${d.image ? `<img class="cover" src="${esc(d.image)}" alt="Screenshot of ${esc(d.name)}" onerror="this.remove()">` : ""}<p>${esc(d.description)}</p>${sec("Problem", d.problem)}${sec("Solution", d.solution)}<h3>Technologies (click to highlight)</h3>${chips(d.technologies)}${sec("Outcome", d.outcome)}${lnk(d.github, "GitHub")}${lnk(d.live, "Live demo")}${!d.github && !d.live ? `<p class="sub">Links: ${PH}</p>` : ""}`;

  if (e.type === "skills") { const u = usedIn(e.id); return `<h2 id="ptitle">${esc(d.name)}</h2><p class="sub">Category: ${esc(d.category)}</p><p>${esc(d.description)}</p><h3>Used in</h3>${u.length ? chips(u, 1) : "<p>No project lists this skill yet.</p>"}<p><button class="chip" data-tech="${esc(d.name)}">Highlight on canvas</button></p>`; }

  if (e.type === "experience") return `<h2 id="ptitle">${esc(d.role)}</h2><p class="sub">${esc(d.org)} · ${esc(d.date)} · ${esc(d.location)}</p><p>${esc(d.description)}</p><h3>Responsibilities</h3><ul>${d.responsibilities.map(r => `<li>${esc(r)}</li>`).join("")}</ul><h3>Skills used</h3>${chips(d.skills)}`;

  if (e.type === "education") return `<h2 id="ptitle">${esc(d.degree)}</h2><p class="sub">${esc(d.institution)} · ${esc(d.field)} · ${esc(d.dates)}</p><p>${esc(d.description)}</p><h3>Related skills</h3>${chips(d.skills)}`;

  if (e.type === "achievements") return `<h2 id="ptitle">${esc(d.title)}</h2><p class="sub">${esc(d.type)} · ${esc(d.date)}</p><p>${esc(d.description)}</p>${lnk(d.link, "Verify")}`;

  if (e.type === "about") { const a = P.about; return `<h2 id="ptitle">About me</h2><div class="paper"><h3>Who I am</h3><p>${esc(a.who)}</p><h3>What I build</h3><p>${esc(a.build)}</p><h3>What I'm learning</h3><p>${esc(a.learning)}</p><h3>What I'm looking for</h3><p>${esc(a.looking)}</p></div>`; }

  if (e.type === "contact") return `<h2 id="ptitle">Start a conversation</h2><form id="cform"><label for="cn">Name</label><input id="cn" required><label for="ce">Email</label><input id="ce" type="email" required><label for="cm">Message</label><textarea id="cm" rows="5" required></textarea><button class="lnk" type="submit">Send message</button></form><p class="sub" id="cstat">This opens your email app. Nothing is sent from this page.</p>`;

  if (e.type === "resume") { const l = k => D[k].map(x => `<li>${esc(x.name || x.role || x.degree || x.title)}</li>`).join(""); return `<h2 id="ptitle">Resume</h2><div class="paper"><h3>Summary</h3><p>${esc(P.about.who)}</p><h3>Experience</h3><ul>${l("experience")}</ul><h3>Projects</h3><ul>${l("projects")}</ul><h3>Skills</h3><p>${D.skills.map(s => esc(s.name)).join(", ")}</p><h3>Education</h3><ul>${l("education")}</ul><h3>Achievements</h3><ul>${l("achievements")}</ul></div><a class="lnk" href="${esc(P.resume)}" download>Download PDF</a>`; }

}

function sendMsg(ev) {

  ev.preventDefault();

  const n = $("#cn").value, m = $("#cm").value, em = $("#ce").value, btn = ev.submitter.getBoundingClientRect(), c = $("#node-contact") || fg.querySelector('[data-id="contact"]').getBoundingClientRect();

  if (!RM) { const l = document.createElement("div"); l.className = "letter"; l.style.left = btn.left + "px"; l.style.top = btn.top + "px"; document.body.appendChild(l); requestAnimationFrame(() => { l.style.transform = `translate(${c.left - btn.left}px,${c.top - btn.top}px) scale(.3)`; l.style.opacity = 0; }); setTimeout(() => l.remove(), 1000); }

  if (!P.email) { toast("Add your email in portfolioData.personal.email to enable this form."); return; }

  location.href = `mailto:${P.email}?subject=${encodeURIComponent("Portfolio message from " + n)}&body=${encodeURIComponent(m + "\n\n" + n + " (" + em + ")")}`;

  $("#cstat").textContent = "Your email app should open with the message ready to send.";

}

function toast(t) { const el = $("#toast"); el.textContent = t; el.classList.add("on"); setTimeout(() => el.classList.remove("on"), 3200); }



/* ---- highlight by technology ---- */

function highlight(tech) {

  const s = skillByName(tech), keep = new Set(["me"]);

  D.projects.filter(p => p.technologies.some(t => t.toLowerCase() === tech.toLowerCase())).forEach(p => keep.add(p.id));

  if (s) keep.add(s.id);

  fg.querySelectorAll(".node").forEach(n => n.classList.toggle("dimmed", !keep.has(n.dataset.id)));

  svg.querySelectorAll(".conn").forEach(p => p.classList.toggle("hl", keep.has(p.dataset.a) && keep.has(p.dataset.b)));

  document.body.classList.add("conn"); $("#btnConn").setAttribute("aria-pressed", "true");

  closePanel(); toast(`Showing "${tech}". Press Esc or Reset view to clear.`);

}

const clearHl = () => { fg.querySelectorAll(".dimmed").forEach(n => n.classList.remove("dimmed")); svg.querySelectorAll(".hl").forEach(p => p.classList.remove("hl")); };



/* ---- controls ---- */

$("#zIn").onclick = () => zoomBy(1.3); $("#zOut").onclick = () => zoomBy(1 / 1.3);

$("#btnReset").onclick = () => { clearHl(); closePanel(); home(); };

$("#btnCenter").onclick = () => { closePanel(); flyTo(0, 0, 1, 600); };

$("#btnConn").onclick = e => { const on = document.body.classList.toggle("conn"); e.currentTarget.setAttribute("aria-pressed", on); if (!on) clearHl(); };

$("#btnMap").onclick = () => { toast("Use the menu to jump between sections."); };

const NAV = [["projects", "Projects"], ["skills", "Skills"], ["experience", "Experience"], ["education", "Education"], ["achievements", "Achievements"], ["contact", "Contact"], ["resume", "Resume"]];

function goTo(t) { closePanel(); if (MOB()) { const el = document.getElementById("m-" + t); el && el.scrollIntoView({ behavior: RM ? "auto" : "smooth" }); return; } flyTo(HUB[t][0], HUB[t][1], t === "resume" || t === "contact" ? 1 : .85, 700); }

$("#menu").innerHTML = NAV.map(([t, l]) => `<button data-t="${t}">${l}</button>`).join("");

$("#bottomnav").innerHTML = NAV.map(([t, l]) => `<button data-t="${t}">${l}</button>`).join("") + `<button id="bs">Search</button>`;

[$("#menu"), $("#bottomnav")].forEach(m => m.addEventListener("click", e => { const t = e.target.dataset?.t; if (t) { goTo(t); $("#menu").hidden = true; $("#btnMenu").setAttribute("aria-expanded", "false"); } if (e.target.id === "bs") openPal(); }));

$("#btnMenu").onclick = () => { const m = $("#menu"); m.hidden = !m.hidden; $("#btnMenu").setAttribute("aria-expanded", !m.hidden); };



/* ---- mobile list ---- */

$("#mlist").innerHTML = `<div class="me"><img src="${esc(P.image)}" alt="Portrait of ${esc(P.name)}" onerror="this.style.visibility='hidden'"><h2 style="color:var(--ink)">${esc(P.name)}</h2><p>${esc(P.role)}</p><p class="sub">${esc(P.tagline)}</p></div><button class="big" data-id="about">About me</button>` +

  Object.entries(SECT).map(([t, l]) => `<h2 id="m-${t}">${l}</h2>` + ents.filter(e => e.type === t).map(e => `<button class="big" data-id="${e.id}">${esc(e.name)}<small>${esc(e.sub)}</small></button>`).join("")).join("") +

  `<h2 id="m-resume">Resume</h2><button class="big" data-id="resume">View resume</button><h2 id="m-contact">Contact</h2><button class="big" data-id="contact">Start a conversation</button>`;

$("#mlist").addEventListener("click", e => { const b = e.target.closest("[data-id]"); if (b) openEntity(b.dataset.id); });



/* ---- palette / search ---- */

let sel = 0, items = [];

const CMDS = [...NAV.map(([t, l]) => ({ n: "Go to " + l, k: "command", f: () => goTo(t) })), { n: "Download resume", k: "command", f: () => openEntity("resume") }, { n: "Center canvas", k: "command", f: () => flyTo(0, 0, 1) }, { n: "Reset view", k: "command", f: () => $("#btnReset").click() }];

function openPal() { $("#palette").hidden = false; $("#q").value = ""; sel = 0; list(); $("#q").focus(); }

function closePal() { $("#palette").hidden = true; }

function list() {

  const q = $("#q").value.trim().toLowerCase();

  const hit = ents.filter(e => !e.doc).filter(e => !q || JSON.stringify(e.d).toLowerCase().includes(q) || e.type.includes(q)).map(e => ({ n: e.name, k: SECT[e.type], f: () => { closePal(); openEntity(e.id); } }));

  items = [...CMDS.filter(c => !q || c.n.toLowerCase().includes(q)), ...hit].slice(0, 30);

  sel = Math.min(sel, Math.max(0, items.length - 1));

  $("#res").innerHTML = items.map((it, i) => `<li role="option" id="o${i}" data-i="${i}" aria-selected="${i === sel}"><span>${esc(it.n)}</span><small>${esc(it.k)}</small></li>`).join("") || `<li>No match. Try a skill, project or place.</li>`;

}

const run = i => { const it = items[i]; if (!it) return; closePal(); it.f(); };

$("#q").addEventListener("input", () => { sel = 0; list(); });

$("#res").addEventListener("click", e => { const li = e.target.closest("li[data-i]"); if (li) run(+li.dataset.i); });

$("#btnSearch").onclick = openPal;

$("#palette").addEventListener("mousedown", e => { if (e.target.id === "palette") closePal(); });

addEventListener("keydown", e => {

  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); $("#palette").hidden ? openPal() : closePal(); return; }

  if (!$("#palette").hidden) {

    if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); sel = (sel + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length; list(); $("#o" + sel)?.scrollIntoView({ block: "nearest" }); }

    else if (e.key === "Enter") run(sel); else if (e.key === "Escape") closePal();

    return;

  }

  if (e.key === "Escape") { closePanel(); clearHl(); }

  if (/input|textarea/i.test(e.target.tagName)) return;

  const st = 60; if (e.key === "ArrowLeft") { cam.x += st; draw(); } if (e.key === "ArrowRight") { cam.x -= st; draw(); } if (e.key === "ArrowUp") { cam.y += st; draw(); } if (e.key === "ArrowDown") { cam.y -= st; draw(); }

  if (e.key === "+" || e.key === "=") zoomBy(1.2); if (e.key === "-") zoomBy(1 / 1.2);

});



/* ---- minimap ---- */

const mm = $("#minimap"), MS = 0.075;

mm.innerHTML = `<i class="me"></i>` + ents.filter(e => e.doc || ["projects", "skills", "experience", "education", "achievements"].includes(e.type)).map(e => `<i data-id="${e.id}"></i>`).join("") + `<b></b>`;

function drawMap() {

  const W = mm.clientWidth, H = mm.clientHeight; if (!W) return;

  mm.querySelector(".me").style.cssText = `left:${W / 2}px;top:${H * .42}px`;

  mm.querySelectorAll("i[data-id]").forEach(i => { const e = byId[i.dataset.id]; i.style.left = W / 2 + e.x * MS + "px"; i.style.top = H * .42 + e.y * MS + "px"; });

  const b = mm.querySelector("b"), wx = -cam.x / cam.k, wy = -cam.y / cam.k;

  b.style.cssText = `left:${W / 2 + wx * MS}px;top:${H * .42 + wy * MS}px;width:${innerWidth / cam.k * MS}px;height:${innerHeight / cam.k * MS}px`;

}

mm.addEventListener("click", e => { const r = mm.getBoundingClientRect(); flyTo((e.clientX - r.left - r.width / 2) / MS, (e.clientY - r.top - r.height * .42) / MS, cam.k, 500); });



/* ---- particles ---- */

const cv = $("#stars"), cx = cv.getContext("2d"); let pts = [];

function sizeStars() { const r = devicePixelRatio || 1; cv.width = cv.clientWidth * r; cv.height = cv.clientHeight * r; cx.setTransform(r, 0, 0, r, 0, 0); const n = innerWidth > 1024 ? 110 : innerWidth > 700 ? 60 : 20; pts = Array.from({ length: n }, () => ({ x: Math.random() * cv.clientWidth, y: Math.random() * cv.clientHeight, r: Math.random() * 1.2 + .3, s: Math.random() * .12 + .02, a: Math.random() * .6 + .2 })); paintStars(); }

function paintStars() { cx.clearRect(0, 0, cv.clientWidth, cv.clientHeight); pts.forEach(p => { cx.fillStyle = `rgba(235,231,223,${p.a})`; cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, 6.283); cx.fill(); }); }

(function tick() { if (!document.hidden && !RM && !MOB()) { pts.forEach(p => { p.y -= p.s; if (p.y < 0) p.y = cv.clientHeight; }); paintStars(); } requestAnimationFrame(tick); })();



/* ---- intro ---- */

function reveal() { document.querySelectorAll("[data-g]").forEach(el => el.classList.add("show")); document.body.classList.remove("intro"); home(); }

let timers = [];

function intro() {

  if (RM || MOB()) { reveal(); return; }

  for (let g = 0; g <= 7; g++) timers.push(setTimeout(() => { document.querySelectorAll(`[data-g="${g}"]`).forEach(el => el.classList.add("show")); if (g === 7) document.body.classList.remove("intro"); }, 150 + g * 230));

}

$("#btnSkip").onclick = () => { timers.forEach(clearTimeout); reveal(); };

addEventListener("resize", () => { document.body.classList.toggle("mobile", MOB()); sizeStars(); draw(); });

document.body.classList.toggle("mobile", MOB());

const mlist = $("#mlist"); mlist.hidden = false;

sizeStars(); cam.x = innerWidth / 2; cam.y = innerHeight / 2; draw(); home(); intro();

// structured data for search engines

const ld = document.createElement("script"); ld.type = "application/ld+json"; ld.textContent = JSON.stringify({ "@context": "https://schema.org", "@type": "Person", name: P.name, jobTitle: P.role, address: P.location, knowsAbout: D.skills.map(s => s.name) }); document.head.appendChild(ld);
