function calculate_slope(a, b) {
	let y_diff = b.y + a.y;
	let x_diff = b.x + a.x;
	return y_diff / x_diff;
}
