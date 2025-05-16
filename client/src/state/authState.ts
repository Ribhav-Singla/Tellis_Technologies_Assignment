import { atom } from 'recoil';

interface AuthState {
  user: { token: string } | null;
}

export const authState = atom<AuthState>({
  key: 'authState',
  default: {
    user: null,
  },
});

