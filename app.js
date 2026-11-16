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

document.querySelectorAll('.plan-tile').forEach(tile => {
  const flipButton = tile.querySelector('.tile-flip');
  const mapLink = tile.querySelector('.tile-venue-map');
  let hovered = false;
  let pinned = false;
  function updateTile() {
    const flipped = hovered || pinned;
    tile.classList.toggle('is-flipped', flipped);
    flipButton.setAttribute('aria-pressed', String(flipped));
    if (mapLink) mapLink.tabIndex = flipped ? 0 : -1;
    tile.querySelector('.plan-tile-back').setAttribute('aria-hidden', String(!flipped));
  }
  tile.addEventListener('pointerenter', event => {
    if (event.pointerType === 'mouse') { hovered = true; updateTile(); }
  });
  tile.addEventListener('pointerleave', () => { hovered = false; updateTile(); });
  tile.addEventListener('click', event => {
    if (event.target.closest('a')) return;
    pinned = !pinned;
    updateTile();
  });
  tile.addEventListener('keydown', event => {
    if (event.key === 'Escape') { hovered = false; pinned = false; updateTile(); }
  });
});
