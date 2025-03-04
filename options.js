document.getElementById("save").addEventListener("click", () => {
  const userData = {
      first_name: document.getElementById("first_name").value,
      last_name: document.getElementById("last_name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      address: document.getElementById("address").value,
      linkedin: document.getElementById("linkedin").value
  };

  chrome.storage.sync.set(userData, () => {
      alert("Settings saved!");
  });
});

// Load saved data
chrome.storage.sync.get(null, (data) => {
  document.getElementById("first_name").value = data.first_name || "";
  document.getElementById("last_name").value = data.last_name || "";
  document.getElementById("email").value = data.email || "";
  document.getElementById("phone").value = data.phone || "";
  document.getElementById("address").value = data.address || "";
  document.getElementById("linkedin").value = data.linkedin || "";
});
