import { app } from './app';

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}/`);
});

export default server;