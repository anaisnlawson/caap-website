import { useId } from 'react';
import './SpreadsheetGrid.css';

export interface GridColumn {
  key: string;
  label: string;
  width?: string;
  /** Render this column as a dropdown with the given options. */
  options?: string[];
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
}

function newId(): string {
  return `row-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function SpreadsheetGrid({
  columns,
  rows,
  onChange,
  addLabel = 'Add row',
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
              <th className="grid-actions-col" aria-label="Actions"></th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td className="grid-empty" colSpan={columns.length + 1}>
                  No rows yet. Click “{addLabel}” to get started.
                </td>
              </tr>
            )}
            {rows.map((row) => (
              <tr key={row.id}>
                {columns.map((col) => (
                  <td key={col.key}>
                    {col.options ? (
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
                        placeholder="—"
                        onChange={(e) =>
                          updateCell(row.id, col.key, e.target.value)
                        }
                      />
                    )}
                  </td>
                ))}
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="grid-add" onClick={addRow}>
        + {addLabel}
      </button>
    </div>
  );
}
