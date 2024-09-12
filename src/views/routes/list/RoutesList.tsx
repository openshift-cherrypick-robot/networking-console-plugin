import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom-v5-compat';

import { modelToGroupVersionKind, RouteModel } from '@kubevirt-ui/kubevirt-api/console';
import {
  ListPageBody,
  ListPageCreateButton,
  ListPageFilter,
  ListPageHeader,
  useK8sWatchResource,
  useListPageFilter,
  VirtualizedTable,
} from '@openshift-console/dynamic-plugin-sdk';
import ListEmptyState from '@utils/components/ListEmptyState/ListEmptyState';
import { DEFAULT_NAMESPACE } from '@utils/constants';
import { SHARED_DEFAULT_PATH_NEW_RESOURCE_FORM } from '@utils/constants/ui';
import { useNetworkingTranslation } from '@utils/hooks/useNetworkingTranslation';
import { resourcePathFromModel } from '@utils/resources/shared';
import { RouteKind } from '@utils/types';
import RouteRow from '@views/routes/list/components/RouteRow';
import useRouteColumns from '@views/routes/list/hooks/useRouteColumns';

type RoutesListProps = {
  namespace: string;
};

const RoutesList: FC<RoutesListProps> = ({ namespace }) => {
  const { t } = useNetworkingTranslation();
  const navigate = useNavigate();

  const [routes, loaded, loadError] = useK8sWatchResource<RouteKind[]>({
    groupVersionKind: modelToGroupVersionKind(RouteModel),
    isList: true,
    namespace,
  });
  const [data, filteredData, onFilterChange] = useListPageFilter(routes);
  const columns = useRouteColumns();
  const title = t('Routes');

  return (
    <ListEmptyState<RouteKind>
      createButtonlink={SHARED_DEFAULT_PATH_NEW_RESOURCE_FORM}
      data={routes}
      error={loadError}
      kind={RouteModel.kind}
      learnMoreLink="https://docs.redhat.com/en/documentation/openshift_container_platform/4.16/html/networking/configuring-routes"
      loaded={loaded}
      title={title}
    >
      <ListPageHeader title={title}>
        <ListPageCreateButton
          className="list-page-create-button-margin"
          createAccessReview={{
            groupVersionKind: modelToGroupVersionKind(RouteModel),
            namespace,
          }}
          onClick={() =>
            navigate(
              `${resourcePathFromModel(
                RouteModel,
                null,
                namespace || DEFAULT_NAMESPACE,
              )}/${SHARED_DEFAULT_PATH_NEW_RESOURCE_FORM}`,
            )
          }
        >
          {t('Create Route')}
        </ListPageCreateButton>
      </ListPageHeader>
      <ListPageBody>
        <ListPageFilter data={data} loaded={loaded} onFilterChange={onFilterChange} />
        <VirtualizedTable<RouteKind>
          columns={columns}
          data={filteredData}
          loaded={loaded}
          loadError={loadError}
          Row={RouteRow}
          unfilteredData={data}
        />
      </ListPageBody>
    </ListEmptyState>
  );
};

export default RoutesList;
