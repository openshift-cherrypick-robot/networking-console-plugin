import React, { FC, JSX, PropsWithChildren, Ref, useState } from 'react';

import { Dropdown, DropdownList, MenuToggle, MenuToggleElement } from '@patternfly/react-core';

type SelectProps = PropsWithChildren<{
  id?: string;
  selected: any;
  toggleContent: Element | JSX.Element | string;
}>;

const Select: FC<SelectProps> = ({ children, id, selected, toggleContent }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <Dropdown
      id={id}
      isOpen={isDropdownOpen}
      onOpenChange={setIsDropdownOpen}
      onSelect={() => setIsDropdownOpen(false)}
      selected={selected}
      toggle={(toggleRef: Ref<MenuToggleElement>) => (
        <MenuToggle
          id={`toggle-${id}`}
          isExpanded={isDropdownOpen}
          isFullWidth
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          ref={toggleRef}
        >
          {toggleContent}
        </MenuToggle>
      )}
    >
      <DropdownList>{children}</DropdownList>
    </Dropdown>
  );
};

export default Select;
