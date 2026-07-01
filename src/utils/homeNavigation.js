export const getHashId = (to) => {
  if (!to) return '';
  if (to.startsWith('/#')) return to.slice(2);
  if (to.startsWith('#')) return to.slice(1);
  return '';
};

export const scrollToSection = (id, behavior = 'smooth') => {
  if (!id) return false;
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior });
  window.history.replaceState(null, '', `/#${id}`);
  return true;
};

export const navigateToHomeSection = (navigate, location, sectionId) => {
  if (!sectionId) return;
  if (location.pathname === '/') {
    scrollToSection(sectionId);
  } else {
    navigate('/', { state: { scrollTo: sectionId } });
  }
};
