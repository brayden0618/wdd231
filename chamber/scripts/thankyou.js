document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const required = [
    ['First Name', 'firstName'],
    ['Last Name', 'lastName'],
    ['Email', 'email'],
    ['Mobile', 'mobile'],
    ['Business/Organization', 'organization'],
    ['Timestamp', 'timestamp']
  ];

  const dl = document.getElementById('submission');
  if (!dl) return;

  required.forEach(([label, key]) => {
    const val = params.get(key) || '(not provided)';
    const dt = document.createElement('dt');
    dt.textContent = label;
    const dd = document.createElement('dd');
    dd.textContent = val;
    dl.appendChild(dt);
    dl.appendChild(dd);
  });
});