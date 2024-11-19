// 取得 canvas 元素
const canvas = document.getElementById('waveCanvas');
const ctx = canvas.getContext('2d');

// 設置繞射模擬參數
let wavelength = 550e-9;  // 550 nm (綠色光)
let holeDiameter = 50e-6;  // 50 μm
let screenDistance = 1;  // 1 m

// 取得滑桿元素
const wavelengthSlider = document.getElementById('wavelength');
const holeDiameterSlider = document.getElementById('holeDiameter');
const screenDistanceSlider = document.getElementById('screenDistance');

// 更新滑桿值
wavelengthSlider.oninput = () => {
    wavelength = parseInt(wavelengthSlider.value) * 1e-9;
    drawSimplifiedDiffraction();
};
holeDiameterSlider.oninput = () => {
    holeDiameter = parseInt(holeDiameterSlider.value) * 1e-6;
    drawSimplifiedDiffraction();
};
screenDistanceSlider.oninput = () => {
    screenDistance = parseFloat(screenDistanceSlider.value);
    drawSimplifiedDiffraction();
};

// Bessel 函數一階第一類的近似實現
function besselJ1(x) {
    if (x === 0) return 0;
    let ax = Math.abs(x);
    let z = ax * ax;
    let value = ax * (72362614232.0 + z * (-7895059235.0 + z * (242396853.1 + z * (-2972611.439 + z * (15704.48260 + z * (-30.16036606))))));
    value /= 144725228442.0 + z * (2300535178.0 + z * (18583304.74 + z * (99447.43394 + z * (376.9991397 + z))));
    if (x < 0) return -value;
    return value;
}

// 繪製簡化的圓孔繞射圖案的函數
function drawSimplifiedDiffraction() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除畫布

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const color = 'rgba(0, 255, 0, 0.5)'; // 綠色光，固定 alpha 值

    for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
            // 將座標轉換為中心相對座標
            const relX = x - centerX;
            const relY = y - centerY;

            // 計算距離
            const r = Math.sqrt(relX * relX + relY * relY);

            // 簡化繞射強度計算，固定強度值
            const I = Math.sin(r / 10) ** 2;  // 簡化強度計算，觀察基本圖形

            // 計算顏色強度
            const alpha = Math.min(I * 255, 255); // 將強度轉換為顏色的 alpha 值

            // 繪製繞射圖案
            ctx.fillStyle = `rgba(0, 255, 0, ${alpha / 255})`; // 綠色光
            ctx.fillRect(x, y, 1, 1);
        }
    }
}

// 開始動畫
drawSimplifiedDiffraction();
