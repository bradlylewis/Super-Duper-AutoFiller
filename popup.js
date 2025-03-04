const jobSites = [
  "indeed.com",
  "linkedin.com",
  "glassdoor.com",
  "monster.com",
  "careerbuilder.com",
  "ziprecruiter.com",
  "simplyhired.com",
  "dice.com",
  "angel.co",
  "usajobs.gov",
  "greenhouse.io",
  "lever.co",
  "myworkdayjobs.com",
  "jobvite.com",
  "icims.com",
  "smartrecruiters.com",
  "taleo.net",
  "adp.com",
  "bamboohr.com",
  "jazzhr.com",
  "bullhornstaffing.com"
];

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  if (tabs.length === 0 || !tabs[0].url) {
    showUnsupported();
    return;
  }

  const url = new URL(tabs[0].url);
  const domain = url.hostname.replace("www.", ""); // Remove "www."

  // 🚨 Check for restricted pages (chrome://, edge://, etc.)
  if (url.protocol === "chrome:" || url.protocol === "edge:") {
    showUnsupported();
    return;
  }

  // Check if the current site is in the allowed jobSites list
  if (!jobSites.some(site => domain.includes(site))) {
    showUnsupported();
    return;
  }

  // ✅ If on a job site, show job-site UI
  document.getElementById("job-site-content").style.display = "block";
  document.getElementById("unsupported-content").style.display = "none";
});

// 🚨 Function to show "Unsupported Page" UI
function showUnsupported() {
  document.getElementById("job-site-content").style.display = "none";
  document.getElementById("unsupported-content").style.display = "block";
}

// 🚀 "Fill Form" Button
document.getElementById("fillForm")?.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length === 0) return;
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ["content.js"]
    });
  });
});

// 🔧 Open Settings Page
document.getElementById("settings")?.addEventListener("click", () => {
  chrome.runtime.openOptionsPage();
});
