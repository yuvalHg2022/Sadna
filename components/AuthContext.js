import React ,{useContext,useEffect ,useState} from 'react'
import {auth} from '../config.js'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext);
}


export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState(null);
    const[currentUserInfo, setCurrentUserInfo] = useState(null);
''
    // async function getUserInfo(userEmail){
    //     const usersRef = collection(db, 'Users');
    //     try {
    //       const usersQuery = query(usersRef, where('email', '==', userEmail));
    //       const querySnapshot = await getDocs(usersQuery);
    //       if (querySnapshot.size === 0) {
    //         alert('This email address is not registered');
    //         return;
    //       }
          
    //       const userDoc = querySnapshot.docs[0];
    //       const userData = userDoc.data();
    //       setCurrentUserInfo(userData);
    //     } catch (error) {
    //       console.log('Error while getting documents:', error);
    //       alert('An error occurred while signing in');
    //     }
    // }

    async function SignUpAuth(email, password) {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
        } catch (error) {
            console.log(error.message);
        }
    }

    async function LogInAuth(email, password) {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            console.log(error.message);
        }
    }

    function LogOut() {
        try {
            signOut(auth)
        } catch {
            console.log(error.message)
        }
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        })
        return unsubscribe;
    }, [])

    const value = {
        currentUser,
        setCurrentUser,
        // getUserInfo,
        currentUserInfo,
        setCurrentUserInfo,
        SignUpAuth,
        LogInAuth,
        LogOut
    }

  return (
    <>
        <AuthContext.Provider value={value}>
           {children}
        </AuthContext.Provider>
    </>
  )
}
