import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalName } from "../../common/types";

type Modal = {
    type: ModalName;
    state: boolean;
    metadata: {
        url?: string;
    }
}

type ToogleModalPayload = {
    modalType: Modal['type'],
    modalState: Modal['state'],
    modalMetaData?: Modal['metadata']
};

interface CommonState {
    modal?: Modal;
}

const initialState: CommonState = {
    modal: {
        type: 'urlModal',
        state: false,
        metadata: {}
    }
}

const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        toogleModal: (state, { payload: { modalType, modalState, modalMetaData } }: PayloadAction<ToogleModalPayload>) => {
            state.modal = { ...state.modal, type: modalType, state: modalState, metadata: modalMetaData }
        }
    }
});

export const commonActions = commonSlice.actions;

export default commonSlice.reducer;