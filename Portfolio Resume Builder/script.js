// Handle form submission to generate the resume preview
document.getElementById("resume-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Collect all input values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const summary = document.getElementById("summary").value;
    const skills = document.getElementById("skills").value;
    
    // Work experience section
    const workEntries = [];
    document.querySelectorAll(".work-entry").forEach(entry => {
        const jobTitle = entry.querySelector(".job-title").value;
        const companyName = entry.querySelector(".company-name").value;
        const jobDescription = entry.querySelector(".job-description").value;
        
        if (jobTitle && companyName) {
            workEntries.push({ jobTitle, companyName, jobDescription });
        }
    });

    // Create resume content
    let resumeContent = `
        <div class="resume-item">
            <h3>${name}</h3>
            <p>Email: ${email} | Phone: ${phone}</p>
        </div>
        <div class="resume-item">
            <h4>Summary</h4>
            <p>${summary}</p>
        </div>
        <div class="resume-item">
            <h4>Work Experience</h4>
            <ul>
                ${workEntries.map(entry => `
                    <li>
                        <strong>${entry.jobTitle}</strong> at ${entry.companyName}
                        <p>${entry.jobDescription}</p>
                    </li>
                `).join('')}
            </ul>
        </div>
        <div class="resume-item">
            <h4>Skills</h4>
            <p>${skills}</p>
        </div>
    `;

    // Display resume preview
    document.getElementById("resume-content").innerHTML = resumeContent;

    // Show the download button
    document.getElementById("download-btn").style.display = "block";
});

// Add work experience entry
document.getElementById("add-work").addEventListener("click", function() {
    const workExperienceDiv = document.getElementById("work-experience");
    const workEntry = document.createElement("div");
    workEntry.classList.add("work-entry");
    
    workEntry.innerHTML = `
        <input type="text" class="job-title" placeholder="Job Title" required><br>
        <input type="text" class="company-name" placeholder="Company Name" required><br>
        <textarea class="job-description" placeholder="Job Description"></textarea><br>
    `;
    
    workExperienceDiv.appendChild(workEntry);
});

// Handle downloading the resume
document.getElementById("download-btn").addEventListener("click", function() {
    const resumeContent = document.getElementById("resume-content").innerHTML;
    const doc = new jsPDF();
    
    doc.html(resumeContent, {
        callback: function (doc) {
            doc.save("resume.pdf");
        },
        x: 10,
        y: 10
    });
});
