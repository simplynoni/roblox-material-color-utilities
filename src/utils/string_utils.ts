/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as colorUtils from "./color_utils";

/**
 * Utility methods for hexadecimal representations of colors.
 */

/**
 * @param argb ARGB representation of a color.
 * @return Hex string representing color, ex. #ff0000 for red.
 */
export function hexFromArgb(argb: number) {
	const r = colorUtils.redFromArgb(argb);
	const g = colorUtils.greenFromArgb(argb);
	const b = colorUtils.blueFromArgb(argb);
	const outParts = [
		tostring(tonumber(r, 16)),
		tostring(tonumber(g, 16)),
		tostring(tonumber(b, 16)),
	];

	// Pad single-digit output values
	for (const [i, part] of pairs(outParts)) {
		if (part.size() === 1) {
			outParts[i] = "0" + part;
		}
	}

	return "#" + outParts.join("");
}

/**
 * @param hex String representing color as hex code. Accepts strings with or
 *     without leading #, and string representing the color using 3, 6, or 8
 *     hex characters.
 * @return ARGB representation of color.
 */
export function argbFromHex(hex: string) {
	hex = hex.gsub("#", "")[0];
	const isThree = hex.size() === 3;
	const isSix = hex.size() === 6;
	const isEight = hex.size() === 8;
	if (!isThree && !isSix && !isEight) {
		throw error("unexpected hex " + hex);
	}
	let r = 0;
	let g = 0;
	let b = 0;
	if (isThree) {
		r = parseIntHex(hex.sub(0, 1).rep(2));
		g = parseIntHex(hex.sub(1, 2).rep(2));
		b = parseIntHex(hex.sub(2, 3).rep(2));
	} else if (isSix) {
		r = parseIntHex(hex.sub(0, 2));
		g = parseIntHex(hex.sub(2, 4));
		b = parseIntHex(hex.sub(4, 6));
	} else if (isEight) {
		r = parseIntHex(hex.sub(2, 4));
		g = parseIntHex(hex.sub(4, 6));
		b = parseIntHex(hex.sub(6, 8));
	}

	return (
		((255 << 24) | ((r & 0x0ff) << 16) | ((g & 0x0ff) << 8) | (b & 0x0ff)) >>> 0
	);
}

function parseIntHex(value: string) {
	const number = tonumber(value, 16);
	if (number) {
		return number;
	} else {
		throw error("unexpected hex" + value);
	}
}
