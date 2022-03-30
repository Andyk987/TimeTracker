// import original module declarations
import 'styled-components';
import { Colors, Common, Font, GradientColors } from './theme';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Colors,
    gradientColors: GradientColors,
    font: Font,
    common: Common
  }
}