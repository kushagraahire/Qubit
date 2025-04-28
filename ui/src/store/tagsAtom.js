import { atom } from "recoil";

export const tagListAtom = atom({
    default : null,
    key : "tagListAtom"
})

export const selectedTagState = atom({
    key: 'selectedTagState',
    default: null
  });