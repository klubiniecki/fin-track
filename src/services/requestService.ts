const RequestService = () => {
  const get = async (url: string, options?: {}) => {
    let data, error;
    try {
      const res = await fetch(url, options);
      data = await res.json();
      if (!res.ok) {
        error = "Nothing here!";
      }
    } catch (err) {
      error = err;
    }
    return { data, error };
  };

  const post = async (url: string, body: {}) => {
    let data, error;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      data = await res.json();
    } catch (err) {
      error = err;
    }
    return { data, error };
  };

  const remove = async (id: string, options?: {}) => {
    const res = await fetch(id, {
      method: "DELETE",
      ...options,
    });
    const data = await res.json();
    return data;
  };

  return { get, post, remove };
};

export default RequestService;
