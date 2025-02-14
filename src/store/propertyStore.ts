import { removeAuthCookie } from '@/helpers/cookies/authCookie';
import { IResponse } from '@/helpers/handleRequest';
import { PropertyEntity } from '@/interfaces/EntitiesForNewAPI/PropertyEntity';
import { propertyServices } from '@/services/property/property';
import { TModelPagination } from '@/types/TModelPagination';
import { Types } from 'mongoose';
import { create } from 'zustand'


type State = {
  properties: PropertyEntity[] | null;
  property: PropertyEntity | null;
  searchData: PropertyEntity[] | null;
  searchInput: string;
  currentPage: number;
  totalPages: number;
  propertyPerPage: number;
  rejectSkeleton: boolean;
};

type Actions = {
  setSearchData: (searchData: PropertyEntity[] | null) => void;

  setSearchInput: (searchInput: string) => void;

  setCurrentPage: (currentPage: number) => void;

  setPropertyPerPage: (page: number) => void;

  setRejectSkeleton: (rejectSkeleton: boolean) => void;

  find: (page: number) => Promise<IResponse<TModelPagination<PropertyEntity>>>;

  create: (property: PropertyEntity) => Promise<IResponse<PropertyEntity>>;

  update: (
    propertyId: Types.ObjectId,
    property: {
      name: string;
      category: string,
      account: string
    }
  ) => Promise<IResponse<PropertyEntity>>;
}


export const propertyStore = create<State & Actions>((set) => ({
  searchData: [],
  properties: [],
  property: null,

  searchInput: "",
  currentPage: 1,
  totalPages: 1,
  propertyPerPage: 0,
  rejectSkeleton: false,

  setSearchData: (data) => set({ searchData: data }),

  setSearchInput: (data) => set({ searchInput: data }),

  setPropertyPerPage: (data) => set({ propertyPerPage: data }),

  setCurrentPage: (data) => set({ currentPage: data }),

  setRejectSkeleton: (data) => set({ rejectSkeleton: data }),

  find: async (page) => {
    const response = await propertyServices().find(page);

    if (response.status === 401) {
      removeAuthCookie()
      window.location.href = '/login'
    }

    if (!response.error.value) {
      set({
        properties: response.data?.data,
        currentPage: response.data?.pagination.currentPage,
        totalPages: response.data?.pagination.totalPages,
        propertyPerPage: response.data?.pagination.pageSize,
      })
    }

    return response
  },

  create: async (property) => {
    const response = await propertyServices().create(property);

    if (response.status === 401) {
      removeAuthCookie()
      window.location.href = '/login'
    }

    if (!response.error.value) {
      set({ rejectSkeleton: false });
    }
    return response;
  },

  update: async (propertyId, property) => {
    const response = await propertyServices().update(propertyId, property);

    if (response.status === 401) {
      removeAuthCookie()
      window.location.href = '/login'
    }

    if (!response.error.value) {
      const allProperties = await propertyServices().find(1);

      set({
        properties: allProperties.data?.data,
        currentPage: allProperties.data?.pagination.currentPage,
        totalPages: allProperties.data?.pagination.totalPages,
        propertyPerPage: allProperties.data?.pagination.pageSize,
      })
    }

    return response
  }
})) 