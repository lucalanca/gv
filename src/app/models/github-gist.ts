
import {GithubRepoOwner} from "./github-repo";
export interface GithubGist {
  url: string;
  forks_url: string;
  commits_url: string;
  id: string;
  git_pull_url: string;
  git_push_url: string;
  html_url: string;
  files: any;
  public: boolean;
  created_at: string;
  updated_at: string;
  description: string;
  comments: number;
  user: any;
  comments_url: string;
  owner: GithubRepoOwner;
  truncated: boolean;
}
