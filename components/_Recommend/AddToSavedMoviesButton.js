import React, {useState, addEffect} from 'react';
import { doc, setDoc, collection, query, where } from "firebase/firestore"; 
import { Button } from '@mui/material';
import styles from './AddToSavedMoviesButton.module.css';


const AddToSavedMoviesButton = ({ movieId, userId }) => {
    useEffect (() => {
        



    const [isSaved, setIsSaved] = useState(false);

    const handleClick = () => {
        await setDoc(doc(db, "cities", "LA"), {
            name: "Los Angeles",
            state: "CA",
            country: "USA"
          });
    };
    return (
        <Button className={`${styles.AddToSavedMoviesButton} ${}`} color="inherit" variant="text">
              <span>Add to my saved movies</span>
            </Button>
    )
