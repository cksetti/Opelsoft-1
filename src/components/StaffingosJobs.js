'use client';

import { useEffect } from 'react';

/*
  Live jobs from the recruiting dashboard. The widget finds the container by its
  data-staffingos-jobs attribute and renders the grid into a Shadow DOM, so page
  CSS neither styles it nor breaks it. Apply is an in-page modal.

  ponytail: the script is appended per-mount rather than via next/script on
  purpose. The deployed widget.js mounts from an IIFE with no global handle to
  re-run, and next/script loads a given src once per document - so on a
  client-side return to /jobs (Find Jobs -> About -> Find Jobs) the container is
  new but nothing re-mounts it and the section renders blank. A fresh script
  element re-executes even when cached; widget.js guards with data-sos-init, so
  a double mount is a no-op.

  The dashboard now exposes an idempotent window.StaffingOSJobs.mount(), which
  would let this be a plain next/script plus a mount() call on mount. Do NOT
  switch until that build is live on Cloud Run - the global does not exist in
  production yet.
*/
export default function StaffingosJobs() {
  useEffect(() => {
    const s = document.createElement('script');
    s.src = `${process.env.NEXT_PUBLIC_STAFFINGOS_ORIGIN}/widget.js`;
    s.async = true;
    document.body.appendChild(s);
    return () => s.remove();
  }, []);

  return <div data-staffingos-jobs data-site="opelsoft" />;
}
