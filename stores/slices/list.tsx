import { create } from 'zustand';
import { fetchAllPosts, fetchPostById, updatePostById } from '@/services/postService';
import { ListItem } from './interface';

type PostStoreState = {
  posts: ListItem[]; // Tüm postlar
  selectedPost: ListItem | null; // Seçili post
  isLoading: boolean; // Yükleniyor durumu
  errorMessage: string | null; // Hata mesajı
  loadPosts: () => Promise<void>; // Tüm postları yükle
  loadPostById: (id: string) => Promise<void>; // Belirli post'u ID ile yükle
  updatePost: (id: string, updatedPost: { title: string; body: string }) => Promise<void>; // Post'u günceller
};

const usePostStore = create<PostStoreState>((set) => ({
  posts: [],
  selectedPost: null,
  isLoading: false,
  errorMessage: null,

  loadPosts: async () => {
    set({ isLoading: true, errorMessage: null });
    try {
      const posts = await fetchAllPosts();
      set({ posts, isLoading: false });
    } catch (error) {
      set({
        errorMessage: 'Postlar yüklenirken bir hata oluştu. Lütfen tekrar deneyin.',
        isLoading: false,
      });
    }
  },

  loadPostById: async (id: string) => {
    set({ isLoading: true, errorMessage: null });
    try {
      const post = await fetchPostById(id);
      set({ selectedPost: post, isLoading: false });
    } catch (error) {
      set({
        errorMessage: 'Post yüklenirken bir hata oluştu. Lütfen tekrar deneyin.',
        isLoading: false,
      });
    }
  },

  updatePost: async (id: string, updatedPost: { title: string; body: string }) => {
    set({ isLoading: true, errorMessage: null });
    try {
      const updated = await updatePostById(id, updatedPost);
      console.log('🚀 ~ updatePost: ~ updated:', updated);
      set((state) => ({
        selectedPost: state.selectedPost ? { ...state.selectedPost, ...updatedPost } : null,
        isLoading: false,
      }));
    } catch (error) {
      set({
        errorMessage: 'Post güncellenirken bir hata oluştu. Lütfen tekrar deneyin.',
        isLoading: false,
      });
    }
  },
}));

export default usePostStore;
