import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useDispatch } from 'react-redux';
import { getHomeByName, getHomeByCategory, getHomeByPrice, getHomeByStatus } from '../../service/homeService';

const SearchDialog = ({ open, onClose }) => {
    const dispatch = useDispatch();
    const [searchType, setSearchType] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [priceMin, setPriceMin] = useState('');
    const [priceMax, setPriceMax] = useState('');
    const [categoryOptions, setCategoryOptions] = useState({
        option1: false,
        option2: false,
        option3: false,
    });

    const handleSearch = () => {
        if (searchType === 'name') {
            dispatch(getHomeByName(searchValue));
        } else if (searchType === 'category') {
            const selectedCategories = Object.keys(categoryOptions).filter((key) => categoryOptions[key]);
            dispatch(getHomeByCategory(selectedCategories));
        } else if (searchType === 'price') {
            dispatch(getHomeByPrice({ min: priceMin, max: priceMax }));
        } else if (searchType === 'status') {
            dispatch(getHomeByStatus(searchValue));
        }

        onClose();
    };

    const handleCancel = () => {
        setSearchType('');
        setSearchValue('');
        setPriceMin('');
        setPriceMax('');
        setCategoryOptions({
            option1: false,
            option2: false,
            option3: false,
        });
        onClose();
    };

    const handleCategoryOptionChange = (event) => {
        setCategoryOptions({ ...categoryOptions, [event.target.name]: event.target.checked });
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Search Homes</DialogTitle>
            <DialogContent>
                <TextField
                    select
                    label="Search By"
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    fullWidth
                    margin="normal"
                >
                    <MenuItem value="name">Name</MenuItem>
                    <MenuItem value="category">Category</MenuItem>
                    <MenuItem value="price">Price</MenuItem>
                    <MenuItem value="status">Status</MenuItem>
                </TextField>
                {searchType === 'name' && (
                    <TextField
                        label="Search Value"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                )}
                {searchType === 'category' && (
                    <>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={categoryOptions.option1}
                                    onChange={handleCategoryOptionChange}
                                    name="option1"
                                />
                            }
                            label="Category 1"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={categoryOptions.option2}
                                    onChange={handleCategoryOptionChange}
                                    name="option2"
                                />
                            }
                            label="Category 2"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={categoryOptions.option3}
                                    onChange={handleCategoryOptionChange}
                                    name="option3"
                                />
                            }
                            label="Category 3"
                        />
                    </>
                )}
                {searchType === 'price' && (
                    <>
                        <TextField
                            label="Min Price"
                            value={priceMin}
                            onChange={(e) => setPriceMin(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Max Price"
                            value={priceMax}
                            onChange={(e) => setPriceMax(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                    </>
                )}
                {searchType === 'status' && (
                    <TextField
                        select
                        label="Status"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        fullWidth
                        margin="normal"
                    >
                        <MenuItem value="Available">Available</MenuItem>
                        <MenuItem value="Hiring">Hiring</MenuItem>
                        <MenuItem value="Unavailable">Unavailable</MenuItem>
                    </TextField>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleSearch} variant="contained" color="primary">
                    Search
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SearchDialog;
