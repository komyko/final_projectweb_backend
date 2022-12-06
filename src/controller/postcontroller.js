const Post = require('../models/post-schema');

const currentTime = Date.now()
exports.uploadpost = async(req,res) => {

    try {

        req.body.timestamp = currentTime
        const data = await Post.create(req.body)

        res.status(200).json({result: 'OK', message: 'success create event', data: data});

    }catch (e){
        res.status(500).json({result: 'Internal Server Error', message: '', data: {}});
    }
}

exports.getData = async(req,res) => { 

    try {

        const data = await Post.find( )
        if(!data) return res.status(404).json({result: 'Not found', message: '', data: {}});

        const post_data = []

        for(let i = 0; i < data.length; i++) {
            const schema = {
                _id: data[i]._id,
                name: data[i].name,
                detail: data[i].detail,
                timestamp: data[i].timestamp,
            }
            post_data.push(schema)
        }

        res.status(200).json({result: 'OK', message: 'success get all post', data: {data: post_data}});
    } catch (e) {
        res.status(500).json({result: 'Internal Server Error', message: '', data: {}});
    }
}