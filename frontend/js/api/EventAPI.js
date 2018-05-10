import React from 'react';

export default class EventAPI {
    static get(id) {
        return {
            'id': id,
            'some': 'data'
        }
    }

    static all() {
        return [
            {
                'id': 1,
                'some': 'data1'
            },
            {
                'id': 2,
                'some': 'data2'
            }
        ];
    }
}