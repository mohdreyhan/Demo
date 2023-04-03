import {
  ASSIGNED_ATTORNEYS, ATTORNEY_SEARCH_LIST,
  ATTORNEY_ASSIGNED_FLAG, ADD_ATTORNEY_INPUTS, EDIT_ATTORNEY_INPUTS , CANCEL_ATTORNEY_PAGE
} from "./Types.js";

/*------------------------------ ASSIGNED ATTORNEY OF A RESPONSIBLE -------------------------------------------*/

export const ASSIGNEDATTORNEYS = (value) => {
  return {
    type: ASSIGNED_ATTORNEYS,
    payload: { value },
  };
};


/*------------------------------ ADD ATTORNEY -------------------------------------------*/

export const ADDATTORNEYINPUTS = (name, value, operation) => {
  return {
    type: ADD_ATTORNEY_INPUTS,
    payload: { name, value, operation },
  };
};


/*------------------------------ EDIT ATTORNEY -------------------------------------------*/

export const EDITATTORNEYINPUTS = (name, value, operation) => {
  return {
    type: EDIT_ATTORNEY_INPUTS,
    payload: { name, value, operation },
  };
};

/*------------------------------ ATTORNEY ASSIGNED FLAG -------------------------------------------*/

export const ATTORNEYASSIGNEDFLAG = (value) => {
  return {
    type: ATTORNEY_ASSIGNED_FLAG,
    payload: { value },
  };
};

/*------------------------------ ATTORNEY SEARCH LIST -------------------------------------------*/

export const ATTORNEYSEARCHLIST= (value) => {
  return {
    type: ATTORNEY_SEARCH_LIST,
    payload: { value },
  };
};


export const ATTORNEYCANCELPAGE = (value) => {
  value = {data : value}
  return {
    type: CANCEL_ATTORNEY_PAGE,
    payload: { value },
  };
};