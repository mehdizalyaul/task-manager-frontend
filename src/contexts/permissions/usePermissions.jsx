import {useMemo} from 'react';
import {useBoards} from '../boards/index.js';
import {useAuth} from "../auth/index.js";
import {getPermissionsForRole} from "./utils.js";

export const usePermissions = () => {
    const {user} = useAuth();
    const {currentBoardData} = useBoards();

    return useMemo(() => {
        if (!currentBoardData) {
            return getPermissionsForRole('Viewer');
        }

        const member = currentBoardData.members.find(m => m.id === user.id);
        return getPermissionsForRole(member?.role ?? 'Viewer');
    }, [currentBoardData, user.id]);
};

export const useCanEdit = () => usePermissions().canEdit;
export const useCanManage = () => usePermissions().canManage;
export const useCanDelete = () => usePermissions().canDelete;