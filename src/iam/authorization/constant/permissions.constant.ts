import { Role } from './role.constant';

export const PERMISSIONS = {
  ADD_CATEGORY: [Role.MANAGER, Role.ADMIN],
  EDIT_CATEGORY: [Role.MANAGER, Role.ADMIN],
  REMOVE_CATEGORY: [Role.ADMIN],
  GET_CATEGORY: [],

  ADD_PUBLISHER: [Role.MANAGER, Role.ADMIN],
  EDIT_PUBLISHER: [Role.MANAGER, Role.ADMIN],
  REMOVE_PUBLISHER: [Role.ADMIN],
  GET_PUBLISHER: [],
};
