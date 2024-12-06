import React, { FC } from 'react';
import { useParams } from 'react-router-dom-v5-compat';

import { ResourceYAMLEditor } from '@openshift-console/dynamic-plugin-sdk';
import { PageSection, PageSectionVariants, Title } from '@patternfly/react-core';
import { EditorType } from '@utils/components/SyncedEditor/EditorToggle';
import { SyncedEditor } from '@utils/components/SyncedEditor/SyncedEditor';
import { safeYAMLToJS } from '@utils/components/SyncedEditor/yaml';
import { useNetworkingTranslation } from '@utils/hooks/useNetworkingTranslation';

import {
  generateDefaultCUDN,
  generateDefaultUDN,
  LAST_VIEWED_EDITOR_TYPE_USERSETTING_KEY,
} from './utils/constants';
import UserDefinedNetworkForm from './UserDefinedNetworkForm';

const UserDefinedNetworkFormPage: FC = () => {
  const { t } = useNetworkingTranslation();

  const params = useParams();

  return (
    <>
      <PageSection variant={PageSectionVariants.light}>
        <Title headingLevel="h1">
          {params.ns ? t('Create UserDefinedNetwork') : t('Create ClusterUserDefinedNetwork')}
        </Title>
      </PageSection>
      <SyncedEditor
        displayConversionError
        FormEditor={UserDefinedNetworkForm}
        initialData={params.ns ? generateDefaultUDN() : generateDefaultCUDN()}
        initialType={EditorType.Form}
        lastViewUserSettingKey={LAST_VIEWED_EDITOR_TYPE_USERSETTING_KEY}
        YAMLEditor={({ initialYAML = '', onChange }) => (
          <ResourceYAMLEditor
            create
            hideHeader
            initialResource={safeYAMLToJS(initialYAML)}
            onChange={onChange}
          />
        )}
      />
    </>
  );
};

export default UserDefinedNetworkFormPage;
