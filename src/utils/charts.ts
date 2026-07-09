export function drawLineChart(
  canvas: HTMLCanvasElement,
  seriesList: { label: string; color: string; values: number[] }[],
  title?: string,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx || !seriesList.length) return;

  const dpr = window.devicePixelRatio || 1;
  const width = canvas.clientWidth || 900;
  const height = canvas.clientHeight || 320;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const styles = getComputedStyle(document.documentElement);
  const bg = styles.getPropertyValue("--bg-elevated").trim() || "#fff";
  const grid = styles.getPropertyValue("--border").trim() || "#e5e7eb";
  const muted = styles.getPropertyValue("--text-muted").trim() || "#6b7280";

  const pad = 32;
  const allValues = seriesList.flatMap((series) => series.values);
  const min = Math.min(...allValues);
  const max = Math.max(...allValues);
  const span = Math.max(1, max - min);
  const pointCount = Math.max(...seriesList.map((series) => series.values.length));

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = grid;
  ctx.lineWidth = 1;
  for (let i = 0; i < 4; i += 1) {
    const y = pad + i * ((height - pad * 2) / 3);
    ctx.beginPath();
    ctx.moveTo(pad, y);
    ctx.lineTo(width - pad, y);
    ctx.stroke();
  }

  seriesList.forEach((series) => {
    const values = series.values;
    ctx.beginPath();
    values.forEach((value, index) => {
      const x = pad + (index / Math.max(1, pointCount - 1)) * (width - pad * 2);
      const y = height - pad - ((value - min) / span) * (height - pad * 2);
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = series.color;
    ctx.lineWidth = seriesList.length > 1 ? 2.5 : 3;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.stroke();
  });

  if (title) {
    ctx.fillStyle = muted;
    ctx.font = "600 13px system-ui, sans-serif";
    ctx.fillText(title, pad, 20);
  }
}

export function exportCanvas(canvas: HTMLCanvasElement, filename: string) {
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

export function downloadJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export async function copyJson(data: unknown) {
  await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
}
