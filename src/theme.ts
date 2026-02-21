import { createLightTheme, createDarkTheme } from '@fluentui/react-components';
import type { BrandVariants } from '@fluentui/react-components';

// Official Microsoft Fabric brand palette (teal)
const brandFabric: BrandVariants = {
  10: '#001919',
  20: '#012826',
  30: '#01322E',
  40: '#033F38',
  50: '#054D43',
  60: '#0A5C50',
  70: '#0C695A',
  80: '#117865',
  90: '#1F937E',
  100: '#2AAC94',
  110: '#3ABB9F',
  120: '#52C7AA',
  130: '#78D3B9',
  140: '#9EE0CB',
  150: '#C0ECDD',
  160: '#E3F7EF',
};

export const fabricLightTheme = createLightTheme(brandFabric);
export const fabricDarkTheme = createDarkTheme(brandFabric);
