import setImmediate, { clearImmediate } from './setImmediate';

import ReusableLazyPromise from './utils/reusableLazyPromise';

const every = (fn, time = 0, iterations = Infinity) => {
  const rPromise = new ReusableLazyPromise(res => {
    const timerID = setInterval(
      _ => iterations-- > 0 ? fn() : (rPromise.stop() & res()), time
    );

    rPromise.stop = _ => clearInterval(timerID);
  });

  const rPromiseThen = (...args) => rPromise.then(...args) && rPromise;

  rPromise.done = rPromiseThen;
  rPromise.run = rPromiseThen;

  return rPromise;
}

export default every;
