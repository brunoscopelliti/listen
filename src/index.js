
/**
 * Register event listener.
 * @name listen
 * 
 * @param {String} eventName
 * @param {Element} target
 * @param {Function} fn
 * @param {Object} options
 */
const listen = (eventName, target, fn, options = {}) => {

  const { useCapture = false } = options;

  const cancelListener = () => {
    target.removeEventListener(eventName, handler, useCapture);
  };

  const handler = options.once ? once(fn, cancelListener) : fn;

  target.addEventListener(eventName, handler, useCapture);

  return cancelListener;
};

export default listen;

/**
 * @name once
 * @private
 */
function once(fn, cancel) {
  return function(...args) {
    cancel();
    fn.apply(this, args);
  }
};
