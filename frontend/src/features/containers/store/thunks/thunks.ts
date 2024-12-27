import { createAsyncThunk } from '@reduxjs/toolkit';
import {ILink, ILinkWithId} from "../../../../types";
import axiosAPI from "../../../../axiosAPI.ts";

export const fetchPostLink = createAsyncThunk<ILinkWithId, ILink>(
    "postLink/fetchPostLink",
    async (form) => {
         const response = await axiosAPI.post<ILink>("/links", {...form});
         return response.data as ILinkWithId;
    });

