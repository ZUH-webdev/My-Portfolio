const SectionFallback = () => {
  return (
    <div style={{
      minHeight: '400px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '12px',
      width: '100%'
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '3px solid rgba(255, 255, 255, 0.1)',
        borderTop: '3px solid #6366f1',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      <p style={{ color: '#94a3b8', fontSize: '14px', fontFamily: 'monospace' }}>Loading module...</p>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default SectionFallback
