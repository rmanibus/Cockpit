import {SourceTypes} from '../types/Source';
import { GitlabOutlined, GithubOutlined, CopyOutlined } from '@ant-design/icons';

export const sourceTypes: SourceTypes = {
    GITLAB: {color: 'orange', text: 'Gitlab', icon: GitlabOutlined},
    GITHUB: {color: 'green', text: 'Github', icon: GithubOutlined},
    LOCAL: {color: 'black', text: 'Local', icon: CopyOutlined},
}