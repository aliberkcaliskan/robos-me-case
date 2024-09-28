import { create } from 'zustand';
import Cookies from 'js-cookie';

type UserState = {
  companyCode: string;
  region: string;
  email: string;
  setUser: (userData: { companyCode: string; region: string; email: string }) => void;
  clearUser: () => void;
  loadUserFromCookies: () => void;
};

const useUserStore = create<UserState>((set) => ({
  companyCode: '',
  region: '',
  email: '',

  setUser: (userData) => {
    // Store'a kullanıcı bilgisini kaydet
    set({
      companyCode: userData.companyCode,
      region: userData.region,
      email: userData.email,
    });

    // Kullanıcı bilgilerini cookie'ye kaydet
    Cookies.set('companyCode', userData.companyCode);
    Cookies.set('region', userData.region);
    Cookies.set('email', userData.email);
  },

  clearUser: () => {
    // Store'daki kullanıcı bilgisini temizle
    set({
      companyCode: '',
      region: '',
      email: '',
    });

    // Cookie'leri temizle
    Cookies.remove('companyCode');
    Cookies.remove('region');
    Cookies.remove('email');
  },

  // Sayfa yüklendiğinde cookie'lerden kullanıcı bilgilerini yükler
  loadUserFromCookies: () => {
    const companyCode = Cookies.get('companyCode');
    const region = Cookies.get('region');
    const email = Cookies.get('email');

    if (companyCode && region && email) {
      set({
        companyCode,
        region,
        email,
      });
    }
  },
}));

export default useUserStore;
