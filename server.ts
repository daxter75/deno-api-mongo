import { Application} from "https://deno.land/x/oak@v10.5.1/mod.ts";
import router from './router.ts';

const app = new Application();
const port = 5000;

app.use(router.routes());
app.use(router.allowedMethods())

console.log('server is running : http://localhost:' + port);

await app.listen({port});