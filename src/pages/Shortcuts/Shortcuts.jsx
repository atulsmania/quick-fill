import React, { useEffect, useRef, useState } from 'react';
import Table from '../../components/Table';
import { getShortcutsFromStorage, setShortcutsToStorage } from '../Content';

const Shortcuts = () => {
  const [shortcuts, setShortcuts] = useState([]);
  const [inputKey, setInputKey] = useState('');
  const [inputValue, setInputValue] = useState('');
  const editingShortcutKey = useRef(null);

  useEffect(() => {
    getShortcutsFromStorage(setShortcuts);
  }, []);

  const handleDelete = (shortcutKey) => {
    const newShortcuts = shortcuts.filter((shortcut) => shortcut.key !== shortcutKey);
    setShortcuts(newShortcuts);
    setShortcutsToStorage(newShortcuts);
  };

  const handleEdit = (shortcutKey) => {
    editingShortcutKey.current = shortcutKey;
    setInputKey(shortcutKey);
    setInputValue(shortcuts.find((shortcut) => shortcut.key === shortcutKey).value || '');
    document.getElementById('edit_modal').showModal();
  };

  const handleUpdateShortcut = () => {
    const newShortcuts = shortcuts.map((shortcut) => {
      if (shortcut.key === editingShortcutKey.current) {
        return { key: inputKey, value: inputValue };
      }
      return shortcut;
    });
    setShortcuts(newShortcuts);
    setShortcutsToStorage(newShortcuts);
    document.getElementById('edit_modal').close();
  };

  return (
    <div className="container py-6 mx-auto">
      <h1 className="px-4 text-4xl font-semibold text-center">Your Shortcuts</h1>
      <Table list={shortcuts} handleDelete={handleDelete} handleEdit={handleEdit} />

      <dialog id="edit_modal" className="modal">
        <div className="flex flex-col gap-4 modal-box">
          <input
            type="text"
            onChange={(e) => setInputKey(e.target.value)}
            value={inputKey}
            className="w-full input input-bordered"
          />
          <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            className="w-full input input-bordered"
          />
          <div className="flex justify-end gap-4">
            <form method="dialog">
              <button className="btn btn-default">Cancel</button>
            </form>
            <button onClick={handleUpdateShortcut} className="btn btn-neutral">
              Save
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Shortcuts;
