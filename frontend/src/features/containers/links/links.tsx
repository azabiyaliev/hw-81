import {Box, Button, CircularProgress, Container, Link, TextField, Typography} from "@mui/material";
import {ILink} from "../../../types";
import React, { useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {fetchPostLink} from "../store/thunks/thunks.ts";
import {isFetching, resLinksList} from "./linksSlice.ts";

const initialForm = {
    shortUrl: "",
    originalUrl: "",
};

const Links = () => {

    const [form, setForm] = useState<ILink>({ ...initialForm });
    const dispatch = useAppDispatch();
    const links = useAppSelector(resLinksList);
    const fetching = useAppSelector(isFetching);

    const onChangeField = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const submitForm = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if(form.originalUrl.trim().length === 0) {
                alert("Fill in url field");
            } else {
                await dispatch(fetchPostLink({...form}));
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Container>
            <Typography
                sx={{ mt: 15, textAlign: "center" }}
                color="primary"
                component="h1"
                variant="h3"
            >
                Shorten your link!
            </Typography>
            <form onSubmit={submitForm}>
                <Box
                    sx={{
                        mt: 2,
                        display: 'grid',
                        gap: 2,
                        flexWrap: 'wrap',
                        width: '100%',
                    }}
                >
                    <TextField
                        sx={{mx: 'auto', width: "50%"}}
                        type="text"
                        id="outlined-basic"
                        label="Enter here link"
                        name="originalUrl"
                        variant="outlined"
                        onChange={onChangeField}
                    />

                        <Button
                            type="submit"
                            sx={{mx: 'auto', width: "auto"}}
                            color="primary"
                            variant="outlined"
                            disabled={fetching}
                        >
                            Shorten
                        </Button>
                </Box>
                {fetching ? (
                    <Box sx={{display: 'flex'}}>
                        <CircularProgress sx={{mx: 'auto'}}/>
                    </Box>

                ) : links && (
                    <Box >
                        <Typography
                            sx={{ mt: 5, textAlign: "center" }}
                            color="info"
                            component="h4"
                            variant="h5"
                        >
                            Your link now looks like this:
                        </Typography>
                        <Link
                            sx={{display: "block", textAlign: "center", fontSize: 18, mt: 2 }}
                            href={links.originalUrl}
                        >
                            {`http://localhost:8000/${links.shortUrl}`}
                        </Link>
                    </Box>
                )}
            </form>
        </Container>
    );
};

export default Links;