import React, { useEffect, useMemo } from 'react';
import { getShortcutsFromStorage, setShortcutsToStorage } from '../Content';
import './popup.css';

const Popup = () => {
  const [shortcuts, setShortcuts] = React.useState([]);
  const [inputKey, setInputKey] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');

  useEffect(() => {
    getShortcutsFromStorage(setShortcuts);
  }, []);

  const handleAdd = () => {
    const newShortcuts = [...shortcuts, { key: inputKey, value: inputValue }];
    setShortcuts(newShortcuts);
    setShortcutsToStorage(newShortcuts);
    setInputKey('');
    setInputValue('');
  };

  const isKeyDuplicate = useMemo(() => {
    const keys = shortcuts.map((shortcut) => shortcut.key);
    return keys.includes(inputKey);
  }, [inputKey, shortcuts]);

  const isAddShortcutDisabled = inputKey.length === 0 || inputValue.length === 0 || isKeyDuplicate;

  return (
    <main>
      <div className="header">
        <h4>Add Shortcuts</h4>

        <a href="./shortcuts.html" target="_blank" className="view-shortcuts">
          View Shortcuts
        </a>
      </div>
      <section>
        <input
          value={inputKey}
          type="text"
          placeholder="shortcut key"
          onChange={(e) => setInputKey(e.target.value)}
        />
        <input
          value={inputValue}
          type="text"
          placeholder="shortcut value"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="btn-group">
          <span className="error" style={{ visibility: isKeyDuplicate ? 'visible' : 'hidden' }}>
            Duplicate key found!
          </span>
          <button className="add-shortcut" onClick={handleAdd} disabled={isAddShortcutDisabled}>
            Add
          </button>
        </div>
      </section>
    </main>
  );
};

export default Popup;
