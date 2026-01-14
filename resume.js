// resume.js - Handles resume form inputs, live preview, and data binding

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('resume-form');
    const skillsList = document.getElementById('skills-list');
    const addSkillBtn = document.getElementById('add-skill');
    const skillInput = document.getElementById('skill-input');
    let skills = [];
    const downloadBtn = document.getElementById('download-resume');

    // Initialize
    loadUserDataInternal();

    // Two-way data binding for inputs
    if (form) {
        form.addEventListener('input', function() {
            updatePreview();
            saveResumeData();
        });
    }

    // Handle skills
    if (addSkillBtn) {
        addSkillBtn.addEventListener('click', function() {
            const skill = skillInput.value.trim();
            if (skill && !skills.includes(skill)) {
                skills.push(skill);
                renderSkills();
                skillInput.value = '';
                updatePreview();
                saveResumeData();
            }
        });
    }

    if (skillsList) {
        skillsList.addEventListener('click', function(e) {
            if (e.target.classList.contains('skill-tag')) {
                const skill = e.target.textContent;
                skills = skills.filter(s => s !== skill);
                renderSkills();
                updatePreview();
                saveResumeData();
            }
        });
    }
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(){
            window.print();
        });
    }

    function renderSkills() {
        if (!skillsList) return;
        skillsList.innerHTML = skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('');
        
    }

    function updatePreview() {
        const byId = id => document.getElementById(id);
        const setText = (id, text, fallback='') => { const el = byId(id); if(el) el.textContent = text || fallback; };

        setText('preview-name', byId('name') ? byId('name').value : '', 'Your Name');
        setText('preview-email', byId('email') ? byId('email').value : '');
        setText('preview-phone', byId('phone') ? byId('phone').value : '');
        setText('preview-location', byId('location') ? byId('location').value : '');
        setText('preview-linkedin', byId('linkedin') ? byId('linkedin').value : '');
        setText('preview-summary', byId('summary') ? byId('summary').value : '');

        const degree = byId('degree') ? byId('degree').value : '';
        const inst = byId('institution') ? byId('institution').value : '';
        const year = byId('year') ? byId('year').value : '';
        const cgpa = byId('cgpa') ? byId('cgpa').value : '';
        setText('preview-education', `${degree}${degree || inst ? ' from ' : ''}${inst}${year ? ', ' + year : ''}${cgpa ? ' (CGPA: ' + cgpa + ')' : ''}`);

        const previewSkills = byId('preview-skills');
        if (previewSkills) previewSkills.innerHTML = skills.map(skill => `<span>${skill}</span>`).join('');

        const previewExp = byId('preview-experience');
        if (previewExp) {
            const title = byId('exp-title') ? byId('exp-title').value : '';
            const org = byId('exp-org') ? byId('exp-org').value : '';
            const dur = byId('exp-duration') ? byId('exp-duration').value : '';
            const desc = byId('exp-desc') ? byId('exp-desc').value : '';
            previewExp.innerHTML = `<strong>${title}</strong>${org ? ' at ' + org : ''}${dur ? '<br>' + dur : ''}${desc ? '<br>' + desc : ''}`;
        }

        setText('preview-achievements', byId('achievements') ? byId('achievements').value : '');
    }

    function saveResumeData() {
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) return;
        const userData = getUserData(currentUser) || {};
        userData.resume = {
            name: document.getElementById('name') ? document.getElementById('name').value : '',
            email: document.getElementById('email') ? document.getElementById('email').value : '',
            phone: document.getElementById('phone') ? document.getElementById('phone').value : '',
            location: document.getElementById('location') ? document.getElementById('location').value : '',
            linkedin: document.getElementById('linkedin') ? document.getElementById('linkedin').value : '',
            summary: document.getElementById('summary') ? document.getElementById('summary').value : '',
            degree: document.getElementById('degree') ? document.getElementById('degree').value : '',
            institution: document.getElementById('institution') ? document.getElementById('institution').value : '',
            year: document.getElementById('year') ? document.getElementById('year').value : '',
            cgpa: document.getElementById('cgpa') ? document.getElementById('cgpa').value : '',
            skills: skills,
            expTitle: document.getElementById('exp-title') ? document.getElementById('exp-title').value : '',
            expOrg: document.getElementById('exp-org') ? document.getElementById('exp-org').value : '',
            expDuration: document.getElementById('exp-duration') ? document.getElementById('exp-duration').value : '',
            expDesc: document.getElementById('exp-desc') ? document.getElementById('exp-desc').value : '',
            achievements: document.getElementById('achievements') ? document.getElementById('achievements').value : ''
        };
        saveUserData(currentUser, userData);
    }

    function loadUserDataInternal(){
        // storage.loadUserData will populate basic fields, then we sync skills and preview
        loadUserData();
        const currentUser = localStorage.getItem('currentUser');
        if(!currentUser) return;
        const userData = getUserData(currentUser) || {};
        if(userData.resume && userData.resume.skills){
            skills = userData.resume.skills.slice();
        }
        renderSkills();
        updatePreview();
    }
});
