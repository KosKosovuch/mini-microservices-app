const app = require('express')();
const axios = require('axios');

app.use(require('body-parser').json());
app.use(require('cors')());

const posts = {};

const handleEvent = (type, data) => {
    if (type === 'PostCreated') {
        const { id, title } = data;

        posts[id] = { id, title, comments: [] };
    }

    if (type === 'CommentCreated') {
        const { id, content, postId, status } = data;

        posts[postId].comments.push({ id, content, status });
    }

    if (type === 'CommentUpdated') {
        const { id, content, postId, status } = data;

        const comment = posts[postId].comments.find(comment => comment.id === id);

        comment.status = status;
        comment.content = content;
    }
}

app.get('/posts', (_req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    const { type, data } = req.body;

    handleEvent(type, data);

    res.send({ status: 'OK' });
});

app.listen(4002, async () => {
    console.log('Listening on 4002');

    const res = await axios.get('http://localhost:4005/events').catch(err => console.log(err.message));

    for (let event of res.data) {
        console.log('Processing event: ', event.type);

        handleEvent(event.type, event.data);
    }
});
