// ==================== SHARED DATA ====================
const examsData = [
    { id: 1, name: "UPSC Civil Services", level: "central", posts: 150, eligibility: "Graduate", salary: "₹56,100 - ₹1,77,500", notification: "2024-01-15", searchTerms: ["upsc", "civil services", "ias", "ips"] },
    { id: 2, name: "SSC CHSL", level: "central", posts: 3500, eligibility: "12th Pass", salary: "₹18,000 - ₹56,100", notification: "2024-02-01", searchTerms: ["ssc", "chsl", "combined higher secondary"] },
    { id: 3, name: "RRB NTPC", level: "central", posts: 35000, eligibility: "12th Pass", salary: "₹19,900 - ₹35,400", notification: "2024-01-20", searchTerms: ["rrb", "ntpc", "railways"] },
    { id: 4, name: "State PSC Exam", level: "state", posts: 800, eligibility: "Graduate", salary: "₹54,000 - ₹1,42,400", notification: "2024-03-10", searchTerms: ["psc", "state", "state services"] },
    { id: 5, name: "Bank PO (IBPS)", level: "central", posts: 4000, eligibility: "Graduate", salary: "₹23,700 - ₹42,020", notification: "2024-01-25", searchTerms: ["bank", "po", "banking", "ibps"] },
    { id: 6, name: "LIC AAO", level: "central", posts: 600, eligibility: "Graduate", salary: "₹24,000 - ₹44,000", notification: "2024-02-14", searchTerms: ["insurance", "lic", "aao"] },
    { id: 7, name: "Police Recruitment", level: "state", posts: 5000, eligibility: "12th Pass", salary: "₹20,000 - ₹49,000", notification: "2024-03-05", searchTerms: ["police", "state police", "constable"] },
    { id: 8, name: "Teacher Recruitment", level: "state", posts: 10000, eligibility: "B.Ed/Diploma", salary: "₹25,000 - ₹50,000", notification: "2024-02-28", searchTerms: ["teacher", "state", "education"] }
];

const papersData = [
    { id: 1, exam: "UPSC Prelims", year: 2023, subject: "gs", title: "General Studies Paper 1 - 2023", questions: 100, duration: "2 hours" },
    { id: 2, exam: "SSC CGL", year: 2023, subject: "math", title: "Quantitative Aptitude - 2023", questions: 100, duration: "2 hours" },
    { id: 3, exam: "SSC CHSL", year: 2024, subject: "english", title: "English Language - 2024", questions: 50, duration: "1 hour" },
    { id: 4, exam: "RRB NTPC", year: 2023, subject: "reasoning", title: "Reasoning & General Intelligence - 2023", questions: 40, duration: "90 mins" },
    { id: 5, exam: "Bank PO", year: 2024, subject: "math", title: "Numerical Ability - 2024", questions: 35, duration: "20 mins" },
    { id: 6, exam: "UPSC Mains", year: 2022, subject: "gs", title: "General Studies Paper 1 - 2022", questions: 20, duration: "3 hours" },
    { id: 7, exam: "State PCS", year: 2023, subject: "science", title: "General Science - 2023", questions: 100, duration: "2 hours" },
    { id: 8, exam: "DSSSB", year: 2024, subject: "english", title: "English Language & Comprehension - 2024", questions: 100, duration: "2.5 hours" }
];

const notificationsData = [
    { id: 1, title: "UPSC Civil Services 2024 Notification Released", level: "central", status: "latest", date: "2024-03-25", deadline: "2024-04-15", description: "UPSC has released the notification for Civil Services Examination 2024. Total 150 vacancies. Last date to apply is April 15, 2024." },
    { id: 2, title: "SSC CGL 2024 Admit Card Released", level: "central", status: "urgent", date: "2024-03-20", deadline: "2024-04-05", description: "SSC has released the admit cards for CGL 2024. Download from the official website. Exam date is April 5, 2024." },
    { id: 3, title: "RRB NTPC Previous Year Papers Available", level: "central", status: "latest", date: "2024-03-22", deadline: null, description: "Previous year papers for RRB NTPC are now available for download." },
    { id: 4, title: "State Teacher Recruitment Registration Open", level: "state", status: "urgent", date: "2024-03-24", deadline: "2024-04-10", description: "State Education Department has opened registration for Teacher Recruitment Drive. 10,000 vacancies announced." },
    { id: 5, title: "Bank PO 2024 Application Deadline Extended", level: "central", status: "latest", date: "2024-03-21", deadline: "2024-04-20", description: "Bank PO 2024 application deadline extended to April 20, 2024. Apply immediately." },
    { id: 6, title: "Police Recruitment Exam Schedule Announced", level: "state", status: "upcoming", date: "2024-03-23", deadline: "2024-05-01", description: "State Police Department announced the exam schedule. Preliminary exam on May 1, 2024." }
];

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('examsContainer')) populateExams();
    if (document.getElementById('papersContainer')) populatePapers();
    if (document.getElementById('notificationsContainer')) populateNotifications();
    setupNavigation();
    setupSearchFunctionality();
    setupScrollAnimations();
});

// ==================== NAVIGATION ====================
function setupNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    if (!hamburger || !navLinksContainer) return;

    hamburger.addEventListener('click', () => navLinksContainer.classList.toggle('active'));

    window.addEventListener('scroll', function () {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        let current = '';
        sections.forEach(section => {
            if (pageYOffset >= section.offsetTop - 200) current = section.getAttribute('id');
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
        });
    });
}

// ==================== SEARCH ====================
function setupSearchFunctionality() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    if (!searchInput) return;

    searchInput.addEventListener('input', function () {
        const query = this.value.toLowerCase().trim();
        if (!query) { searchResults.classList.add('hidden'); return; }

        const results = examsData.filter(e =>
            e.name.toLowerCase().includes(query) ||
            e.searchTerms.some(t => t.includes(query))
        );

        searchResults.innerHTML = results.length
            ? results.map(r => `<div class="search-result-item" onclick="scrollToSection('exams')">
                <div><strong>${r.name}</strong><br><small>${r.level === 'central' ? '🏛️ Central' : '🏢 State'} &bull; ${r.posts} Posts</small></div>
                <small>${r.salary}</small></div>`).join('')
            : '<div class="search-result-item">No exams found</div>';
        searchResults.classList.remove('hidden');
    });
}

function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ==================== EXAMS ====================
function populateExams(filterType = 'all') {
    const container = document.getElementById('examsContainer');
    if (!container) return;
    let data = filterType === 'all' ? examsData : examsData.filter(e => e.level === filterType);
    // Show only 6 on homepage
    const isHomePage = !window.location.pathname.includes('/pages/');
    if (isHomePage) data = data.slice(0, 6);

    container.innerHTML = data.map(exam => `
        <div class="exam-card">
            <div class="exam-header">
                <h3>${exam.name}</h3>
                <span class="exam-level">${exam.level === 'central' ? '🏛️ Central' : '🏢 State'}</span>
            </div>
            <div class="exam-body">
                <div class="exam-detail"><span class="exam-detail-label">📋 Posts:</span><span class="exam-detail-value">${exam.posts.toLocaleString()}</span></div>
                <div class="exam-detail"><span class="exam-detail-label">🎓 Eligibility:</span><span class="exam-detail-value">${exam.eligibility}</span></div>
                <div class="exam-detail"><span class="exam-detail-label">💰 Salary:</span><span class="exam-detail-value">${exam.salary}</span></div>
                <div class="exam-detail"><span class="exam-detail-label">📅 Notified:</span><span class="exam-detail-value">${formatDate(exam.notification)}</span></div>
            </div>
            <div class="exam-footer">
                <button class="exam-btn info-btn" onclick="showExamDetails(${exam.id})">More Info</button>
                <button class="exam-btn apply-btn" onclick="alert('Redirecting to official website...')">Apply Now</button>
            </div>
        </div>`).join('');
}

function filterExams(type) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    populateExams(type);
}

function showExamDetails(id) {
    const exam = examsData.find(e => e.id === id);
    alert(`📋 ${exam.name}\n\nLevel: ${exam.level === 'central' ? 'Central' : 'State'}\nPosts: ${exam.posts}\nEligibility: ${exam.eligibility}\nSalary: ${exam.salary}\n\nVisit official website for more details!`);
}

// ==================== PAPERS ====================
function populatePapers() { displayPapers(papersData.slice(0, 6)); }

function displayPapers(papers) {
    const container = document.getElementById('papersContainer');
    if (!container) return;
    if (!papers.length) { container.innerHTML = '<p style="text-align:center;grid-column:1/-1;padding:2rem">No papers found.</p>'; return; }
    container.innerHTML = papers.map(p => `
        <div class="paper-card">
            <h4 class="paper-title">${p.title}</h4>
            <div class="paper-meta">
                <span>📅 ${p.year}</span>
                <span>❓ ${p.questions} Qs</span>
                <span class="paper-subject">${getSubjectLabel(p.subject)}</span>
            </div>
            <div style="font-size:0.82rem;color:#999;margin-bottom:1rem">⏱️ ${p.duration}</div>
            <button class="download-btn" onclick="downloadPaper(${p.id})">📥 Download PDF</button>
        </div>`).join('');
}

function filterPapers() {
    const yr = document.getElementById('yearFilter')?.value;
    const sub = document.getElementById('subjectFilter')?.value;
    let filtered = papersData;
    if (yr) filtered = filtered.filter(p => p.year == yr);
    if (sub) filtered = filtered.filter(p => p.subject === sub);
    displayPapers(filtered);
}

function getSubjectLabel(s) {
    return { reasoning: 'Reasoning', math: 'Mathematics', english: 'English', science: 'Science', gs: 'General Studies' }[s] || s;
}

function downloadPaper(id) {
    const p = papersData.find(x => x.id === id);
    alert(`📥 Downloading: ${p.title}\n\nThis would download the PDF from the server in a real application.`);
}

// ==================== NOTIFICATIONS ====================
function populateNotifications() { displayNotifications(notificationsData.slice(0, 4)); }

function displayNotifications(notifs) {
    const container = document.getElementById('notificationsContainer');
    if (!container) return;
    container.innerHTML = notifs.map(n => `
        <div class="notification-card ${n.status}">
            <div class="notification-header">
                <h3 class="notification-title">${n.title}</h3>
                <span class="notification-date">${formatDate(n.date)}</span>
            </div>
            <div class="notification-body">${n.description}</div>
            <div class="notification-meta">
                <span class="meta-badge">${n.level === 'central' ? '🏛️ Central' : '🏢 State'}</span>
                ${n.deadline ? `<span class="meta-badge deadline">⏰ Deadline: ${formatDate(n.deadline)}</span>` : ''}
                <span class="meta-badge">${getStatusLabel(n.status)}</span>
            </div>
        </div>`).join('');
}

function sortNotifications(by) {
    let sorted = [...notificationsData];
    if (by === 'date') sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    else sorted.sort((a, b) => a.level.localeCompare(b.level));
    displayNotifications(sorted);
}

function getStatusLabel(s) {
    return { latest: '🆕 Latest', urgent: '🔴 Urgent', upcoming: '📌 Upcoming' }[s] || s;
}

// ==================== FAQ ====================
function toggleFAQ(el) {
    const answer = el.nextElementSibling;
    const icon = el.querySelector('.faq-icon');
    document.querySelectorAll('.faq-answer').forEach(f => { if (f !== answer) f.classList.remove('active'); });
    document.querySelectorAll('.faq-icon').forEach(i => { if (i !== icon) i.textContent = '+'; });
    answer.classList.toggle('active');
    icon.textContent = answer.classList.contains('active') ? '−' : '+';
}

// ==================== CONTACT ====================
function handleFormSubmit(event) {
    event.preventDefault();
    const msg = document.getElementById('formMessage');
    msg.classList.remove('success', 'error');
    msg.style.display = 'none';
    setTimeout(() => {
        msg.textContent = '✅ Thank you! Your message was sent successfully. We\'ll get back to you soon.';
        msg.classList.add('success');
        msg.style.display = 'block';
        event.target.reset();
    }, 500);
    setTimeout(() => msg.style.display = 'none', 6000);
}

// ==================== TABS ====================
function switchTab(tabName, groupClass) {
    const group = groupClass || 'default';
    document.querySelectorAll(`.tab-btn[data-group="${group}"]`).forEach(b => b.classList.remove('active'));
    document.querySelectorAll(`.tab-content[data-group="${group}"]`).forEach(c => c.classList.remove('active'));
    document.querySelector(`.tab-btn[data-tab="${tabName}"][data-group="${group}"]`)?.classList.add('active');
    document.querySelector(`.tab-content[data-tab="${tabName}"][data-group="${group}"]`)?.classList.add('active');
}

// ==================== SCROLL ANIMATIONS ====================
function setupScrollAnimations() {
    const opts = { threshold: 0.1, rootMargin: '0px 0px -80px 0px' };
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.style.opacity = '1';
                e.target.style.transform = 'translateY(0)';
                obs.unobserve(e.target);
            }
        });
    }, opts);

    document.querySelectorAll('.exam-card,.paper-card,.notification-card,.quick-link-card,.info-card,.test-card,.cal-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        obs.observe(card);
    });
}

// ==================== UTILITIES ====================
function formatDate(str) {
    return new Date(str).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
}
