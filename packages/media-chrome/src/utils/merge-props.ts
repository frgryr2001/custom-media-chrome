import React from 'react';
import { cn } from './cn';

type AnyProps = Record<string, unknown>;
type EventHandler = (event: unknown) => void;

function mergeClassName(existing: unknown, incoming: unknown): string | undefined {
  if (existing == null) return incoming as string | undefined;
  if (typeof incoming === 'string' && typeof existing === 'string') {
    return cn(existing, incoming);
  }
  return existing as string;
}

function mergeStyle(
  existing: React.CSSProperties | undefined,
  incoming: React.CSSProperties | undefined
): React.CSSProperties | undefined {
  if (existing == null) return incoming;
  if (incoming == null) return existing;
  return { ...existing, ...incoming };
}

function isEventHandler(key: string, incoming: unknown): incoming is EventHandler {
  return (
    typeof incoming === 'function' &&
    key.startsWith('on') &&
    key.length > 2 &&
    key[2] === key[2].toUpperCase()
  );
}

function mergeEventHandler(
  existing: EventHandler | undefined,
  incoming: EventHandler
): EventHandler {
  if (existing == null) return incoming;
  return (event: unknown) => {
    existing(event);
    incoming(event);
  };
}

function mergePropValue(key: string, existing: unknown, incoming: unknown): unknown {
  if (key === 'className') return mergeClassName(existing, incoming);
  if (key === 'style') {
    return mergeStyle(
      existing as React.CSSProperties | undefined,
      incoming as React.CSSProperties | undefined
    );
  }
  if (isEventHandler(key, incoming)) {
    return mergeEventHandler(existing as EventHandler | undefined, incoming);
  }
  return incoming;
}

/**
 * A type-safe utility function to intelligently merge multiple React props objects.
 *
 * - Concatenates `className` strings (space-separated).
 * - Deeply merges `style` objects (later props override earlier ones).
 * - Chains event handlers (e.g., `onClick`) by calling them in the order provided.
 * - For all other props, the last one wins.
 *
 * This is particularly useful when combining props from multiple sources (e.g., hooks like useButton, useFocus, etc.)
 * in strict TypeScript mode.
 */
export function mergeProps<T extends AnyProps[]>(
  ...propsArray: T
): AnyProps {
  const result: AnyProps = {};

  for (const props of propsArray) {
    if (!props || typeof props !== 'object') continue;

    for (const key in props) {
      const incoming = props[key];
      if (incoming === undefined) continue;
      result[key] = mergePropValue(key, result[key], incoming);
    }
  }

  return result;
}