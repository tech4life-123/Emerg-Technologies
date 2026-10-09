const RAD = Math.PI / 180;

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

/** Unit vector for a lon/lat in world space. */
export function toVec(lon: number, lat: number): Vec3 {
  const φ = lat * RAD;
  const λ = lon * RAD;
  return { x: Math.cos(φ) * Math.sin(λ), y: Math.sin(φ), z: Math.cos(φ) * Math.cos(λ) };
}

/**
 * Orthographic view: rotate so (lon0, lat0) faces the camera.
 * Returns screen-plane x/y in [-1, 1] and depth z (> 0 means facing us).
 */
export function view(v: Vec3, lon0: number, lat0: number): Vec3 {
  const L = lon0 * RAD;
  const P = lat0 * RAD;
  const cL = Math.cos(L);
  const sL = Math.sin(L);
  const cP = Math.cos(P);
  const sP = Math.sin(P);
  const x1 = v.x * cL - v.z * sL;
  const z1 = v.x * sL + v.z * cL;
  const y2 = v.y * cP - z1 * sP;
  const z2 = v.y * sP + z1 * cP;
  return { x: x1, y: y2, z: z2 };
}

/** Great-circle point between a and b at t ∈ [0,1], lifted off the surface. */
export function arcPoint(a: Vec3, b: Vec3, t: number, lift: number): Vec3 {
  const dot = Math.min(1, Math.max(-1, a.x * b.x + a.y * b.y + a.z * b.z));
  const omega = Math.acos(dot);
  const sinO = Math.sin(omega) || 1;
  const wa = Math.sin((1 - t) * omega) / sinO;
  const wb = Math.sin(t * omega) / sinO;
  const r = 1 + lift * Math.sin(Math.PI * t);
  return {
    x: (a.x * wa + b.x * wb) * r,
    y: (a.y * wa + b.y * wb) * r,
    z: (a.z * wa + b.z * wb) * r,
  };
}
