export {
  removeAllOptions,
  appendFilteredOptions,
  defaultLabels,
  muted,
  setElementsAvailibilty,
  toastUser,
};

// Helper Functions
function removeAllOptions(parent) {
  while (parent.lastChild && parent.length > 1) {
    parent.removeChild(parent.lastChild);
  }
}
function appendFilteredOptions(options, optionsElem, category) {
  const filteredOptions = options.filter(
    (option) => option.category == category
  );
  for (const activity of filteredOptions) {
    const newOption = new Option(activity.name, activity.id);
    optionsElem.appendChild(newOption);
  }
}
function defaultLabels(...labels) {
  for (const label of labels) {
    label.innerHTML = `No ${label.id} here 😠  First select an activity...`;
  }
}

function muted(option, ...labels) {
  for (const label of labels) {
    label.classList[option]("text-muted");
  }
}

function setElementsAvailibilty(location, bool) {
  document.querySelectorAll(location).forEach((element) => {
    element.required = bool;
  });
}

function toastUser(toastElement,msg) {
  toastMsg.innerHTML = msg;
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastElement);
  toastBootstrap.show();
}
