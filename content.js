(function () {
  function setValue(fieldKeywords, value) {
    if (!value) return;

    let lowerCaseKeywords = fieldKeywords.map((keyword) =>
      keyword.toLowerCase()
    );

    let el = [...document.querySelectorAll("input")].find((el) =>
      elementContainsKeyword(el, lowerCaseKeywords)
    );

    if (el) {
      console.log("✅ Found matching field:", el);

      el.focus();
      el.click();

      let nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      ).set;
      nativeInputValueSetter.call(el, value);

      el.dispatchEvent(new Event("input", { bubbles: true }));
      el.dispatchEvent(new Event("change", { bubbles: true }));

      setTimeout(() => {
        el.value += " ";
        el.value = el.value.trim();
        el.dispatchEvent(new Event("input", { bubbles: true }));
        el.dispatchEvent(new Event("change", { bubbles: true }));
      }, 100);
    } else {
      // console.log("No matching input field found for:", fieldKeywords);
    }
  }

  function elementContainsKeyword(el, keywords) {
    for (let attr of el.attributes) {
      let attrValue = attr.value.toLowerCase();
      if (keywords.some((keyword) => attrValue.includes(keyword))) {
        return true;
      }
    }
    return false;
  }

  function fillForm() {
    console.log("🔍 Searching for inputs on the page...");

    let inputs = document.querySelectorAll("input");
    if (inputs.length > 0) {
      chrome.storage.sync.get(null, (data) => {
        setValue(["first_name", "firstName"], data.first_name);
        setValue(["last_name", "lastName"], data.last_name);
        setValue(["email"], data.email);
        setValue(["phone"], data.phone);
        setValue(["address","street"], data.street);
        setValue(["city"], data.city);
        setValue(["state"], data.state);
        setValue(["postal"], data.postal);
        setValue(["country"], data.country);
        setValue(["linkedin"], data.linkedin);

        alert("Job application form filled!");
      });
    } else {
      console.log("❌ No inputs found on the page.");
    }
  }

  fillForm();
})();
