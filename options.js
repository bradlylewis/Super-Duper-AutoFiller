document.getElementById("save").addEventListener("click", () => {
  const userData = {
      first_name: document.getElementById("first_name").value,
      last_name: document.getElementById("last_name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      street: document.getElementById("street").value,
      city: document.getElementById("city").value,
      state: document.getElementById("state").value,
      postal: document.getElementById("postal").value,
      country: document.getElementById("country").value,
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
  document.getElementById("street").value = data.street || "";
  document.getElementById("city").value = data.city || "";
  document.getElementById("state").value = data.state || "";
  document.getElementById("postal").value = data.postal || "";
  document.getElementById("country").value = data.country || "";
  document.getElementById("linkedin").value = data.linkedin || "";
});
