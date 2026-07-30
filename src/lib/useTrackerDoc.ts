import { useEffect, useRef, useState } from 'react';
import { loadDoc, saveDoc } from './db';

export type SaveStatus = 'idle' | 'saving' | 'saved';

/**
 * Loads a per-student document and autosaves (debounced) whenever it changes.
 * Returns the value, a setter, and a save status for a "Saved ✓" indicator.
 */
export function useTrackerDoc<T>(
  userId: string,
  docKey: string,
  fallback: T,
): [T, (next: T) => void, SaveStatus] {
  const [value, setValue] = useState<T>(fallback);
  const [status, setStatus] = useState<SaveStatus>('idle');
  const loadedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load once per (user, key).
  useEffect(() => {
    let active = true;
    loadedRef.current = false;
    loadDoc<T>(userId, docKey, fallback).then((doc) => {
      if (!active) return;
      setValue(doc);
      loadedRef.current = true;
    });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, docKey]);

  const update = (next: T) => {
    setValue(next);
    if (!loadedRef.current) return;
    setStatus('saving');
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      void saveDoc(userId, docKey, next).then(() => {
        setStatus('saved');
      });
    }, 600);
  };

  return [value, update, status];
}
