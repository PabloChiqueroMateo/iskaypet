import { app } from "./app";

const port = process.env.port || 3003;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});