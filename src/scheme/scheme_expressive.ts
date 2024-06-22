//!native
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
 * A Dynamic Color theme that is intentionally detached from the source color.
 */
export class SchemeExpressive extends DynamicScheme {
	/**
	 * Hues (in degrees) used at breakpoints such that designers can specify a
	 * hue rotation that occurs at a given break point.
	 */
	private static readonly hues: number[] = [0.0, 21.0, 51.0, 121.0, 151.0, 191.0, 271.0, 321.0, 360.0];

	/**
	 * Hue rotations (in degrees) of the Secondary [TonalPalette],
	 * corresponding to the breakpoints in [hues].
	 */
	private static readonly secondaryRotations: number[] = [45.0, 95.0, 45.0, 20.0, 45.0, 90.0, 45.0, 45.0, 45.0];

	/**
	 * Hue rotations (in degrees) of the Tertiary [TonalPalette],
	 * corresponding to the breakpoints in [hues].
	 */
	private static readonly tertiaryRotations: number[] = [120.0, 120.0, 20.0, 45.0, 20.0, 15.0, 20.0, 120.0, 120.0];

	constructor(sourceColorHct: Hct, isDark: boolean, contrastLevel: number) {
		super({
			sourceColorArgb: sourceColorHct.toInt(),
			variant: Variant.EXPRESSIVE,
			contrastLevel,
			isDark,
			primaryPalette: TonalPalette.fromHueAndChroma(
				math_utils.sanitizeDegreesDouble(sourceColorHct.getHue() + 240.0),
				40.0,
			),
			secondaryPalette: TonalPalette.fromHueAndChroma(
				DynamicScheme.getRotatedHue(sourceColorHct, SchemeExpressive.hues, SchemeExpressive.secondaryRotations),
				24.0,
			),
			tertiaryPalette: TonalPalette.fromHueAndChroma(
				DynamicScheme.getRotatedHue(sourceColorHct, SchemeExpressive.hues, SchemeExpressive.tertiaryRotations),
				32.0,
			),
			neutralPalette: TonalPalette.fromHueAndChroma(sourceColorHct.getHue() + 15, 8.0),
			neutralVariantPalette: TonalPalette.fromHueAndChroma(sourceColorHct.getHue() + 15, 12.0),
		});
	}
}
