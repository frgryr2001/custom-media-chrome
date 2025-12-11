import React from 'react';

interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

/**
 * Slot component for composition pattern (similar to Radix UI Slot)
 * Merges props and ref from parent to child element
 */
export const Slot = React.forwardRef<HTMLElement, SlotProps>((props, forwardedRef) => {
  const { children, ...slotProps } = props;

  if (!React.isValidElement(children)) {
    return null;
  }

  const childProps = children.props as Record<string, any>;

  return React.cloneElement(children, {
    ...slotProps,
    ...childProps,
    // Merge event handlers
    onClick: composeEventHandlers(slotProps.onClick as any, childProps.onClick),
    onFocus: composeEventHandlers(slotProps.onFocus as any, childProps.onFocus),
    onBlur: composeEventHandlers(slotProps.onBlur as any, childProps.onBlur),
    // Merge refs
    ref: forwardedRef
      ? composeRefs(forwardedRef, childProps.ref)
      : childProps.ref,
  } as any);
});

Slot.displayName = 'Slot';

/**
 * Compose multiple event handlers
 */
function composeEventHandlers<E>(
  originalEventHandler?: (event: E) => void,
  ourEventHandler?: (event: E) => void,
) {
  return function handleEvent(event: E) {
    originalEventHandler?.(event);
    ourEventHandler?.(event);
  };
}

/**
 * Compose multiple refs
 */
function composeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return (node: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref != null && typeof ref === 'object') {
        (ref as { current: T }).current = node;
      }
    });
  };
}
