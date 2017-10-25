const adapterState = {
  eventHandlerMap: {},
};

export const STORAGE_SLICE = '@flopflip';

const storage = {
  get: key => JSON.parse(localStorage.getItem(`${STORAGE_SLICE}__${key}`)),
  set: (key, value) => {
    try {
      localStorage.setItem(`${STORAGE_SLICE}__${key}`, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  },
  unset: key => localStorage.removeItem(`${STORAGE_SLICE}__${key}`),
};
export const updateFlags = flags => {
  storage.set('flags', flags);

  adapterState.eventHandlerMap['onFlagsStateChange'](flags);
};

const subscribeToFlagsChanges = () => {
  setInterval(() => {
    adapterState.eventHandlerMap['onFlagsStateChange'](storage.get('flags'));
  }, 1000);
};

const configure = ({ user, onFlagsStateChange, onStatusStateChange }) => {
  adapterState.user = user;

  return Promise.resolve().then(() => {
    adapterState.isConfigured = true;
    adapterState.isReady = true;

    adapterState.eventHandlerMap['onFlagsStateChange'] = onFlagsStateChange;
    adapterState.eventHandlerMap['onStatusStateChange'] = onStatusStateChange;

    onStatusStateChange({ isReady: adapterState.isReady });
    onFlagsStateChange(storage.get('flags'));

    subscribeToFlagsChanges();
  });
};

const reconfigure = ({ user }) => {
  storage.unset('flags');

  return Promise.resolve();
};
export default {
  configure,
  reconfigure,
};
