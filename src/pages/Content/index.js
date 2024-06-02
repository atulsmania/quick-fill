const localStorageIdentifier = 'quickfill-shortcuts';
chrome.storage.local.get([localStorageIdentifier], function (e) {
  if (e[localStorageIdentifier]) return;
  chrome.storage.local.set({ [localStorageIdentifier]: [] });
});

function isElementContentEditableOrInput(element) {
  if (element.contentEditable === 'true') {
    return true;
  }

  if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
    if (!element.readOnly) {
      return true;
    }
  }

  return false;
}

const getEditableElement = (target) => {
  while (target && target !== document) {
    if (isElementContentEditableOrInput(target)) return target;
    target = target.parentElement;
  }
  return target;
};

document.addEventListener(
  'focusin',
  (e) => {
    console.log('focused', e.target);
    const editableElement = getEditableElement(e.target);
    console.log('editableElement', editableElement);
    if (!editableElement || editableElement === document) return;
    console.log('add event', editableElement);
    addEventListenerOnce(editableElement, 'input', setInputValue);
  },
  { bubbles: true }
);

let updatedValue;
const setInputValue = (e) => {
  if (e.target.value === updatedValue) return;

  chrome.storage.local.get([localStorageIdentifier], function (data) {
    updatedValue = getUpdatedValue(e.target.value, data[localStorageIdentifier]);
    if (e.target.value === updatedValue) return;
    e.preventDefault();

    const event = new Event('input', { bubbles: true });
    event.target.value = updatedValue;
    e.target.value = updatedValue;
    e.target.dispatchEvent(event);
  });
};

const getUpdatedValue = (inputValue, mappings) => {
  const [key] = inputValue.match(new RegExp(/\.\w+$/g)) ?? [null];
  if (!key) return inputValue;
  if (key) {
    mappings.find((shortcut) => {
      if (`.${shortcut.key}` === key) {
        inputValue = inputValue.replace(key, shortcut.value);
        return true;
      }
      return false;
    });
  }
  return inputValue;
};

const addEventListenerOnce = (element, eventName, listener) => {
  if (!element.__eventListeners) {
    element.__eventListeners = {};
  }
  if (!element.__eventListeners[eventName]) {
    element.__eventListeners[eventName] = [];
  }
  if (!element.__eventListeners[eventName].includes(listener)) {
    element.addEventListener(eventName, listener);
    element.__eventListeners[eventName].push(listener);
  }
};

export const getShortcutsFromStorage = () => {
  let shortcuts = [];
  chrome.storage.local.get([localStorageIdentifier], function (data) {
    shortcuts = data[localStorageIdentifier];
  });
  return shortcuts;
};

export const setShortcutsToStorage = (shortcuts) => {
  chrome.storage.local.set({ [localStorageIdentifier]: shortcuts });
};
