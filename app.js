const rsvpButton = document.querySelector('.rsvp-button');
document.querySelectorAll('[data-open]').forEach(button => {
  button.addEventListener('click', () => {
    document.getElementById(button.dataset.open).showModal();
  });
});
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => rsvpButton.focus());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
});

const ceremonyTile = document.querySelector('.ceremony-tile');
let tileHovered = false;
let tilePinned = false;
function updateCeremonyTile() {
  const flipped = tileHovered || tilePinned;
  ceremonyTile.classList.toggle('is-flipped', flipped);
  ceremonyTile.setAttribute('aria-pressed', String(flipped));
}
ceremonyTile.addEventListener('pointerenter', event => {
  if (event.pointerType === 'mouse') { tileHovered = true; updateCeremonyTile(); }
});
ceremonyTile.addEventListener('pointerleave', () => {
  tileHovered = false;
  updateCeremonyTile();
});
ceremonyTile.addEventListener('click', () => {
  tilePinned = !tilePinned;
  updateCeremonyTile();
});
ceremonyTile.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    tileHovered = false;
    tilePinned = false;
    updateCeremonyTile();
  }
});
