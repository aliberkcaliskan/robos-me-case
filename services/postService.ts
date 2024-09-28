
import axios from 'axios';
import { POST_ENDPOINTS } from './endpoints';
import { ListItem } from '@/stores/slices/interface';

// Tüm postları getirir
export const fetchAllPosts = async (): Promise<ListItem[]> => {
    const response = await axios.get(POST_ENDPOINTS.ALL_POSTS);
    return response.data;
};

// Belirli bir post'u ID ile getirir
export const fetchPostById = async (id: string): Promise<ListItem> => {
    const response = await axios.get(POST_ENDPOINTS.POST_BY_ID(id));
    return response.data;
};

// Post'u günceller
export const updatePostById = async (id: string, updatedPost: { title: string; body: string }): Promise<ListItem> => {
    const response = await axios.put(POST_ENDPOINTS.POST_BY_ID(id), updatedPost);
    return response.data;
};
