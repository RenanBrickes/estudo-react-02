export const loadPost = async () => {
    const postResponse = fetch('https://jsonplaceholder.typicode.com/posts');
    const fotoResponse = fetch('https://jsonplaceholder.typicode.com/photos');

    const [post, fotos] = await Promise.all([postResponse, fotoResponse]);

    const postJson = await post.json();
    const fotosJson = await fotos.json();

    const postAndPhotos = postJson.map((post, index) => {
      return { ...post, cover: fotosJson[index].url }
    });
    return postAndPhotos;
}