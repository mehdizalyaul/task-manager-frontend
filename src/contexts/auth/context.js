import {createContext} from "react";

const defaultUser = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
    role: 'Senior Designer',
    department: 'Design department'
};

export const AuthContext = createContext({
    user: defaultUser,
    updateUser: () => {}
});