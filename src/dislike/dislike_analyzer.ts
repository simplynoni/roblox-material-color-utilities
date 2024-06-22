//!native
/**
 * @license
 * Copyright 2023 Google LLC
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

import { Hct } from '../hct/hct';

// material_color_utilities is designed to have a consistent API across
// platforms and modular components that can be moved around easily. Using a
// class as a namespace facilitates this.
//
// tslint:disable:class-as-namespace

/**
 * Check and/or fix universally disliked colors.
 * Color science studies of color preference indicate universal distaste for
 * dark yellow-greens, and also show this is correlated to distate for
 * biological waste and rotting food.
 *
 * See Palmer and Schloss, 2010 or Schloss and Palmer's Chapter 21 in Handbook
 * of Color Psychology (2015).
 */
export class DislikeAnalyzer {
	/**
	 * Returns true if a color is disliked.
	 *
	 * @param hct A color to be judged.
	 * @return Whether the color is disliked.
	 *
	 * Disliked is defined as a dark yellow-green that is not neutral.
	 */
	static isDisliked(hct: Hct): boolean {
		const huePasses = math.round(hct.getHue()) >= 90.0 && math.round(hct.getHue()) <= 111.0;
		const chromaPasses = math.round(hct.getChroma()) > 16.0;
		const tonePasses = math.round(hct.getTone()) < 65.0;

		return huePasses && chromaPasses && tonePasses;
	}

	/**
	 * If a color is disliked, lighten it to make it likable.
	 *
	 * @param hct A color to be judged.
	 * @return A new color if the original color is disliked, or the original
	 *   color if it is acceptable.
	 */
	static fixIfDisliked(hct: Hct): Hct {
		if (DislikeAnalyzer.isDisliked(hct)) {
			return Hct.from(hct.getHue(), hct.getChroma(), 70.0);
		}

		return hct;
	}
}
