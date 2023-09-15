function toggleMode(liElement) {
  if (liElement.classList.contains('moved')) {
    liElement.classList.remove('moved');
    liElement.classList.add('light');
  } else {
    liElement.classList.remove('light');
    liElement.classList.add('moved');
  }
}