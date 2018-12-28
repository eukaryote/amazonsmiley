(function() {
  let STORE = chrome.storage.local;

  function getOption() {
    return document.querySelector("#disableInPrivateMode");
  }

  function save(e) {
    e.preventDefault();
    let disabled = !!getOption().checked;
    STORE.set({
      disableInPrivateMode: disabled
    });
    chrome.runtime.sendMessage(null, { "disableInPrivateMode": disabled });
  }

  function restore() {
    STORE.get("disableInPrivateMode", function(result) {
      let disabled = !!result.disableInPrivateMode;
      getOption().checked = disabled;
    });
  }

  document.addEventListener("DOMContentLoaded", restore);
  getOption().addEventListener("change", save);

}());
