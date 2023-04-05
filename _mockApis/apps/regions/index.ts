import mock from '../../mockAdapter';
// import type { ContactType } from '@/types/apps/ContactType';

import user1 from '/images/profile/user-1.jpg';
import user2 from '/images/profile/user-2.jpg';
import user3 from '/images/profile/user-3.jpg';
import user4 from '/images/profile/user-4.jpg';
import user5 from '/images/profile/user-5.jpg';
import user6 from '/images/profile/user-6.jpg';
import user7 from '/images/profile/user-7.jpg';
import user8 from '/images/profile/user-8.jpg';
import user9 from '/images/profile/user-9.jpg';
import user10 from '/images/profile/user-10.jpg';


// types
export type KeyedObject = {
    [key: string]: string | number | KeyedObject | any;
};

const contacts: KeyedObject[] = [
    {
        id: '#123',
        avatar: user1,
        userinfo: 'Dakar',
        usermail: 'hgover@gmail.com',
        phone: '+123 456 789',
        jdate: '12-10-2014',
        role: 'Sénégal',
        rolestatus: 'primary'
    },
    {
        id: '#452',
        avatar: user2,
        userinfo: 'Paris',
        usermail: 'hgover@gmail.com',
        phone: '+234 456 789',
        jdate: '10-09-2014',
        role: 'France',
        rolestatus: 'secondary'
    },
    {
        id: '#565',
        avatar: user3,
        userinfo: 'Bamako',
        usermail: 'hgover@gmail.com',
        phone: '+345 456 789',
        jdate: '01-10-2013',
        role: 'Mali',
        rolestatus: 'error'
    }
];

// ==============================|| MOCK SERVICES ||============================== //

// mock.onGet('/api/products/list').reply(200, { products });
mock.onGet('/api/contacts').reply(() => {
    return [200, contacts];
});


export default contacts;
