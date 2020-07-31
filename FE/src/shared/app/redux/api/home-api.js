import Axios from '../../shared/services/axios-service';

const getUsers = async () => {
	const query = `
    {
        getUsers {
          users(userCount: 110) {
            id,
            name {
              first_name
              last_name
              middle_name
              prefix
              nick_name
            }
            address {
              id
               line1
              line2
              zip_code
              city
              state
              country
            }
            friends{
                id
                name {
                  first_name
                  last_name
                  middle_name
                  prefix
                  nick_name
                }
                address {
                  id
                  line1
                  line2
                  zip_code
                  city
                  state
                  country
                }
                hobbies
            }
            hobbies
          }
        }
      }`;
	const {	data: { getUsers: data }
    } = await Axios.post('/graphql', { query });
	return data;
};

export default {
	getUsers
};