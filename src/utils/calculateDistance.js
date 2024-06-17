function calculateDistance(lat1, lon1, lat2, lon2) {
  let R = 6371e3; // 지구의 반지름(m)
  let φ1 = (lat1 * Math.PI) / 180;
  let φ2 = (lat2 * Math.PI) / 180;
  let Δφ = ((lat2 - lat1) * Math.PI) / 180;
  let Δλ = ((lon2 - lon1) * Math.PI) / 180;

  let a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  let distance = R * c; // 두 지점 사이의 거리(m)
  return distance;
}

export default calculateDistance;
