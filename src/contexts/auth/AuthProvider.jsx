import {useState, useMemo} from "react";
import {AuthContext} from "./context.js";

const defaultUser = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
    role: 'Senior Designer',
    department: 'Design department'
};

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(defaultUser);

    const updateUser = (userData) => {
        setUser(prevUser => ({...prevUser, ...userData}));
    };

    const value = useMemo(() => {
        return {
            user,
            updateUser
        }
    }, [user]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}