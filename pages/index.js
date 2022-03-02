import { useSelector } from 'react-redux';
import commonStyles from '../styles/common.module.css';
import Container from '@mui/material/Container';
import SavedMoviesContainer from '../components/_Index/SavedMoviesContainer/SavedMoviesContainer';
import { Typography } from '@mui/material';
import styles from '../styles/Home.module.css';

export default function Home() {
  const auth = useSelector((state) => state.firebase.auth);
  const loggedIn = auth.isLoaded && !auth.isEmpty;
  if (loggedIn) {
    return (
      <Container className={commonStyles.ContainerLoading}>
        <SavedMoviesContainer />
      </Container>
    );
  } else {
    return (
      <Container>
        <Typography sx={{ mx: 'auto',  px: 20, mt: 5, fontSize: 70, fontWeight: 'bold', textAlign: 'center'}}>
          Stop wasting your time looking for good movies and start watching them.
        </Typography>
        <Typography sx={{ mx: 'auto', px: 20, mt: 5, fontSize: 70, fontWeight: 'bold', textAlign: 'center'}}>With <span className={styles.rainbowText}>machine learning.</span></Typography>
      </Container>
    );
  }
}
