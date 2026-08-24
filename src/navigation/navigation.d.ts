// src/navigation/navigation.d.ts

import type { RootStackParamList } from './types';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}