import React from 'react';
import './index.css';

type TableProps = {
  list: { key: string; value: string }[];
  handleEdit: (shortcutKey: string) => void;
  handleDelete: (shortcutKey: string) => void;
};

const Table = (props: TableProps) => {
  const { list, handleDelete } = props;

  return (
    <table className="shortcut-table">
      <thead>
        <tr>
          <th className="key">Shortcut Key</th>
          <th className="value">Value</th>
          <th className="action"></th>
        </tr>
      </thead>
      <tbody>
        {list.length === 0 && (
          <tr>
            <td className="no-shortcuts" colSpan={3}>
              No shortcuts added yet
            </td>
          </tr>
        )}
        {list.map((shortcut, index) => (
          <tr key={index}>
            <td>{shortcut.key}</td>
            <td>{shortcut.value}</td>
            <td>
              <button className="edit-btn" onClick={() => handleDelete(shortcut.key)}>
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
