import {
  type AcademicProfile,
  EMPTY_ACADEMICS,
  satTotal,
} from '../lib/trackerConfig';
import './AcademicsPanel.css';

interface AcademicsPanelProps {
  value: AcademicProfile;
  /** Omit (or pass readOnly) to render a non-editable view for admins/mentors. */
  onChange?: (next: AcademicProfile) => void;
  readOnly?: boolean;
}

/**
 * Editable-or-read-only academic snapshot: SAT section scores + computed total,
 * weighted/unweighted GPA, and intended majors. Shared by the student Dashboard
 * (editable) and the Admin viewer (read-only) so the layout stays identical.
 */
export default function AcademicsPanel({
  value,
  onChange,
  readOnly,
}: AcademicsPanelProps) {
  const v = value ?? EMPTY_ACADEMICS;
  const total = satTotal(v);
  const set = (patch: Partial<AcademicProfile>) =>
    onChange?.({ ...v, ...patch });

  const numProps = {
    inputMode: 'numeric' as const,
    className: 'acad-input',
    readOnly,
    disabled: readOnly,
  };

  return (
    <div className="acad">
      <div className="acad-group">
        <h3>SAT</h3>
        <div className="acad-grid">
          <label className="acad-field">
            <span>Reading &amp; Writing (EBRW)</span>
            <input
              {...numProps}
              value={v.satEBRW}
              placeholder="e.g. 650"
              onChange={(e) => set({ satEBRW: e.target.value })}
            />
          </label>
          <label className="acad-field">
            <span>Math</span>
            <input
              {...numProps}
              value={v.satMath}
              placeholder="e.g. 700"
              onChange={(e) => set({ satMath: e.target.value })}
            />
          </label>
          <div className="acad-field acad-total">
            <span>Total</span>
            <div className="acad-total-value">
              {total === null ? '—' : total}
              <small> / 1600</small>
            </div>
          </div>
        </div>
      </div>

      <div className="acad-group">
        <h3>GPA</h3>
        <div className="acad-grid">
          <label className="acad-field">
            <span>Unweighted</span>
            <input
              {...numProps}
              value={v.gpaUnweighted}
              placeholder="e.g. 3.8"
              onChange={(e) => set({ gpaUnweighted: e.target.value })}
            />
          </label>
          <label className="acad-field">
            <span>Weighted</span>
            <input
              {...numProps}
              value={v.gpaWeighted}
              placeholder="e.g. 4.3"
              onChange={(e) => set({ gpaWeighted: e.target.value })}
            />
          </label>
        </div>
      </div>

      <div className="acad-group">
        <h3>Areas of interest / intended majors</h3>
        <textarea
          className="acad-textarea"
          value={v.majors}
          readOnly={readOnly}
          disabled={readOnly}
          rows={3}
          placeholder="e.g. Computer Science, Biology (pre-med), Economics"
          onChange={(e) => set({ majors: e.target.value })}
        />
      </div>
    </div>
  );
}
