/*global FB:true*/

import {
    GET_PHOTOS_REQUEST,
    GET_PHOTOS_FAIL,
    GET_PHOTOS_SUCCESS
} from '../constants/Page';

function makeYearPhotos(photos, selectedYear) {
    let createdYear, yearPhotos = [];

    photos.forEach((item) => {
        item.likes_count = item.likes.summary.total_count;
        item.img_url = item.images[0].source;

        createdYear = new Date(item.created_time).getFullYear();
        if (createdYear === selectedYear) {
            yearPhotos.push(item)
        }
    });

    return yearPhotos.sort((a, b) => b.likes_count - a.likes_count)
}

function loadPhotos(year, dispatch) {
    FB.api(
        'me/photos?fields=created_time,likes.summary(1),images&limit=50&type=uploaded',
        function (response) {
            if (response) {
                if (response.error) {
                    return dispatch({
                        type: GET_PHOTOS_FAIL,
                        error: true,
                        payload: response.error
                    });
                }

                dispatch({
                    type: GET_PHOTOS_SUCCESS,
                    payload: makeYearPhotos(response.data, year)
                });
            }
        }
    );
}

export function getPhotos(year) {
    return (dispatch) => {
        try {
            dispatch({
                type: GET_PHOTOS_REQUEST,
                payload: year
            });

            loadPhotos(year, dispatch);
        } catch (e) {
            dispatch({
                type: GET_PHOTOS_FAIL,
                error: true,
                payload: new Error(e)
            });
        }
    }
}
