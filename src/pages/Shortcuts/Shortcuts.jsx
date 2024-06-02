import React, { useEffect, useState } from 'react';
import Table from '../../components/Table';
import { getShortcutsFromStorage, setShortcutsToStorage } from '../Content';

const Shortcuts = () => {
  const [shortcuts, setShortcuts] = useState([]);

  useEffect(() => {
    const data = getShortcutsFromStorage();
    if (!data?.length) return;
    setShortcuts(data);
  }, []);

  const handleDelete = (shortcutKey) => {
    const newShortcuts = shortcuts.filter((shortcut) => shortcut.key !== shortcutKey);
    setShortcuts(newShortcuts);
    setShortcutsToStorage(newShortcuts);
  };

  return (
    <div className="container">
      <h1>Your Shortcuts</h1>
      <Table list={shortcuts} handleDelete={handleDelete} />
    </div>
  );
};

export default Shortcuts;
