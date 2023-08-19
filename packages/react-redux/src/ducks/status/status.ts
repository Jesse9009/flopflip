import { selectAdapterConfigurationStatus } from '@flopflip/react';
import {
  type TAdapterIdentifiers,
  type TAdaptersStatus,
  type TAdapterStatusChange,
} from '@flopflip/types';

import { STATE_SLICE } from '../../store/constants';
import type { TState } from '../../types';
import type { TUpdateStatusAction } from './types';

// Actions
export const UPDATE_STATUS = '@flopflip/status/update';

const initialState = {};

// Reducer
const reducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state: TAdaptersStatus = initialState,
  action: TUpdateStatusAction
): TAdaptersStatus => {
  switch (action.type) {
    case UPDATE_STATUS:
      if (action.payload.id) {
        return {
          ...state,
          [action.payload.id]: {
            ...state?.[action.payload.id],
            ...action.payload.status,
          },
        };
      }

      return {
        ...state,
        ...Object.fromEntries(
          action.payload.adapterIdentifiers.map(
            (adapterInterfaceIdentifier) => [
              adapterInterfaceIdentifier,
              {
                ...state?.[adapterInterfaceIdentifier],
                ...action.payload.status,
              },
            ]
          )
        ),
      };

    default:
      return state;
  }
};

export default reducer;

// Action Creators
export const updateStatus = (
  statusChange: TAdapterStatusChange,
  adapterIdentifiers: TAdapterIdentifiers[]
): TUpdateStatusAction => ({
  type: UPDATE_STATUS,
  payload: { ...statusChange, adapterIdentifiers },
});
// Selectors
export const selectStatus = (state: TState) => {
  const { status } = state[STATE_SLICE];

  return selectAdapterConfigurationStatus(status);
};
