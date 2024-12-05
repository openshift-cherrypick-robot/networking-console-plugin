import { SelectOptionProps } from '@patternfly/react-core';

export const filterOptions = (options: SelectOptionProps[], inputValue: string) =>
  options?.filter((menuItem) =>
    String(menuItem.value).toLowerCase().includes(inputValue.toLowerCase()),
  );

export const handleMenuArrowKeys = (
  key: string,
  focusedItemIndex: null | number,
  selectOptions: SelectOptionProps[],
): null | number => {
  if (key === 'ArrowUp') {
    // When no index is set or at the first index, focus to the last, otherwise decrement focus index
    if (focusedItemIndex === null || focusedItemIndex === 0) {
      return selectOptions.length - 1;
    }

    return focusedItemIndex - 1;
  }

  if (key === 'ArrowDown') {
    // When no index is set or at the last index, focus to the first, otherwise increment focus index
    if (focusedItemIndex === null || focusedItemIndex === selectOptions.length - 1) {
      return 0;
    }
    return focusedItemIndex + 1;
  }

  return null;
};
