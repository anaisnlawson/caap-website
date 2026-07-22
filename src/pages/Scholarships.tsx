import { useMemo, useState } from 'react';
import {
  scholarships,
  IDENTITIES,
  INCOME_OPTIONS,
  BASIS_OPTIONS,
  type Identity,
  type Income,
  type Basis,
} from '../data/scholarships';
import './Scholarships.css';

export default function Scholarships() {
  const [search, setSearch] = useState('');
  const [identity, setIdentity] = useState<Identity | 'all'>('all');
  const [income, setIncome] = useState<Income | 'all'>('all');
  const [basis, setBasis] = useState<Basis | 'all'>('all');
  const [meritOnly, setMeritOnly] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return scholarships.filter((s) => {
      const matchesSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.provider.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        (s.field ?? '').toLowerCase().includes(q);

      const matchesIdentity =
        identity === 'all' || s.identities.includes(identity);

      const matchesIncome = income === 'all' || s.income === income;

      const matchesBasis = basis === 'all' || s.basis === basis;

      // Merit-based awards that don't require a specific income.
      const matchesMerit =
        !meritOnly ||
        (s.income === 'No income requirement' && s.basis === 'Merit-based');

      return (
        matchesSearch &&
        matchesIdentity &&
        matchesIncome &&
        matchesBasis &&
        matchesMerit
      );
    });
  }, [search, identity, income, basis, meritOnly]);

  const resetFilters = () => {
    setSearch('');
    setIdentity('all');
    setIncome('all');
    setBasis('all');
    setMeritOnly(false);
  };

  const badgeClass = (b: Basis) =>
    b === 'Merit-based'
      ? 'badge badge-merit'
      : b === 'Need-based'
        ? 'badge badge-need'
        : 'badge badge-both';

  return (
    <div className="scholarships-page">
      <section className="sch-hero">
        <h1>Scholarship Finder 🎓</h1>
        <p className="sch-subtitle">
          Search scholarships for Black &amp; Brown students by identity, income
          level, or find merit-based awards with no income requirement.
        </p>
      </section>

      <div className="sch-filters">
        <input
          type="search"
          className="sch-search"
          placeholder="Search by name, provider, or field (e.g. STEM, nursing)…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="sch-selects">
          <label className="sch-field">
            <span>Race / Identity</span>
            <select
              value={identity}
              onChange={(e) => setIdentity(e.target.value as Identity | 'all')}
            >
              <option value="all">All identities</option>
              {IDENTITIES.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </label>

          <label className="sch-field">
            <span>Income level</span>
            <select
              value={income}
              onChange={(e) => setIncome(e.target.value as Income | 'all')}
              disabled={meritOnly}
            >
              <option value="all">Any income</option>
              {INCOME_OPTIONS.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </label>

          <label className="sch-field">
            <span>Award basis</span>
            <select
              value={basis}
              onChange={(e) => setBasis(e.target.value as Basis | 'all')}
              disabled={meritOnly}
            >
              <option value="all">Any basis</option>
              {BASIS_OPTIONS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="sch-toggle-row">
          <label className="sch-toggle">
            <input
              type="checkbox"
              checked={meritOnly}
              onChange={(e) => setMeritOnly(e.target.checked)}
            />
            <span>Merit-based only (no income requirement)</span>
          </label>
          <button className="sch-reset" onClick={resetFilters} type="button">
            Reset filters
          </button>
        </div>
      </div>

      <p className="sch-count">
        {filtered.length} scholarship{filtered.length === 1 ? '' : 's'} found
      </p>

      <div className="sch-grid">
        {filtered.map((s) => (
          <article className="sch-card" key={s.name}>
            <div className="sch-card-head">
              <h2>{s.name}</h2>
              <span className={badgeClass(s.basis)}>{s.basis}</span>
            </div>
            <p className="sch-provider">{s.provider}</p>
            <p className="sch-desc">{s.description}</p>

            <ul className="sch-meta">
              <li>
                <strong>Award:</strong> {s.amount}
              </li>
              <li>
                <strong>Deadline:</strong> {s.deadline}
              </li>
              <li>
                <strong>Income:</strong> {s.income}
              </li>
              {s.field && (
                <li>
                  <strong>Field:</strong> {s.field}
                </li>
              )}
            </ul>

            <div className="sch-tags">
              {s.identities.map((i) => (
                <span className="sch-tag" key={i}>
                  {i}
                </span>
              ))}
            </div>

            <a
              className="sch-link"
              href={s.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply / Learn more →
            </a>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="sch-empty">
          No scholarships match your filters. Try broadening your search or{' '}
          <button className="sch-linkbtn" onClick={resetFilters} type="button">
            reset the filters
          </button>
          .
        </p>
      )}

      <p className="sch-disclaimer">
        ⚠️ Amounts and deadlines change every cycle — always confirm details on
        the official scholarship website before applying. Filing the FAFSA
        (opens Oct 1) unlocks most need-based awards.
      </p>
    </div>
  );
}
