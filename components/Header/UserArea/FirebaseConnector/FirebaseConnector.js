import { useSelector } from "react-redux";
import { useFirebaseConnect } from "react-redux-firebase";

export default function FirebaseConnector() {
    const auth = useSelector((state) => state.firebase.auth);
    useFirebaseConnect(`users/${auth.uid}`, [auth.uid]);
    return <></>
}