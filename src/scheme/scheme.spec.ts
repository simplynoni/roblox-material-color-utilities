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

import { describe, expect, it } from '@rbxts/jest-globals';
import { SchemeAndroid } from './scheme_android';

describe('android scheme', () => {
	it('blue light scheme', () => {
		const scheme = SchemeAndroid.light(0xff0000ff).colors;
		expect(scheme.colorAccentPrimary).toBe(0xffe0e0ff);
	});

	it('blue dark scheme', () => {
		const scheme = SchemeAndroid.dark(0xff0000ff).colors;
		expect(scheme.colorAccentPrimary).toBe(0xffe0e0ff);
	});

	it('3rd party light scheme', () => {
		const scheme = SchemeAndroid.light(0xff6750a4).colors;
		expect(scheme.colorAccentPrimary).toBe(0xffe9ddff);
		expect(scheme.colorAccentSecondary).toBe(0xffe8def8);
		expect(scheme.colorAccentTertiary).toBe(0xffffd9e3);
		expect(scheme.colorSurface).toBe(0xfffdf8fd);
		expect(scheme.textColorPrimary).toBe(0xff1c1b1e);
	});

	it('3rd party dark scheme', () => {
		const scheme = SchemeAndroid.dark(0xff6750a4).colors;
		expect(scheme.colorAccentPrimary).toBe(0xffe9ddff);
		expect(scheme.colorAccentSecondary).toBe(0xffe8def8);
		expect(scheme.colorAccentTertiary).toBe(0xffffd9e3);
		expect(scheme.colorSurface).toBe(0xff313033);
		expect(scheme.textColorPrimary).toBe(0xfff4eff4);
	});
});
