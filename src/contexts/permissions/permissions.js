
export const permissions = {
    Admin: {
        canEdit: true,
        canManage: true,
        canDelete: true,
        canInvite: true,
        canChangeSettings: false,
    },
    Member: {
        canEdit: true,
        canManage: false,
        canDelete: false,
        canInvite: false,
        canChangeSettings: false,
    },
    Viewer: {
        canEdit: false,
        canManage: false,
        canDelete: false,
        canInvite: false,
        canChangeSettings: false,
    }
};