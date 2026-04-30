import { use, useEffect, useState } from 'react'

function App() {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newPost, setNewPost] = useState({ title: '', body: '' });
  const [error, setError] = useState(null);

  const [formError, setFormError] = useState(false);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        console.error('Error fetching posts:', error);
        setLoading(false);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.body.trim()) {
      setFormError(true);
      return;
    }

    const simulatedPost = { ...newPost, id: Date.now() };
    setPosts([simulatedPost, ...posts]);
    setNewPost({ title: '', body: '' });
    setFormError(false);
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className='container my-3'>

            <h1 className='text-center'>Add New Post</h1>

            <div className='card my-3 shadow p-3 mb-5 bg-body'>

              <form onSubmit={handleSubmit}>

                <div className='mb-3'>
                  <label htmlFor='title' className='form-label'>
                    Title
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='title'
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  />
                </div>

                <div className='mb-3'>
                  <label htmlFor='body' className='form-label'>
                    Body
                  </label>
                  <textarea
                    className='form-control'
                    id='body'
                    rows='3'
                    value={newPost.body}
                    onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
                  />
                </div>

                {formError && <p className="text-danger">Per favore, compila tutti i campi.</p>}

                <button type='submit' className='btn btn-primary'>
                  Add Post
                </button>

              </form>

            </div>
          </div>

          <div className='container'>

            <h2 className='text-center'>Posts</h2>

            <div className='card my-3 shadow p-3 mb-5 bg-body'>
              {posts.map(post => (
                <section key={post.id} className='my-3 p-3 border-bottom'>

                  <h3 className='fw-bold'>{post.title}</h3>
                  <p>{post.body}</p>
                </section>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default App
