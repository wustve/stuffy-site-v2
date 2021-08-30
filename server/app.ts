import express from 'express';
import path from 'path';
const app = express();
const port = process.env.PORT || 3000;;

const publicPath = path.join(path.resolve(), 'build');
app.use(express.static(publicPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
 });

app.listen(port, () => {
    console.log(`server is running on ${port}`)
})