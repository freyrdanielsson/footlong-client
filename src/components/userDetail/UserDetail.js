import React, { useEffect } from 'react';

import './UserDetail.scss';

export default function UserDetail(props) {
    const { userProps: { user }, onEdit } = props;

    return (
        <div className='user-detail'>
            <div className='user-detail__container'>
                <p className='user-detail__label'>Username</p>
                <p className='user-detail__value'>{user.username}</p>
            </div>
            <div className='user-detail__container'>
                <p className='user-detail__label'>Email</p>
                <p className='user-detail__value'>{user.email}</p>
            </div>

            <button className='user-detail__button' onClick={onEdit}>Edit</button>
        </div>
    )
}


