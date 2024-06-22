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

import type { DynamicColor } from './dynamic_color';

/**
 * Describes the different in tone between colors.
 */
export type TonePolarity = 'darker' | 'lighter' | 'nearer' | 'farther';

/**
 * Documents a constraint between two DynamicColors, in which their tones must
 * have a certain distance from each other.
 *
 * Prefer a DynamicColor with a background, this is for special cases when
 * designers want tonal distance, literally contrast, between two colors that
 * don't have a background / foreground relationship or a contrast guarantee.
 */
export class ToneDeltaPair {
	/**
	 * Documents a constraint in tone distance between two DynamicColors.
	 *
	 * The polarity is an adjective that describes "A", compared to "B".
	 *
	 * For instance, ToneDeltaPair(A, B, 15, 'darker', stayTogether) states that
	 * A's tone should be at least 15 darker than B's.
	 *
	 * 'nearer' and 'farther' describes closeness to the surface roles. For
	 * instance, ToneDeltaPair(A, B, 10, 'nearer', stayTogether) states that A
	 * should be 10 lighter than B in light mode, and 10 darker than B in dark
	 * mode.
	 *
	 * @param roleA The first role in a pair.
	 * @param roleB The second role in a pair.
	 * @param delta Required difference between tones. Absolute value, negative
	 * values have undefined behavior.
	 * @param polarity The relative relation between tones of roleA and roleB,
	 * as described above.
	 * @param stayTogether Whether these two roles should stay on the same side of
	 * the "awkward zone" (T50-59). This is necessary for certain cases where
	 * one role has two backgrounds.
	 */
	constructor(
		readonly roleA: DynamicColor,
		readonly roleB: DynamicColor,
		readonly delta: number,
		readonly polarity: TonePolarity,
		readonly stayTogether: boolean,
	) {}
}
