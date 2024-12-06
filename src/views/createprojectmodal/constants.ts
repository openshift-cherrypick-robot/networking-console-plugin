import { t } from '@utils/hooks/useNetworkingTranslation';
import { UserDefinedNetworkRole } from '@utils/resources/udns/types';

import { CreateProjectModalFormState, NETWORK_TYPE } from './types';

export const DESCRIPTION_ANNOTATION = 'openshift.io/description';
export const DISPLAY_NAME_ANNOTATION = 'openshift.io/display-name';

export const networkTypeLabels = {
  [NETWORK_TYPE.POD_NETWORK]: t('Use the default Pod network'),
  [NETWORK_TYPE.UDN]: t('Define a new UserDefinedNetwork for this project'),
  // eslint-disable-next-line perfectionist/sort-objects
  [NETWORK_TYPE.CLUSTER_UDN]: t('Refer an existing ClusterUserDefinedNetwork'),
};

export const initialFormState: CreateProjectModalFormState = {
  networkType: NETWORK_TYPE.POD_NETWORK,
  project: {
    metadata: {
      annotations: {
        [DESCRIPTION_ANNOTATION]: null,
        [DISPLAY_NAME_ANNOTATION]: null,
      },
      name: '',
    },
  },
  udn: {
    apiVersion: 'k8s.ovn.org/v1',
    kind: 'UserDefinedNetwork',
    metadata: {
      name: '',
      namespace: '',
    },
    spec: {
      layer2: {
        ipamLifecycle: 'Persistent',
        role: UserDefinedNetworkRole.Primary,
        subnets: [],
      },
      topology: 'Layer2',
    },
  },
};
