import { createAsyncThunk } from '@reduxjs/toolkit';
import { ILink } from "../../../../types";
import axiosAPI from "../../../../axiosAPI.ts";

export const fetchPostLink = createAsyncThunk<void, ILink>(
    "postLink/fetchPostLink",
    async (form) => {
        await axiosAPI.post("/links", {...form});
    });


