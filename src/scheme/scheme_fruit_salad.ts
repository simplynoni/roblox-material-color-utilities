/**
 * @license
 * Copyright 2022 Google LLC
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

import type { Hct } from '../hct/hct';
import { TonalPalette } from '../palettes/tonal_palette';
import * as math_utils from '../utils/math_utils';

import { DynamicScheme } from './dynamic_scheme';
import { Variant } from './variant';

/**
 * A playful theme - the source color's hue does not appear in the theme.
 */
export class SchemeFruitSalad extends DynamicScheme {
	constructor(sourceColorHct: Hct, isDark: boolean, contrastLevel: number) {
		super({
			sourceColorArgb: sourceColorHct.toInt(),
			variant: Variant.FRUIT_SALAD,
			contrastLevel,
			isDark,
			primaryPalette: TonalPalette.fromHueAndChroma(
				math_utils.sanitizeDegreesDouble(sourceColorHct.getHue() - 50.0),
				48.0,
			),
			secondaryPalette: TonalPalette.fromHueAndChroma(
				math_utils.sanitizeDegreesDouble(sourceColorHct.getHue() - 50.0),
				36.0,
			),
			tertiaryPalette: TonalPalette.fromHueAndChroma(sourceColorHct.getHue(), 36.0),
			neutralPalette: TonalPalette.fromHueAndChroma(sourceColorHct.getHue(), 10.0),
			neutralVariantPalette: TonalPalette.fromHueAndChroma(sourceColorHct.getHue(), 16.0),
		});
	}
}
