import initApp from "../../src/index.js";
import { PORT } from "../../config/env.js";

const app = initApp();

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`)
});
