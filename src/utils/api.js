const ROOT_URL = `https://www.googleapis.com`;

export const fetchVolumes = searchQuery => {
  return new Promise((resolve, reject) => {
    fetch(`${ROOT_URL}/books/v1/volumes?q=${searchQuery}&orderBy=relevance`)
      .then(response => response.json())
      .then(response => {
        // debugger;
        if (response.error) {
          reject(response.error.message);
        } else if (+response.totalItems > 0) {
          resolve(response.items.map(item => item.volumeInfo));
        } else if (response.totalItems === 0) {
          resolve([]);
        } else {
          // This 'else' shouldn't happen. But just in case.
          console.log(response);
          reject('Unknown error. Check logs');
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};
