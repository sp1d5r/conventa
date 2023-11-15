import GhostContentAPI from "@tryghost/content-api";

// Create API instance with site credentials
const api = new GhostContentAPI({
  url: "https://conventa.ghost.io",
  key: "6f90554dcd615af8572be811fe",
  version: "v5.0",
});

export async function getPosts() {
  return await api.posts
    .browse({
      limit: "all",
    })
    .catch((err) => {
      console.error(err);
    });
}

export async function getSinglePost(id) {
  return await api.posts.read({ id: id }).catch((err) => {
    console.log(err);
  });
}
