
const samplevideo = require('../../sample.mp4')
const secondSampleVideo = require('../../video2.mp4')
export const videoData = {
     videosArray: [
        {
            url: samplevideo,
            comments: [
                {
                    name: 'Amit',
                    comment: 'Hello there',
                    id: '1',
                    date: 1584565345678
                }, {
                    name: 'Ayush',
                    comment: 'Hii Here',
                    id: '2',
                    date: 1576702618212
                },
                {
                    name: 'Amit',
                    comment: 'Hello there',
                    id: '3',
                    date: 1584565345678
                }, {
                    name: 'Ayush',
                    comment: 'Hii Here',
                    id: '4',
                    date: 1576702618212
                },
                {
                    name: 'Amit',
                    comment: 'Hello there',
                    id: '5',
                    date: 1584565345678
                }, {
                    name: 'Ayush',
                    comment: 'Hii Here Here Here Here Here Hii Here Here Here Here Here',
                    id: '6',
                    date: 1576702618212
                }
            ]
        },
        {
            url: secondSampleVideo,
            comments: []
        }
     ]
}