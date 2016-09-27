// ACTIONS
import {GithubRepo} from "../models/github-repo";
import {GithubUser} from "../models/github-user";
import {GithubGist} from "../models/github-gist";

export const GET_USER = 'GET_USER'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_REPOS_SUCCESS = 'GET_USER_REPOS_SUCCESS';
export const GET_USERS_GISTS_SUCCESS = 'GET_USER_GISTS_SUCCESS';

// ACTION CREATORS
export const getUser = (handle: string) => ({
  type: GET_USER,
  payload: handle
});

export const getUserSuccess = (user: GithubUser) => ({
  type: GET_USER_SUCCESS,
  payload: user
});

export const getUserReposSuccess = (repos: GithubRepo[]) => ({
  type: GET_USER_REPOS_SUCCESS,
  payload: repos
});

export const getUserGistsSuccess = (gists: GithubGist[]) => ({
  type: GET_USERS_GISTS_SUCCESS,
  payload: gists
});
