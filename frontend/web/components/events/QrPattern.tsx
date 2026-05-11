export function QrPattern({ size = 220 }: { size?: number }) {
  const N = 25;
  const cell = size / N;

  const isFinder = (r: number, c: number) => {
    const inSquare = (br: number, bc: number) => r >= br && r < br + 7 && c >= bc && c < bc + 7;
    return inSquare(0, 0) || inSquare(0, N - 7) || inSquare(N - 7, 0);
  };

  const finderColor = (r: number, c: number): 0 | 1 | null => {
    const inSq = (br: number, bc: number): 0 | 1 | null => {
      if (!(r >= br && r < br + 7 && c >= bc && c < bc + 7)) return null;
      const lr = r - br, lc = c - bc;
      if (lr === 0 || lr === 6 || lc === 0 || lc === 6) return 1;
      if (lr === 1 || lr === 5 || lc === 1 || lc === 5) return 0;
      return 1;
    };
    let v = inSq(0, 0);          if (v !== null) return v;
    v = inSq(0, N - 7);          if (v !== null) return v;
    v = inSq(N - 7, 0);          if (v !== null) return v;
    return null;
  };

  const cells: { r: number; c: number }[] = [];
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const fv = finderColor(r, c);
      if (fv !== null) {
        if (fv === 1) cells.push({ r, c });
        continue;
      }
      const nearFinder = isFinder(r, c)
        || (r < 8 && c < 8)
        || (r < 8 && c >= N - 8)
        || (r >= N - 8 && c < 8);
      if (nearFinder) continue;
      const v = Math.sin(r * 12.9898 + c * 78.233) * 43758.5453;
      const f = v - Math.floor(v);
      if (f > 0.5) cells.push({ r, c });
    }
  }

  return (
    <div style={{
      padding: 14, background: '#FFFFFF', borderRadius: 12,
      border: '1px solid var(--border)',
      boxShadow: '0 4px 16px rgba(15,23,42,0.08)',
      lineHeight: 0,
    }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} shapeRendering="crispEdges">
        <rect width={size} height={size} fill="#FFFFFF"/>
        {cells.map((cl, i) => (
          <rect key={i} x={cl.c * cell} y={cl.r * cell} width={cell} height={cell} fill="#0F172A"/>
        ))}
      </svg>
    </div>
  );
}
