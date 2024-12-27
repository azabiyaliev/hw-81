import {createSlice, PayloadAction,} from '@reduxjs/toolkit';
import { RootState } from '../../../app/store.ts';
import { ILinkWithId } from "../../../types";
import {fetchPostLink} from "../store/thunks/thunks.ts";

interface linksState {
    responseLinks: ILinkWithId | null;
    isFetching: boolean;
}

const initialState: linksState = {
    responseLinks: null,
    isFetching: false,
};

export const resLinksList = (state: RootState) => state.links.responseLinks;
export const isFetching = (state: RootState) => state.links.isFetching;

export const linksSlice = createSlice({
    name: "links",
    initialState,
    reducers:{
    },
    extraReducers:(builder) => {
        builder
            .addCase(fetchPostLink.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(fetchPostLink.fulfilled, (state, action: PayloadAction<ILinkWithId>) => {
                state.isFetching = false;
                state.responseLinks = action.payload
            })
            .addCase(fetchPostLink.rejected, (state) => {
                state.isFetching = false;
            })

    }
});

export const linksReducer = linksSlice.reducer;
