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

import { Hct } from '../hct/hct';

import { TonalPalette } from './tonal_palette';

/**
 * Set of colors to generate a [CorePalette] from
 */
export interface CorePaletteColors {
	primary: number;
	secondary?: number;
	tertiary?: number;
	neutral?: number;
	neutralVariant?: number;
	error?: number;
}

/**
 * An intermediate concept between the key color for a UI theme, and a full
 * color scheme. 5 sets of tones are generated, all except one use the same hue
 * as the key color, and all vary in chroma.
 */
export class CorePalette {
	a1: TonalPalette;
	a2: TonalPalette;
	a3: TonalPalette;
	n1: TonalPalette;
	n2: TonalPalette;
	error: TonalPalette;

	/**
	 * @param argb ARGB representation of a color
	 */
	static of(argb: number): CorePalette {
		return new CorePalette(argb, false);
	}

	/**
	 * @param argb ARGB representation of a color
	 */
	static contentOf(argb: number): CorePalette {
		return new CorePalette(argb, true);
	}

	/**
	 * Create a [CorePalette] from a set of colors
	 */
	static fromColors(colors: CorePaletteColors): CorePalette {
		return CorePalette.createPaletteFromColors(false, colors);
	}

	/**
	 * Create a content [CorePalette] from a set of colors
	 */
	static contentFromColors(colors: CorePaletteColors): CorePalette {
		return CorePalette.createPaletteFromColors(true, colors);
	}

	private static createPaletteFromColors(content: boolean, colors: CorePaletteColors) {
		const palette = new CorePalette(colors.primary, content);
		if (colors.secondary) {
			const p = new CorePalette(colors.secondary, content);
			palette.a2 = p.a1;
		}
		if (colors.tertiary) {
			const p = new CorePalette(colors.tertiary, content);
			palette.a3 = p.a1;
		}
		if (colors.error) {
			const p = new CorePalette(colors.error, content);
			palette.error = p.a1;
		}
		if (colors.neutral) {
			const p = new CorePalette(colors.neutral, content);
			palette.n1 = p.n1;
		}
		if (colors.neutralVariant) {
			const p = new CorePalette(colors.neutralVariant, content);
			palette.n2 = p.n2;
		}
		return palette;
	}

	private constructor(argb: number, isContent: boolean) {
		const hct = Hct.fromInt(argb);
		const hue = hct.getHue();
		const chroma = hct.getChroma();
		if (isContent) {
			this.a1 = TonalPalette.fromHueAndChroma(hue, chroma);
			this.a2 = TonalPalette.fromHueAndChroma(hue, chroma / 3);
			this.a3 = TonalPalette.fromHueAndChroma(hue + 60, chroma / 2);
			this.n1 = TonalPalette.fromHueAndChroma(hue, math.min(chroma / 12, 4));
			this.n2 = TonalPalette.fromHueAndChroma(hue, math.min(chroma / 6, 8));
		} else {
			this.a1 = TonalPalette.fromHueAndChroma(hue, math.max(48, chroma));
			this.a2 = TonalPalette.fromHueAndChroma(hue, 16);
			this.a3 = TonalPalette.fromHueAndChroma(hue + 60, 24);
			this.n1 = TonalPalette.fromHueAndChroma(hue, 4);
			this.n2 = TonalPalette.fromHueAndChroma(hue, 8);
		}
		this.error = TonalPalette.fromHueAndChroma(25, 84);
	}
}
