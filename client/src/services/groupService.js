import axios from 'axios';

const API_URL = 'http://localhost:5000/api/groups';

const CreateGroup = (name, description) => {
    const user = JSON.parse(localStorage.getItem('user'));
    return axios.post(
        `${API_URL}/create`,
        { name, description },
        {
            headers: { Authorization: `Bearer ${user.token}` },
        }
    );
};

const inviteMember = (groupId, email) => {
    const user = JSON.parse(localStorage.getItem('user'));
    return axios.post(
        `${API_URL}/invite`,
        { groupId, email },
        {
            headers: { Authorization: `Bearer ${user.token}` },
        }
    );
};

const getGroup = (groupId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    return axios.get(`${API_URL}/${groupId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
    });
};

const groupService = {
    CreateGroup,
    inviteMember,
    getGroup,
};

export default groupService;
