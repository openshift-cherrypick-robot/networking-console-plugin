import React, { FC } from 'react';
import classNames from 'classnames';

import { NamespaceModel, RouteModel, ServiceModel } from '@kubevirt-ui/kubevirt-api/console';
import {
  getGroupVersionKindForModel,
  ResourceLink,
  RowProps,
  TableData,
} from '@openshift-console/dynamic-plugin-sdk';
import { getName, getNamespace } from '@utils/resources/shared';
import { RouteKind } from '@utils/types';
import RouteActions from '@views/routes/actions/RouteActions';
import RouteLocation from '@views/routes/list/components/RouteLocation';
import RouteStatus from '@views/routes/list/components/RouteStatus';
import { tableColumnClasses } from '@views/routes/list/hooks/useRouteColumns';

type RouteRowProps = RowProps<RouteKind>;

const RouteRow: FC<RouteRowProps> = ({ activeColumnIDs, obj: route }) => {
  const name = getName(route);
  const namespace = getNamespace(route);

  return (
    <>
      <TableData activeColumnIDs={activeColumnIDs} className={tableColumnClasses[0]} id="name">
        <ResourceLink
          groupVersionKind={getGroupVersionKindForModel(RouteModel)}
          name={getName(route)}
          namespace={name}
        />
      </TableData>
      <TableData
        activeColumnIDs={activeColumnIDs}
        className={classNames(tableColumnClasses[1], 'co-break-word')}
        id="namespace"
      >
        <ResourceLink
          groupVersionKind={getGroupVersionKindForModel(NamespaceModel)}
          name={namespace}
        />
      </TableData>
      <TableData activeColumnIDs={activeColumnIDs} className={tableColumnClasses[2]} id="status">
        <RouteStatus route={route} />
      </TableData>
      <TableData
        activeColumnIDs={activeColumnIDs}
        className={classNames(tableColumnClasses[3], 'co-break-word')}
        id="location"
      >
        <RouteLocation route={route} />
      </TableData>
      <TableData activeColumnIDs={activeColumnIDs} className={tableColumnClasses[4]} id="service">
        <ResourceLink
          groupVersionKind={getGroupVersionKindForModel(ServiceModel)}
          name={route.spec.to.name}
          namespace={namespace}
          title={route.spec.to.name}
        />
      </TableData>
      <TableData activeColumnIDs={activeColumnIDs} className={tableColumnClasses[5]} id="">
        <RouteActions isKebabToggle route={route} />
      </TableData>
    </>
  );
};

export default RouteRow;
