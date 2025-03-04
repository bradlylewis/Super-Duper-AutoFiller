(function() {
  function setValue(field, value) {
      var el = document.querySelector(`[name='${field}']`) || document.querySelector(`#${field}`);
      if (el && value) {
          let nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
          nativeInputValueSetter.call(el, value);
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
      }
  }

  chrome.storage.sync.get(null, (data) => {
      setValue("first_name", data.first_name);
      setValue("last_name", data.last_name);
      setValue("email", data.email);
      setValue("phone", data.phone);
      setValue("address", data.address);
      setValue("linkedin", data.linkedin);

      alert("Job application form filled!");
  });
})();
