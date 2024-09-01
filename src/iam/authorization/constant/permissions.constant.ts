import { Role } from './role.constant';

export const PERMISSIONS = {
  ADD_TYPE: [Role.MANAGER, Role.ADMIN],
  EDIT_TYPE: [Role.MANAGER, Role.ADMIN],
  REMOVE_TYPE: [Role.ADMIN],
  GET_TYPE: [],

  ADD_CATEGORY: [Role.MANAGER, Role.ADMIN],
  EDIT_CATEGORY: [Role.MANAGER, Role.ADMIN],
  REMOVE_CATEGORY: [Role.ADMIN],
  GET_CATEGORY: [],

  ADD_PUBLISHER: [Role.MANAGER, Role.ADMIN],
  EDIT_PUBLISHER: [Role.MANAGER, Role.ADMIN],
  REMOVE_PUBLISHER: [Role.ADMIN],
  GET_PUBLISHER: [],

  ADD_DESIGNER: [Role.MANAGER, Role.ADMIN],
  EDIT_DESIGNER: [Role.MANAGER, Role.ADMIN],
  REMOVE_DESIGNER: [Role.ADMIN],
  GET_DESIGNER: [],

  ADD_ARTIST: [Role.MANAGER, Role.ADMIN],
  EDIT_ARTIST: [Role.MANAGER, Role.ADMIN],
  REMOVE_ARTIST: [Role.ADMIN],
  GET_ARTIST: [],

  ADD_MECHANISM: [Role.MANAGER, Role.ADMIN],
  EDIT_MECHANISM: [Role.MANAGER, Role.ADMIN],
  REMOVE_MECHANISM: [Role.ADMIN],
  GET_MECHANISM: [],

  ADD_GAME: [Role.MANAGER, Role.ADMIN],
  EDIT_GAME: [Role.MANAGER, Role.ADMIN],
  REMOVE_GAME: [Role.ADMIN],
  GET_GAME: [],

  ADD_PRODUCT: [Role.MANAGER, Role.ADMIN],
  EDIT_PRODUCT: [Role.MANAGER, Role.ADMIN],
  REMOVE_PRODUCT: [Role.ADMIN],
  GET_PRODUCT: [],
};
