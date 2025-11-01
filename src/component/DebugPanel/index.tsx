import React from 'react';

type DebugPanelProps = {
  data: Record<string, any>;
};

export default function DebugPanel({ data }: DebugPanelProps) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 50,
        right: 0,
        background: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '1rem',
        fontSize: '0.8rem',
        maxWidth: '400px',
        maxHeight: '50vh',
        overflowY: 'auto',
        zIndex: 9999,
        borderTopLeftRadius: '8px',
      }}
    >
      <strong>🔍 DebugPanel</strong>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
