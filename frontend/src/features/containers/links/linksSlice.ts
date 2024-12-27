import { createSlice,  } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store.ts';
import { ILinkWithId } from "../../../types";
import { fetchPostLink } from "../store/thunks/thunks.ts";

interface linksState {
    responseLinks: ILinkWithId[];
    isFetching: boolean;
}

const initialState: linksState = {
    responseLinks: [],
    isFetching: false,
};

export const resLinksList = (state: RootState) => state.links.responseLinks;

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
            .addCase(fetchPostLink.fulfilled, (state) => {
                state.isFetching = false;
            })
            .addCase(fetchPostLink.rejected, (state) => {
                state.isFetching = false;
            })
    }
});

export const linksReducer = linksSlice.reducer;
