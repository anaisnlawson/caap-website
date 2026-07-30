import { useId } from 'react';
import './SpreadsheetGrid.css';

export interface GridColumn {
  key: string;
  label: string;
  width?: string;
  /** Render this column as a dropdown with the given options. */
  options?: string[];
  /** Render this column's value as a clickable link (e.g. a Google Doc URL). */
  isLink?: boolean;
  /** Placeholder text shown in the editable input. */
  placeholder?: string;
}

export interface GridRow {
  id: string;
  [key: string]: string;
}

interface SpreadsheetGridProps {
  columns: GridColumn[];
  rows: GridRow[];
  onChange: (rows: GridRow[]) => void;
  addLabel?: string;
  /** When true, the grid is view-only: no editing, adding, or deleting. */
  readOnly?: boolean;
}

function newId(): string {
  return `row-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Make a user-pasted link safe to use as an href (default to https://). */
function toHref(value: string): string {
  const v = value.trim();
  if (/^https?:\/\//i.test(v)) return v;
  return `https://${v}`;
}

export default function SpreadsheetGrid({
  columns,
  rows,
  onChange,
  addLabel = 'Add row',
  readOnly = false,
}: SpreadsheetGridProps) {
  const tableId = useId();

  const updateCell = (rowId: string, key: string, value: string) => {
    onChange(
      rows.map((r) => (r.id === rowId ? { ...r, [key]: value } : r)),
    );
  };

  const addRow = () => {
    const blank: GridRow = { id: newId() };
    for (const col of columns) blank[col.key] = '';
    onChange([...rows, blank]);
  };

  const deleteRow = (rowId: string) => {
    onChange(rows.filter((r) => r.id !== rowId));
  };

  return (
    <div className="grid-wrap">
      <div className="grid-scroll">
        <table className="grid-table" aria-labelledby={tableId}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key} style={col.width ? { width: col.width } : undefined}>
                  {col.label}
                </th>
              ))}
              {!readOnly && <th className="grid-actions-col" aria-label="Actions"></th>}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td className="grid-empty" colSpan={columns.length + (readOnly ? 0 : 1)}>
                  {readOnly
                    ? 'No entries yet.'
                    : `No rows yet. Click “${addLabel}” to get started.`}
                </td>
              </tr>
            )}
            {rows.map((row) => (
              <tr key={row.id}>
                {columns.map((col) => (
                  <td key={col.key}>
                    {readOnly ? (
                      col.isLink && row[col.key] ? (
                        <a
                          className="grid-link"
                          href={toHref(row[col.key])}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Open link ↗
                        </a>
                      ) : (
                        <span className="grid-readonly">{row[col.key] || '—'}</span>
                      )
                    ) : col.options ? (
                      <select
                        className="grid-select"
                        value={row[col.key] ?? ''}
                        onChange={(e) =>
                          updateCell(row.id, col.key, e.target.value)
                        }
                      >
                        <option value=""></option>
                        {col.options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        className="grid-input"
                        value={row[col.key] ?? ''}
                        placeholder={col.placeholder ?? '—'}
                        onChange={(e) =>
                          updateCell(row.id, col.key, e.target.value)
                        }
                      />
                    )}
                  </td>
                ))}
                {!readOnly && (
                  <td className="grid-actions-col">
                    <button
                      className="grid-delete"
                      title="Delete row"
                      aria-label="Delete row"
                      onClick={() => deleteRow(row.id)}
                    >
                      ×
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!readOnly && (
        <button className="grid-add" onClick={addRow}>
          + {addLabel}
        </button>
      )}
    </div>
  );
}
