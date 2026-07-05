import './main.js';
import founderAvatar from './assets/founder-avatar.png';

const img = document.getElementById('founder-avatar');
if (img) {
  img.src = founderAvatar;
  img.removeAttribute('data-pending');
}
