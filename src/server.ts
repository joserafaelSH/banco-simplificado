import { app, port } from "./express/server";

app.listen(port, () => {
  console.log(`Server is listening on port ${port}, Environment: ${process.env.NODE_ENV}`);
});
