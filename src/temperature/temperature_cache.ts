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

// This file is automatically generated. Do not modify it.

import { concat } from '@rbxts/sift/out/Array';
import { Hct } from '../hct/hct';
import * as colorUtils from '../utils/color_utils';
import * as mathUtils from '../utils/math_utils';

/**
 * Design utilities using color temperature theory.
 *
 * Analogous colors, complementary color, and cache to efficiently, lazily,
 * generate data for calculations when needed.
 */
export class TemperatureCache {
	constructor(public input: Hct) {}

	hctsByTempCache: Hct[] = [];
	hctsByHueCache: Hct[] = [];
	tempsByHctCache = new Map<Hct, number>();
	inputRelativeTemperatureCache = -1.0;
	complementCache: Hct | undefined = undefined;

	getHctsByTemp(): Hct[] {
		if (this.hctsByTempCache.size() > 0) {
			return this.hctsByTempCache;
		}

		const hcts = concat(this.getHctsByHue(), [this.input]);
		const temperaturesByHct = this.getTempsByHct();
		// @TODO: not 100% sure this is correct
		hcts.sort((a, b) => temperaturesByHct.get(a)! > temperaturesByHct.get(b)!);
		this.hctsByTempCache = hcts;
		return hcts;
	}

	getWarmest(): Hct {
		return this.getHctsByTemp()[this.getHctsByTemp().size() - 1];
	}

	getColdest(): Hct {
		return this.getHctsByTemp()[0];
	}

	/**
	 * A set of colors with differing hues, equidistant in temperature.
	 *
	 * In art, this is usually described as a set of 5 colors on a color wheel
	 * divided into 12 sections. This method allows provision of either of those
	 * values.
	 *
	 * Behavior is undefined when [count] or [divisions] is 0.
	 * When divisions < count, colors repeat.
	 *
	 * [count] The number of colors to return, includes the input color.
	 * [divisions] The number of divisions on the color wheel.
	 */
	analogous(count = 5, divisions = 12): Hct[] {
		const startHue = math.round(this.input.getHue());
		const startHct = this.getHctsByHue()[startHue];
		let lastTemp = this.relativeTemperature(startHct);
		const allColors = [startHct];

		let absoluteTotalTempDelta = 0.0;
		for (let i = 0; i < 360; i++) {
			const hue = mathUtils.sanitizeDegreesInt(startHue + i);
			const hct = this.getHctsByHue()[hue];
			const temp = this.relativeTemperature(hct);
			const tempDelta = math.abs(temp - lastTemp);
			lastTemp = temp;
			absoluteTotalTempDelta += tempDelta;
		}
		let hueAddend = 1;
		const tempStep = absoluteTotalTempDelta / divisions;
		let totalTempDelta = 0.0;
		lastTemp = this.relativeTemperature(startHct);
		while (allColors.size() < divisions) {
			const hue = mathUtils.sanitizeDegreesInt(startHue + hueAddend);
			const hct = this.getHctsByHue()[hue];
			const temp = this.relativeTemperature(hct);
			const tempDelta = math.abs(temp - lastTemp);
			totalTempDelta += tempDelta;

			const desiredTotalTempDeltaForIndex = allColors.size() * tempStep;
			let indexSatisfied = totalTempDelta >= desiredTotalTempDeltaForIndex;
			let indexAddend = 1;
			// Keep adding this hue to the answers until its temperature is
			// insufficient. This ensures consistent behavior when there aren't
			// [divisions] discrete steps between 0 and 360 in hue with [tempStep]
			// delta in temperature between them.
			//
			// For example, white and black have no analogues: there are no other
			// colors at T100/T0. Therefore, they should just be added to the array
			// as answers.
			while (indexSatisfied && allColors.size() < divisions) {
				allColors.push(hct);
				const desiredTotalTempDeltaForIndex = (allColors.size() + indexAddend) * tempStep;
				indexSatisfied = totalTempDelta >= desiredTotalTempDeltaForIndex;
				indexAddend++;
			}
			lastTemp = temp;
			hueAddend++;
			if (hueAddend > 360) {
				while (allColors.size() < divisions) {
					allColors.push(hct);
				}
				break;
			}
		}

		const answers = [this.input];

		// First, generate analogues from rotating counter-clockwise.
		const increaseHueCount = math.floor((count - 1) / 2.0);
		for (let i = 1; i < increaseHueCount + 1; i++) {
			let index = 0 - i;
			while (index < 0) {
				index = allColors.size() + index;
			}
			if (index >= allColors.size()) {
				index = index % allColors.size();
			}
			answers.insert(0, allColors[index]);
		}

		// Second, generate analogues from rotating clockwise.
		const decreaseHueCount = count - increaseHueCount - 1;
		for (let i = 1; i < decreaseHueCount + 1; i++) {
			let index = i;
			while (index < 0) {
				index = allColors.size() + index;
			}
			if (index >= allColors.size()) {
				index = index % allColors.size();
			}
			answers.push(allColors[index]);
		}

		return answers;
	}

	/**
	 * A color that complements the input color aesthetically.
	 *
	 * In art, this is usually described as being across the color wheel.
	 * History of this shows intent as a color that is just as cool-warm as the
	 * input color is warm-cool.
	 */
	getComplement(): Hct {
		if (this.complementCache !== undefined) {
			return this.complementCache;
		}

		const coldestHue = this.getColdest().getHue();
		const coldestTemp = this.getTempsByHct().get(this.getColdest())!;

		const warmestHue = this.getWarmest().getHue();
		const warmestTemp = this.getTempsByHct().get(this.getWarmest())!;
		const range = warmestTemp - coldestTemp;
		const startHueIsColdestToWarmest = TemperatureCache.isBetween(this.input.getHue(), coldestHue, warmestHue);
		const startHue = startHueIsColdestToWarmest ? warmestHue : coldestHue;
		const endHue = startHueIsColdestToWarmest ? coldestHue : warmestHue;
		const directionOfRotation = 1.0;
		let smallestError = 1000.0;
		let answer = this.getHctsByHue()[math.round(this.input.getHue())];

		const complementRelativeTemp = 1.0 - this.getInputRelativeTemperature();
		// Find the color in the other section, closest to the inverse percentile
		// of the input color. This is the complement.
		for (let hueAddend = 0.0; hueAddend <= 360.0; hueAddend += 1.0) {
			const hue = mathUtils.sanitizeDegreesDouble(startHue + directionOfRotation * hueAddend);
			if (!TemperatureCache.isBetween(hue, startHue, endHue)) {
				continue;
			}
			const possibleAnswer = this.getHctsByHue()[math.round(hue)];
			const relativeTemp = (this.getTempsByHct().get(possibleAnswer)! - coldestTemp) / range;
			const _error = math.abs(complementRelativeTemp - relativeTemp);
			if (_error < smallestError) {
				smallestError = _error;
				answer = possibleAnswer;
			}
		}
		this.complementCache = answer;
		return this.complementCache;
	}

	/**
	 * Temperature relative to all colors with the same chroma and tone.
	 * Value on a scale from 0 to 1.
	 */
	relativeTemperature(hct: Hct): number {
		const range = this.getTempsByHct().get(this.getWarmest())! - this.getTempsByHct().get(this.getColdest())!;
		const differenceFromColdest = this.getTempsByHct().get(hct)! - this.getTempsByHct().get(this.getColdest())!;
		// Handle when there's no difference in temperature between warmest and
		// coldest: for example, at T100, only one color is available, white.
		if (range === 0.0) {
			return 0.5;
		}
		return differenceFromColdest / range;
	}

	/** Relative temperature of the input color. See [relativeTemperature]. */
	getInputRelativeTemperature(): number {
		if (this.inputRelativeTemperatureCache >= 0.0) {
			return this.inputRelativeTemperatureCache;
		}

		this.inputRelativeTemperatureCache = this.relativeTemperature(this.input);
		return this.inputRelativeTemperatureCache;
	}

	/** A Map with keys of HCTs in [hctsByTemp], values of raw temperature. */
	getTempsByHct(): Map<Hct, number> {
		if (this.tempsByHctCache.size() > 0) {
			return this.tempsByHctCache;
		}
		const allHcts = concat(this.getHctsByHue(), [this.input]);
		const temperaturesByHct = new Map<Hct, number>();
		for (const e of allHcts) {
			temperaturesByHct.set(e, TemperatureCache.rawTemperature(e));
		}
		this.tempsByHctCache = temperaturesByHct;
		return temperaturesByHct;
	}

	/**
	 * HCTs for all hues, with the same chroma/tone as the input.
	 * Sorted ascending, hue 0 to 360.
	 */
	getHctsByHue(): Hct[] {
		if (this.hctsByHueCache.size() > 0) {
			return this.hctsByHueCache;
		}
		const hcts: Hct[] = [];
		for (let hue = 0.0; hue <= 360.0; hue += 1.0) {
			const colorAtHue = Hct.from(hue, this.input.getChroma(), this.input.getTone());
			hcts.push(colorAtHue);
		}
		this.hctsByHueCache = hcts;
		return this.hctsByHueCache;
	}

	/** Determines if an angle is between two other angles, rotating clockwise. */
	static isBetween(angle: number, a: number, b: number): boolean {
		if (a < b) {
			return a <= angle && angle <= b;
		}
		return a <= angle || angle <= b;
	}

	/**
	 * Value representing cool-warm factor of a color.
	 * Values below 0 are considered cool, above, warm.
	 *
	 * Color science has researched emotion and harmony, which art uses to select
	 * colors. Warm-cool is the foundation of analogous and complementary colors.
	 * See:
	 * - Li-Chen Ou's Chapter 19 in Handbook of Color Psychology (2015).
	 * - Josef Albers' Interaction of Color chapters 19 and 21.
	 *
	 * Implementation of Ou, Woodcock and Wright's algorithm, which uses
	 * L*a*b* / LCH color space.
	 * Return value has these properties:
	 * - Values below 0 are cool, above 0 are warm.
	 * - Lower bound: -0.52 - (chroma ^ 1.07 / 20). L*a*b* chroma is infinite.
	 *   Assuming max of 130 chroma, -9.66.
	 * - Upper bound: -0.52 + (chroma ^ 1.07 / 20). L*a*b* chroma is infinite.
	 *   Assuming max of 130 chroma, 8.61.
	 */
	static rawTemperature(color: Hct): number {
		const lab = colorUtils.labFromArgb(color.toInt());
		const hue = mathUtils.sanitizeDegreesDouble((math.atan2(lab[2], lab[1]) * 180.0) / math.pi);
		const chroma = math.sqrt(lab[1] * lab[1] + lab[2] * lab[2]);
		const temperature =
			-0.5 + 0.02 * math.pow(chroma, 1.07) * math.cos((mathUtils.sanitizeDegreesDouble(hue - 50.0) * math.pi) / 180.0);
		return temperature;
	}
}
