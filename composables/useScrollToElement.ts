export const useScrollToElement = (scrollTarget: HTMLElement | null) => {
  if (scrollTarget === null) return;

  scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
