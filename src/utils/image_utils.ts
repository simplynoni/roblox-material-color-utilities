//!native
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

import { QuantizerCelebi } from '../quantize/quantizer_celebi';
import { Score } from '../score/score';

import { argbFromRgb } from './color_utils';

/**
 * Get the source color from an image.
 *
 * @param image The image element
 * @return Source color - the color most suitable for creating a UI theme
 */
export function sourceColorFromImage(image: EditableImage) {
	const imageBytes = image.ReadPixels(Vector2.zero, image.Size);
	// Convert Image data to Pixel Array
	const pixels: number[] = [];
	for (let i = 0; i < imageBytes.size(); i += 4) {
		const r = imageBytes[i] * 255;
		const g = imageBytes[i + 1] * 255;
		const b = imageBytes[i + 2] * 255;
		const a = imageBytes[i + 3] * 255;
		if (a < 255) {
			continue;
		}
		const argb = argbFromRgb(r, g, b);
		pixels.push(argb);
	}

	// Convert Pixels to Material Colors
	const result = QuantizerCelebi.quantize(pixels, 128);
	const ranked = Score.score(result);
	const top = ranked[0];
	return top;
}
