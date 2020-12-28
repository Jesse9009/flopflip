import type { TFlagName, TFlagVariation } from '@flopflip/types';

import { useDebugValue } from 'react';
import { useSelector } from 'react-redux';
import { getIsFeatureEnabled, useAdapterContext } from '@flopflip/react';
import { selectFlags } from '../../ducks/flags';

export default function useFeatureToggle(
  flagName: TFlagName,
  flagVariation: TFlagVariation = true
) {
  const adapterContext = useAdapterContext();
  const allFlags = useSelector(selectFlags());

  const isFeatureEnabled: boolean = getIsFeatureEnabled(
    adapterContext.adapterInterfaceIdentifiers,
    flagName,
    flagVariation
  )(allFlags);

  useDebugValue({
    flagName,
    flagVariation,
    isEnabled: isFeatureEnabled,
  });

  return isFeatureEnabled;
}
