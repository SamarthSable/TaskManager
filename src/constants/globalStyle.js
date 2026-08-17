import { ms, s, vs } from 'react-native-size-matters';

/* 
   COLORS
 */

export const Colors = {
  // Brand
  primary: '#2563EB',
  secondary: '#7C3AED',

  // States
  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444',

  // Background
  background: '#F8FAFC',
  surface: '#FFFFFF',

  //TabICon
  active: '#2563EB',
  inactive: '#9CA3AF',

  // Text
  textPrimary: '#111827',
  textSecondary: '#6B7280',

  // Border
  border: '#E2E8F0',

  // Light variants
  primaryLight: '#DBEAFE',
  secondaryLight: '#EDE9FE',

  successLight: '#DCFCE7',
  warningLight: '#FEF3C7',
  dangerLight: '#FEE2E2',

  // Other
  placeholder: '#94A3B8',
  disabled: '#CBD5E1',

  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

/* 
   SPACING
   4px base grid
 */

export const Spacing = {
  xs: ms(4),
  sm: ms(8),
  md: ms(12),
  lg: ms(16),
  xl: ms(20),
  '2xl': ms(24),
  '3xl': ms(32),
  '4xl': ms(40),
  '5xl': ms(48),
  '6xl': ms(64),
  '7xl': ms(80),
  '8xl': ms(96),
};

/* 
   PADDING
 */

export const Padding = {
  // All sides
  xs: ms(4),
  sm: ms(8),
  md: ms(12),
  lg: ms(16),
  xl: ms(20),
  '2xl': ms(24),
  '3xl': ms(32),
  '4xl': ms(40),
  '5xl': ms(48),

  // Horizontal
  horizontalXs: s(4),
  horizontalSm: s(8),
  horizontalMd: s(12),
  horizontalLg: s(16),
  horizontalXl: s(20),
  horizontal2xl: s(24),
  horizontal3xl: s(32),
  horizontal4xl: s(40),

  // Vertical
  verticalXs: vs(4),
  verticalSm: vs(8),
  verticalMd: vs(12),
  verticalLg: vs(16),
  verticalXl: vs(20),
  vertical2xl: vs(24),
  vertical3xl: vs(32),
  vertical4xl: vs(40),
};

/* 
   MARGIN
 */

export const Margin = {
  // All sides
  xs: ms(4),
  sm: ms(8),
  md: ms(12),
  lg: ms(16),
  xl: ms(20),
  '2xl': ms(24),
  '3xl': ms(32),
  '4xl': ms(40),
  '5xl': ms(48),

  // Horizontal
  horizontalXs: s(4),
  horizontalSm: s(8),
  horizontalMd: s(12),
  horizontalLg: s(16),
  horizontalXl: s(20),
  horizontal2xl: s(24),
  horizontal3xl: s(32),
  horizontal4xl: s(40),

  // Vertical
  verticalXs: vs(4),
  verticalSm: vs(8),
  verticalMd: vs(12),
  verticalLg: vs(16),
  verticalXl: vs(20),
  vertical2xl: vs(24),
  vertical3xl: vs(32),
  vertical4xl: vs(40),
};

/* 
   FONT SIZES
 */

export const FontSizes = {
  // Display
  display2xl: ms(72),
  displayXl: ms(60),
  displayLg: ms(48),
  displayMd: ms(36),
  displaySm: ms(30),

  // Headings
  h1: ms(24),
  h2: ms(20),
  h3: ms(18),
  h4: ms(16),

  // Body
  bodyLg: ms(16),
  bodyMd: ms(14),
  bodySm: ms(12),

  // Labels
  labelLg: ms(14),
  labelMd: ms(12),
  labelSm: ms(10),

  // Code
  code: ms(13),
};

/* 
   LINE HEIGHTS
 */

export const LineHeights = {
  // Display
  display2xl: ms(76),
  displayXl: ms(66),
  displayLg: ms(55),
  displayMd: ms(43),
  displaySm: ms(38),

  // Headings
  h1: ms(32),
  h2: ms(28),
  h3: ms(25),
  h4: ms(24),

  // Body
  bodyLg: ms(26),
  bodyMd: ms(22),
  bodySm: ms(18),

  // Labels
  labelLg: ms(20),
  labelMd: ms(17),
  labelSm: ms(14),

  // Code
  code: ms(21),
};

/* 
   FONT WEIGHTS
 */

export const FontWeights = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extraBold: '800',
};

/* 
   BORDER RADIUS
 */

export const Radius = {
  none: 0,

  xs: ms(4),
  sm: ms(6),
  md: ms(8),
  lg: ms(12),
  xl: ms(16),
  '2xl': ms(20),
  '3xl': ms(24),

  full: ms(9999),
};

/* 
   COMPONENT HEIGHTS
 */

export const Heights = {
  // Inputs / Buttons
  input: vs(52),
  button: vs(52),
  socialButton: vs(52),

  // Small controls
  inputSm: vs(32),
  buttonSm: vs(44),

  // Large controls
  inputLg: vs(56),
  buttonLg: vs(56),

  // Icons
  iconXs: ms(16),
  iconSm: ms(20),
  iconMd: ms(24),
  iconLg: ms(32),
  iconXl: ms(40),
  icon2xl: ms(48),

  // Header
  header: vs(56),
};

/* 
   WIDTHS
 */

export const Widths = {
  full: '100%',

  iconXs: s(16),
  iconSm: s(20),
  iconMd: s(24),
  iconLg: s(32),
  iconXl: s(40),
  icon2xl: s(48),

  buttonSm: s(120),
  buttonMd: s(160),
  buttonLg: s(200),
};

/* 
   BORDER WIDTH
 */

export const BorderWidth = {
  none: 0,
  thin: 1,
  medium: 2,
};

/* 
   SHADOWS
 */

export const Shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },

  xs: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 1,
  },

  sm: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.45,
    shadowRadius: 6,
    elevation: 2,
  },

  md: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 4,
  },

  lg: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.55,
    shadowRadius: 24,
    elevation: 8,
  },

  xl: {
    shadowColor: '#327de5',
    shadowOffset: {
      width: 0,
      height: 16,
    },
    shadowOpacity: 0.6,
    shadowRadius: 40,
    elevation: 16,
  },

  '2xl': {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 24,
    },
    shadowOpacity: 0.65,
    shadowRadius: 60,
    elevation: 24,
  },
  primaryButton: {
    shadowColor: '#0000FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 9,
  },
};

/* 
   OPACITY
 */

export const Opacity = {
  disabled: 0.5,
  muted: 0.7,
  secondary: 0.8,
  overlay: 0.6,
};

export const GlobalStyle = {
  Colors,
  Spacing,
  Padding,
  Margin,
  FontSizes,
  LineHeights,
  FontWeights,
  Radius,
  Heights,
  Widths,
  BorderWidth,
  Shadows,
  Opacity,
};
