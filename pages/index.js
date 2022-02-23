import { useSelector } from 'react-redux';
import commonStyles from '../styles/common.module.css';
import Container from '@mui/material/Container';
import SavedMoviesContainer from '../components/_Index/SavedMoviesContainer/SavedMoviesContainer';

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
    return (<p>hero area</p>);
  }
}
