import elementReady from 'element-ready';

export async function ready() {
  if (window.document.readyState === 'interactive' || document.readyState === 'complete') {
    return Promise.resolve();
  }

  document.addEventListener('DOMContentLoaded', () => {
    return Promise.resolve();
  }, {
    capture: true,
    once: true,
    passive: true,
  });
}

export async function observeElement(el, listener = (() => {}), config = {childList: true}) {
  if (!el) {
    return;
  }

  el = await select(el);

  if (el) {
    listener([]);

    const observer = new MutationObserver(listener);
    observer.observe(el, config);

    return observer;
  }
}

export async function select(selector, parent) {
  if (arguments.length === 2 && !parent) {
    return null;
  }

  return (parent || window.document).querySelector(selector);
}

export async function safeElementReady(selector) {
  const waiting = elementReady(selector);

  await ready();

  requestAnimationFrame(() => waiting.cancel());
  return waiting.catch(() => null);
}
