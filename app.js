const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const auth = require('./middleware/auth');

const app = express();

// Conectar ao banco de dados MongoDB
mongoose.connect('mongodb+srv://wellingtonwd25:NC1BNSigAkwSZdTL@cluster0.hajkllb.mongodb.net/redesocial?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

app.use('/auth', authRoutes);

app.get('/posts', auth, (req, res) => {
    res.json([
        {
            id: 1,
            avatar: 'https://www.bootdey.com/img/Content/avatar/avatar2.png',
            name: 'Luis Felipe',
            date: 'Jan 1, 2021',
            image: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            description: 'Minha filha só assite esse!!!',
            likes: 122,
        },
        {
            id: 2,
            avatar: 'https://www.bootdey.com/img/Content/avatar/avatar8.png',
            name: 'Marcia Andrade',
            date: 'Dec 31, 2020',
            image: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            description: 'Esse desenho é incrivel!',
            likes: 243,
        },
        {
            id: 3,
            avatar: 'https://www.bootdey.com/img/Content/avatar/avatar8.png',
            name: 'Talita Oliveira',
            date: 'Dec 31, 2020',
            image: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
            description: 'Chato demais...',
            likes: 243,
        }
    ])
})

app.listen(3000, () => console.log('Server is running at http://localhost:3000'));