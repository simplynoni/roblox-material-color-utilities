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

import { describe, expect, it } from '@rbxts/jest-globals';
import { Hct } from '../hct/hct';
import { SchemeMonochrome } from '../scheme/scheme_monochrome';
import { SchemeTonalSpot } from '../scheme/scheme_tonal_spot';

import { MaterialDynamicColors } from './material_dynamic_colors';

describe('fixed colors', () => {
	it('fixed colors in non-monochrome schemes', () => {
		const scheme = new SchemeTonalSpot(Hct.fromInt(0xffff0000), true, 0.0);

		expect(MaterialDynamicColors.primaryFixed.getHct(scheme).getTone()).toBeCloseTo(90.0, 0);
		expect(MaterialDynamicColors.primaryFixedDim.getHct(scheme).getTone()).toBeCloseTo(80.0, 0);
		expect(MaterialDynamicColors.onPrimaryFixed.getHct(scheme).getTone()).toBeCloseTo(10.0, 0);
		expect(MaterialDynamicColors.onPrimaryFixedVariant.getHct(scheme).getTone()).toBeCloseTo(30.0, 0);
		expect(MaterialDynamicColors.secondaryFixed.getHct(scheme).getTone()).toBeCloseTo(90.0, 0);
		expect(MaterialDynamicColors.secondaryFixedDim.getHct(scheme).getTone()).toBeCloseTo(80.0, 0);
		expect(MaterialDynamicColors.onSecondaryFixed.getHct(scheme).getTone()).toBeCloseTo(10.0, 0);
		expect(MaterialDynamicColors.onSecondaryFixedVariant.getHct(scheme).getTone()).toBeCloseTo(30.0, 0);
		expect(MaterialDynamicColors.tertiaryFixed.getHct(scheme).getTone()).toBeCloseTo(90.0, 0);
		expect(MaterialDynamicColors.tertiaryFixedDim.getHct(scheme).getTone()).toBeCloseTo(80.0, 0);
		expect(MaterialDynamicColors.onTertiaryFixed.getHct(scheme).getTone()).toBeCloseTo(10.0, 0);
		expect(MaterialDynamicColors.onTertiaryFixedVariant.getHct(scheme).getTone()).toBeCloseTo(30.0, 0);
	});

	it('fixed colors in light monochrome schemes', () => {
		const scheme = new SchemeMonochrome(Hct.fromInt(0xffff0000), false, 0.0);

		expect(MaterialDynamicColors.primaryFixed.getHct(scheme).getTone()).toBeCloseTo(40.0, 0);
		expect(MaterialDynamicColors.primaryFixedDim.getHct(scheme).getTone()).toBeCloseTo(30.0, 0);
		expect(MaterialDynamicColors.onPrimaryFixed.getHct(scheme).getTone()).toBeCloseTo(100.0, 0);
		expect(MaterialDynamicColors.onPrimaryFixedVariant.getHct(scheme).getTone()).toBeCloseTo(90.0, 0);
		expect(MaterialDynamicColors.secondaryFixed.getHct(scheme).getTone()).toBeCloseTo(80.0, 0);
		expect(MaterialDynamicColors.secondaryFixedDim.getHct(scheme).getTone()).toBeCloseTo(70.0, 0);
		expect(MaterialDynamicColors.onSecondaryFixed.getHct(scheme).getTone()).toBeCloseTo(10.0, 0);
		expect(MaterialDynamicColors.onSecondaryFixedVariant.getHct(scheme).getTone()).toBeCloseTo(25.0, 0);
		expect(MaterialDynamicColors.tertiaryFixed.getHct(scheme).getTone()).toBeCloseTo(40.0, 0);
		expect(MaterialDynamicColors.tertiaryFixedDim.getHct(scheme).getTone()).toBeCloseTo(30.0, 0);
		expect(MaterialDynamicColors.onTertiaryFixed.getHct(scheme).getTone()).toBeCloseTo(100.0, 0);
		expect(MaterialDynamicColors.onTertiaryFixedVariant.getHct(scheme).getTone()).toBeCloseTo(90.0, 0);
	});

	it('fixed colors in dark monochrome schemes', () => {
		const scheme = new SchemeMonochrome(Hct.fromInt(0xffff0000), true, 0.0);

		expect(MaterialDynamicColors.primaryFixed.getHct(scheme).getTone()).toBeCloseTo(40.0, 0);
		expect(MaterialDynamicColors.primaryFixedDim.getHct(scheme).getTone()).toBeCloseTo(30.0, 0);
		expect(MaterialDynamicColors.onPrimaryFixed.getHct(scheme).getTone()).toBeCloseTo(100.0, 0);
		expect(MaterialDynamicColors.onPrimaryFixedVariant.getHct(scheme).getTone()).toBeCloseTo(90.0, 0);
		expect(MaterialDynamicColors.secondaryFixed.getHct(scheme).getTone()).toBeCloseTo(80.0, 0);
		expect(MaterialDynamicColors.secondaryFixedDim.getHct(scheme).getTone()).toBeCloseTo(70.0, 0);
		expect(MaterialDynamicColors.onSecondaryFixed.getHct(scheme).getTone()).toBeCloseTo(10.0, 0);
		expect(MaterialDynamicColors.onSecondaryFixedVariant.getHct(scheme).getTone()).toBeCloseTo(25.0, 0);
		expect(MaterialDynamicColors.tertiaryFixed.getHct(scheme).getTone()).toBeCloseTo(40.0, 0);
		expect(MaterialDynamicColors.tertiaryFixedDim.getHct(scheme).getTone()).toBeCloseTo(30.0, 0);
		expect(MaterialDynamicColors.onTertiaryFixed.getHct(scheme).getTone()).toBeCloseTo(100.0, 0);
		expect(MaterialDynamicColors.onTertiaryFixedVariant.getHct(scheme).getTone()).toBeCloseTo(90.0, 0);
	});
});
