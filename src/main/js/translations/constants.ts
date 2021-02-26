import {SourceTypes} from '../types/Source';
import { GitlabOutlined, GithubOutlined, CopyOutlined, PullRequestOutlined, ArrowUpOutlined } from '@ant-design/icons';

export const sourceTypes: SourceTypes = {
    GITLAB: {color: 'orange', text: 'Gitlab', icon: GitlabOutlined},
    GITHUB: {color: 'green', text: 'Github', icon: GithubOutlined},
    LOCAL: {color: 'black', text: 'Local', icon: CopyOutlined},
}

export const stackTypes = {
    COMPOSE: {color: 'blue', text: 'Docker Compose'},
    SWARM: {color: 'blue', text: 'Swarm'},
    K8S: {color: 'blue', text: 'Kubernetes'},
}

export const commitModes = {
    GIT_PUSH: { text: 'Git Push', icon: ArrowUpOutlined },
    PULL_REQUEST: { text: 'Pull Request', icon: PullRequestOutlined }
}

export const deployModes = {

    GITLAB_CI: { text: 'Gitlab CI',  sources: ['GITLAB'] },
    GITHUB_ACTIONS: { text: 'Github Actions', sources: ['GITHUB'] },
    JENKINS: { text: 'Github Actions', sources: ['GITHUB', 'GITLAB'] },
    LOCAL: { text: 'Local', sources: ['GITHUB', 'GITLAB', 'LOCAL'] }
    
}