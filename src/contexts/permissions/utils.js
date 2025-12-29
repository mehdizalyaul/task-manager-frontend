import {permissions} from "./permissions";

export function getPermissionsForRole(role) {
    return permissions[role];
};
