import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type IModalConfig = {
  title: string;
  description: string;
  id: number;
};

type IModal = {
  isModalOpen: boolean;
  config: IModalConfig;
};

const initialState = {
  isModalOpen: false,
  config: { title: "", description: "", id: 0 },
} as IModal;

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setIsModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
    setConfigModal: (state, action: PayloadAction<IModalConfig>) => {
      state.config = action.payload;
    },
  },
});

export const { setIsModalOpen, setConfigModal } = modalSlice.actions;
