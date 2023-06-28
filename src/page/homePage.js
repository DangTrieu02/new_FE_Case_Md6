// user/homePage.js
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Cards from "../components/Cards";
import Filter from "../components/Filter";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllHome,
    getHomeByName,
    getHomeByStatus,
} from "../service/homeService";
import {
    setFilter,
    resetFilter,
} from "../redux/slice/homeSlice";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import Button from "@mui/material/Button";

function HomePage() {
  console.log('day la home')
  const homes = useSelector(({ home }) => {
    return home.list
  })
    const filters = useSelector((state) => state.home.filters);
    const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllHome())
  }, []);

    const [selectedFilter, setSelectedFilter] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSearch = () => {
        if (selectedFilter === 0) {
            dispatch(setFilter({ nameHome: searchQuery }));
            dispatch(getHomeByName(searchQuery));
        } else {
            dispatch(setFilter({ status: searchQuery }));
            dispatch(getHomeByStatus(searchQuery));
        }
        handleCloseDialog();
    };

    const handleResetFilter = () => {
        dispatch(resetFilter());
        dispatch(getAllHome());
    };

    return (
        <>
            <Header />
            <Filter
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                onSearchQueryChange={setSearchQuery}
                onOpenDialog={handleOpenDialog}
                onResetFilter={handleResetFilter}
            />
            {homes && <Cards list={homes} />}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Select Filter Option</DialogTitle>
                <DialogContent>
                    <TextField
                        select
                        label="Filter by"
                        value={selectedFilter}
                        onChange={(e) => setSelectedFilter(e.target.value)}
                        SelectProps={{
                            native: true,
                        }}
                    >
                        <option value={0}>Name</option>
                        <option value={1}>Status</option>
                    </TextField>
                    <TextField
                        label="Filter Value"
                        variant="outlined"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSearch} variant="contained">
                        Apply
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default HomePage